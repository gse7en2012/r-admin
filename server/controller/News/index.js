/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');



const $newsHelper = {
    format(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                date: moment(item.date).format('YYYY-MM-DD'),
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                news_id: item.news_id,
                title: item.title,
                author: item.author
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
    getNewsList(page){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 30;
        return DataBaseModel.News.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'news_id DESC'
        }).then((data)=>{
            return $newsHelper.format(data,page)
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
        const newsInstance=DataBaseModel.News.build({
            title:news.title,
            author:news.author,
            uid:news.uid,
            date:news.date||new Date(),
            content:news.content
        });
        return newsInstance.save();
    },
    deleteNews(newsId){
        return DataBaseModel.News.find({
            where:{news_id:newsId}
        }).then((news)=>{
            return news.destroy();
        })
    },
    editNews(news){
        return DataBaseModel.News.update(news,{
            where:{news_id:news.news_id}
        }).then(()=>news)
    }
};


//NewsController.getNewsList(1).then((r)=> {console.log(r);});
//NewsController.addNews({
//    title:'股票大涨',
//    author:'股市大涨',
//    uid:2,
//    date:new Date()
//}).then((r)=>{
//    console.log(r);
//})
function tester(promise){
    promise.then(r=>{console.log(r);})
}
//tester(NewsController.searchNews('测试'));
//tester(NewsController.deleteNews(4));
//tester(NewsController.editNews({
//    news_id:1,
//    title:'不要用这样',
//    author:'啊起'
//}));
module.exports = NewsController;