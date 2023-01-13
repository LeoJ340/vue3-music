import { defineStore } from 'pinia'
import { reactive, toRef, watch, computed } from "vue";
import { Song } from "@/models/song";
import { songUrl } from "@/api";

export const usePlayerStore = defineStore('player', () => {
    const audio = new Audio()
    let playList: Array<Song> = reactive([])
    const player = reactive({
        currentId: 0,
        currentTime: 0,
        duration: 0,
        paused: true,// 暂停
        ended: false,// 结束
        loopType: 0,//循环模式 0 单曲循环 1 列表循环 2随机播放
        muted: false,
        volume: audio.volume,
        sliderInput: false// 进度条是否被拖拽
    })

    const index = computed(() => playList.findIndex(item => item.id === player.currentId))

    function interval() {
        if (!player.currentId) return
        if (!player.paused && !player.sliderInput) {
            player.currentTime = audio.currentTime
            player.paused = audio.paused
            player.ended = audio.ended
        }
    }

    function init() {
        const ended = toRef(player, "ended")
        watch(() => ended, ended => {
            if (ended) {
                player.paused = true
                setTimeout(() => {
                    player.sliderInput = false
                }, 1000)
            }
        })
    }

    function push(list: Array<Song>) {
        playList.push(...list)
    }

    async function play(id: number) {
        if (player.currentId === id) return
        const data = await songUrl(id)
        audio.src = data.url
        audio.play().then(_ => {
            player.currentId = id
            player.paused = false
            player.duration = audio.duration
        })
    }

    function togglePlay() {
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

    return {
        playList, player,
        index,
        init, interval, push, play, togglePlay, onSliderInput, onSliderChange
    }
})
