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

	const app = require('./app');

	var res = [];

	app.handle('/index', indexHandle);
	app.handle('/add', addHandle);
	app.handle('/delete', deleteHandle);

	function indexHandle(req, resp) {
		resp.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
		resp.write('<!DOCTYPE html><html><head><title>Todo</title>' +
			'<script>function Delete(id) {let xhr = new XMLHttpRequest(); xhr.open("DELETE", "/delete?id="+id, true); xhr.send(null); location.href="/";}</script>' +
			'</head><body><meta http-equiv="Content-Type" Content="text/html; Charset=UTF-8">' +
			'<form action="/add" method="post"><input type="text" name="content"><input type="submit" value="保存"></form>' +
			'<table>');
		for (let i = 0; i < res.length; i++) {
			const id = res[i].id;
			const content = res[i].content;
			resp.write(`<tr><td>${content}</td><td><a href="javascript:Delete(${id})">删除</a></td></tr>`);
		}
		resp.end('</table></body></html>');
	}

	function addHandle(req, resp) {
		const content = req.form.content;
		const id = res.length - 1 < 0 ? 0 : res.length;
		res.push({id: id, content: content});
		resp.writeHead(301, {'Location': '/'});
		resp.end();
	}

	function deleteHandle(req, resp) {
		const id = req.params.get('id');
		for (let i = 0; i < res.length; i++) {
			if (id == res[i].id) {
				res.splice(i, 1);
			}
		}
		resp.end();
	}

	app.start();