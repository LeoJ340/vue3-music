import { defineStore } from 'pinia'
import { reactive, watch, computed } from "vue";
import { Song } from "@/models/song";
import { getSongUrl } from "@/api";
import type { Icon } from "@icon-park/vue-next/lib/runtime";
import { LoopOnce, PlayOnce, ShuffleOne } from '@icon-park/vue-next';

interface Loop {
    id: number
    text: string
    icon: Icon
}

/**
 * TODO:
 * 防抖、节流
 * 进度条bug
 */
export const usePlayerStore = defineStore('player', () => {
    const audio = new Audio()
    const loopTypes: Array<Loop> = [
        {
            id: 0,
            text: '列表循环',
            icon: LoopOnce
        },
        {
            id: 1,
            text: '单曲循环',
            icon: PlayOnce
        },
        {
            id: 2,
            text: '随机播放',
            icon: ShuffleOne
        }
    ]
    let playList: Array<Song> = reactive([])
    const player = reactive({
        currentId: 0,
        currentTime: 0,
        duration: 0,
        paused: true,// 暂停
        ended: false,// 结束
        loopType: 0,//循环模式
        muted: false,
        volume: audio.volume,
        sliderInput: false// 进度条是否被拖拽
    })

    const disabled = computed(() => !player.currentId && !playList.length)
    const index = computed(() => playList.findIndex(item => item.id === player.currentId))
    const loopType = computed(() => loopTypes.find(loop => loop.id === player.loopType))

    function interval() {
        if (!player.currentId) return
        if (!player.paused && !player.sliderInput) {
            player.currentTime = audio.currentTime
            player.paused = audio.paused
            player.ended = audio.ended
        }
    }

    function init() {
        watch(() => player.ended, ended => {
            if (ended) {
                player.paused = true
                playEnd()
                setTimeout(() => {
                    player.sliderInput = false
                }, 1000)
            }
        })
    }

    function push(list: Array<Song>, replace: boolean = true) {
        if (replace) {
            playList.length = 0
            playList.push(...list)
        } else {
            playList.splice(index.value + 1, 0, ...list)
        }
    }

    async function play(id: number) {
        if (player.currentId === id) return
        const data = await getSongUrl(id)
        audio.src = data.url
        audio.play().then(_ => {
            player.currentId = id
            player.paused = false
            player.duration = audio.duration
        })
    }

    function playEnd() {
        if (!loopType.value) return
        if (!loopTypes.includes(loopType.value)) return
        switch (loopType.value.id) {
            case 0: {
                setTimeout(nextPlay, 2000)
                break
            }
            case 1: {
                setTimeout(togglePlay, 2000)
                break
            }
            case 2: {
                setTimeout(() => {
                    let nextIndex = Math.floor(Math.random() * playList.length)
                    console.log(nextIndex, playList[nextIndex].id)
                    play(playList[nextIndex].id)
                }, 2000)
            }
        }
    }

    function nextPlay() {
        if (disabled.value) return
        let currentIndex = index.value
        const nextIndex = currentIndex === playList.length - 1 ? 0 : ++currentIndex
        play(playList[nextIndex].id)
    }

    function prevPlay() {
        if (disabled.value) return
        let currentIndex = index.value
        const prevIndex = currentIndex === 0 ? playList.length - 1 : --currentIndex
        play(playList[prevIndex].id)
    }

    function togglePlay() {
        if (disabled.value) return
        if (!player.currentId) return
        if (player.paused) {
            audio.play().then(_ => {
                player.paused = false
            })
        } else {
            audio.pause()
            player.paused = true
            player.currentTime = audio.currentTime
        }

    }

    function onSliderInput() {
        player.sliderInput = true
    }

    function onSliderChange(val: number) {
        player.sliderInput = false
        player.currentTime = val
        audio.currentTime = val
    }

    function nextLoopType() {
        if (disabled.value) return
        if (player.loopType === loopTypes.length - 1) {
            player.loopType = 0
        } else {
            player.loopType++
        }
    }

    return {
        playList, player,
        disabled, index, loopType,
        init, interval, push, play, togglePlay, onSliderInput, onSliderChange, nextLoopType, nextPlay, prevPlay
    }
})
