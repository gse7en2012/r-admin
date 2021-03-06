/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('news', {
        news_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        date: {type: DataType.DATE},
        title: {type: DataType.TEXT},
        author: {type: DataType.TEXT},
        content: {type: DataType.TEXT},
        uid:{type:DataType.INTEGER},
        s_link:{type: DataType.TEXT,comment:'静态路径'},
        custom_link:{type: DataType.TEXT,comment:'自定义静态路径'},
        cover:{type:DataType.TEXT,comment:'封面图片'}
    }, {
        timestamps: true,
        comment: '新闻'
    });
};