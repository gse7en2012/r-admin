/**
 * Created by zhuzhipeng on 16/3/10.
 */
'use strict';

const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const compression  = require('compression');
const multer       = require('multer');
const routes       = require('./routes');
const interceptor  = require('./helpers').interceptor;

function uploadMake(dirName) {
    const opts = multer.diskStorage({
        "destination": (req, file, cb)=> {cb(null, 'output/images/' + dirName)},
        "filename": (req, file, cb)=> {
            cb(null, dirName + '_' + Date.now() + '.' + file.originalname.split('.').reverse()[0])
        }
    });
    return multer({storage: opts});
}
function uploadVideoS(name) {
    const opts = multer.diskStorage({
        "destination": (req, file, cb)=> {cb(null, 'output/video')},
        "filename": (req, file, cb)=> {
            cb(null, name + '_' + Date.now() + '.' + file.originalname.split('.').reverse()[0])
        }
    });
    return multer({storage: opts});
}

function uploadImgRes(req, res, key) {
    res.status(200).type('html').send({
        "state": "SUCCESS",
        "url": 'images/' + key + "/" + req.file.filename,
        "name": req.file.filename,
        "originalName": req.file.originalname,
        "size": req.file.size,
        "type": '.' + req.file.filename.split('.').reverse()[0]
    });
}
function uploadVideoRes(req, res, key) {
    res.status(200).type('html').send({
        "state": "SUCCESS",
        "url":  key + "/" + req.file.filename,
        "name": req.file.filename,
        "originalName": req.file.originalname,
        "size": req.file.size,
        "type": '.' + req.file.filename.split('.').reverse()[0]
    });
}


const upload         = uploadMake('images');
const uploadActivity = uploadMake('activity');
const uploadLinks    = uploadMake('links');
const uploadInfo     = uploadMake('info');
const uploadNews     = uploadMake('news');
const uploadVideo    = uploadVideoS('video');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/m', routes.Mobile);

app.all('*', interceptor);

app.use('/', routes.Inits);
app.use('/auth', routes.Auth);
app.use('/news', routes.News);
app.use('/news_act', routes.NewsAct);
app.use('/strategy', routes.Strategy);
app.use('/activity', routes.Activity);
app.use('/video', routes.Video);
app.use('/links', routes.Links);
app.use('/info', routes.Info);
app.use('/logs', routes.Logs);


//for umeditor
app.post('/upload', upload.single('upfile'), (req, res)=> uploadImgRes(req, res, 'images'));
app.post('/upload/activity', uploadActivity.single('file'), (req, res)=> uploadImgRes(req, res, 'activity'));
app.post('/upload/links', uploadLinks.single('file'), (req, res)=> uploadImgRes(req, res, 'links'));
app.post('/upload/info', uploadInfo.single('file'), (req, res)=> uploadImgRes(req, res, 'info'));
app.post('/upload/news', uploadNews.single('file'), (req, res)=> uploadImgRes(req, res, 'news'));
app.post('/upload/video',uploadVideo.single('video'),(req,res)=>uploadVideoRes(req, res, '/video'));

app.use(express.static(path.resolve('client/dist/')));
app.use(express.static(path.resolve('server/upload/')));
app.use(express.static(path.resolve('output/')));
// catch 404 and forward to error handler
app.use((req, res, next)=> {
    const err  = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// production error handler
// no stacktraces leaked to user
app.use((err, req, res)=> {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
