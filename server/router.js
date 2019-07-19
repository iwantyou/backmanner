var multer = require('multer');
var upload = multer({ dest: '../uploads' });
var utils = require('./utils');
var bll = require('./bll');
var sio = require('./socket.io');
var createToken = require('./middleware/createToken')
var checkToken = require('./middleware/checkToken')
var model = require('./db').model;
function PostInit(req, res) {
  // console.log(req.body);
  // console.log(req.cookies);
  // console.log(req.headers);
  // console.log(req.params);
  // console.log(req.query);
  var key = getkey(req.params);
  var action = bll[key];
  if (Array.isArray(action)) {
    action[0](req.body, function (result) {
      res.json(result);
      res.end();
    });
  } else if (typeof action == "function") {
    checkToken(req, function (resInfo) {
      if (resInfo.code == 0) {
        action(req.body, resInfo.data, function (result) {
          res.json(result);
          res.end();
        });
      } else {
        res.json(resInfo);
        res.end();
      }
    });
  } else {
    res.status(404).end();
  }
};
function getkey(params) {
  var controller = params.controller;
  var action = params.action;
  return controller + (action ? '_' + action : '');
}
function qrlogin(req, res) {
  var token = req.params.token;
  const { status, userid } = req.query;
  if (status == 2) {
    model.Users.findOne({ _id: userid }, function (err, user) {
      if (err) console.error(err);
      if (user) {
        sio.setToken(token, createToken({ userid, name: user.name, mobile: user.mobile }));
      }
    });
  }
  res.end();
}
module.exports = function (router) {
  router.get('/api/qrcode/:token', qrlogin);
  router.post('/api/upload', upload.single('file'), utils.uploadFile);
  router.post('/api/:controller/:action?', PostInit);
  return router;
};
