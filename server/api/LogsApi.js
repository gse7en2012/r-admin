/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const LogsApi = {
    getLoginLogsListIF(req, res){
        const page = req.query.page || 1;
        return Controller.Logs.getLoginLogsList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getOpLogsListIF(req, res){
        const page = req.query.page || 1;
        return Controller.Logs.getOpLogsList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = LogsApi;