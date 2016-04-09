/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const htmlToText    = require('html-to-text');
const logAction     = require('../../helpers').logAction;

//const Staticize = require('../../comm/Staticize');

const $newsHelper = {
    format(data, page){
        function getFirstImage(htmlString) {
            const re      = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
            const results = re.exec(htmlString);
            if (results)  return results[1];
            return false;
        }

        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                date: moment(item.date).format('YYYY-MM-DD'),
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                news_act_id: item.news_act_id,
                title: item.title,
                author: item.author,
                s_link: item.custom_link || item.s_link,
                custom_link: item.custom_link,
                pre: htmlToText.fromString(item.content, {
                    wordwrap: 0,
                    ignoreHref: true,
                    ignoreImage: true
                }).slice(0, 100).replace(/\n/g, '').replace(/ /g, ''),
                image: getFirstImage(item.content)
            });
        });
        return {
            totalCount: data.count || defaultCount,
            dataList: r,
            curPage: page || defaultPage
        };
    }
};


const NewsActController = {
    getNewsList(page, pageS){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = pageS || 30;
        return DataBaseModel.NewsAct.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'news_act_id DESC'
        }).then((data)=> {
            return $newsHelper.format(data, page)
        })
    },
    getNewsDetails(newsId){
        if (!newsId || _.isNaN(Number(newsId))) return Promise.reject('参数错误!');
        return DataBaseModel.NewsAct.findById(newsId)
    },
    searchNews(keyword){
        return DataBaseModel.NewsAct.findAndCountAll({
            where: {
                title: {$like: `%${keyword}%`}
            },
            order: 'news_act_id DESC',
            limit: 50
        }).then($newsHelper.format)
    },
    addNews(news){
        const newsInstance = DataBaseModel.NewsAct.build({
            title: news.title,
            author: news.author,
            uid: news.uid,
            date: news.date || new Date(),
            custom_link: news.custom_link,
            content: news.content
        });
        return newsInstance.save().then((newsD)=> {
            NewsActController.generateStaticPage(newsD);
            return newsD;
        });
    },
    deleteNews(newsId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.NewsAct.find({
            where: {news_act_id: newsId}
        }).then((news)=> {
            return news.destroy().then(()=> {
                DataBaseModel.Mysql.query(
                    'SELECT A.* FROM ( ( SELECT news_act_id FROM news_act WHERE news_act_id < ? ORDER BY news_act_id DESC LIMIT 1 ) UNION ( SELECT news_act_id FROM news_act WHERE news_act_id> ? ORDER BY news_act_id ASC LIMIT 1 ) ) as A ORDER BY A.news_act_id',
                    {replacements: [newsId, newsId], type: 'SELECT'}
                ).then((newsIdList)=> {
                    newsIdList.forEach((item)=> {
                        NewsActController.generateStaticPageById(item.news_act_id);
                    })
                });
                Staticize.deleteFile(news.s_link);
                Staticize.compileActivity();
                return true;
            });
        })
    },
    editNews(news){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.NewsAct.update(news, {
            where: {news_act_id: news.news_act_id}
        }).then(()=>{
            NewsActController.generateStaticPageById(news.news_act_id);
            NewsActController.generateActivityListPage();
            Staticize.compileActivity();
            return news;
        })
    },
    generateStaticPage(news){
        const Staticize = require('../../comm/Staticize');
        let lastNewsId;
        DataBaseModel.Mysql.query(
            'SELECT A.* FROM ( ( SELECT * FROM news_act WHERE news_act_id < ? ORDER BY news_act_id DESC LIMIT 1 ) UNION ( SELECT * FROM news_act WHERE news_act_id> ? ORDER BY news_act_id ASC LIMIT 1 ) ) as A ORDER BY A.news_act_id',
            {replacements: [news.news_act_id, news.news_act_id], type: 'SELECT'}
        ).then(r=> {
            news.dataValues.title_desc="活动详情";
            news.dataValues.date = moment(news.date).format('YYYY-MM-DD HH:mm:ss');
            news.dataValues.pre  = htmlToText.fromString(news.content, {
                wordwrap: 0,
                ignoreHref: true,
                ignoreImage: true
            }).slice(0, 100).replace(/\n/g, '').replace(/ /g, '');
            r.forEach((item)=> {
                if (item.news_act_id > news.news_act_id) {
                    news.dataValues.next_title = item.title;
                    news.dataValues.next_link  = item.custom_link || item.s_link;
                }
                if (item.news_act_id < news.news_act_id) {
                    news.dataValues.last_title = item.title;
                    news.dataValues.last_link  = item.custom_link || item.s_link;
                    lastNewsId                 = item.news_act_id;
                }
            });
            Staticize.compileInsidePage('activity', news.news_act_id, news.dataValues).then((r)=> {
                news.s_link = r;
                news.save().then(()=> {
                    //把上一篇文章重新生成
                    NewsActController.generateStaticPageById(lastNewsId);
                    NewsActController.generateActivityListPage(); //render newslist
                    Staticize.compileActivity();
                });
            });
        });
    },
    generateStaticPageById(newsId){
        const Staticize = require('../../comm/Staticize');
        DataBaseModel.NewsAct.findById(newsId).then((news)=> {
            if(!news||!news.dataValues) return;
            news.dataValues.title_desc="活动详情";
            news.dataValues.date = moment(news.date).format('YYYY-MM-DD HH:mm:ss');
            news.dataValues.pre  = htmlToText.fromString(news.content, {
                wordwrap: 0,
                ignoreHref: true,
                ignoreImage: true
            }).slice(0, 100).replace(/\n/g, '').replace(/ /g, '');

            DataBaseModel.Mysql.query(
                'SELECT A.* FROM ( ( SELECT * FROM news_act WHERE news_act_id < ? ORDER BY news_act_id DESC LIMIT 1 ) UNION ( SELECT * FROM news_act WHERE news_act_id> ? ORDER BY news_act_id ASC LIMIT 1 ) ) as A ORDER BY A.news_act_id',
                {replacements: [news.news_act_id, news.news_act_id], type: 'SELECT'}
            ).then(r=> {
                r.forEach((item)=> {
                    if (item.news_act_id > news.news_act_id) {
                        news.dataValues.next_title = item.title;
                        news.dataValues.next_link  = item.custom_link || item.s_link;
                    }
                    if (item.news_act_id < news.news_act_id) {
                        news.dataValues.last_title = item.title;
                        news.dataValues.last_link  = item.custom_link || item.s_link;
                    }
                });
                Staticize.compileInsidePage('activity', news.news_act_id, news.dataValues)
            });
        })
    },
    generateActivityListPage(){
        const Staticize = require('../../comm/Staticize');
        const pageSize  = 10;
        let total;
        let page        = 0;
        let lastPage;//最后一页
        let dotShow = false;//省略号
        function transfer(data, page) {

            const result = {
                'news_list': [],
                'lastPage': lastPage,
                'total': total,
                'dotShow?': dotShow,
                'prevShow?': page != 1,
                'nextShow?': page != lastPage,
                'prevLink': page == 2 ? '/activity/index.html' : '/activity/index_' + (Number(page) - 1) + '.html',
                'nextLink': '/activity/index_' + (Number(page) + 1) + '.html',
                'ind': page,
                'firstLink': '/activity/index.html',
                'lastLink': '/activity/index_' + lastPage + '.html'
            };
            data.forEach((item)=> {
                const row = {
                    date: moment(item.data).format('YYYY-MM-DD'),
                    pre: htmlToText.fromString(item.content, {
                        wordwrap: 0,
                        ignoreHref: true,
                        ignoreImage: true
                    }).slice(0, 100).replace(/\n/g, '').replace(/ /g, ''),
                    s_link: item.custom_link || item.s_link,
                    title: item.title
                };
                result.news_list.push(row);
            });
            Staticize.compileActivityList(result, page)
        }

        DataBaseModel.NewsAct.findAndCountAll({
            order: 'news_act_id DESC'
        }).then((newsList)=> {

            total    = newsList.count;
            lastPage = Math.ceil(total / pageSize);

            while (newsList.rows.length > 0) {
                page++;
                transfer(newsList.rows.splice(0, pageSize), page);
            }
            console.log('end');
        })
    }
};
//NewsController.generateActivityListPage();
module.exports = NewsActController;