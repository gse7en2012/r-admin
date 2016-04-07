/**
 * Created by zhuzhipeng on 15/12/25.
 */
'use strict';
const cryptoUtils   = require('popularcrypto');
const _             = require('underscore');
const apiVersion    = require('../config').apiVersion;
const DataBaseModel=require('../model');
const saltV2        = 'GSEVEN';
const keySalt       = 'radmin';

const encryptConfig = {
    encryptRoute: [
        apiVersion + '/account/reg',
        apiVersion + '/account/login/phone',
        apiVersion + '/account/login/token',
        apiVersion + '/account/reset'
    ],
    encryptOpts: [
        ['udid', 'phone', 'pwd', 'country_code'],
        ['udid', 'phone', 'pwd', 'country_code'],
        ['udid'],
        ['udid', 'phone', 'pwd', 'country_code']
    ]
};

const globalHelpers = {
    logAction(uid,ctx){
        const log=DataBaseModel.Logs.build({
            logs_uid:uid,
            logs_ctx:ctx,
            datetime:new Date()
        });
        return log.save();
    },
    resSuccess(res, r, code){
        return res.status(code || 200).json({
            result: r || 'success'
        });
    },
    resFailure(res, e, code){
        return res.status(code || 400).json({
            msg: e || 'fail'
        });
    },
    checkRequest(req) {
        const uri        = req.originalUrl;
        if(uri.indexOf('/login')) return true;
        return !!(req.header('radmin_token') || req.cookies['radmin_token']);

    },
    buildToken(uid){
        const timeSalt = (new Date()).valueOf();
        const token    = cryptoUtils.md5(keySalt + uid + timeSalt);
        return token + '|' + uid + '|' + timeSalt;
    },
    validToken(cToken){
        if (!cToken) return null;
        try {
            const authTokenOrigin = cToken.split('|');
            const token           = authTokenOrigin[0];
            const uid             = authTokenOrigin[1];
            const timeSalt        = authTokenOrigin[2];
            if (cryptoUtils.md5(keySalt + uid + timeSalt) === token) {
                return uid;
            }
            return null;
        } catch (e) {
            return null;
        }
    },
    interceptor(req, res, next){

        if(!globalHelpers.checkRequest(req)){
            return globalHelpers.resFailure(res, '请先登录！');
        }

        const uri        = req.originalUrl;
        if(uri.indexOf('/delete')!=-1){
            globalHelpers.logAction(req.adminUid,uri+'|'+JSON.stringify(req.params))
        }
        //不是开发环境，则校验请求头
        //const uri        = req.originalUrl;
        //const checkIndex = encryptConfig.encryptRoute.indexOf(uri);
        //if (checkIndex !== -1) {
        //    if (!globalHelpers.checkRequest(req, encryptConfig.encryptOpts[checkIndex])) {
        //        return globalHelpers.resFailure(res, '客户端请求合法性校验失败！');
        //    }
        //} else {
        //    if (!globalHelpers.checkRequest(req)) {
        //        return globalHelpers.resFailure(res, '客户端请求合法性校验失败！');
        //    }
        //}
        //console.log(process.env['NODE_ENV'], uri, checkIndex);
        //不是开发环境，则校验token 而且 不在account接口里面
        if (process.env.NODE_ENV !== 'dev') {
            const token = req.header('radmin_token') || req.cookies['radmin_token'];
            //if (!token && checkIndex === -1) {
            //    return globalHelpers.resFailure(res, 'token校验失败！');
            //}
            req.adminUid = globalHelpers.validToken(token);
        } else {
            //如果不校验token，随机返回uid
            req.adminUid = 1 || _.random(1, 100000);
        }
        next();
    }
};
//console.log(globalHelpers.validToken('79f2bd961379aab37418996d4fa6adb1|48|1446795184841'));
module.exports = globalHelpers;
