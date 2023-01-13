import request from "@/utils/request";

export async function getSongUrl(id: number) {
    const { data } = await request.get('/song/url', { params: { id } })
    return data.data[0]
}

export async function getPlayList(id: number) {
    const { data } = await request.get('playlist/detail', { params: { id } })
    return data
}
