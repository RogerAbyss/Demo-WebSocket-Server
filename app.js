const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Websocket Server Success\n'); }).listen(9999, '0.0.0.0');
const wss = new WebSocket.Server({ server: server});

var sockets = {};
/**
 * Connection
 */

wss.on('connection', function connection(ws, req) {
    var ip = req.connection.remoteAddress

    sockets[ip] = ws;

    ws.on('message', function incoming(message) {
        var log = 'Received: ' + message
        console.log(log);

         for(ip in sockets)
         {
         	if (sockets[ip] != ws) {
                sockets[ip].send(message)
         	}
         }
    });

    ws.send(ip + '连接成功!');
});

/**
 * DisConnection
 */

wss.on('disconnect', function connection(ws, req) {
    var ip = req.connection.remoteAddress
    ws.send(ip + '断开了连接!');
});

/**
 * Error
 */

wss.on('error', function error(error) {
    console.log(error)
});

/**
 * 服务端Websoket 消息测试
 * @type {*|WebSocket}
 */

const ws = new WebSocket('ws://localhost:9999');

ws.on('open', function open() {
    ws.send('Start Success!');
});