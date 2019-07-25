const path = require('path');
const utils = require('./utils');
const config = require('./config');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, '../tmp') });
const bll = require('./bll');
const uploadFile = require('./upload');
const checkToken = require('./middleware/checkToken');
const ResultInfo = require('./ResultInfo');
const setSuccess = ResultInfo.setSuccess;
const setError = ResultInfo.setError;
const ResCode = ResultInfo.ResCode;
// const rsa = require('./rsa');
// const RsaServer = rsa.server;
// const RsaClient = rsa.client;

const REQ_SPEED_LIMIT = {};
const REQ_SPEED_LIMIT_METHOD = {
  'record/add': true
};
function PostInit(req, res) {
  // console.log(req.body);
  // console.log(req.cookies);
  // console.log(req.headers);
  // console.log(req.params);
  // console.log(req.query);
  const { modal, method } = getkey(req.params);
  const action = bll[modal][method];
  const ip = utils.getClientIp(req);
  if (Array.isArray(action)) {
    action[0](req.body, { ip }, function (result) {
      // console.log('结果1', result);
      res.json(result);
      res.end();
    });
  } else if (typeof action == "function") {
    checkToken(req, function (resInfo) {
      if (resInfo.code == 0) {
        const user = { ...resInfo.data, ip };
        if (REQ_SPEED_LIMIT_METHOD[`${modal}/${method}`]) {//限速接口
          if (REQ_SPEED_LIMIT[user.userId] && (Date.now() - REQ_SPEED_LIMIT[user.userId]) < config.req_speed_limit) {
            // console.log('触发请求频率限制');
            res.json(setError(ResCode.ERR_REQ_SPEED_LIMIT));
            return res.end();
          }
          REQ_SPEED_LIMIT[user.userId] = Date.now();
        }
        action(req.body, user, function (result) {
          // console.log('结果2', result);
          res.json(result);
          res.end();
        });
      } else {
        // console.log('结果3', resInfo);
        res.json(resInfo);
        res.end();
      }
    });
  } else {
    res.status(404).end();
  }
};
function getkey(params) {
  const modal = params.modal;
  const controller = params.controller;
  const action = params.action;
  return { modal, method: controller + (action ? '_' + action : '') };
}
module.exports = function (router) {
  router.post('/api/upload', upload.single('file'), uploadFile);
  router.post('/api/:modal/:controller/:action?', PostInit);
  return router;
};
