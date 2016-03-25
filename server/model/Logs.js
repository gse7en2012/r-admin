/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('logs', {
        logs_id: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        datetime: {type: DataType.DATE},
        logs_uid: {type: DataType.INTEGER},
        logs_ctx: {type: DataType.TEXT}

    }, {
        timestamps: false,
        comment: '日志'
    });
};