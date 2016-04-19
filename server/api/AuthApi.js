/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');
const Staticize = require('../comm/Staticize');
const fs         = require('fs');
const path=require('path');

const AuthApi = {
    loginAdminUserIF(req, res){
        const username = req.body.username;
        const password = req.body.password;
        const ip=req.ip;
        return Controller.Auth.loginAdminUser(username, password,ip)
            .then((r)=> {
                const token = Helpers.buildToken(r.uid);
                res.cookie('radmin_token', token, {maxAge: 1000 * 60 * 60 * 2, httpOnly: true});
                res.cookie('radmin_name', JSON.stringify(r.name), {maxAge: 1000 * 60 * 60 * 2});
                res.cookie('radmin_id', JSON.stringify(r.uid), {maxAge: 1000 * 60 * 60 * 2});
                res.status(200).json({
                    code: 200,
                    redirectUrl: '/'
                })
            })
            .catch((e)=> {
                res.status(200).json({
                    code: 400,
                    message: e
                })
            })
    },
    logoutIF(req,res){
        res.clearCookie('radmin_token');
        res.clearCookie('radmin_name');
        res.clearCookie('radmin_id');
        res.redirect('/');
    },
    refreshIF(req,res){
        Staticize.compileIndex();
        res.send(200);
    },
    refreshAllIF(req,res){
        Staticize.compileAllSite();
        res.send(200);
    },
    generateAdminUserIF(req,res){
        const username = req.body.username;
        const password = req.body.password;
        const permissions=req.body.permissions;
        return Controller.Auth.generateAdminUser(username,password,permissions).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    checkMasterIF(req, res){
        const uid = req.query.uid;
        return Controller.Auth.checkIsMaster(uid).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getUsersListIF(req,res){
        return Controller.Auth.getUserList().then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    banAccountIF(req,res){
        const uid=req.body.uid;
        const type=req.body.type;
        return Controller.Auth.banAccount(uid,type).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    updateAccountPasswordIF(req,res){
        const uid=req.body.uid;
        const newPassword=req.body.password;
        return Controller.Auth.updateAdminUserPassword(uid, newPassword).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = AuthApi;

