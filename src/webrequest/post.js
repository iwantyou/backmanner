import { ajax } from './index' 
/** 
 * 登录
 * @url  请求地址
 * @param {mobile, password}
 * @option 请求配置
 * @return { name: '账号名称', username: '登录账号', mobile: '手机号', role: '账号角色', token: '登录凭证' }
 */
export const weblogin = ajax.post(url, param).then(res => res.data).catch(err => err)

/**
 * 添加管理账户
 * @param { mobile: '登录账号', name: '账号名称'}
 * @return { _id: '账号ID', role: '账号角色',userId: '用户ID', level: '用户级别', ip }
 * 
 * 
 */
export const addaccount = ajax.post(url, param).then(res => res.data).catch(err => err)

/**
 * 分页查询
 * @param {page, limit}
 * @return {data:'查询数据'}
 * 
 * 
 */
export const pagination = ajax.post(url, param).then(res => res.data).catch(err => err)

/**
 * 删除账户
 * @param { _id: '账号ID' }
 * @return {}
 */