/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const newsRouter = new express.Router();
const api        = require('../../api');

newsRouter.get('/list', api.NewsApi.getNewsListIF);

newsRouter.get('/details',api.NewsApi.getNewsDetailsIF);

newsRouter.get('/search',api.NewsApi.searchNewsIF);

newsRouter.post('/add',api.NewsApi.addNewsIF);

newsRouter.post('/edit',api.NewsApi.editNewsIF);

newsRouter.post('/delete',api.NewsApi.deleteNewsIF);

module.exports = newsRouter;