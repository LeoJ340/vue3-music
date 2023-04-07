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

export function request<T>(url: string, method: Method, params: any, needLogin: boolean = false): Promise<T> {
    return new Promise((resolve, reject) => {
        // 携带用户cookie
        if (needLogin) {
            params.cookie = sessionStorage.getItem('cookie')
        }
        service({ url, method, params }).then(res => {
            const { code, status } = res.data
            if (code === 200 || status === 200) {
                resolve(res.data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                console.error(url, '系统异常', res)
            }
        }).catch((error: string) => {
            if (error === '网络异常') {
                reject()
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                console.error(url, '系统异常')
            }
        })
    })
}

// 登录相关的接口和业务请求响应报文不太一样
export function loginRequest<T>(url: string, params?: object): Promise<T> {
    return new Promise((resolve) => {
        service.get(url, { params }).then(res => {
            resolve(res.data);
        }).catch((error: string) => {
            if (error === '网络异常') {
                ElMessage({
                    message: '网络异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
                console.error(url, '网络异常')
            }
        })
    })
}

