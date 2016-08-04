/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const CodeApi = {

    getCodeInfoIF(req,res){
        const db=req.query.db;
        return Controller.Code.getCodeInfo(db).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    uploadCodeTxtIF(req,res){
        const txtFile=req.body.txt_file;
        const db=req.body.db;
        const btn1=req.body.btn1;
        const btn2=req.body.btn2;
        const btn3=req.body.btn3;
        return Controller.Code.uploadCodeTxt(db,txtFile,btn1,btn2,btn3).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getCodeBtnTextIF(req,res){
        return Controller.Code.getCodeBtnText().then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = CodeApi;