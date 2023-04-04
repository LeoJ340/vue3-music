import {request} from "@/utils/request";
import {Banner} from "@/models/Banner";
import {PersonalizedPlayList} from "@/models/PlayList";
import {Song} from "@/models/Song";
import {PersonalizedMV, PrivateMV} from "@/models/MV";

/**
 * 首页Banner
 */
export function getBanners() {
    return request<{ banners: Banner[] }>('/banner', 'GET', { type: 0 }).then(res => {
        return res.banners
    })
}

/**
 * 推荐歌单列表（需要登录）
 */
export function getRecommendPlaylists() {
    return request<{ recommend: PersonalizedPlayList[] }>('/recommend/resource', 'GET', {}, true).then(res => {
        return res.recommend
    })
}

/**
 * 推荐歌单列表（不需要登录）
 */
export function getPersonalizedPlaylists(limit: number = 10) {
    return request<{ result: PersonalizedPlayList[] }>('/personalized', 'GET', { limit }).then(res => {
        return res.result
    })
}

/**
 * 每日歌曲推荐（需要登录）
 */
export function getDailySongs() {
    return request<{ data: { dailySongs: Song[] } }>('/recommend/songs', 'GET', {}, true).then(res => {
        return res.data.dailySongs
    })
}

/**
 * 推荐MV
 */
export function getPersonalizedMV() {
    return request<{ result: PersonalizedMV[] }>('/personalized/mv', 'GET', {}).then(res => {
        return res.result
    })
}

/**
 * 推荐独家放送入口
 */
export function getPrivateMV() {
    return request<{ result: PrivateMV[] }>('/personalized/privatecontent', 'GET', {}).then(res => {
        return res.result
    })
}
