//全局配置
module.exports = {
  jwt_secret: '5ab3c6ba-d6b2-4a32-a3e7-dfd7251707e0',
  jwt_expire: '90d',//登录有效期
  req_speed_limit: 1500,//接口请求最大间隔限制 毫秒
  cmb_aes_key: 'zhengzhoufenhang',//招行app传参解密密钥
  //密码加密密钥
  key: '12249570bb024f76933e8ffa47a5dc9e',
  //后台默认初始化账户
  defaultAdmin: {
    mobile: '15378700683',
    name: '杨金龙',
    role: '1'
  },
  //手机号码格式
  phoneReg: /^1[3|4|5|6|7|8|9]\d{9}$/,
  //上传文件限制
  upload: {
    accepttype: ['image/jpeg', 'image/png', 'video/mp4'],
    accepttext: '只允许上传jpg/png/mp4格式文件',
    limitsize: {
      'image/jpeg': 2 * 1024 * 1024,//2M
      'image/png': 2 * 1024 * 1024,//2M
      'video/mp4': 100 * 1024 * 1024,//100M
    },
    limittext: {
      'image/jpeg': '图片不大于2M',
      'image/png': '图片不大于2M',
      'video/mp4': '视频不大于100M',
    },
  },
  //用户等级描述
  user_level: {
    'LV1': 1,
    'LV2': 2,
    'LV3': 3,
    'LV4': 4,
    'LV5': 5,
  },
  //白名单等级
  w_level: {
    'W5': 1,
    'W10': 2,
  },
  defaultRule: {
    "count": 1,
    "rate": "total",
    "LV1": 1,
    "LV2": 1,
    "LV3": 1,
    "LV4": 1,
    "LV5": 1,
    "W5": 1,
    "W10": 1
  }
};