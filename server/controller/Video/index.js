/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const logAction     = require('../../helpers').logAction;

const $videoHelper = {
    format(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                video_id: item.video_id,
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


const VideoController = {
    getVideoList(page, pageS, isShow){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = pageS || 400;
        let query      = {
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'sort DESC'
        };
        if (isShow) query.where = {is_show: 1};
        return DataBaseModel.Video.findAndCountAll(query).then((data)=> {
            return $videoHelper.format(data, page)
        })
    },
    getVideoDetails(videoID){
        if (!videoID || _.isNaN(Number(videoID))) return Promise.reject('参数错误!');
        return DataBaseModel.Video.findById(videoID)
    },
    addVideo(video){
        const Staticize = require('../../comm/Staticize');
        const newsInstance = DataBaseModel.Video.build({
            title: video.title,
            author: video.author,
            link: video.link,
            sort: video.sort,
            is_show: video.is_show
        });
        return newsInstance.save().then(()=>{
            Staticize.compileVideoIndex();
            return newsInstance;
        });
    },
    deleteVideo(videoId){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Video.find({
            where: {video_id: videoId}
        }).then((video)=> {
            video.is_show = 0;
            return video.save().then(()=>{
                Staticize.compileVideoIndex();
                return video;
            });
        })
    },
    openVideo(videoId){
        return DataBaseModel.Video.find({
            where: {video_id: videoId}
        }).then((video)=> {
            video.is_show = 1;
            return video.save();
        }).then(()=>{
            Staticize.compileVideoIndex();
        })
    },
    editVideo(video){
        const Staticize = require('../../comm/Staticize');
        return DataBaseModel.Video.update(video, {
            where: {video_id: video.video_id}
        }).then(()=>{
            Staticize.compileVideoIndex();
            return video;
        })
    },
    getCoverVideo(){
        return DataBaseModel.Video.find({
            order:'sort DESC',
            limit:1
        }).then((r)=>{
            if(r){
                return r.link;
            }
        })
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
module.exports = VideoController;