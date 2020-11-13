const querystring = require('querystring');
const options = require('../options');

const handle = {};

function createHandle(pathname, func) {
    handle[pathname] = func;
}

function serve(req, resp) {
    let s = '';
    req.on('data', function (thunk) {
        s += thunk;
    });
    req.on('end', function () {
        const host = options.host;
        const port = options.port;
        const url = new URL(req.url, `http://${host}:${port}/`);
        const pathname = url.pathname == '/' ? '/index' : url.pathname;

        if (typeof handle[pathname] == 'function') {
            req.params = url.searchParams;
            req.form = querystring.parse(s);
            try {
                req.json = JSON.parse(s);
            } catch { }
            handle[pathname](req, resp);
        } else {
            resp.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
            resp.end('该页不存在！');
        }
    });
}

module.exports = { createHandle, serve };
