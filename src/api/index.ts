import request from "@/utils/request";
import { PlayList } from "@/models/PlayList";
import { SongUrl } from "@/models/SongUrl";

export async function getSongUrl(id: number): Promise<SongUrl> {
    const { data } = await request.get<{ data: SongUrl[] }>('/song/url', { id })
    return data[0]
}

export async function getPlayList(id: number): Promise<PlayList> {
    const { playlist } = await request.get<{ playlist: PlayList }>('/playlist/detail', { id })
    return playlist
}
