/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

const fs = require('fs');
const mu = require('mu2'); // notice the "2" which matches the npm repo, sorry..
const Controller = require('../../controller');
const moment     = require('moment');
const config     = {
    rootDir: './output/templates',
    outputDir: './output'
};

mu.root = config.rootDir;

const StaticizeController = {
    compileNews(){
        return Controller.News.getNewsList(1, 4).then((result)=> {
            const dataInfo = {news: result.dataList};
            let s;
            mu.compileAndRender('news.mustache', dataInfo).pipe(
                s=fs.createWriteStream(config.outputDir + '/views/news.html')
            );
            s.on('finish',()=>{
                console.log('news render end!');
            });
        })
    },
    compileActivity(){
        return Controller.Activity.getActivityList(1, 5, true).then((result)=> {
            const dataInfo = {activitys: result.dataList};
            mu.compileAndRender('carousel.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/carousel.html')
            );
        })
    },
    compileStrategy(){
        return Controller.Strategy.getStrategyList(1, 8).then((result)=> {
            const dataInfo = {strategy: result.dataList};
            mu.compileAndRender('strategy.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/strategy.html')
            );
        })
    },
    compileLinks(){
        return Controller.Links.getLinksList(1, 10).then((result)=> {
            const dataInfo = {links: result.dataList};
            mu.compileAndRender('links.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/links.html')
            );
        })
    },
    compileInfo(){
        return Controller.Channel.getChannelInfoList().then((result)=> {
            const dataInfo = {links: result};
            console.log(dataInfo);
            mu.compileAndRender('info.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/info.html')
            );
        })
    },
    compileIndex(){
        console.log('index render');
        mu.compileAndRender('index.mustache').pipe(
            fs.createWriteStream(config.outputDir + '/index.html')
        );
    },



    compileInsidePage(column, name, dataInfo){

        dataInfo.resLocation='http://www.game.com/';

        const year  = moment().format('YY'),
              month = moment().format('MM'),
              day   = moment().format('DD');

        const colDir   = `${config.outputDir}/${column}`;
        const yearDir  = `${colDir}/${year}`;
        const monthDir = `${yearDir}/${month}`;
        const dayDir   = `${monthDir}/${day}`;


        if (!fs.existsSync(colDir)) fs.mkdirSync(colDir);
        if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);
        if (!fs.existsSync(monthDir)) fs.mkdirSync(monthDir);
        if (!fs.existsSync(dayDir)) fs.mkdirSync(dayDir);

        mu.compileAndRender('page.mustache', dataInfo).pipe(
            fs.createWriteStream(`${dayDir}/${name}.html`)
        );
        return Promise.resolve(`${dayDir}/${name}.html`.replace(config.outputDir,''));
    }
};

//StaticizeController.compileIndex();


module.exports = StaticizeController;