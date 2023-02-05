import request from "@/utils/request";
import {PlayList} from "@/models/PlayList";

export async function playList(uid: string) {
    return await request.get<{ playlist: Array<PlayList> }>('/user/playlist', { uid, cookie: sessionStorage.getItem('cookie') })
}
