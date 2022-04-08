
require('app-module-path').addPath(__dirname);

const appLoader = require('./loaders/express/app')
const socketLoader = require('./loaders/websocket/socket')
const define = require('config/define')
const env = require('config/env');



function startServer(){

    if (define.LOAD_WEBSOCKET){
        socketLoader(appLoader)
    }
}

startServer()