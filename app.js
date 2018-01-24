const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9999 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});


const ws = new WebSocket('ws://localhost:9999');

ws.on('open', function open() {
    ws.send('苗总是傻逼');
});