/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const logAction     = require('../../helpers').logAction;
const htmlToText    = require('html-to-text');

const $strategyHelper = {
    format(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                date: moment(item.date).format('YYYY-MM-DD'),
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                strategy_id: item.strategy_id,
                title: item.title,
                author: item.author,
                s_link:item.custom_link||item.s_link,
                pre: htmlToText.fromString(item.content, {
                    wordwrap: 0,
                    ignoreHref: true,
                    ignoreImage: true
                }).slice(0, 100).replace(/\n/g, '').replace(/ /g, ''),
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

        const strategyInstance=DataBaseModel.Strategy.build({
            title:strategy.title,
            author:strategy.author,
            uid:strategy.uid,
            date:strategy.date||new Date(),
            content:strategy.content,
            custom_link:strategy.custom_link
        });
        return strategyInstance.save().then((strategyD)=>{
            StrategyController.generateStaticPage(strategyD);
            StrategyController.generateStrategyListPage();
            return strategyInstance;
        });
    },
    deleteStrategy(strategyId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Strategy.find({
            where:{strategy_id:strategyId}
        }).then((strategy)=>{
            return strategy.destroy().then(()=>{

                Staticize.deleteFile(strategy.s_link);
                Staticize.compileStrategy();

                DataBaseModel.Mysql.query(
                    'SELECT A.* FROM ( ( SELECT strategy_id FROM strategy WHERE strategy_id < ? ORDER BY strategy_id DESC LIMIT 1 ) UNION ( SELECT strategy_id FROM strategy WHERE strategy_id> ? ORDER BY strategy_id ASC LIMIT 1 ) ) as A ORDER BY A.strategy_id',
                    {replacements: [strategyId, strategyId], type: 'SELECT'}
                ).then((strategyIdList)=> {
                    strategyIdList.forEach((item)=> {
                        StrategyController.generateStaticPageById(item.strategy_id);
                    })
                });

                return true;
            });
        })
    },
    editStrategy(strategy){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Strategy.update(strategy,{
            where:{strategy_id:strategy.strategy_id}
        }).then(()=>{
            Staticize.compileStrategy();
            StrategyController.generateStaticPageById(strategy.strategy_id);
            return strategy;
        })
    },
    generateStaticPage(strategy){
        const Staticize = require('../../comm/Staticize');
        let lastNewsId;
        DataBaseModel.Mysql.query(
            'SELECT A.* FROM ( ( SELECT * FROM strategy WHERE strategy_id < ? ORDER BY strategy_id DESC LIMIT 1 ) UNION ( SELECT * FROM strategy WHERE strategy_id> ? ORDER BY strategy_id ASC LIMIT 1 ) ) as A ORDER BY A.strategy_id',
            {replacements: [strategy.strategy_id, strategy.strategy_id], type: 'SELECT'}
        ).then(r=> {
            strategy.dataValues.title_desc="攻略详情";
            strategy.dataValues.date = moment(strategy.date).format('YYYY-MM-DD HH:mm:ss');
            strategy.dataValues.pre  = htmlToText.fromString(strategy.content, {
                wordwrap: 0,
                ignoreHref: true,
                ignoreImage: true
            }).slice(0, 100).replace(/\n/g, '').replace(/ /g, '');
            r.forEach((item)=> {
                if (item.strategy_id > strategy.strategy_id) {
                    strategy.dataValues.next_title = item.title;
                    strategy.dataValues.next_link  = item.custom_link || item.s_link;
                }
                if (item.strategy_id < strategy.strategy_id) {
                    strategy.dataValues.last_title = item.title;
                    strategy.dataValues.last_link  = item.custom_link || item.s_link;
                    lastNewsId=item.strategy_id;
                }
            });
            Staticize.compileInsidePage('strategy', strategy.strategy_id, strategy.dataValues).then((r)=> {
                strategy.s_link = r;
                strategy.save().then(()=>{
                    //把上一篇文章重新生成
                    if(lastNewsId) StrategyController.generateStaticPageById(lastNewsId);
                    Staticize.compileStrategy();
                });
            });
        });
    },
    generateStaticPageById(strategyId){
        const Staticize = require('../../comm/Staticize');
        DataBaseModel.Strategy.findById(strategyId).then((strategy)=> {
            strategy.dataValues.title_desc="攻略详情";
            strategy.dataValues.date = moment(strategy.date).format('YYYY-MM-DD HH:mm:ss');
            strategy.dataValues.pre  = htmlToText.fromString(strategy.content, {
                wordwrap: 0,
                ignoreHref: true,
                ignoreImage: true
            }).slice(0, 100).replace(/\n/g, '').replace(/ /g, '');
            DataBaseModel.Mysql.query(
                'SELECT A.* FROM ( ( SELECT * FROM strategy WHERE strategy_id < ? ORDER BY strategy_id DESC LIMIT 1 ) UNION ( SELECT * FROM strategy WHERE strategy_id> ? ORDER BY strategy_id ASC LIMIT 1 ) ) as A ORDER BY A.strategy_id',
                {replacements: [strategy.strategy_id, strategy.strategy_id], type: 'SELECT'}
            ).then(r=> {
                r.forEach((item)=> {
                    if (item.strategy_id > strategy.strategy_id) {
                        strategy.dataValues.next_title = item.title;
                        strategy.dataValues.next_link  = item.custom_link || item.s_link;
                    }
                    if (item.strategy_id < strategy.strategy_id) {
                        strategy.dataValues.last_title = item.title;
                        strategy.dataValues.last_link  = item.custom_link || item.s_link;
                    }
                });
                Staticize.compileInsidePage('strategy', strategy.strategy_id, strategy.dataValues)
            });

        })
    },
    generateAllStrategyStaticPage(){
        StrategyController.generateStrategyListPage();
        return DataBaseModel.Strategy.findAll({
            attributes:['strategy_id']
        }).then((newsIdList)=>{
            const idList=newsIdList.map((item)=>item.strategy_id);
            const stId=setInterval(()=>{
                const newsId=idList.pop();
                if(newsId) {
                    StrategyController.generateStaticPageById(newsId)
                }else{
                    console.log(new Date(),'Strategy render all completed!');
                    clearInterval(stId)
                }
            },500)
        })
    },
    generateStrategyListPage(){
        const Staticize = require('../../comm/Staticize');
        const pageSize  = 10;
        let total;
        let page        = 0;
        let lastPage;//最后一页
        let dotShow = false;//省略号
        function transfer(data, page) {

            const result = {
                'strategy_list': [],
                'lastPage': lastPage,
                'total': total,
                'dotShow?': dotShow,
                'prevShow?': page != 1,
                'nextShow?': page != lastPage,
                'prevLink': page == 2 ? '/strategy/index.html' : '/strategy/index_' + (Number(page) - 1) + '.html',
                'nextLink': '/strategy/index_' + (Number(page) + 1) + '.html',
                'ind': page,
                'firstLink': '/strategy/index.html',
                'lastLink': '/strategy/index_' + lastPage + '.html'
            };
            data.forEach((item)=> {
                const row = {
                    date: moment(item.data).format('YYYY-MM-DD'),
                    pre: htmlToText.fromString(item.content, {
                        wordwrap: 0,
                        ignoreHref: true,
                        ignoreImage: true
                    }).slice(0, 100).replace(/\n/g, '').replace(/ /g, ''),
                    s_link: item.custom_link || item.s_link,
                    title: item.title
                };
                result.strategy_list.push(row);
            });
            Staticize.compileStrategyList(result, page)
        }

        DataBaseModel.Strategy.findAndCountAll({
            order: 'strategy_id DESC'
        }).then((newsList)=> {

            total    = newsList.count;
            lastPage = Math.ceil(total / pageSize);

            while (newsList.rows.length > 0) {
                page++;
                transfer(newsList.rows.splice(0, pageSize), page);
            }
            console.log('end');
        })
    }
};
//StrategyController.generateAllStrategyStaticPage();
module.exports = StrategyController;