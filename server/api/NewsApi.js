/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const NewsApi = {
    getNewsListIF(req, res){
        const page = req.query.page || 1;
        console.log(req.adminUid);
        return Controller.News.getNewsList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getNewsDetailsIF(req,res){
        const newsId=req.query.news_id;
        return Controller.News.getNewsDetails(newsId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    searchNewsIF(req,res){
        const keyword=req.body.keyword;
        return Controller.News.searchNews(keyword).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addNewsIF(req,res){
        const news={
            title:req.body.title,
            author:req.body.author,
            uid:req.body.uid||req.adminUid,
            date:req.body.date,
            content:req.body.content,
            custom_link:req.body.custom_link
        };
        return Controller.News.addNews(news).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteNewsIF(req,res){
        const newsId=req.body.news_id;
        return Controller.News.deleteNews(newsId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editNewsIF(req,res){
        const news={
            title:req.body.title,
            author:req.body.author,
            uid:req.body.uid,
            date:req.body.date,
            news_id:req.body.news_id,
            content:req.body.content
        };
        return Controller.News.editNews(news).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = NewsApi;