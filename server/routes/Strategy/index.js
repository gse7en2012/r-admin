/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const strategyRouter = new express.Router();
const api        = require('../../api');

strategyRouter.get('/list', api.StrategyApi.getStrategyListIF);

strategyRouter.get('/details',api.StrategyApi.getStrategyDetailsIF);

strategyRouter.get('/search',api.StrategyApi.searchStrategyIF);

strategyRouter.post('/add',api.StrategyApi.addStrategyIF);

strategyRouter.post('/edit',api.StrategyApi.editStrategyIF);

strategyRouter.post('/delete',api.StrategyApi.deleteStrategyIF);

module.exports = strategyRouter;