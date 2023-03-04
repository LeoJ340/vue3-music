import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import '@/styles/index.css' // global css
import '@/styles/utils.scss'
import '@/styles/theme.scss'
import '@/styles/element-plus.scss'
import '@/styles/player.scss'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
