/**
 * Created by zhuzhipeng on 16/7/21.
 */

'use strict';

//const xlsx  = require('node-xlsx');
const fs    = require("fs");
const mysql = require('../../model').Mysql;
//const workSheetsFromFile = xlsx.parse(`./server/controller/Excel/test2.xls`);
//
//console.log(JSON.stringify(workSheetsFromFile));

//


const CodeController = {
    getCodeInfo(db){
        db = db || 1;
        return mysql.query(`SELECT count(*) as count,is_used from code${db} where status=1 group by is_used`, {type: 'SELECT'}).then((data)=> {
            const list = data;
            let msg    = '';
            let total  = 0;
            if (list.length > 0) {
                list.forEach((item)=> {
                    if (item.is_used == 1) {
                        msg += ',已被领取' + item.count + '条';
                        total += item.count;
                    }
                    if (item.is_used == 0) {
                        msg += ',未被领取' + item.count + '条';
                        total += item.count;
                    }
                });
                msg = '该数据表邀请码总数共' + total + '条' + msg;
            } else {
                msg = '该数据表还没有数据!'
            }
            return msg;
        })
    },
    getCodeBtnText(){
        return mysql.query(`SELECT * from code_config limit 1`,{type:'SELECT'}).then((data)=>{
            return data[0];
        })
    },

    checkTxtFile(txtFile){
        const data = fs.readFileSync(`./server/upload/${txtFile}`);
        const len  = data.toString().split('\n').length - 1;
        console.log(`该文件符合规则,一共有${len}个邀请码`);
        return Promise.resolve(`该文件符合规则,一共有${len}个邀请码`)
    },
    uploadCodeTxt(db, txtFile,btn1,btn2,btn3){
        db = db || 1;
        //return mysql.query(`update code${db} set status=0`).then(()=>{
        //const data = fs.readFileSync(`./${txtFile}`);
        //const len  = data.toString().split('\n').length;

        if(txtFile) {
            const sql = `load data infile '${__dirname}/../../upload/${txtFile}' replace into table code${db} (code);`;
            console.log(sql);
            return mysql.query(sql).then((r)=> {
                const sql2 = `update code_config set btn1="${btn1}",btn2="${btn2}",btn3="${btn3}" where unkey=1`;
                console.log(sql2);
                const Staticize = require('../../comm/Staticize');
                Staticize.compileCodeBtn(btn1, btn2, btn3);
                return mysql.query(sql2);
            }).catch((e)=> {
                console.log(e);
                return e;
            });
        }else{
            const sql2 = `update code_config set btn1="${btn1}",btn2="${btn2}",btn3="${btn3}" where unkey=1`;
            const Staticize = require('../../comm/Staticize');
            Staticize.compileCodeBtn(btn1, btn2, btn3);
            return mysql.query(sql2).catch((e)=> {
                console.log(e);
                return e;
            });;
        }
        //})
    },
    getCodeList(req, res, key){
        console.log(req.file.filename);
        //const workSheetsFromFile = xlsx.parse(`./server/upload/${req.file.filename}`);
        //console.log(workSheetsFromFile);
        //res.json(workSheetsFromFile);
        const data = fs.readFileSync(`./server/upload/${req.file.filename}`);
        const len  = data.toString().split('\n').length;

        const sql = `load data infile '${__dirname}/../../upload/${req.file.filename}' replace into table code (code);`;
        console.log(sql);
        mysql.query(sql).then((re)=> {
            res.json({
                data: '导入成功!新增了邀请码' + len + '个'
            })
        })
    }
};

//ExcelController.getCodeInfo(2).then((m)=>{console.log(m);});
module.exports = CodeController;