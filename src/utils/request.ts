import axios, { type AxiosRequestConfig } from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:3000',
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
    res => {
        // console.log(res)
        return res
    },
    error => {
        return Promise.reject(error);
    }
)

export default service
