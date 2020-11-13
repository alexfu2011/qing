const app = require('./app');

var res = [];

app.handle('/index', indexHandle);
app.handle('/add', addHandle);
app.handle('/delete', deleteHandle);

function indexHandle(req, resp) {
    resp.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    resp.write(`<!DOCTYPE html>
<html>
<head>
<title>Todo</title>
<style>
    html {font-family: "Microsoft Yahei"; text-align: center;}
    body {max-width: 500px; margin: 50px auto;}
    input {width: 500px; height: 60px; font-size: 40px; border: 0;}
    input:focus {outline: none;}
    li {text-align: left; font-size: 30px; list-style: none;margin: 0;}
    li:hover {text-decoration: line-through;}
</style>
<script>
    function Add(event) {
        if (event.keyCode == 13) {
            let data = {};
            let el = document.querySelector("input");
            if (el.value.trim() == "") {
                el.value = "";
                return;
            }
            data.todo = el.value;
            let json = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/add", true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
            xhr.onload = function () {
                if (xhr.readyState == 4 && xhr.status == "200") {
                    let data = JSON.parse(xhr.responseText);
                    let ul = document.querySelector("ul");
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode("－" + data.todo));
                    li.setAttribute("id", data.id);
                    li.onclick = Delete; ul.appendChild(li);
                    el.value = "";
                }
            };
            xhr.send(json);
        }
    };
    function Delete(event) {
        let ul = document.querySelector("ul");
        let el = event.target;
        let id = el.id;
        let url = "/delete?id=" + id;
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200") {
                ul.removeChild(el);
            }
        };
        xhr.send(null);
    }
</script>
</head>
<body><input placeholder="你想要做什么？" onkeyup="Add(event)" /><ul>`);
    for (let i = 0; i < res.length; i++) {
        const id = res[i].id;
        const todo = res[i].todo;
        resp.write(`<li id="${id}" onclick="javascript: Delete(event)">－${todo}</li>`);
    }
    resp.end('</ul></body></html>');
}

function addHandle(req, resp) {
    const todo = req.json.todo;
    const id = res.length - 1 < 0 ? 0 : res.length;
    const data = {id: id, todo: todo};
    res.push(data);
    resp.writeHead(200, {'Content-Type': 'application/json'});
    resp.end(JSON.stringify(data));
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
