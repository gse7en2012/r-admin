/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const NewsActApi = {
    getNewsListIF(req, res){
        const page = req.query.page || 1;
        console.log(req.adminUid);
        return Controller.NewsAct.getNewsList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getNewsDetailsIF(req,res){
        const newsId=req.query.news_id;
        return Controller.NewsAct.getNewsDetails(newsId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    searchNewsIF(req,res){
        const keyword=req.body.keyword;
        return Controller.NewsAct.searchNews(keyword).then(
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
        return Controller.NewsAct.addNews(news).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteNewsIF(req,res){
        const newsId=req.body.news_act_id;
        return Controller.NewsAct.deleteNews(newsId).then(
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
            news_act_id:req.body.news_act_id,
            content:req.body.content
        };
        return Controller.NewsAct.editNews(news).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = NewsActApi;