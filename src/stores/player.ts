import { defineStore } from 'pinia'
import { reactive, watch, computed } from "vue";
import { Song } from "@/models/Song";
import { getSongUrl } from "@/api/song";
import type { Icon } from "@icon-park/vue-next/lib/runtime";
import { LoopOnce, PlayOnce, ShuffleOne } from '@icon-park/vue-next';

interface Loop {
    id: number
    text: string
    icon: Icon
}

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
    const songs: Array<Song> = reactive([])
    const player = reactive({
        currentId: 0,
        currentTime: 0,
        duration: 0,
        paused: true,// 暂停
        ended: false,// 结束
        loopType: 0,//循环模式
        volume: parseInt(localStorage.getItem('PLAYER-VOLUME') || (audio.volume * 100).toString()),
        sliderInput: false,// 进度条是否被拖拽
        error: false
    })

    const disabled = computed(() => !player.currentId && !songs.length)
    const index = computed(() => songs.findIndex(item => item.id === player.currentId))
    const currentPlay = computed(() => songs.find(item => item.id === player.currentId))
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

    function push(list: Array<Song>, replace: boolean = true) {
        if (!list.length) return
        if (replace) {
            clear()
            songs.push(...list)
            player.currentId = songs[0].id
            play()
        } else {
            songs.splice(index.value + 1, 0, ...list)
            push([...new Set(songs)], true)
        }
    }

    function clear() {
        audio.pause()
        songs.length = 0
        player.currentId = 0
        player.currentTime = 0
        player.duration = 0
        player.paused = true
        player.ended = false
    }

    let timer: number | null = null;
    function play() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            getSongUrl(player.currentId).then(songUrl => {
                audio.src = songUrl.url
                audio.play().then(_ => {
                    player.error = false
                    player.paused = false
                    player.duration = audio.duration
                    player.currentTime = 0
                })
            }).catch(_ => {
                audio.pause()
                player.error = true
                player.paused = true
                player.duration = 0
                player.currentTime = 0
            }).finally(() => {
                timer = null
            })
        }, 1000)
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
                    const nextIndex: number = Math.floor(Math.random() * songs.length)
                    player.currentId = songs[nextIndex].id
                    play()
                }, 2000)
            }
        }
    }

    function nextPlay() {
        if (disabled.value) return
        audio.pause()
        player.paused = true
        player.currentTime = 0
        let currentIndex: number = index.value
        const nextIndex = currentIndex === songs.length - 1 ? 0 : ++currentIndex
        player.currentId = songs[nextIndex].id
        play()
    }

    function prevPlay() {
        if (disabled.value) return
        audio.pause()
        player.paused = true
        player.currentTime = 0
        let currentIndex: number = index.value
        const prevIndex: number = currentIndex === 0 ? songs.length - 1 : --currentIndex
        player.currentId = songs[prevIndex].id
        play()
    }

    function togglePlay() {
        if (disabled.value) return
        if (!player.currentId) return
        if (player.error) {
            play()
            return
        }
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

    function playImmediately(song: Song) {
        if (songs.map(item => item.id).includes(song.id)) return
        audio.pause()
        player.paused = true
        player.currentTime = 0
        songs.splice(index.value - 1, 0, song)
        player.currentId = song.id
        play()
    }

    return {
        songs, player,
        disabled, index, currentPlay, loopType,
        init, interval, push, clear, togglePlay, onSliderInput, onSliderChange, nextLoopType, nextPlay, prevPlay, setVolume, playImmediately
    }
})
