/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('users', {
        uid: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        name: {type: DataType.TEXT},
        password: {type: DataType.TEXT},
        login_time: {type: DataType.DATE},
        permissions: {type: DataType.TEXT},
        is_ban: {type: DataType.INTEGER}
    }, {
        timestamps: true,
        comment: '用户表'
    });
};
