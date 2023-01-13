import request from "@/utils/request";

export async function songs() {
    // TODO：写死一个列表接口，用于调试
    const params = {
        id: 934870683,
        limit: 10
    }
    const { data } = await request.get('playlist/track/all', { params })
    return data.songs
}

export async function songUrl(id: number) {
    const { data } = await request.get('/song/url', { params: { id } })
    return data.data[0]
}
