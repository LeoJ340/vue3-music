import {Song, TopSong} from "@/models/Song";

// TopSong类型转换Song
export function useToSong(topSong: TopSong): Song {
    return {
        id: topSong.id,
        name: topSong.name,
        al: topSong.album,
        alia: topSong.alias,
        ar: topSong.artists,
        dt: topSong.duration,
        noCopyrightRcmd: {
            type: 0,
            typeDesc: ''
        },
        publishTime: topSong.album.publishTime
    }
}
