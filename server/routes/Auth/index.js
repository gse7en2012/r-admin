/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

const express = require('express');
const authRouter  = new express.Router();
const api     = require('../../api');

authRouter.post('/login', api.AuthApi.loginAdminUserIF);

authRouter.get('/logout', api.AuthApi.logoutIF);

authRouter.get('/refresh',api.AuthApi.refreshIF);

authRouter.get('/check/master',api.AuthApi.checkMasterIF);

authRouter.get('/user/list',api.AuthApi.getUsersListIF);

authRouter.post('/user/ban',api.AuthApi.banAccountIF);

authRouter.post('/user/add',api.AuthApi.generateAdminUserIF);

authRouter.post('/user/update',api.AuthApi.updateAccountPasswordIF);

authRouter.get('/refresh/all',api.AuthApi.refreshAllIF);

module.exports=authRouter;