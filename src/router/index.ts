import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

// 发现音乐子级路由
export const indexRoutes = [
    {
        path: 'recommend',
        name: 'Recommend',
        component: () => import('@/views/Discover/Recommend.vue'),
        meta: { title: '个性推荐' }
    },
    {
        path: 'playlist',
        name: 'PlayList',
        component: () => import('@/views/Discover/PlayList.vue'),
        meta: { title: '歌单' }
    },
    {
        path: 'toplist',
        name: 'TopList',
        component: () => import('@/views/Discover/TopList.vue'),
        meta: { title: '排行榜' }
    },
    {
        path: 'artist',
        name: 'Artist',
        component: () => import('@/views/Discover/Artist.vue'),
        meta: { title: '歌手' }
    },
    {
        path: 'new',
        name: 'New',
        component: () => import('@/views/Discover/New/index.vue'),
        meta: { title: '最新音乐' },
        redirect: '/discover/new/songs',
        children: [
            {
                path: 'songs',
                name: 'NewSongs',
                component: () => import('@/views/Discover/New/Songs.vue'),
                meta: { title: '新歌速递' }
            },
            {
                path: 'discs',
                name: 'NewDiscs',
                component: () => import('@/views/Discover/New/Discs.vue'),
                meta: { title: '新碟上架' }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/discover/recommend',
            children: [
                {
                    path: 'discover',
                    component: () => import('@/views/Discover/index.vue'),
                    redirect: '/discover/recommend',
                    meta: { title: '发现音乐' },
                    children: indexRoutes
                },
                {
                    path: 'dailySongs',
                    name: 'DailySongs',
                    component: () => import('@/views/Discover/DaySongs.vue'),
                    meta: { title: '每日歌曲推荐' }
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
                    component: () => import('@/views/common/PlayList.vue')
                }
            ]
        }
    ]
})

export default router
