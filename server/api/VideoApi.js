/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const VideoApi = {
    getVideoListIF(req, res){
        const page = req.query.page || 1;
        console.log(req.adminUid);
        return Controller.Video.getVideoList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getVideoDetailsIF(req,res){
        const videoId=req.query.video_id;
        return Controller.Video.getVideoDetails(videoId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addVideoIF(req,res){
        const video={
            title:req.body.title,
            author:req.body.author,
            link:req.body.link,
            sort:req.body.sort
        };
        return Controller.Video.addVideo(video).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteVideoIF(req,res){
        const videoId=req.body.video_id;
        return Controller.Video.deleteVideo(videoId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    openVideoIF(req,res){
        const videoId=req.body.video_id;
        return Controller.Video.openVideo(videoId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editVideoIF(req,res){
        const video={
            title:req.body.title,
            author:req.body.author,
            video_id:req.body.video_id,
            link:req.body.link,
            sort:req.body.sort
        };
        return Controller.Video.editVideo(video).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = VideoApi;