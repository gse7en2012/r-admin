/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const codeRouter = new express.Router();
const api        = require('../../api');

codeRouter.get('/status', api.CodeApi.getCodeInfoIF);

codeRouter.post('/upload', api.CodeApi.uploadCodeTxtIF);

codeRouter.get('/config',api.CodeApi.getCodeBtnTextIF);



module.exports = codeRouter;