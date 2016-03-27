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
        "destination": (req, file, cb)=> {cb(null, 'server/upload/' + dirName)},
        "filename": (req, file, cb)=> {
            cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').reverse()[0])
        }
    });
    return multer({storage: opts});
}
function uploadImgRes(req, res, key) {
    res.status(200).type('html').send({
        "state": "SUCCESS",
        "url": key + "/" + req.file.filename,
        "name": req.file.filename,
        "originalName": req.file.originalname,
        "size": req.file.size,
        "type": '.' + req.file.filename.split('.').reverse()[0]
    });
}


const upload         = uploadMake('images');
const uploadActivity = uploadMake('activity');
const uploadLinks    = uploadMake('links');
const app            = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.all('*', interceptor);

app.use('/', routes.Inits);
app.use('/auth', routes.Auth);
app.use('/news', routes.News);
app.use('/strategy',routes.Strategy);
app.use('/activity', routes.Activity);
app.use('/links', routes.Links);
app.use('/info',routes.Info);


//for umeditor
app.post('/upload', upload.single('upfile'), (req, res)=> uploadImgRes(req, res, 'images'));
app.post('/upload/activity', uploadActivity.single('file'), (req, res)=> uploadImgRes(req, res, 'activity'));
app.post('/upload/links', uploadLinks.single('file'), (req, res)=> uploadImgRes(req, res, 'links'));
app.post('/upload/info', uploadLinks.single('file'), (req, res)=> uploadImgRes(req, res, 'info'));

app.use(express.static(path.resolve('client/dist/')));
app.use(express.static(path.resolve('server/upload/')));
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
