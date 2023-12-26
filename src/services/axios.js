import axios from "axios"
import { message } from "antd"
import { logout, getToken, setToken } from "@utils/login"

//设置默认请求超时时间， 并开启跨域请求
axios.defaults.timeout = 6000
axios.defaults.withCredentials = true

axios.interceptors.request.use(
    (config) => {
        // showLoading()
        let token = getToken()
        // if (!(config.url.indexOf("refresh") !== -1)) {
        if (token && !(config.url.indexOf("refresh") !== -1)) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${token}`
        }
        // }
        return config
    },
    (error) => {
        if (error && error.response) {
        }
        return Promise.reject(error)
    }
)

//是否刷新标志
let isRefreshing = false
//重试队列
let requests = []

const instance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${token}`
        } else {
            // message.error("token不存在， 请重新登录")
            setTimeout(() => { window.location.href = "/" }, 2000)
        }

        return config
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response) => {
        if (response.data.code == 400) {
            message.error(response.data.msg)
            return Promise.reject(response)
        }
        // 在响应之前对数据进行处理
        if (response.data) {
            response.data = formatDataFields(response.data)
        }
        return response
    },

    (error) => {
        const { response } = error
        const { status, data: { title } = {} } = response || {}

        if (status === 401) {
            message.warning({ content: "登录状态失效，请重新登录！" })
            // setTimeout(() => {
            //     window.location.href = "/"
            // }, 2000)
            // localStorage.removeItem("accessToken")
        }

        switch (status) {
            case 403:
                message.warning({ content: "无权限访问!" })
                break
            case 400:
                message.error({ content: title })
                break
            case 404:
                message.error({ content: "数据正在加载，请稍后再试!" })
                break
            case 500:
                message.error({ content: "数据请求异常，请联系管理员！" })
            case 502:
                message.error({ content: "数据请求异常，请联系管理员！" })
                break
            default:
                break
        }
        return Promise.reject(error)
    }
)

/**
 *
 * @param {any} data 待格式化的数据
 */
function formatDataFields(data) {
    if (Array.isArray(data)) {
        // 处理数组
        data.forEach((item, index) => {
            data[index] = formatDataFields(item)
        })
    } else if (data && typeof data === "object") {
        // 处理对象
        for (let key in data) {
            const value = data[key]
            data[key] = formatDataFields(value)
            if (typeof data[key] === "string") {
                // 格式化时间类型
                const match = data[key].match(
                    /^\d{4}[/-]\d{1,2}[/-]\d{1,2}[ T]\d{1,2}:\d{2}:\d{2}$/
                )
                if (match) {
                    const date = new Date(data[key])
                    const year = date.getFullYear()
                    const month =
                        date.getMonth() + 1 < 10
                            ? `0${date.getMonth() + 1}`
                            : date.getMonth() + 1
                    const day =
                        date.getDate() < 10
                            ? `0${date.getDate()}`
                            : date.getDate()
                    const hours =
                        date.getHours() < 10
                            ? `0${date.getHours()}`
                            : date.getHours()
                    const minutes =
                        date.getMinutes() < 10
                            ? `0${date.getMinutes()}`
                            : date.getMinutes()
                    const seconds =
                        date.getSeconds() < 10
                            ? `0${date.getSeconds()}`
                            : date.getSeconds()
                    data[
                        key
                    ] = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                }
            } else if (
                typeof data[key] === "number" &&
                !Number.isInteger(data[key])
            ) {
                // 格式化浮点数类型
                const num = data[key].toString()
                const integerPart = num.split(".")[0]
                let decimalPart = ""
                if (num.includes(".")) {
                    decimalPart = num.split(".")[1].substring(0, 2)
                }
                data[key] = Number(`${integerPart}.${decimalPart}`)
            }
        }
    }

    return data
}
export default instance
