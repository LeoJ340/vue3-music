import request from "@/utils/request";
import {MV, TopMV} from "@/models/MV";

export async function getMVList(params: { area?: string, type?: string, order?: string, limit?: number, offset?: number }) {
    const { data } = await request.get<{ count: number, hasMore: boolean, data: MV[] }>(`/mv/all`, params)
    return data
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

export async function getTopMV(params: { area?: string, limit?: number, offset?: number }) {
    const { data } = await request.get<{ data: TopMV[] }>(`/top/mv`, params)
    return data
}


