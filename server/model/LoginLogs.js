/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('login_logs', {
        login_pid: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        login_time: {type: DataType.DATE},
        login_uid: {type: DataType.INTEGER},
        login_ip: {type: DataType.TEXT}

    }, {
        timestamps: false,
        comment: '登录日志'
    });
};