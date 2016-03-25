/**
 * Created by zhuzhipeng on 16/3/10.
 */
'use strict';

const apiVersion = '/api/v1';
const config = {
    passwordSalt:'radmin',
    apiVersion: apiVersion,
    defaultCoins: 1000,
    expList: [50, 250, 800, 1800, 4800, 9000, 19000, 49000, 100000],
    expDesc: ['投资小散', '股市菜鸟', '专业股民', '草根牛人', '投资顾问', '基金经理', '私募大神', '商业大腕', '资本奇才', '股海传奇'],
    checkInAward: [100, 200, 300, 400, 500]
};

module.exports = config;
