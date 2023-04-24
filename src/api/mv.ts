import {request} from '@/utils/request'
import {MV, MVUrl, PrivateMV, TopMV} from "@/models/MV";
import {Video} from "@/models/Video";

/**
 * MV列表
 */
export function getMVList(params: { area?: string, type?: string, order?: string, limit?: number, page?: number }) {
    const reqParams = {
        area: params.area,
        type: params.type,
        order: params.order,
        limit: params.limit,
        offset: ((params.page || 1) - 1) * (params.limit || 50)
    }
    return new Promise<{count?: number; hasMore: boolean; data: MV[]}>((resolve, reject) => {
        request<{ code: number, count?: number, hasMore: boolean, data: MV[] }>('/mv/all', 'GET', { params: reqParams }).then(res => {
            const { code, count, data, hasMore } = res
            if (code === 200) {
                resolve({ count, data, hasMore })
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 最新MV
 */
export function getFirstMV(params: { area?: string, limit?: number }) {
    return new Promise<MV[]>((resolve, reject) => {
        request<{ code: number, data: MV[] }>('/mv/first', 'GET', { params }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * 网易出品MV
 */
export function getExclusiveMV(params: { limit: number, page: number }) {
    const { limit = 30, page = 1 } = params
    const reqParams = {
        limit,
        offset: (page - 1) * limit
    }
    return new Promise<MV[]>((resolve, reject) => {
        request<{ code: number, data: MV[], more: boolean }>(`/mv/exclusive/rcmd`, 'GET', { params: reqParams }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}

/**
 * MV排行
 */
export function getTopMV(params: { area?: string, limit?: number }) {
    return new Promise<TopMV[]>((resolve, reject) => {
        request<{ code: number, data: TopMV[], hasMore: boolean, updateTime: number }>('/top/mv', 'GET', { params }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}

/**
 * MV详情
 * @param mvid
 */
export function getMVDetail(mvid: number) {
    return new Promise<MV>((resolve, reject) => {
        request<{ code: number, data: MV }>('/mv/detail', 'GET', { params: { mvid } }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}

/**
 * MV地址
 */
export function getMVUrl(id: number) {
    return new Promise<MVUrl>((resolve, reject) => {
        request<{ code: number, data: MVUrl }>('/mv/url', 'GET', { params: { id } }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}

/**
 * MV交互信息
 */
export function getMVLikeCount(mvid: number) {
    return new Promise<{ likedCount: number, liked: boolean }>((resolve, reject) => {
        request<{ code: number, likedCount: number, liked: boolean }>('/mv/detail/info', 'GET', { params: { mvid } }).then(res => {
            const { code, likedCount, liked } = res
            if (code === 200) {
                resolve({ likedCount, liked })
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}

/**
 * MV交互信息
 */
export function getRelatedVideos(mvid: number) {
    return new Promise<Video[]>((resolve, reject) => {
        request<{ code: number, data: Video[] }>('/related/allvideo', 'GET', { params: { id: mvid } }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            reject(reason)
        })
    })
}

/**
 * 独家放送列表
 */
export function getPrivateMVList(limit: number, page: number) {
    const params = {
        limit,
        offset: (page - 1) * limit
    }
    return new Promise<PrivateMV[]>((resolve, reject) => {
        request<{ code: number, result: PrivateMV[] }>('/personalized/privatecontent/list', 'GET', { params }).then(res => {
            const { code, result } = res
            if (code === 200) {
                resolve(result)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        }).catch(reason => {
            // 需要处理显示网络异常
            reject(reason)
        })
    })
}
