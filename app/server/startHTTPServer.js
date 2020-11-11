const http = require('http');
const { serve } = require('./createHandle');
const options = require('../options');

function startHTTPServer() {
    const hostname = options.hostname;
    const port = options.port;

    const server = http.createServer(serve);

    server.listen(port, hostname, () => {
        console.log(`App starting at http://${hostname}:${port}/`);
    });
}

module.exports = startHTTPServer;
