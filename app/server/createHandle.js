const url = require('url');
const querystring = require('querystring');

const _handle = {}

function createHandle(pathname, handle) {
    _handle[pathname] = handle;
}

function serve(req, resp) {
    const pathname = url.parse(req.url).pathname;
    let str = ''; 
    req.on('data', function(thunk){
        str += thunk;
    });
    req.on('end', function(){
        if (typeof _handle[pathname] == 'function') {
            req.form = querystring.parse(str);
            req.query = url.parse(req.url, true).query;
            _handle[pathname](req, resp);
        } else {
            resp.writeHead(404, {'Content-Type': 'text/plain; charset=utf8'});
            resp.end('该页不存在！');
        }
    });
}

module.exports =  { createHandle, serve };
