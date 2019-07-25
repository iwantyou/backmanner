var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var serveStatic = require('serve-static');
var router = require('./router.js')(express.Router());

var app = express();
var server = require('http').Server(app);

app.use(logger(':date[iso] :method :url :status :response-time ms - :req[content-length] - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload', serveStatic(path.join(__dirname, '../upload')));
app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(compression({ filter: shouldCompress }));
app.use(router);

var port = (process.env.PORT || 3000);
var host = (process.env.BIND_IP || '127.0.0.1');
server.listen(port, host, function () {
  console.log(`Express server listening on http://${host}:${port}`);
});
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
