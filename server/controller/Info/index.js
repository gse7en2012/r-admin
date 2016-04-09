/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const logAction     = require('../../helpers').logAction;

const $infoHelper = {
    format(data){
        const r = [], defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                channel_id: item.channel_id,
                name: item.channel_name
            });
        });
        return {
            totalCount: data.count || defaultCount,
            dataList: r
        };
    },
    formatArt(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                img: item.img,
                channel_name: item.channel.channel_name,
                channel_id: item.channel.channel_id,
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                art_id: item.art_id,
                title: item.title,
                author: item.author,
                s_link:item.s_link
            });
        });
        return {
            totalCount: data.count || defaultCount,
            dataList: r,
            curPage: page || defaultPage
        };
    }
};


const InfoController = {
    getChannelList(){
        return DataBaseModel.Channel.findAndCountAll().then((data)=> {
            return $infoHelper.format(data)
        })
    },
    getChannelArtList(page, type){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 30;
        const query    = {
            include: [{
                model: DataBaseModel.Channel,
                attributes: ['channel_id', 'channel_name'],
                required: false,
            }],
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'art_id DESC',
        };
        if (type != 0) query.where = {channel_id: type};
        return DataBaseModel.ChannelArt.findAndCountAll(query).then((data)=> {
            return $infoHelper.formatArt(data, page)
        })
    },
    getChannelArtDetails(artId){
        return DataBaseModel.ChannelArt.findById(artId);
    },
    addChannel(channel){
        const channelInstance = DataBaseModel.Channel.build({
            channel_name: channel.channel_name
        });
        return channelInstance.save().then((channel)=> {
            return {
                channel_id: channel.channel_id,
                createdAt: moment(channel.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                name: channel.channel_name
            }
        });
    },
    editChannelArt(art){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.ChannelArt.update(art, {
            where: {art_id: art.art_id}
        }).then(()=>{
            console.log(InfoController,art.art_id);
            InfoController.generateStaticPageById(art.art_id);
            Staticize.compileInfo();
            return art;
        })
    },
    addChannelArt(art){
        const artInstance = DataBaseModel.ChannelArt.build({
            title: art.title,
            content: art.content,
            channel_id: art.channel_id,
            author: art.author,
            img: art.img,
            uid: art.uid
        });
        return artInstance.save().then((artD)=> {
            InfoController.generateStaticPage(artD);
            return artInstance;
        });
    },
    deleteChannelArt(artId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.ChannelArt.find({
            where: {art_id: artId}
        }).then((channel)=> {
            return channel.destroy().then(()=> {
                Staticize.compileInfo();
                Staticize.deleteFile(channel.s_link);
                return true;
            });
        })
    },
    deleteChannel(channelId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Channel.find({
            where: {channel_id: channelId}
        }).then((channel)=> {
            DataBaseModel.ChannelArt.destroy({where: {channel_id: channelId}});
            Staticize.compileInfo();
            return channel.destroy();
        })
    },
    editChannel(channel){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Channel.update(channel, {
            where: {channel_id: channel.channel_id}
        }).then(()=>{
            Staticize.compileInfo();
            return channel;
        })
    },
    getChannelInfoList(){
        return DataBaseModel.ChannelArt.findAll({
            include: [{
                model: DataBaseModel.Channel
            }],
            attributes: {exclude: ['content']}
        }).then((r)=> {
            const map    = {};
            const result = [];
            r.forEach((row)=> {
                if (!map[row.channel.channel_id]) {
                    map[row.channel.channel_id] = {
                        name: row.channel.channel_name,
                        data: []
                    }
                }
                map[row.channel.channel_id].data.push({
                    title: row.title,
                    img: row.img,
                    s_link:row.s_link
                })
            });
            Object.keys(map).forEach((item)=> {
                result.push({
                    name: map[item].name,
                    data: map[item].data,
                    s_link:map[item].s_link
                })
            });
            return result;
        })
    },
    generateStaticPage(info){
        const Staticize = require('../../comm/Staticize');
        info.date = moment(info.createdAt).format('YYYY-MM-DD HH:mm:ss');
        info.title_desc='游戏资料';
        Staticize.compileInsidePage('info', info.art_id, info).then((r)=> {
            info.s_link = r;
            info.save().then(()=> {
                Staticize.compileInfo();
            });
        });
    },
    generateStaticPageById(infoId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.ChannelArt.findById(infoId).then((info)=>{
            info=info.dataValues;
            info.date = moment(info.createdAt).format('YYYY-MM-DD HH:mm:ss');
            info.title_desc='游戏资料';
            Staticize.compileInsidePage('info', info.art_id, info).then((r)=> {
                info.s_link = r;
                info.save().then(()=> {
                    Staticize.compileInfo();
                });
            });
        })
    }
};

module.exports = InfoController;