const fs = require('fs');
const url = require('url');

var _handle = {}

function createHandle(pathname, handle) {
    _handle[pathname] = handle;
}

function serve(req, resp) {
    let pathname = url.parse(req.url).pathname;

    if (typeof _handle[pathname] == 'function') {
        _handle[pathname](req, resp);
    } else {
        resp.writeHead(404, {"Content-Type": "text/plain"});
        resp.write(pathname + " is not defined!");
        resp.end();
    }
}

module.exports =  { createHandle, serve };
