/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('links', {
        link_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        link_img: {type: DataType.TEXT},
        link_name: {type: DataType.TEXT},
        link_address: {type: DataType.TEXT},
        author: {type: DataType.TEXT},
        sort:{type:DataType.INTEGER}
    }, {
        timestamps: true,
        comment: '友情链接'
    });
};
