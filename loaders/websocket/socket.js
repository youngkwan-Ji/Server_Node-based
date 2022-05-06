// const socketModule = require('ws');
const {Server} = require('socket.io');
const {PythonShell} = require('python-shell');
const fs = require("fs");

var io;
var dataList = []
module.exports.initSocket = function (webApp) {
    io = new Server(webApp)
    //     ,{
    //     path:'test'
    // })

// connection을 수립하고, callback 인자로 socket을 받음
    io.on('connection', function (socket) {
        // 연결이 성공했을 경우 실행됨
        console.log('connection Client: ' + socket);

        // socket.emit("wsKline", {
        //     data: "firstRespond"
        // });

        socket.on('disconnect', function () {
            // 클라이언트의 연결이 끊어졌을 경우 실행됨
            console.log('disconnect Client: ' + socket);
        });
        socket.on('event_name', function(data) {
            console.log('Message from Client: ' + data);
        });

    })

    return io
}

module.exports.addKlineWSListener = function (){
    const wsKline = require('services/binance/websocket/spot/klineWS')(function (data) {
        var r = parseKlineData(JSON.parse(String(data)));
        if (r.last){
            if (dataList.length < 4){
                dataList.push(r)
            }else {
                dataList = dataList.slice(1, 4)
                console.log(dataList.length)
                dataList.push(r)
                console.log(dataList.length)
                predictKlienData(JSON.stringify(dataList))
            }
        }

        io.emit("wsKline", {
            data: String(data)
        })
    });
}

function predictKlienData(prevData){
    var options = {
        mode: 'text',
        pythonPath: '',
        pythonOptions: ['-u'],
        scriptPath: '',
        args: [prevData]
    };
    PythonShell.run('services/ML/pre-processing_BinanceKline.py', options, function (err, results) {
        if (err) {
            console.log("pre-processing_BinanceKline.py file Run FAIL , reason :" + err);
            return +"processing_BinanceKline : " + "분석 중 문제 발생"
        }

        console.log("predictKlienData START!!!!");

        res = JSON.stringify(results);
        console.log("predictKlienData Result : " + res);
        io.emit("predictWsKline", {
            data: res
        })
    });
}

function parseKlineData(d) {
    var res= {}
    res.date = d.k.t;
    res.open = d.k.o;
    res.high = d.k.h;
    res.low = d.k.l;
    res.close = d.k.c;
    res.volume = d.k.v;
    res.quoteAssetVolume = d.k.q;
    res.numberOfTrades = d.k.n;
    res.takerBuyBaseAssetVolume = d.k.V;
    res.takerBuyQuoteAssetVolume = d.k.Q;
    res.last = d.k.x;
    return res
}


// module.exports = (webApp) => {
//     io = new Server(webApp)
//     //     ,{
//     //     path:'test'
//     // })
//
// // connection을 수립하고, callback 인자로 socket을 받음
//     io.on('connection', function (socket) {
//         // 연결이 성공했을 경우 실행됨
//         console.log('connection Client: ' + socket);
//
//         socket.emit("wsKline", {
//             data: "firstRespond"
//         });
//
//         socket.on('disconnect', function () {
//             // 클라이언트의 연결이 끊어졌을 경우 실행됨
//             console.log('disconnect Client: ' + socket);
//         });
//         socket.on('event_name', function(data) {
//             console.log('Message from Client: ' + data);
//         });
//
//     })
//     // // 접속된 모든 클라이언트에게 메시지를 전송한다
//     // io.emit('event_name', msg);
//     //
//     // // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
//     // socket.emit('event_name', msg);
//     //
//     // // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
//     // socket.broadcast.emit('event_name', msg);
//     //
//     // // 특정 클라이언트에게만 메시지를 전송한다
//     // io.to(id).emit('event_name', data);
//
//     // connection event handler
// // connection이 수립되면 event handler function의 인자로 socket인 들어온다
//
//     // wss.on('connection', (ws, req) => {
//     //     const ip = req.headers['x-forwarded-for'] || req.ip;
//     //     console.log('client 접속 : ', ip);
//     //
//     //     ws.on('message', (message) => {
//     //         console.log('수신 : ', message);
//     //
//     //         if (ws.readyState === ws.OPEN) {
//     //             ws.send('발신 : server to client');
//     //         }
//     //     });
//     //
//     //     ws.on('close', () => {
//     //         console.log('clenet 해제 : ', ip);
//     //     });
//     //
//     //     ws.on('error', (error) => {
//     //         console.error(error);
//     //     });
//     // });
// }

// module.exports = io