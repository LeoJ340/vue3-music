import request from "@/utils/request";
import { PlayList } from "@/models/PlayList";
import { SongUrl } from "@/models/SongUrl";

export async function getSongUrl(id: number): Promise<SongUrl> {
    const res = await request.get('/song/url', { params: { id } })
    return res.data[0]
}

export async function getPlayList(id: number): Promise<PlayList> {
    const { playlist } = await request.get('playlist/detail', { params: { id } })
    return playlist
}
