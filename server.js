
require('app-module-path').addPath(__dirname);

const appLoader = require('./loaders/http/app')
const socketLoader = require('./loaders/websocket/socket')
const define = require('config/define')
const env = require('config/env');
// const aggT = require('services/binance/websocket/spot/aggTradeWS');
// const wsKline = require('services/binance/websocket/spot/klineWS');
// const klines = require('services/binance/spot/market/klines');


function startServer(){

    if (define.LOAD_WEBSOCKET){
        socketLoader(appLoader)
    }
    // aggT
}

startServer()