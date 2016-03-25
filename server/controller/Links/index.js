/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');



const $linksHelper = {
    format(data, page){
        const r = [], defaultPage = 1, defaultCount = data.length;
        data.rows.forEach((item)=> {
            r.push({
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                link_id: item.link_id,
                name: item.link_name,
                author: item.author,
                img:item.link_img,
                link:item.link_address,
                sort:item.sort
            });
        });
        return {
            totalCount: data.count || defaultCount,
            dataList: r,
            curPage: page || defaultPage
        };
    }
};


const LinkController = {
    getLinksList(page){
        if (!page || _.isNaN(Number(page))) return Promise.reject('参数错误!');
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 30;
        return DataBaseModel.Links.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'sort DESC'
        }).then((data)=>{
            return $linksHelper.format(data,page)
        })
    },
    getLinksDetails(linksId){
        if (!linksId || _.isNaN(Number(linksId))) return Promise.reject('参数错误!');
        return DataBaseModel.Links.findById(linksId)
    },
    addLinks(link){
        const linkInstance=DataBaseModel.Links.build({
            link_img:link.img,
            author:link.author,
            link_name:link.link_name,
            link_address:link.link_address,
            sort:link.sort
        });
        return linkInstance.save();
    },
    deleteLinks(linkId){
        return DataBaseModel.Links.find({
            where:{link_id:linkId}
        }).then((link)=>{
            return link.destroy();
        })
    },
    editLink(link){
        return DataBaseModel.Links.update(link,{
            where:{link_id:link.link_id}
        }).then(()=>link)
    }
};

module.exports = LinkController;