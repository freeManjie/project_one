import axios from 'axios'
import { message } from 'antd'
import { logout, getToken, setToken } from '@utils/login'

//设置默认请求超时时间， 并开启跨域请求
axios.defaults.timeout = 6000
axios.defaults.withCredentials = true

axios.interceptors.request.use(
    (config) => {
        // showLoading()
        let token = getToken();
        // if (!(config.url.indexOf("refresh") !== -1)) {
            if (token) {
                // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = `Bearer` + `JWT${token}`;
                console.log(token, config.headers.Authorization )
            }
        // }
        return config;
    },
    (error) => {
        if (error && error.response) {
        }
        return Promise.reject(error);
    }
);

//是否刷新标志
let isRefreshing = false
//重试队列
let requests = []

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    let status = 0, msg = '', response = error.response;
    if (error && response) {
        status = response.status;
        msg = response.data.title;
    }
    // 当response.data.re为401, 则判断token已经过期
    if (status === 401) {
        console.log(response)
        const config = response.config
        if (!isRefreshing) {
            // isRefreshing = true
            // return axios.post(`/api/refreshToken?refreshToken=${localStorage.getItem('AIO_Refresh_Token')}`)
            //     .then(res => {
            //         const { access_token, refresh_token } = res.data.data
            //         setToken(access_token, getLoginUser(), refresh_token)
            //         // 已经刷新了token，将所有队列中的请求进行重试
            //         requests.forEach(cb => cb(access_token))
            //         requests = []
            //     }).catch(res => {
            //         // 刷新token报错的话, 就需要跳转到登录页面
            //         console.error('refreshtoken error =>', res)
            //         message.error("token过期,请重新登录!");
            //         setTimeout(() => { window.location.href = '/' }, 2000)
            //         logout();
            //     }).finally(() => {
            //         isRefreshing = false
            //     })
        } else {
            // 正在刷新token，将返回一个未执行resolve的promise
            return new Promise((resolve) => {
                // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                requests.push((token) => {
                    config.baseURL = ''
                    config.headers['Authorization'] = `Bearer ${token}`
                    resolve(instance(config))
                })
            })
        }
    }
    if (status == 403) {
        message.warning({ content: "无权限访问!" });
    }
    if (status == 500 || status == 502) {
        message.error({ content: "服务器请求错误！" });
    }
    if (status == 400) {
        message.error({ content: msg });
    }
    if (status == 404) {
        message.error({ content: "404 Not Found！" });
    }
    console.log('请求error', error.message);
    return Promise.reject(error);
})

export default axios;