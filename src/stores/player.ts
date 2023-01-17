import { defineStore } from 'pinia'
import { reactive, watch, computed } from "vue";
import { Tracks } from "@/models/PlayList";
import { SongUrl } from "@/models/SongUrl";
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
 * songUrl接口缓存
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
    const playList: Array<Tracks> = reactive([])
    const player = reactive({
        currentId: 0,
        currentTime: 0,
        duration: 0,
        paused: true,// 暂停
        ended: false,// 结束
        loopType: 0,//循环模式
        volume: parseInt(localStorage.getItem('PLAYER-VOLUME') || (audio.volume * 100).toString()),
        sliderInput: false// 进度条是否被拖拽
    })

    const disabled = computed(() => !player.currentId && !playList.length)
    const index = computed(() => playList.findIndex(item => item.id === player.currentId))
    const currentPlay = computed(() => playList.find(item => item.id === player.currentId))
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
            }
        })
    }

    function push(list: Array<Tracks>, replace: boolean = true) {
        if (replace) {
            playList.length = 0
            playList.push(...list)
        } else {
            playList.splice(index.value + 1, 0, ...list)
            push([...new Set(playList)], true)
        }
    }

    function clear() {
        audio.pause()
        playList.length = 0
        player.currentId = 0
        player.currentTime = 0
        player.duration = 0
        player.paused = true
        player.ended = false
    }

    async function play(id: number) {
        if (player.currentId === id) return
        const songUrl: SongUrl = await getSongUrl(id)
        audio.src = songUrl.url
        audio.play().then(_ => {
            player.currentId = id
            player.paused = false
            player.duration = audio.duration
            player.currentTime = 0
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
                    const nextIndex: number = Math.floor(Math.random() * playList.length)
                    play(playList[nextIndex].id)
                }, 2000)
            }
        }
    }

    function nextPlay() {
        if (disabled.value) return
        let currentIndex: number = index.value
        const nextIndex = currentIndex === playList.length - 1 ? 0 : ++currentIndex
        play(playList[nextIndex].id)
    }

    function prevPlay() {
        if (disabled.value) return
        let currentIndex: number = index.value
        const prevIndex: number = currentIndex === 0 ? playList.length - 1 : --currentIndex
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

    function setVolume(val: number) {
        localStorage.setItem('PLAYER-VOLUME', val.toString())
        player.volume = val
        audio.volume = val / 100
    }

    return {
        playList, player,
        disabled, index, currentPlay, loopType,
        init, interval, push, clear, play, togglePlay, onSliderInput, onSliderChange, nextLoopType, nextPlay, prevPlay, setVolume
    }
})
