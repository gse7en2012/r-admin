/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

const moment             = require('moment');
const DataBaseModel      = require('../../model');
const NewsController     = require('../News/');
const ActivityController = require('../NewsAct');
const StrategyController = require('../Strategy');
const CarouselController = require('../Activity');

const MobileController = {
    renderMobileNews(id){
        return NewsController.getNewsDetails(id).then((r)=>{
            if(r){
                r.dataValues.date=moment(r.dataValues.date).format('YYYY-MM-DD');
                return r.dataValues;
            }

            return Promise.reject('404');
        })
    },
    renderMobileIndex(){
        return Promise.all([
            NewsController.getNewsList(1, 11),
            ActivityController.getNewsList(1, 11),
            StrategyController.getStrategyList(1, 11),
            CarouselController.getActivityList(1,5)
        ]).then((list)=> {


            return {
                news: list[0].dataList,
                acts: list[1].dataList,
                strategy: list[2].dataList,
                carousel:list[3].dataList,
            }
        });

    }
};


module.exports = MobileController;