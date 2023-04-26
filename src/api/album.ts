import {request} from "@/utils/request";
import {Album} from "@/models/Album";
import {Song} from "@/models/Song";

/**
 * 专辑详情
 */
export function getAlbum(id: number) {
    return new Promise<Album>((resolve, reject) => {
        request<{ code: number, album: Album, songs: Song[] }>('/album', 'POST', { data: { id }, needLogin: true }).then(res => {
            const { code, album, songs } = res
            if (code === 200) {
                album.songs = songs
                resolve(album)
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
