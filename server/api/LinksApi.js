/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const LinkApi = {
    getLinkListIF(req, res){
        const page = req.query.page || 1;
        return Controller.Links.getLinksList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getLinkDetailsIF(req,res){
        const linkId=req.query.link_id;
        return Controller.Links.getLinksDetails(linkId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    addLinkIF(req,res){
        const link={
            img:req.body.img,
            author:req.body.author,
            link_name:req.body.name,
            link_address:req.body.link,
            sort:req.body.sort
        };
        return Controller.Links.addLinks(link).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    deleteLinksIF(req,res){
        const linkId=req.body.link_id;
        return Controller.Links.deleteLinks(linkId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    editLinkIF(req,res){
        const link={
            link_img:req.body.img,
            author:req.body.author,
            link_name:req.body.name,
            link_address:req.body.link,
            sort:req.body.sort,
            link_id:req.body.link_id
        };
        return Controller.Links.editLink(link).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = LinkApi;