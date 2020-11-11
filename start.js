const app = require('./app');

app.handle('/hello', helloHandle);

function helloHandle(req, resp) {
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.write("Hello");
    resp.end();
}

app.start();
