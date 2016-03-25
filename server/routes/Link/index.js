/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const linkRouter = new express.Router();
const api        = require('../../api');

linkRouter.get('/list', api.LinksApi.getLinkListIF);

linkRouter.get('/details',api.LinksApi.getLinkDetailsIF);

linkRouter.post('/add',api.LinksApi.addLinkIF);

linkRouter.post('/edit',api.LinksApi.editLinkIF);

linkRouter.post('/delete',api.LinksApi.deleteLinksIF);

module.exports = linkRouter;