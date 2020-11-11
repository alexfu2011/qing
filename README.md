# 青(qing)
“青”可能是一个最轻的 node.js 框架。

一个简单的 App：

    const app = require('./app');

    app.handle('/hello', helloHandle);

    function helloHandle(req, resp) {
        resp.writeHead(200, {"Content-Type": "text/plain"});
        resp.write("Hello");
        resp.end();
    }

    app.start();

目录 app 包括一个内置服务器和一个 options.js 文件：

    var options = {
        hostname: '127.0.0.1',
        port: 3001
    };

通过修改这两个文件可以实现一个简单的 node.js 应用程序。
