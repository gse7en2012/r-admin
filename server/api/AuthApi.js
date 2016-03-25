/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');
const fs         = require('fs');

const AuthApi = {
    loginAdminUserIF(req, res){
        const username = req.body.username;
        const password = req.body.password;
        return Controller.Auth.loginAdminUser(username, password)
            .then((r)=> {
                const token = Helpers.buildToken(r.uid);
                res.cookie('radmin_token', token, {maxAge: 1000 * 60 * 60 * 2, httpOnly: true});
                res.cookie('radmin_name', JSON.stringify(r.name), {maxAge: 1000 * 60 * 60 * 2});
                res.status(200).json({
                    code:200,
                    redirectUrl:'/'
                })
            })
            .catch((e)=>{
                res.status(200).json({
                    code:400,
                    message:e
                })
            })
    }
};

module.exports = AuthApi;

