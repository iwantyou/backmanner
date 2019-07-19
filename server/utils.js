var fs = require('fs');
var request = require('request');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
function uploadFile(req, res, next) {
  if (req.method === "POST") {
    var uploadFile = req.file;
    if (uploadFile) {
      upload(uploadFile.path, uploadFile.originalname, function (err, data) {
        if (!err) {
          var result = { code: 0, data };
          res.set({
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, OPTIONS",
            "access-control-allow-headers": "content-type"
          });
          res.end(JSON.stringify(result));
        } else {
          console.error(err);
          var result = { code: 1, msg: "上传失败" };
          res.end(JSON.stringify(result));
        }
      });
    } else {
      var result = { code: 2, msg: "参数错误" };
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
function upload(filepath, filename, callback) {
  console.log([filepath, filename]);
  callback(null, "");
  // var options = { url: "https://cdn.xidong360.com/upload", timeout: 300000 };
  // var r = request.post(options, function (err, res, body) {
  //   console.log(body);
  //   if (!err) {
  //     try {
  //       if (typeof body == "string") body = JSON.parse(body);
  //       if (body.code == 0) {
  //         callback(null, body.data);
  //       }
  //       else {
  //         callback(null, "");
  //       }
  //     }
  //     catch (e) {
  //       console.error(e)
  //       callback(null, "");
  //     }
  //   }
  //   else {
  //     console.error(err)
  //     callback(null, "");
  //   }
  // });
  // var form = r.form();
  // form.append('name', 'file');
  // form.append('file', fs.createReadStream(filepath), { filename: filename });
}
function makeUUID() {
  return uuidv4().replace(/-/g, '');
}
function isPhone(phone) {
  var re = /^1[3|4|5|6|7|8|9]\d{9}$/;
  return re.test(Number(phone));
}
function isCardID(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门" };
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    province = '', birthday = '', sex = '';
    return false;
  }
  if (!city[code.substring(0, 2)]) {
    province = '', birthday = '', sex = '';
    return false;
  }

  if (code.length == 18) {
    //18位身份证需要验证最后一位校验位
    var codeArr = code.split('');
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];    //加权因子
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; //校验位
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += codeArr[i] * factor[i];
    }
    if (parity[sum % 11] != codeArr[17]) {
      province = '', birthday = '', sex = '';
      return false;
    }
  }
  //省份
  province = city[code.substring(0, 2)];
  //生日
  birthday = code.substring(6, 10) + '-' + code.substring(10, 12) + '-' + code.substring(12, 14);
  //性别
  if (code.length == 15) {
    sex = code.substring(14, 15) % 2 == 0 ? '女' : '男';
    gender = code.substring(14, 15) % 2 == 0 ? '2' : '1';
  } else if (code.length == 18) {
    sex = code.substring(14, 17) % 2 == 0 ? '女' : '男';
    gender = code.substring(14, 17) % 2 == 0 ? '2' : '1';
  }
  return { idNo: code, cardid: code, province: province, birthday: birthday, birth: birthday, sex: sex, gender: gender, age: calcAge(birthday) };
}
function calcAge(dateString) {
  var birthday = +new Date(dateString);
  var result = ~~((Date.now() - birthday) / (31557600000));
  // console.log(result);
  return result;
}
function getAge(dateString) {
  return calcAge(dateString);
}
function dateTime(date, formatType) {
  moment.locale('zh_cn');
  formatType = typeof formatType == 'string' ? formatType : 'YYYY年MM月DD日 HH:mm:ss';
  var res = moment(date).format(formatType);
  return res;
}
function textToColor(str) {
  if (!str || str.length == 0)
    return false;
  for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
  for (var i = 0, color = '#'; i < 3; color += ('00' + ((hash >> i++ * 2) & 0xFF)
    .toString(16))
    .slice(-2));
  return color;
}
function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}
module.exports = { uploadFile, makeUUID, isPhone, isCardID, getAge, dateTime, textToColor, getClientIp, };