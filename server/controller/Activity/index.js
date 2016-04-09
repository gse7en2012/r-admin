/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const logAction     = require('../../helpers').logAction;

const $activityHelper = {
    format(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                img: item.img,
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                activity_id: item.activity_id,
                title: item.title,
                author: item.author,
                link: item.link,
                sort: item.sort,
                is_show: item.is_show
            });
        });
        return {
            totalCount: data.count || defaultCount,
            dataList: r,
            curPage: page || defaultPage
        };
    }
};


const ActivityController = {
    getActivityList(page, pageS, isShow){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = pageS || 100;
        let query      = {
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'sort DESC'
        };
        if (isShow) query.where = {is_show: 1};
        return DataBaseModel.Activity.findAndCountAll(query).then((data)=> {
            return $activityHelper.format(data, page)
        })
    },
    getActivityDetails(activityID){
        if (!activityID || _.isNaN(Number(activityID))) return Promise.reject('参数错误!');
        return DataBaseModel.Activity.findById(activityID)
    },
    addActivity(activity){
        const Staticize = require('../../comm/Staticize');
        const newsInstance = DataBaseModel.Activity.build({
            title: activity.title,
            author: activity.author,
            img: activity.img,
            link: activity.link,
            sort: activity.sort,
            is_show: activity.is_show
        });
        return newsInstance.save().then(()=>{
            Staticize.compileCarousel();
            return newsInstance;
        });
    },
    deleteActivity(activityId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Activity.find({
            where: {activity_id: activityId}
        }).then((activity)=> {
            activity.is_show = 0;
            return activity.save().then(()=>{
                Staticize.compileCarousel();
                return activity;
            });
        })
    },
    openActivity(activityId){
        return DataBaseModel.Activity.find({
            where: {activity_id: activityId}
        }).then((activity)=> {
            activity.is_show = 1;
            return activity.save();
        })
    },
    editActivity(activity){
        return DataBaseModel.Activity.update(activity, {
            where: {activity_id: activity.activity_id}
        }).then(()=>activity)
    }
};


//NewsController.getNewsList(1).then((r)=> {console.log(r);});
//NewsController.addNews({
//    title:'股票大涨',
//    author:'股市大涨',
//    uid:2,
//    date:new Date()
//}).then((r)=>{
//    console.log(r);
//})
function tester(promise) {
    promise.then(r=> {console.log(r);})
}
//tester(NewsController.searchNews('测试'));
//tester(NewsController.deleteNews(4));
//tester(NewsController.editNews({
//    news_id:1,
//    title:'不要用这样',
//    author:'啊起'
//}));
module.exports = ActivityController;