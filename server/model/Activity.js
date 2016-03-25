/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('activity', {
        activity_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        img: {type: DataType.TEXT},
        title: {type: DataType.TEXT},
        author: {type: DataType.TEXT},
        link: {type: DataType.TEXT},
        sort:{type:DataType.INTEGER},
        is_show:{type:DataType.INTEGER,defaultValue:1}
    }, {
        timestamps: true,
        comment: '轮播'
    });
};