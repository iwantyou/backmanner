const fs = require('fs');
const path = require('path');
const request = require('request');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const crypto = require('crypto');
const config = require('./config');
const Crypto = require('./crypto');
const Qs = require('qs');
function fileZero(str, length) {
  if (typeof str == "string") {
    while (str.length < length) {
      str = "0" + str;
    }
  }
  return str;
}
function str_repeat(input, multiplier) {
  var y = '';
  while (true) {
    if (multiplier & 1) {
      y += input;
    }
    multiplier >>= 1;
    if (multiplier) {
      input += input;
    } else {
      break;
    }
  }
  return y;
}
//加密
function AesEncode(string, key) {
  key = fileZero(key, 32);
  if (typeof key == "string" && key.length == 32) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, str_repeat('\0', 16));
    var crypted = cipher.update(string, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
  } else {
    return null;
  }
}
//解密
function AesDecode(string, key) {
  if (typeof key == "string" && key.length == 32) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, str_repeat('\0', 16));
    var dec = decipher.update(string, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } else {
    return null;
  }
}
function XD_POST(method, data) {
  data = AesEncode(JSON.stringify({ nonceStr: makeUUID(), data, method, timestamp: Date.now(), }), config.key);
  request.post('http://localhost:3000/api.cmb.vote/', { json: { data } }, (err, res, body) => {

  });
}
function makeUUID() {
  return uuidv4().replace(/-/g, '');
}
function hidePhone(phone) {
  // console.log({ phone });
  if (phone && phone.length == 11) {
    return phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
  }
  return '';
}
function hideID(idNo) {
  if (idNo && idNo.length == 18) {
    return idNo.replace(/^(\d{14}).*$/, "$1****");
  }
  return '';
}
function isPhone(phone) {
  return config.phoneReg.test(Number(phone));
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
//密码加密
/**
 * @param {*} password 密码
 * @param {*} salt 数据库salt字段
 */
function getPwd(password, salt) {
  var hash = crypto.createHmac('sha512', config.key);
  hash.update(md5(password) + salt);
  return hash.digest('hex');
}
//密码比对
/**
 * @param {*} password 登录密码
 * @param {*} salt 数据库salt字段
 * @param {*} password2 数据库password字段
 */
function checkPwd(password, salt, password2) {
  return getPwd(password, salt) == password2;
}
function md5(str) {
  var hash = crypto.createHash('md5');
  return hash.update(str).digest('hex');
}
function sha1(data) {
  var hash = crypto.createHash('sha1');
  return hash.update(data).digest('hex');
}
function nowTime() {
  return Date.now();
}
function nowDate() {
  return new Date();
}
function uniqid() {
  return makeUUID();
}
function trim(str) {
  return str.replace(/\s/g, '');
}
function ResObj(data) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
function checkUpload({ mimetype, size }) {
  if (mimetype && config.upload.accepttype.indexOf(mimetype) == -1) {
    return `不支持的文件类型：${config.upload.accepttext}`;
  }
  if (size && size > config.upload.limitsize[mimetype]) {
    return `超过上传文件大小限制：${config.upload.limittext[mimetype]}`;
  }
  return null;
}
function nowDateObj() {
  const now = new Date();
  const year = dateTime(now, 'YYYY');
  const month = dateTime(now, 'MM');
  const day = dateTime(now, 'DD');
  const hour = dateTime(now, 'HH');
  const minute = dateTime(now, 'mm');
  const second = dateTime(now, 'ss');
  return { year, month, day, hour, minute, second };
}
//招行APP传参解密
function CMBAesDecode(data) {
  const _crypto = new Crypto('aes-128-ecb', config.cmb_aes_key, "");
  return _crypto.decrypt(data);
}
function CMBAesEncode(data) {
  const _crypto = new Crypto('aes-128-ecb', config.cmb_aes_key, "");
  return _crypto.encrypt(data);
}
function parseUrl(query) {
  return Qs.parse(query);
}
function makeAvatar() {
  return 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'userlogo.png'), 'base64');
}
function stringHtmlBr(content) {
  if (!content) return content;
  const re = /\n/g;
  content = content.replace(re, "<br />");
  return content;
}
// console.log(111, CMBAesDecode('+RVQs371yY7G+xCZ1dgsPw=='));
console.log(222, CMBAesEncode('UniqueUserID=yangjinlongpk&RealName=杨金龙&MobileNo=15378700683&PersonalID=411082198806190033&Level=LV3'));
console.log(parseUrl('UniqueUserID=UniqueUserID&RealName=RealName&MobileNo=MobileNo&PersonalID=PersonalID&Level=Level'));
// XD_POST('cmb/test', { code: 0 });
// console.log(makeAvatar());
module.exports = { makeUUID, hidePhone, hideID, isPhone, isCardID, getAge, dateTime, textToColor, getClientIp, getPwd, checkPwd, nowTime, nowDate, uniqid, trim, ResObj, checkUpload, nowDateObj, CMBAesDecode, parseUrl, AesEncode, AesDecode, makeAvatar, stringHtmlBr };