/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const infoRouter = new express.Router();
const api        = require('../../api');

infoRouter.get('/list', api.InfoApi.getChannelListIF);


infoRouter.get('/art/list', api.InfoApi.getChannelArtListIF);

infoRouter.post('/add',api.InfoApi.addChannelIF);

infoRouter.post('/art/add',api.InfoApi.addChannelArtIF);

infoRouter.post('/art/delete',api.InfoApi.deleteChannelArtIF);

infoRouter.post('/art/edit',api.InfoApi.editChannelArtIF);

infoRouter.get('/art/details',api.InfoApi.getChannelArtDetailsIF);

infoRouter.post('/edit',api.InfoApi.editChannelIF);

infoRouter.post('/delete',api.InfoApi.deleteChannelIF);

module.exports = infoRouter;