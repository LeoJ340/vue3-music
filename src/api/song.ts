import request from "@/utils/request";
import {Song} from "@/models/Song";

export async function getDailySongs() {
    const { data } = await request.get<{ data: { dailySongs: Song[] } }>('/recommend/songs', { cookie: sessionStorage.getItem('cookie') })
    return data.dailySongs
}
