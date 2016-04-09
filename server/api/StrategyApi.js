/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const StrategyApi = {
    getStrategyListIF(req, res){
        const page = req.query.page || 1;
        console.log(req.adminUid);
        return Controller.Strategy.getStrategyList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getStrategyDetailsIF(req,res){
        const strategyId=req.query.strategy_id;
        return Controller.Strategy.getStrategyDetails(strategyId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    searchStrategyIF(req,res){
        const keyword=req.query.keyword;
        return Controller.Strategy.searchStrategy(keyword).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addStrategyIF(req,res){
        const strategy={
            title:req.body.title,
            author:req.body.author,
            uid:req.body.uid||req.adminUid,
            date:req.body.date,
            custom_link:req.body.custom_link,
            content:req.body.content
        };
        return Controller.Strategy.addStrategy(strategy).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteStrategyIF(req,res){
        const strategyId=req.body.strategy_id;
        return Controller.Strategy.deleteStrategy(strategyId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editStrategyIF(req,res){
        const strategy={
            title:req.body.title,
            author:req.body.author,
            uid:req.body.uid,
            date:req.body.date,
            strategy_id:req.body.strategy_id,
            content:req.body.content
        };
        return Controller.Strategy.editStrategy(strategy).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = StrategyApi;