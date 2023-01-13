import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/my/cloud',
        hidden: true,
        children: []
    },
    {
        path: '/my',
        component: Layout,
        meta: { title: '我的音乐' },
        children: [
            {
                path: 'playlist/:id',
                name: 'Playlist',
                component: () => import('@/views/PlayList.vue'),
                meta: { title: '我喜欢的音乐' }
            },
            {
                path: 'cloud',
                name: 'Cloud',
                component: () => import('@/views/Cloud.vue'),
                meta: { title: '我的音乐网盘' }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
