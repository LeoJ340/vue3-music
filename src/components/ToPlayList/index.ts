import Dialog from './index.vue'
import {App, createApp} from "vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const { toLogin } = userStore
const { hasLogin } = storeToRefs(userStore)

let instance: App | null = null

function init(tracks: number[]) {
    instance = createApp(Dialog, { tracks });
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance.mount(container)
}

export function toPlayList(tracks: number[]) {
    if (!hasLogin.value) {
        toLogin()
        return
    }
    if (!instance) {
        init(tracks)
        instance!._instance!.exposed!.show()
    } else {
        instance!._instance!.exposed!.show()
    }
}
