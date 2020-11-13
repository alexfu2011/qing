const app = require('./app');

app.handle('/hello', helloHandle);

function helloHandle(req, resp) {
    resp.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
    resp.end('你好');
}

app.start();
