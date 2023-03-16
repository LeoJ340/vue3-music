import request from "@/utils/request";
import {MV, MVUrl, TopMV} from "@/models/MV";

export async function getMVList(params: { area?: string, type?: string, order?: string, limit?: number, page?: number }) {
    const { data, count } = await request.get<{ count?: number, hasMore: boolean, data: MV[] }>(`/mv/all`, {
        area: params.area,
        type: params.type,
        order: params.order,
        limit: params.limit,
        offset: ((params.page || 1) - 1) * (params.limit || 50)
    })
    return { data, count }
}

export async function getFirstMV(params: { area?: string, limit?: number }) {
    const { data } = await request.get<{ data: MV[] }>(`/mv/first`, params)
    return data
}

export async function getExclusiveMV(limit: number = 30, page: number = 0) {
    const { data } = await request.get<{ data: MV[] }>(`/mv/exclusive/rcmd`, {
        limit,
        offset: (page - 1) * limit
    })
    return data
}

export async function getTopMV(params: { area?: string, limit?: number }) {
    const { data } = await request.get<{ data: TopMV[] }>(`/top/mv`, params)
    return data
}

export async function getMVDetail(mvid: number) {
    const { data } = await request.get<{ data: MV }>('/mv/detail', { mvid })
    return data
}

export async function getMVUrl(id: number) {
    const { data } = await request.get<{ data: MVUrl }>('/mv/url', { id })
    return data
}

export async function getMVLikeCount(mvid: number) {
    const { likedCount } = await request.get<{ likedCount: number }>('/mv/detail/info', { mvid })
    return likedCount
}
