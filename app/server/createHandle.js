const url = require('url');

const _handle = {}

function createHandle(pathname, handle) {
    _handle[pathname] = handle;
}

function serve(req, resp) {
    const pathname = url.parse(req.url).pathname;

    if (typeof _handle[pathname] == 'function') {
        _handle[pathname](req, resp);
    } else {
        resp.writeHead(404, {'Content-Type': 'text/plain; charset=utf8'});
        resp.end('该页不存在！');
    }
}

module.exports =  { createHandle, serve };
