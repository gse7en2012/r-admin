/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');



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
    getStrategyList(page){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 30;
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
        const strategyInstance=DataBaseModel.Strategy.build({
            title:strategy.title,
            author:strategy.author,
            uid:strategy.uid,
            date:strategy.date||new Date(),
            content:strategy.content
        });
        return strategyInstance.save();
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


//StrategyController.getStrategyList(1).then((r)=> {console.log(r);});
//StrategyController.addStrategy({
//    title:'股票大涨',
//    author:'股市大涨',
//    uid:2,
//    date:new Date()
//}).then((r)=>{
//    console.log(r);
//})
function tester(promise){
    promise.then(r=>{console.log(r);})
}
//tester(StrategyController.searchStrategy('测试'));
//tester(StrategyController.deleteStrategy(4));
//tester(StrategyController.editStrategy({
//    strategy_id:1,
//    title:'不要用这样',
//    author:'啊起'
//}));
module.exports = StrategyController;