/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const mobileRouter = new express.Router();
const api        = require('../../api');

mobileRouter.get('/', api.MobileApi.renderMobileIndexIF);

mobileRouter.get('/news', api.MobileApi.renderMobileNewsIF);
//mobileRouter.get('/logs_list',api.LogsApi.getOpLogsListIF);


module.exports = mobileRouter;