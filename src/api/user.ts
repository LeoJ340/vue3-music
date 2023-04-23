import {newRequest} from "@/utils/request";
import {PlayList} from "@/models/PlayList";

/**
 * 用户歌单列表
 */
export function playList(uid: number) {
    return new Promise<Array<PlayList>>((resolve, reject) => {
        newRequest<{ code: number, playlist: Array<PlayList> }>('/user/playlist', 'GET', { params: { uid }, needLogin: true }).then(res => {
            const { code, playlist } = res
            if (code === 200) {
                resolve(playlist)
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
