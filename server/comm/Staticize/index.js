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
    outputDir: './output',
    resLocation:'http://www.game.com'
};

mu.root = config.rootDir;

const StaticizeController = {
    compileNews(){
        return Controller.News.getNewsList(1, 4).then((result)=> {
            const dataInfo = {news: result.dataList};
            dataInfo.resLocation=config.resLocation;
            let s;
            mu.compileAndRender('news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/news.html')
            );
            s.on('finish', ()=> {
                console.log('news render end!');
            });
        })
    },
    compileActivity(){
        return Controller.NewsAct.getNewsList(1, 4).then((result)=> {
            const dataInfo = {news: result.dataList};
            dataInfo.resLocation=config.resLocation;
            let s;
            mu.compileAndRender('news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/activity.html')
            );
            s.on('finish', ()=> {
                console.log('activity render end!');
            });
        })
    },
    compileCarousel(){
        return Controller.Activity.getActivityList(1, 5, true).then((result)=> {
            const dataInfo = {activitys: result.dataList};
            dataInfo.resLocation=config.resLocation;
            mu.compileAndRender('carousel.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/carousel.html')
            );
        })
    },
    compileStrategy(){
        return Controller.Strategy.getStrategyList(1, 8).then((result)=> {
            const dataInfo = {strategy: result.dataList};
            dataInfo.resLocation=config.resLocation;
            mu.compileAndRender('strategy.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/strategy.html')
            );
        })
    },
    compileLinks(){
        return Controller.Links.getLinksList(1, 10).then((result)=> {
            const dataInfo = {links: result.dataList};
            dataInfo.resLocation=config.resLocation;
            mu.compileAndRender('links.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/links.html')
            );
        })
    },
    compileInfo(){
        return Controller.Channel.getChannelInfoList().then((result)=> {
            const dataInfo = {links: result};
            dataInfo.resLocation=config.resLocation;
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
    compileNewsList(dataInfo,page){
        let filename='/news/index.html';
        dataInfo.resLocation=config.resLocation;
        if(page>1){
            filename='/news/index_'+page+'.html';
        }

        mu.compileAndRender('news_list.mustache',dataInfo).pipe(
            fs.createWriteStream(config.outputDir +filename )
        );
    },
    compileActivityList(dataInfo,page){
        let filename='/activity/index.html';
        dataInfo.resLocation=config.resLocation;
        if(page>1){
            filename='/activity/index_'+page+'.html';
        }

        mu.compileAndRender('activity_list.mustache',dataInfo).pipe(
            fs.createWriteStream(config.outputDir +filename )
        );
    },
    compileStrategyList(dataInfo,page){
        let filename='/strategy/index.html';
        dataInfo.resLocation=config.resLocation;
        if(page>1){
            filename='/strategy/index_'+page+'.html';
        }

        mu.compileAndRender('strategy_list.mustache',dataInfo).pipe(
            fs.createWriteStream(config.outputDir +filename )
        );
    },

    compileInsidePage(column, name, dataInfo){
        console.log(dataInfo);
        dataInfo.resLocation=config.resLocation;
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

        const filename = dataInfo.s_link ? (config.outputDir + dataInfo.s_link) : `${dayDir}/${name}.html`;
        mu.compileAndRender('page.mustache', dataInfo).pipe(
            fs.createWriteStream(filename)
        );
        return Promise.resolve(`${dayDir}/${name}.html`.replace(config.outputDir, ''));
    },
    deleteFile(filename){
        fs.unlink(config.outputDir+filename,function(){
            console.log(filename,'deleted!');
        })
    }
};

StaticizeController.deleteFile('/strategy/16/04/09/8.html');


module.exports = StaticizeController;