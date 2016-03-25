/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express     = require('express');
const indexRouter = new express.Router();
const path        = require('path');
const fs          = require('fs');
const Helpers     = require('../../helpers');

indexRouter.get('/', (req, res)=> {
    if (!Helpers.validToken(req.cookies['radmin_token'])) {
        return res.sendFile(path.resolve('client/dist/login.html'));
    }
    res.sendFile(path.resolve('client/dist/index.html'));
});


module.exports = indexRouter;