/**
 * Created by zhuzhipeng on 16/3/11.
 */


'use strict';

const News       = require('./News');
const Activity   = require('./Activity');
const Strategy   = require('./Strategy');
const Links      = require('./Links');
const Logs       = require('./Logs');
const Auth       = require('./Auth');
const Channel    = require('./Info');
const controller = {
    News: News,
    Activity: Activity,
    Auth: Auth,
    Strategy: Strategy,
    Links: Links,
    Logs: Logs,
    Channel: Channel
};


module.exports = controller;