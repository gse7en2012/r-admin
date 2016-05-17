/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

const fs         = require('fs');
const mu         = require('mu2');
const Controller = require('../../controller');
const moment     = require('moment');
const config     = require('../config').outputConfig;


mu.root = config.rootDir;

function mkdirRecursive(filename) {
    const dirList  = filename.split('/');
    let dirNameStr = config.outputDir;
    dirList.pop();
    dirList.shift();
    dirList.forEach((item)=> {
        dirNameStr = dirNameStr + '/' + item;
        if (!fs.existsSync(dirNameStr)) fs.mkdirSync(dirNameStr);
    });
}

const StaticizeController = {
    compileNews(){
        return Controller.News.getNewsList(1, 4).then((result)=> {
            const dataInfo       = {news: result.dataList};
            dataInfo.resLocation = config.resLocation;
            let s;
            mu.compileAndRender('news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/news.html')
            );
            s.on('finish', ()=> {
                console.log('news render end!');
            });
            StaticizeController.compileNewsForMobile();
        })
    },

    compileNewsForMobile(){
        return Controller.News.getNewsList(1, 11).then((result)=> {

            result.dataList.forEach(function (item) {
                if (item.s_link && item.s_link.indexOf('http') == -1 && item.s_link.indexOf('.html') != -1) {
                    item.s_link = item.s_link.replace('.html', '_m.html')
                }
            });

            const recommend = result.dataList.shift();
            const dataInfo  = {
                recommend: recommend,
                news: result.dataList
            };
            let s;
            mu.compileAndRender('mobile_news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/mobile_news.html')
            );
            s.on('finish', ()=> {
                console.log('mobile news render end!');
            });
        })
    },


    compileActivity(){
        return Controller.NewsAct.getNewsList(1, 4).then((result)=> {
            const dataInfo       = {news: result.dataList};
            dataInfo.resLocation = config.resLocation;
            let s;
            mu.compileAndRender('news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/activity.html')
            );
            s.on('finish', ()=> {
                console.log('activity render end!');
            });
        })
    },
    compileActivityForMobile(){
        return Controller.NewsAct.getNewsList(1, 11).then((result)=> {

            result.dataList.forEach(function (item) {
                if (item.s_link && item.s_link.indexOf('http') == -1 && item.s_link.indexOf('.html') != -1) {
                    item.s_link = item.s_link.replace('.html', '_m.html')
                }
            });

            const recommend = result.dataList.shift();
            const dataInfo  = {
                recommend: recommend,
                news: result.dataList
            };
            let s;
            mu.compileAndRender('mobile_news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/mobile_activity.html')
            );
            s.on('finish', ()=> {
                console.log('mobile mobile_activity render end!');
            });
        })
    },



    compileCarousel(){
        return Controller.Activity.getActivityList(1, 5, true).then((result)=> {
            const dataInfo       = {activitys: result.dataList};
            dataInfo.resLocation = config.resLocation;
            mu.compileAndRender('carousel.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/carousel.html')
            );
        })
    },
    compileStrategy(){
        return Controller.Strategy.getStrategyList(1, 8).then((result)=> {
            const dataInfo       = {strategy: result.dataList};
            dataInfo.resLocation = config.resLocation;
            mu.compileAndRender('strategy.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/strategy.html')
            );
        })
    },
    compileStrategyForMobile(){
        return Controller.Strategy.getStrategyList(1, 11).then((result)=> {

            result.dataList.forEach(function (item) {
                if (item.s_link && item.s_link.indexOf('http') == -1 && item.s_link.indexOf('.html') != -1) {
                    item.s_link = item.s_link.replace('.html', '_m.html')
                }
            });

            const recommend = result.dataList.shift();
            const dataInfo  = {
                recommend: recommend,
                news: result.dataList
            };
            let s;
            mu.compileAndRender('mobile_news.mustache', dataInfo).pipe(
                s = fs.createWriteStream(config.outputDir + '/views/mobile_strategy.html')
            );
            s.on('finish', ()=> {
                console.log('mobile strategy render end!');
            });
        })
    },


    compileLinks(){
        return Controller.Links.getLinksList(1, 10).then((result)=> {
            const dataInfo       = {links: result.dataList};
            dataInfo.resLocation = config.resLocation;
            mu.compileAndRender('links.mustache', dataInfo).pipe(
                fs.createWriteStream(config.outputDir + '/views/links.html')
            );
        })
    },
    compileInfo(){
        return Controller.Channel.getChannelInfoList().then((result)=> {
            const dataInfo       = {links: result};
            dataInfo.resLocation = config.resLocation;
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
        mu.compileAndRender('mobile.mustache').pipe(
            fs.createWriteStream(config.outputDir + '/mobile/index.html')
        );
    },
    compileNewsList(dataInfo, page){
        let filename         = '/news/index.html';
        dataInfo.resLocation = config.resLocation;
        if (page > 1) {
            filename = '/news/index_' + page + '.html';
        }
        mkdirRecursive(filename);
        mu.compileAndRender('news_list.mustache', dataInfo).pipe(
            fs.createWriteStream(config.outputDir + filename)
        );
    },
    compileActivityList(dataInfo, page){
        let filename         = '/activity/index.html';
        dataInfo.resLocation = config.resLocation;
        if (page > 1) {
            filename = '/activity/index_' + page + '.html';
        }
        mkdirRecursive(filename);
        mu.compileAndRender('activity_list.mustache', dataInfo).pipe(
            fs.createWriteStream(config.outputDir + filename)
        );
    },
    compileStrategyList(dataInfo, page){
        let filename         = '/strategy/index.html';
        dataInfo.resLocation = config.resLocation;
        if (page > 1) {
            filename = '/strategy/index_' + page + '.html';
        }
        mkdirRecursive(filename);
        mu.compileAndRender('strategy_list.mustache', dataInfo).pipe(
            fs.createWriteStream(config.outputDir + filename)
        );
    },

    compileInsidePage(column, name, dataInfo){
        //console.log(dataInfo);
        let dateFormatDir;
        const isSlink = dataInfo.s_link;

        dataInfo.resLocation = config.resLocation;


        if (!isSlink) {
            const year  = moment().format('YY'),
                  month = moment().format('MM'),
                  day   = moment().format('DD');

            const colDir   = `${config.outputDir}/${column}`;
            const yearDir  = `${colDir}/${year}`;
            const monthDir = `${yearDir}/${month}`;
            const dayDir   = `${monthDir}/${day}`;
            dateFormatDir  = dayDir;
            if (!fs.existsSync(colDir)) fs.mkdirSync(colDir);
            if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);
            if (!fs.existsSync(monthDir)) fs.mkdirSync(monthDir);
            if (!fs.existsSync(dayDir)) fs.mkdirSync(dayDir);
        } else {
            mkdirRecursive(dataInfo.s_link);
        }
        const filename = dataInfo.s_link ? (config.outputDir + dataInfo.s_link) : `${dateFormatDir}/${name}.html`;

        mu.compileAndRender('page.mustache', dataInfo).pipe(
            fs.createWriteStream(filename)
        );
        //for mobile
        mu.compileAndRender('mobile_page.mustache', dataInfo).pipe(
            fs.createWriteStream(filename.replace('.html', '_m.html'))
        );

        return Promise.resolve(filename.replace(config.outputDir, ''));
    },
    deleteFile(filename){
        fs.unlink(config.outputDir + filename, function () {
            console.log(filename, 'deleted!');
        })
    },
    compileAllSite(){

        StaticizeController.compileActivity();
        StaticizeController.compileActivityForMobile();
        StaticizeController.compileNews();
        StaticizeController.compileNewsForMobile();
        StaticizeController.compileCarousel();
        StaticizeController.compileInfo();
        StaticizeController.compileStrategy();
        StaticizeController.compileStrategyForMobile();
        StaticizeController.compileLinks();


        Controller.News.generateAllNewsStaticPage();
        Controller.NewsAct.generateAllNewsActStaticPage();
        Controller.Strategy.generateAllStrategyStaticPage();
        Controller.Channel.generateAllInfoStaticPage();

        setTimeout(()=> {
            StaticizeController.compileIndex();
        }, 5000);

        return Promise.resolve('all  site render ok!')
    }
};

//StaticizeController.compileIndex();


module.exports = StaticizeController;