import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/index/recommend',
            children: [
                {
                    path: 'index',
                    component: () => import('@/views/index/index.vue'),
                    meta: { title: '发现音乐' },
                    children: [
                        {
                            path: 'recommend',
                            name: 'Recommend',
                            component: () => import('@/views/index/Recommend.vue'),
                            meta: { title: '个性推荐' }
                        }
                    ]
                }
            ]
        },
        {
            path: '/my',
            component: Layout,
            meta: { title: '我的音乐' },
            children: [
                {
                    path: 'playlist/:id',
                    name: 'MyPlayList',
                    component: () => import('@/views/MyPlayList.vue'),
                    meta: { title: '我喜欢的音乐' }
                },
                {
                    path: 'cloud',
                    name: 'Cloud',
                    component: () => import('@/views/Cloud.vue'),
                    meta: { title: '我的音乐网盘' }
                }
            ]
        },
        {
            path: '/playlist',
            component: Layout,
            children: [
                {
                    path: ':id',
                    name: 'OtherPlayList',
                    component: () => import('@/views/OtherPlayList.vue')
                }
            ]
        }
    ]
})

export default router
