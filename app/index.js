const createApp = require('./server/createApp');
const { createHandle } = require('./server/createHandle');

var app = new createApp();
createApp.prototype.handle = createHandle;
createApp.prototype.start = require('./server/startHTTPServer');

module.exports = app;
