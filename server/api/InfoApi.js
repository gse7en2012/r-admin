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
    getChannelArtListIF(req, res){
        const page = req.query.page || 1;
        const type = req.query.type || 0;
        return Controller.Channel.getChannelArtList(page,type).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteChannelArtIF(req,res){
        const artId=req.body.art_id;
        return Controller.Channel.deleteChannelArt(artId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getChannelArtDetailsIF(req,res){
        const artId=req.query.art_id;
        return Controller.Channel.getChannelArtDetails(artId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editChannelArtIF(req,res){
        const art = {
            title: req.body.title,
            content: req.body.content,
            channel_id: req.body.channel_id,
            author: req.body.author,
            img: req.body.img,
            uid: req.adminUid,
            art_id:req.body.art_id
        };
        return Controller.Channel.editChannelArt(art).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addChannelIF(req, res){
        const channel = {
            channel_name: req.body.name
        };
        return Controller.Channel.addChannel(channel).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addChannelArtIF(req, res){
        const art = {
            title: req.body.title,
            content: req.body.content,
            channel_id: req.body.channel_id,
            author: req.body.author,
            img: req.body.img,
            uid: req.adminUid
        };
        return Controller.Channel.addChannelArt(art).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteChannelIF(req, res){
        const channelId = req.body.channel_id;
        return Controller.Channel.deleteChannel(channelId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editChannelIF(req, res){
        const channel = {
            channel_name: req.body.name,
            channel_id: req.body.channel_id
        };
        return Controller.Channel.editChannel(channel).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = InfoApi;