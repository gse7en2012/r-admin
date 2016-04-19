/**
 * Created by zhuzhipeng on 16/3/12.
 */
/**
 * Created by zhuzhipeng on 15/7/23.
 */
'use strict';

const Seq      = require('sequelize');
const DBConfig = require('../comm/config').DBConfig;

let mysqlConn = new Seq(DBConfig.tableName, DBConfig.user, DBConfig.password, {
    host: DBConfig.host,
    port: DBConfig.port,
    dialect: 'mysql',
    logging: false&&console.log,
    omitNull: true,
    maxConcurrentQueries: 150,
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin'
    },
    pool: {maxConnections: 150, maxIdleTime: 300}
});


const Activity   = mysqlConn.import(__dirname + '/Activity');
const Links      = mysqlConn.import(__dirname + '/Links');
const Logs       = mysqlConn.import(__dirname + '/Logs');
const LoginLogs  = mysqlConn.import(__dirname + '/LoginLogs');
const News       = mysqlConn.import(__dirname + '/News');
const NewsAct    = mysqlConn.import(__dirname + '/NewsAct');
const Strategy   = mysqlConn.import(__dirname + '/Strategy');
const Users      = mysqlConn.import(__dirname + '/Users');
const Channel    = mysqlConn.import(__dirname + '/Channel');
const ChannelArt = mysqlConn.import(__dirname + '/ChannelArt');

ChannelArt.belongsTo(Channel, {foreignKey: 'channel_id', targetKey: 'channel_id'});
//Comments.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
//UserMessage.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
//ShareLog.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
//ShareLog.belongsTo(WxArt, {foreignKey: 'art_id', targetKey: 'art_id'});

exports.Activity   = Activity;
exports.Links      = Links;
exports.Logs       = Logs;
exports.LoginLogs  = LoginLogs;
exports.News       = News;
exports.NewsAct    = NewsAct;
exports.Strategy   = Strategy;
exports.Users      = Users;
exports.Channel    = Channel;
exports.ChannelArt = ChannelArt;
exports.Mysql      = mysqlConn;
