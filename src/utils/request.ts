import axios, {AxiosError, type AxiosRequestConfig, AxiosResponse, Method} from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200)  {
            return response
        } else {
            return Promise.reject('系统异常')
        }
    },
    (error: AxiosError<{code: number}>) => {
        const { code, message, response } = error
        if (code === 'ERR_NETWORK' || (response && response.data.code === 502)) {
            return Promise.reject('网络异常')
        }
        if (code === 'ECONNABORTED' && message.includes('timeout')) {
            return Promise.reject('请求超时')
        }
        return Promise.reject('系统异常')
    }
)

interface Options {
    needLogin?: boolean
    params?: object
    data?: object
}

export function request<T>(url: string, method: Method, options: Options = {}): Promise<T> {
    const { needLogin = false, params = {}, data = {} } = options
    return new Promise((resolve, reject) => {
        // 携带用户cookie
        const cookie = sessionStorage.getItem('cookie')
        if (needLogin && cookie) {
            Object.assign(data, { cookie })
        }
        service({ url, method, params, data }).then((response: AxiosResponse) => {
            // 接口响应报文格式不规范，对code判断移至api层独立处理
            resolve(response.data)
        }).catch((error: string) => {
            console.error(url, error)
            if (error === '网络异常' || error === '请求超时') {
                reject('网络异常')
            } else {
                ElMessage({
                    message: error,
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                reject()
            }
        })
    })
}
