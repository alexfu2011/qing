---
layout: default
---
# 青(qing)
“青”可能是一个最轻的 node.js 框架。

一个简单的 App：

    const app = require('./app');

    app.handle('/hello', helloHandle);

    function helloHandle(req, resp) {
        resp.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
        resp.end('你好');
    }

    app.start();

app 目录包括一个内置服务器和一个 options.json 文件：

    {
        "host": "localhost",
        "port": 3001
    }

通过修改这两个文件可以实现一个简单的 node.js 应用程序。
