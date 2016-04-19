/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const DataBaseModel = require('../../model');
const Config        = require('../../config');
const _             = require('underscore');
const cryptoUtils   = require('popularcrypto');
const globalHelpers = require('../../helpers');
const moment        = require('moment');

const AuthController = {
    generateAdminUser(username, password,permissions){
        const originPassword = password || cryptoUtils.randomString(8);
        return DataBaseModel.Users.findOrCreate({
            where: {name: username},
            defaults: {
                name: username,
                password: cryptoUtils.md5(originPassword + Config.passwordSalt),
                permissions:permissions||0
            }
        }).then(()=> {
            return {
                name: username,
                password: originPassword
            }
        });
    },
    loginAdminUser(username, password,ip){
        if (!username || !password) return Promise.reject('参数不完整');
        return DataBaseModel.Users.find({
            where: {
                name: username,
                password: cryptoUtils.md5(password + Config.passwordSalt)
            }
        }).then((user)=> {
            if (!user) return Promise.reject('用户名或密码错误');
            if (user.is_ban == 1) return Promise.reject('账户已被禁用');
            user.login_time = new Date();
            user.save();
            const loginLog=DataBaseModel.LoginLogs.build({
                login_time:new Date(),
                login_uid: user.uid,
                login_ip: ip
            });
            loginLog.save();
            return {
                name: user.name,
                uid: user.uid
            }
        })
    },
    updateAdminUserPassword(uid, newPassword){
        if (!uid || !newPassword) return Promise.reject('参数不完整');
        return DataBaseModel.Users.find({
            where: {uid: uid}
        }).then((user)=> {
            if (!user) return Promise.reject('不存在该用户');
            user.password = cryptoUtils.md5(newPassword + Config.passwordSalt);
            user.save();
            return {
                name: user.name,
                uid: user.uid,
                password: newPassword
            }
        })
    },
    getUserList(){
        return DataBaseModel.Users.findAll({
            attributes: ['uid', 'name', 'login_time', 'permissions', 'is_ban', 'createdAt']
        }).then((users)=> {
            users.forEach((item)=> {
                item.dataValues.login_time = moment(item.dataValues.login_time).format('YYYY-MM-DD HH:mm:ss');
                item.dataValues.createdAt  = moment(item.dataValues.createdAt).format('YYYY-MM-DD HH:mm:ss')
            });
            return users;
        })
    },
    checkIsMaster(uid){
        return DataBaseModel.Users.find({
            where: {uid: uid},
            attributes: ['permissions']
        }).then((r)=> {
            return r ? 1 : 0
        })
    },
    banAccount(uid, type){
        return DataBaseModel.Users.find({
            where: {uid: uid}
        }).then((user)=> {
            if (user) {
                user.is_ban = Number(type);
                user.save();
            }
            return type;
        })
    }
};

module.exports = AuthController;

//AuthController.generateAdminUser('gseven2').then((r)=>{console.log(r);});
//AuthController.loginAdminUser('gseven2', 'O7I3CwuL').then((r)=> {console.log(r);});