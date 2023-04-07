import Dialog from './index.vue'
import {App, createApp} from "vue";

let instance: App | null = null

function init(tracks: number[]) {
    instance = createApp(Dialog, { tracks });
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance.mount(container)
}

export function toPlayList(tracks: number[]) {
    if (!instance) {
        init(tracks)
    }
    instance!._instance!.exposed!.show()
}
