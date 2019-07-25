const path = require('path');
const fs = require('fs');
const utils = require('./utils');
const model = require('./model');
const mkdirp = require('mkdirp');
const moment = require('moment');
moment.locale('zh-cn');
const uploadpath = path.join(__dirname, '../upload/');
console.log({ uploadpath });
if (!fs.existsSync(uploadpath)) mkdirp.sync(uploadpath);
function getSaveBasePath() {
  return moment().format('/YYYY/MM/DD/');
}
function getSavePath() {
  const basepath = getSaveBasePath();
  const savepath = path.join(uploadpath, basepath);
  if (!fs.existsSync(savepath)) mkdirp.sync(savepath);
  console.log({ savepath, basepath });
  return { savepath, basepath };
}
// getSavePath()
async function uploadFile(req, res, next) {
  if (req.method === "POST") {
    const uploadFile = req.file;
    const ip = utils.getClientIp(req);
    // console.log(req);
    if (uploadFile) {
      // console.log(uploadFile);
      let { originalname, mimetype, destination, filename, size } = uploadFile;
      var result = utils.checkUpload({ mimetype, size });
      if (result) return res.end(JSON.stringify({ code: 1, msg: result }));
      const extname = path.extname(originalname);
      const src = path.join(destination, filename);
      filename = filename + extname;
      const { savepath, basepath } = getSavePath();
      const dest = path.join(savepath, filename);
      const url = path.join('/upload', basepath, filename).replace(/\\/g, '/');
      const file = new model.File({
        filename, originalname, mimetype, url, path: dest, size, ip,
      });
      fs.copyFileSync(src, dest);
      fs.unlinkSync(src);
      await file.save();
      var data = { code: 0, data: url };
      res.end(JSON.stringify(data));
    } else {
      var result = { code: 1, msg: "上传失败" };
      res.end(JSON.stringify(result));
    }
  } else if (req.method.toUpperCase() === "OPTIONS") {
    var origin = (req.headers.origin || "*");
    res.set({
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": 10, // Seconds.
      "content-length": 0
    });
    res.status(204).send('No Content');
    res.end();
  } else {
    next();
  }
}

module.exports = uploadFile;