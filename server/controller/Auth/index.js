/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const DataBaseModel = require('../../model');
const Config        = require('../../config');
const _             = require('underscore');
const cryptoUtils   = require('popularcrypto');
const globalHelpers = require('../../helpers');

const AuthController = {
    generateAdminUser(username, password){
        const originPassword = password || cryptoUtils.randomString(8);
        return DataBaseModel.Users.findOrCreate({
            where: {name: username},
            defaults: {
                name: username,
                password: cryptoUtils.md5(originPassword + Config.passwordSalt)
            }
        }).then(()=> {
            return {
                name: username,
                password: originPassword
            }
        });
    },
    loginAdminUser(username, password){
        if (!username || !password) return Promise.reject('参数不完整');
        return DataBaseModel.Users.find({
            where: {
                name: username,
                password: cryptoUtils.md5(password + Config.passwordSalt)
            }
        }).then((user)=> {
            if (!user) return Promise.reject('用户名或密码错误')
            user.login_time = new Date();
            user.save();
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
    }
};


module.exports = AuthController;

//AuthController.generateAdminUser('gseven2').then((r)=>{console.log(r);});
//AuthController.loginAdminUser('gseven2', 'O7I3CwuL').then((r)=> {console.log(r);});