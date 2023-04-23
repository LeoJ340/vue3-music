import {request} from "@/utils/request";
import {Banner} from "@/models/Banner";
import {PersonalizedPlayList} from "@/models/PlayList";
import {Song} from "@/models/Song";
import {PersonalizedMV, PrivateMV} from "@/models/MV";

/**
 * 首页Banner
 */
export function getBanners() {
    return new Promise<Banner[]>((resolve, reject) => {
        const params = { type: 0 }
        request<{ code: number, banners: Banner[] }>('/banner', 'GET', { params }).then(res => {
            const { code, banners } = res
            if (code === 200) {
                resolve(banners)
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
 * 推荐歌单列表（需要登录）
 */
export function getRecommendPlaylists() {
    return new Promise<PersonalizedPlayList[]>(resolve => {
        request<{ code: number, recommend: PersonalizedPlayList[] }>('/recommend/resource', 'POST', { needLogin: true }).then(res => {
            const { code, recommend } = res
            if (code === 200) {
                resolve(recommend)
            } else {
                ElMessage({
                    message: '系统异常',
                    type: 'error',
                    duration: 1000,
                    center: true
                })
            }
        })
    })
}

/**
 * 推荐歌单列表（不需要登录）
 */
export function getPersonalizedPlaylists(limit: number = 10) {
    return new Promise<PersonalizedPlayList[]>(resolve => {
        request<{ code: number, result: PersonalizedPlayList[] }>('/personalized', 'GET', { params: { limit } }).then(res => {
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
        })
    })
}

/**
 * 每日歌曲推荐（需要登录）
 */
export function getDailySongs() {
    return new Promise<Song[]>((resolve, reject) => {
        request<{ code: number, data: { dailySongs: Song[] } }>('/recommend/songs', 'POST', { needLogin: true }).then(res => {
            const { code, data } = res
            if (code === 200) {
                resolve(data.dailySongs)
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
 * 推荐MV
 */
export function getPersonalizedMV() {
    return new Promise<PersonalizedMV[]>(resolve => {
        request<{ code: number, result: PersonalizedMV[] }>('/personalized/mv', 'GET').then(res => {
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
        })
    })
}

/**
 * 推荐独家放送入口
 */
export function getPrivateMV() {
    return new Promise<PrivateMV[]>(resolve => {
        request<{ code: number, result: PrivateMV[] }>('/personalized/privatecontent', 'GET').then(res => {
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
        })
    })
}
