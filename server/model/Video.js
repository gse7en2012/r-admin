/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('video', {
        video_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        title: {type: DataType.TEXT},
        author: {type: DataType.TEXT},
        link: {type: DataType.TEXT},
        sort:{type:DataType.INTEGER},
        is_show:{type:DataType.INTEGER,defaultValue:1}
    }, {
        timestamps: true,
        comment: '视频'
    });
};