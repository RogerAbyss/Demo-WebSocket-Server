const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Websocket Server Success\n'); }).listen(9999, '0.0.0.0');
const wss = new WebSocket.Server({ server: server});

var sockets = {};

/**
 * Connection
 */

wss.on('connection', function connection(ws, req) {
    /** 获取登录的ip */
    var ip = req.connection.remoteAddress

    /** 以ip为identifier 保存socket
     *  ip会重复, 肯定是有问题的
     */
    sockets[ip] = ws;

    /**
     * 监听消息
     */
    ws.on('message', function incoming(message) {

        /** 后台打印收到消息 */
        var log = 'Received: ' + message
        console.log(log);

        /** 群里逻辑
         *  将收到的消息发送给所有人(除去发送者)
         */
         for(ip in sockets)
         {
         	if (sockets[ip] != ws) {
                sockets[ip].send(message)
         	}
         }
    });

    /** 登录成功, 群发通知 */
    wss.send(ip + '连接成功!');
});

/**
 * DisConnection
 */

wss.on('disconnect', function connection(ws, req) {
    var ip = req.connection.remoteAddress

    /** 断开连接, 释放socket */
    sockets[ip] = nil;

    /** 断开连接, 群发通知 */
    wss.send(ip + '断开了连接!');
});

/**
 * ping/pong 心跳回应
 */
function heartbeat() {}
wss.on('ping', heartbeat);
wss.on('pong', heartbeat);

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
    /**
     * 服务端开启的时候发送一条成功消息, 测试是否接受正常
     */
    ws.send('Start Success!');
});