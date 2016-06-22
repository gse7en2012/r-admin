/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const videoRouter = new express.Router();
const api        = require('../../api');
videoRouter.get('/list', api.VideoApi.getVideoListIF);

videoRouter.get('/details',api.VideoApi.getVideoDetailsIF);

videoRouter.post('/add',api.VideoApi.addVideoIF);

videoRouter.post('/edit',api.VideoApi.editVideoIF);

videoRouter.post('/delete',api.VideoApi.deleteVideoIF);

videoRouter.post('/open',api.VideoApi.openVideoIF);

module.exports = videoRouter;