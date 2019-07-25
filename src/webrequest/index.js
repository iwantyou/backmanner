import axios from 'axios'

export const ajax = axios.create({
    baseURL:'',
    // headers: { 'Content-Type': 'application/json' }
})

//请求拦截器
axios.interceptors.request.use(req => {

    return req
}, err=>{
    return Promise.reject(err)
})

//响应拦截器
axios.interceptors.response.use( res => {
   return res
}, err => {
    return Promise.reject(err)
})


export * from './get'
export * from './post'
export * from './delete'
export * from './put'