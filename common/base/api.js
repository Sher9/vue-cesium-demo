import axios from 'axios'
import { Notification } from 'element-ui'
import Cookies from 'js-cookie'
import qs from 'qs'
import 'es6-promise/auto'

axios.defaults.baseURL = backEndBaseAPI
axios.defaults.timeout = 10000
axios.defaults.headers.common['token'] = Cookies.get('token') || ''

axios.interceptors.request.use(
    function(config) {
        //为get请求添加时间戳，防止IE下服务端数据缓存
        if (config.method === 'get') {
            config.url = encodeURI(String(config.url))
            config.params = { ...config.params, _t: new Date().getTime() }
        }
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

//全局xhr响应拦截器（只有axios发的请求才会进入此拦截器）
axios.interceptors.response.use(
    function(response) {
        switch (response.data && response.data.code) {
            case 0:
                response.data.msg && Notification.success(response.data.msg)
                return response
            case 101:
                location.href = '../login.html'
                break
            default:
                if (response.config.responseType === 'blob') {
                    return response
                } else {
                    response.config.url &&
                        response.config.url.indexOf('verify') <= -1 &&
                        Notification.error(
                            response.data.msg || '服务器正忙，请稍后再试'
                        )
                    return Promise.reject(response.data)
                }
        }
    },
    function(error) {
        Notification.error('服务器正忙，请稍后再试')
        return Promise.reject(error)
    }
)

/**
 * 用户登录
 * @param {*} params
 */
export const userLogin = (params) => {
    return axios.post('/login', qs.stringify(params)).then((res) => res.data)
}

/**
 * 退出登录
 */
export const logout = () => {
    Cookies.remove('token')
    location.href = '../login.html'
}

/**
 * 获取用户信息
 */
export const fetchUserInfo = () => {
    return axios.get('/userinfo')
}

/**
 * 获取导航栏信息
 */
export const fetchNavItem = () => {
    return axios.get('/navitem')
}
