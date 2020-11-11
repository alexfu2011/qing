const http = require('http');
const { serve } = require('./createHandle');
const options = require('../options');

function startHTTPServer() {
    const host = options.host;
    const port = options.port;

    const server = http.createServer(serve);

    server.listen(port, host, () => {
        console.log(`App starting at http://${host}:${port}/`);
    });
}

module.exports = startHTTPServer;
