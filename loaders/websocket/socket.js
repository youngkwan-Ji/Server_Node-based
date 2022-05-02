// const socketModule = require('ws');
const {Server} = require('socket.io');

var io;

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
        io.emit("wsKline", {
            data: String(data)
        })
    });
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