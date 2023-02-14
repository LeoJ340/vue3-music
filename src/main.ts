import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.css' // global css
import '@/styles/utils.scss'
import '@/styles/theme.scss'
import '@/styles/element-plus.scss'
import '@/styles/player.scss'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
