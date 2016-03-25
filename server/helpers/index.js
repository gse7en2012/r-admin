/**
 * Created by zhuzhipeng on 15/12/25.
 */
'use strict';

const cryptoUtils   = require('popularcrypto');
const _             = require('underscore');
const apiVersion    = require('../config').apiVersion;
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
    log(){
        const log = console.log;
        if (process.env.NODE_ENV === 'dev') {
            log.apply(console, arguments);
        }
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
    checkRequest(req, opts) {
        //opts 是数组
        if (!req.header('CAppVersion') || !req.header('CSecret') || !req.header('CAnswer')) {
            return (req.header('User-Agent') && req.header('User-Agent').indexOf('Mac OS X') !== -1);
        }
        const CAppVersion  = req.header('CAppVersion');
        const ClientType   = req.header('ClientType');
        const CChannelName = req.header('CChannelName');
        const CTime        = req.header('CSecret');
        const CAnswer      = req.header('CAnswer');
        let result         = saltV2 + CAppVersion + ClientType + CChannelName + CTime;
        if (opts && opts.length > 0) {
            opts.sort();
            for (const item of opts) {
                if (req.body[item]) {
                    result += req.body[item];
                }
            }
        }
        result = cryptoUtils.md5(result);
        return result === CAnswer;
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
