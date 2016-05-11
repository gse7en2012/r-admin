/**
 * Created by zhuzhipeng on 16/3/12.
 */
const moment        = require('moment');
const DataBaseModel = require('../../model');

function formatLoginList(data,page){
    const r = [], defaultCount = data.length;
    data.rows.forEach((item)=> {
        r.push({
            login_time:moment(item.login_time).format('YYYY-MM-DD HH:mm:ss'),
            login_uid:item.login_uid,
            login_ip:item.login_ip,
            login_pid:item.login_pid
        })
    });
    return {
        totalCount: data.count || defaultCount,
        dataList: r,
        curPage:page
    };
}
function formatLogsList(data,page){
    const r = [], defaultCount = data.length;
    data.rows.forEach((item)=> {
        r.push({
            datetime:moment(item.datetime).format('YYYY-MM-DD HH:mm:ss'),
            logs_ctx:item.logs_ctx,
            logs_id:item.logs_id,
            logs_uid:item.logs_uid
        })
    });
    return {
        totalCount: data.count || defaultCount,
        dataList: r,
        curPage:page
    };
}




const LogsController = {
    getLoginLogsList(page){
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 50;
        return DataBaseModel.LoginLogs.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'login_pid DESC'
        }).then((data)=>{
            return formatLoginList(data,page)
        })
    },
    getOpLogsList(page){
        const dPage    = page < 1 ? 1 : Number(page);
        const pageSize = 50;
        return DataBaseModel.Logs.findAndCountAll({
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'logs_id DESC'
        }).then((data)=>{
            return formatLogsList(data,page)
        })
    }
};



module.exports = LogsController;