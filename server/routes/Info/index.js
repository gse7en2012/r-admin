/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const infoRouter = new express.Router();
const api        = require('../../api');

infoRouter.get('/list', api.InfoApi.getChannelListIF);


infoRouter.get('/art/list', api.InfoApi.getChannelArtListIF);

infoRouter.post('/add',api.InfoApi.addChannelIF);

infoRouter.post('/edit',api.InfoApi.editChannelIF);

infoRouter.post('/delete',api.InfoApi.deleteChannelIF);

module.exports = infoRouter;