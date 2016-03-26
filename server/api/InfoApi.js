/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const InfoApi = {
    getChannelListIF(req, res){
        return Controller.Channel.getChannelList().then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getChannelArtListIF(req,res){
        const page = req.query.page || 1;
        return Controller.Channel.getChannelArtList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addChannelIF(req,res){
        const channel={
            channel_name:req.body.name
        };
        return Controller.Channel.addChannel(channel).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteChannelIF(req,res){
        const channelId=req.body.channel_id;
        return Controller.Channel.deleteChannel(channelId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editChannelIF(req,res){
        const channel={
            channel_name:req.body.name,
            channel_id:req.body.channel_id
        };
        return Controller.Channel.editChannel(channel).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = InfoApi;