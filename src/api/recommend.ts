import request from "@/utils/request";
import {Banner} from "@/models/Banner";
import {Personalized} from "@/models/personalized";
import {Song} from "@/models/Song";

export async function banners(type: number = 0) {
    const { banners } = await request.get<{ banners: Array<Banner> }>('/banner', { type })
    return banners
}

// 推荐歌单列表（需要登录）
export async function recommendPlaylists() {
    const { recommend } = await request.get<{ recommend: Personalized[] }>('/recommend/resource', { cookie: sessionStorage.getItem('cookie') })
    return recommend
}

// 推荐歌曲列表（需要登录）
export async function recommendSongs() {
    const { data } = await request.get<{ data: { dailySongs: Song[] } }>('/recommend/songs', { cookie: sessionStorage.getItem('cookie') })
    return data.dailySongs
}

// 推荐歌单（不需要登录）
export async function personalized(limit: number = 10) {
    const { result } = await request.get<{ result: Personalized[] }>('/personalized', { limit })
    return result
}
