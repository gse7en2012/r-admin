/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('channel', {
        channel_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        channel_name: {type: DataType.TEXT}
    }, {
        timestamps: true,
        comment: '游戏资料栏目'
    });
};
