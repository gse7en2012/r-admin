/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const newsRouter = new express.Router();
const api        = require('../../api');

newsRouter.get('/list', api.NewsActApi.getNewsListIF);

newsRouter.get('/details',api.NewsActApi.getNewsDetailsIF);

newsRouter.get('/search',api.NewsActApi.searchNewsIF);

newsRouter.post('/add',api.NewsActApi.addNewsIF);

newsRouter.post('/edit',api.NewsActApi.editNewsIF);

newsRouter.post('/delete',api.NewsActApi.deleteNewsIF);

module.exports = newsRouter;