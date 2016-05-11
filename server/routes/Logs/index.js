/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const logsRouter = new express.Router();
const api        = require('../../api');

logsRouter.get('/login_list', api.LogsApi.getLoginLogsListIF);

logsRouter.get('/logs_list',api.LogsApi.getOpLogsListIF);


module.exports = logsRouter;