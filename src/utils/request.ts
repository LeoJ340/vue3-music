import axios, { type AxiosRequestConfig } from 'axios'

const service = axios.create({
    baseURL: 'https://service-flgzov7m-1259174451.gz.apigw.tencentcs.com/',
    // baseURL: 'http://localhost:3000',
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
        return res
    },
    error => {
        return Promise.reject(error);
    }
)

const http = {
    get<T>(url: string, params?: object): Promise<T> {
        return new Promise((resolve, reject) => {
            service.get(url, { params }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    },
}

export default http
