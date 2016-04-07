/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const logAction     = require('../../helpers').logAction;


const $strategyHelper = {
    format(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                date: moment(item.date).format('YYYY-MM-DD'),
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                strategy_id: item.strategy_id,
                title: item.title,
                author: item.author
            });
        });
        return {
            totalCount: data.count || defaultCount,
            dataList: r,
            curPage: page || defaultPage
        };
    }
};


const StrategyController = {
    getStrategyList(page,pageS){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = pageS||30;
        return DataBaseModel.Strategy.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'strategy_id DESC'
        }).then((data)=>{
            return $strategyHelper.format(data,page)
        })
    },
    getStrategyDetails(strategyId){
        if (!strategyId || _.isNaN(Number(strategyId))) return Promise.reject('参数错误!');
        return DataBaseModel.Strategy.findById(strategyId)
    },
    searchStrategy(keyword){
        return DataBaseModel.Strategy.findAndCountAll({
            where: {
                title: {$like: `%${keyword}%`}
            },
            order: 'strategy_id DESC',
            limit: 50
        }).then($strategyHelper.format)
    },
    addStrategy(strategy){
        const Staticize = require('../../comm/Staticize');
        const strategyInstance=DataBaseModel.Strategy.build({
            title:strategy.title,
            author:strategy.author,
            uid:strategy.uid,
            date:strategy.date||new Date(),
            content:strategy.content
        });
        return strategyInstance.save().then((strategyD)=>{
            strategyInstance.date=moment(strategyInstance.date).format('YYYY-MM-DD HH:mm:ss');
            Staticize.compileInsidePage('strategy', strategyD.strategy_id, strategyInstance).then((r)=> {
                strategyInstance.s_link = r;
                strategyInstance.save();
            });
            Staticize.compileStrategy();
            return strategyInstance;
        });
    },
    deleteStrategy(strategyId){
        return DataBaseModel.Strategy.find({
            where:{strategy_id:strategyId}
        }).then((strategy)=>{
            return strategy.destroy();
        })
    },
    editStrategy(strategy){
        return DataBaseModel.Strategy.update(strategy,{
            where:{strategy_id:strategy.strategy_id}
        }).then(()=>strategy)
    }
};

module.exports = StrategyController;