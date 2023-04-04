import {request} from "@/utils/request";
import {PlayList} from "@/models/PlayList";

/**
 * 用户歌单列表
 */
export function playList(uid: number) {
    return request<{ playlist: Array<PlayList> }>('/user/playlist', 'GET', { uid }, true).then(res => {
        return res.playlist
    })
}
