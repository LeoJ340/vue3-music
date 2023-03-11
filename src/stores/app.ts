import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app', () => {
    const currentTheme = ref('red')

    return { currentTheme }
})
