import request from "@/utils/request";
import {Banner} from "@/models/Banner";
import {PersonalizedPlayList} from "@/models/PlayList";
import {Song} from "@/models/Song";
import {PersonalizedMV, PrivateMV} from "@/models/MV";

export async function getBanners(type: number = 0) {
    const { banners } = await request.get<{ banners: Array<Banner> }>('/banner', { type })
    return banners
}

// 推荐歌单列表（需要登录）
export async function recommendPlaylists() {
    const { recommend } = await request.get<{ recommend: PersonalizedPlayList[] }>('/recommend/resource', { cookie: sessionStorage.getItem('cookie') })
    return recommend
}

// 推荐歌曲列表（需要登录）
export async function recommendSongs() {
    const { data } = await request.get<{ data: { dailySongs: Song[] } }>('/recommend/songs', { cookie: sessionStorage.getItem('cookie') })
    return data.dailySongs
}

// 推荐歌单（不需要登录）
export async function getPersonalizedPlaylists(limit: number = 10) {
    const { result } = await request.get<{ result: PersonalizedPlayList[] }>('/personalized', { limit })
    return result
}

// 推荐MV（不需要登录）
export async function getPersonalizedMV() {
    const { result } = await request.get<{ result: PersonalizedMV[] }>('/personalized/mv')
    return result
}

// 推荐独家放送（不需要登录）
export async function getPrivateMV(limit: number, page: number) {
    const { result } = await request.get<{ result: PrivateMV[] }>('/personalized/privatecontent', {
        offset:(page - 1) * limit,
        limit
    })
    return result
}
