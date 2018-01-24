const WebSocket = require('ws');
const http = require('http');

// const wss = new WebSocket.Server({ port: 9999 });
const server = http.createServer(function (req, res) { res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello World\n'); }).listen(9999, '0.0.0.0');
const wss = new WebSocket.Server({ server: server});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});


const ws = new WebSocket('ws://localhost:9999');

ws.on('open', function open() {
    ws.send('来自服务端的测试消息 from ws://0.0.0.0:9999/');
});