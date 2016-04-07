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
                news_id: item.news_id,
                title: item.title,
                author: item.author,
                s_link:item.custom_link||item.s_link,
                custom_link:item.custom_link,
                pre: htmlToText.fromString(item.content, {
                    wordwrap: 0,
                    ignoreHref: true,
                    ignoreImage: true
                }).slice(0, 100).replace(/\n/g,'').replace(/ /g,''),
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


const NewsController = {
    getNewsList(page, pageS){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = pageS || 30;
        return DataBaseModel.News.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'news_id DESC'
        }).then((data)=> {
            return $newsHelper.format(data, page)
        })
    },
    getNewsDetails(newsId){
        if (!newsId || _.isNaN(Number(newsId))) return Promise.reject('参数错误!');
        return DataBaseModel.News.findById(newsId)
    },
    searchNews(keyword){
        return DataBaseModel.News.findAndCountAll({
            where: {
                title: {$like: `%${keyword}%`}
            },
            order: 'news_id DESC',
            limit: 50
        }).then($newsHelper.format)
    },
    addNews(news){
        const Staticize = require('../../comm/Staticize');
        const newsInstance = DataBaseModel.News.build({
            title: news.title,
            author: news.author,
            uid: news.uid,
            date: news.date || new Date(),
            custom_link:news.custom_link,
            content: news.content
        });
        return newsInstance.save().then((newsD)=> {
            newsInstance.date=moment(newsInstance.date).format('YYYY-MM-DD HH:mm:ss');
            newsInstance.pre=htmlToText.fromString(news.content, {
                wordwrap: 0,
                ignoreHref: true,
                ignoreImage: true
            }).slice(0, 100).replace(/\n/g,'').replace(/ /g,'');
            Staticize.compileInsidePage('news', newsD.news_id, newsInstance).then((r)=> {
                newsD.s_link = r;
                newsD.save().then(Staticize.compileNews);
            });

            return newsInstance;
        });
    },
    deleteNews(newsId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.News.find({
            where: {news_id: newsId}
        }).then((news)=> {
            return news.destroy().then(Staticize.compileNews);
        })
    },
    editNews(news){
        return DataBaseModel.News.update(news, {
            where: {news_id: news.news_id}
        }).then(()=>news)
    }
};

module.exports = NewsController;