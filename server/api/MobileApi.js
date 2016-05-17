/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const MobileApi = {
    renderMobileIndexIF(req, res){
        //return res.render('mobile');
        return Controller.Mobile.renderMobileIndex().then(r=> {
            return res.render('mobile',r)
        })
    },
    renderMobileNewsIF(req, res){
        //return res.render('mobile');
        const id=req.query.news_id;
        return Controller.Mobile.renderMobileNews(id).then(r=> {
            return res.render('page',r)
        }).catch(e=>{
            return res.send('没有该文章!')
        })
    }

};

module.exports = MobileApi;