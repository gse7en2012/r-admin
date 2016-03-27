/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');


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
            console.log(item);
            r.push({
                img: item.img,
                channel_name:item.channel.channel_name,
                channel_id:item.channel.channel_id,
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                art_id: item.art_id,
                title: item.title,
                author: item.author
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
    getChannelArtList(page,type){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 30;
        const query={
            include: [{
                model: DataBaseModel.Channel,
                attributes: ['channel_id', 'channel_name'],
                required: false,
            }],
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'art_id DESC',
        };
        if(type!=0) query.where={channel_id:type};
        return DataBaseModel.ChannelArt.findAndCountAll(query).then((data)=>{
            return $infoHelper.formatArt(data,page)
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
        return DataBaseModel.ChannelArt.update(art, {
            where: {art_id: art.art_id}
        }).then(()=>art)
    },
    addChannelArt(art){
        const artInstance=DataBaseModel.ChannelArt.build({
            title:art.title,
            content:art.content,
            channel_id:art.channel_id,
            author:art.author,
            img:art.img,
            uid:art.uid
        });
        return artInstance.save();
    },
    deleteChannelArt(artId){
        return DataBaseModel.ChannelArt.find({
            where: {art_id: artId}
        }).then((channel)=> {
            return channel.destroy();
        })
    },
    deleteChannel(channelId){
        return DataBaseModel.Channel.find({
            where: {channel_id: channelId}
        }).then((channel)=> {
            DataBaseModel.ChannelArt.destroy({where:{channel_id:channelId}});
            return channel.destroy();
        })
    },
    editChannel(channel){
        return DataBaseModel.Channel.update(channel, {
            where: {channel_id: channel.channel_id}
        }).then(()=>channel)
    }
};
//InfoController.getChannelArtList(1);
module.exports = InfoController;