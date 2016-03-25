/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const ActivityApi = {
    getActivityListIF(req, res){
        const page = req.query.page || 1;
        console.log(req.adminUid);
        return Controller.Activity.getActivityList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getActivityDetailsIF(req,res){
        const activityId=req.query.activity_id;
        return Controller.Activity.getActivityDetails(activityId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addActivityIF(req,res){
        const activity={
            title:req.body.title,
            author:req.body.author,
            link:req.body.link,
            img:req.body.img,
            sort:req.body.sort
        };
        return Controller.Activity.addActivity(activity).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteActivityIF(req,res){
        const activityId=req.body.activity_id;
        return Controller.Activity.deleteActivity(activityId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    openActivityIF(req,res){
        const activityId=req.body.activity_id;
        return Controller.Activity.openActivity(activityId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editActivityIF(req,res){
        const activity={
            title:req.body.title,
            author:req.body.author,
            activity_id:req.body.activity_id,
            img:req.body.img,
            link:req.body.link
        };
        return Controller.Activity.editActivity(activity).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = ActivityApi;