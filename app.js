const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Websocket Server Success\n'); }).listen(9999, '0.0.0.0');
const wss = new WebSocket.Server({ server: server});

/**
 * Connection
 */

wss.on('connection', function connection(ws, req) {
    var ip = req.connection.remoteAddress

    ws.on('message', function incoming(message) {
        var log = 'Received: ' + message
        console.log(log);
        console.dir(req)
        ws.send(log);
    });

    ws.send('%s,连接成功!',ip);
});

/**
 * DisConnection
 */

wss.on('disconnect', function connection(ws, req) {
    var ip = req.connection.remoteAddress
    ws.send('%s,断开了连接!',ip);
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