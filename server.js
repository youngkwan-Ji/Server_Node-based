require('app-module-path').addPath(__dirname);

const httpLoader = require('./loaders/http/app')
const {initSocket, addKlineWSListener} = require('./loaders/websocket/socket')
const define = require('config/define')
const env = require('config/env');
// const aggT = require('services/binance/websocket/spot/aggTradeWS');

// const klines = require('services/binance/spot/market/klines');
var io;

function startServer() {
    if (define.LOAD_WEBSOCKET) {
        io = initSocket(httpLoader)
        addKlineWSListener()
    }
}

function addWSListener() {

}

startServer()