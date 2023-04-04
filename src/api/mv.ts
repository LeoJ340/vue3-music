import { request } from '@/utils/request'
import {MV, MVUrl, TopMV} from "@/models/MV";

/**
 * MV列表
 */
export function getMVList(params: { area?: string, type?: string, order?: string, limit?: number, page?: number }) {
    return request<{ count?: number, hasMore: boolean, data: MV[] }>('/mv/all', 'GET', {
        area: params.area,
        type: params.type,
        order: params.order,
        limit: params.limit,
        offset: ((params.page || 1) - 1) * (params.limit || 50)
    }).then(res => {
        return res
    })
}

/**
 * 最新MV
 */
export function getFirstMV(params: { area?: string, limit?: number }) {
    return request<{ data: MV[] }>('/mv/first', 'GET', params).then(res => {
        return res.data
    })
}

/**
 * 网易出品MV
 */
export function getExclusiveMV(params: { limit: number, page: number }) {
    const { limit = 30, page = 1 } = params
    return request<{ data: MV[], more: boolean }>(`/mv/exclusive/rcmd`, 'GET', {
        limit,
        offset: (page - 1) * limit
    }).then(res => {
        return res.data
    })
}

/**
 * MV排行
 */
export function getTopMV(params: { area?: string, limit?: number }) {
    return request<{ data: TopMV[], hasMore: boolean, updateTime: number }>(`/top/mv`, 'GET', params).then(res => {
        return res.data
    })
}

/**
 * MV详情
 * @param mvid
 */
export function getMVDetail(mvid: number) {
    return request<{ code: number, data: MV }>('/mv/detail', 'GET', { mvid }).then(res => {
        return res.data
    })
}

/**
 * MV地址
 */
export function getMVUrl(id: number) {
    return request<{ data: MVUrl }>('/mv/url', 'GET', { id }).then(res => {
        return res.data
    })
}

/**
 * MV交互信息
 */
export function getMVLikeCount(mvid: number) {
    return request<{ likedCount: number, liked: boolean }>('/mv/detail/info', 'GET', { mvid }, true).then(res => {
        return res
    })
}
