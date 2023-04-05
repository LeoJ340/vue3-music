import router from "@/router";

export function toCommonPlayList(id: string | number) {
    router.push(`/common/playlist/${id}`)
}

export function toCommonArtist(id: string | number) {
    router.push(`/common/artist/${id}`)
}

export function toCommonUser(id: string | number) {
    router.push(`/common/user/${id}`)
}
