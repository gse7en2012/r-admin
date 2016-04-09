/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('strategy', {
        strategy_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        date: {type: DataType.DATE},
        title: {type: DataType.TEXT},
        author: {type: DataType.TEXT},
        content: {type: DataType.TEXT},
        uid:{type:DataType.INTEGER},
        s_link:{type: DataType.TEXT},
        custom_link:{type:DataType.TEXT}
    }, {
        timestamps: true,
        comment: '攻略'
    });
};