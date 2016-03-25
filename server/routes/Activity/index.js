/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const activityRouter = new express.Router();
const api        = require('../../api');

activityRouter.get('/list', api.ActivityApi.getActivityListIF);

activityRouter.get('/details',api.ActivityApi.getActivityDetailsIF);

activityRouter.post('/add',api.ActivityApi.addActivityIF);

activityRouter.post('/edit',api.ActivityApi.editActivityIF);

activityRouter.post('/delete',api.ActivityApi.deleteActivityIF);

activityRouter.post('/open',api.ActivityApi.openActivityIF);

module.exports = activityRouter;