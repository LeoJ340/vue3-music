import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import discoverChildren from "@/router/discover";
import videoChildren from "@/router/video";

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
                    children: discoverChildren
                },
                {
                    path: 'dailySongs',
                    name: 'DailySongs',
                    component: () => import('@/views/Discover/DaySongs.vue'),
                    meta: { title: '每日歌曲推荐' }
                },
                {
                    path: 'highQualityPlayList',
                    name: 'HighQualityPlayList',
                    component: () => import('@/views/Discover/HighQualityPlayList.vue'),
                    meta: { title: '精选歌单' }
                },
                /**
                 * 视频
                 */
                {
                    path: 'video',
                    component: () => import('@/views/Video/index.vue'),
                    redirect: '/video/mv',
                    meta: { title: '视频' },
                    children: videoChildren
                },
                {
                    path: 'topMV',
                    name: 'TopMV',
                    component: () => import('@/views/Video/TopMV.vue'),
                    meta: { title: 'MV排行榜' }
                },
                {
                    path: 'allMV',
                    name: 'AllMV',
                    component: () => import('@/views/Video/AllMV.vue'),
                    meta: { title: '全部MV' }
                },
                {
                    path: 'mv/:id',
                    name: 'MVDetail',
                    component: () => import('@/views/Video/MVDetail.vue'),
                    meta: { title: 'MV详情' }
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

router.beforeEach(async(to, from, next) => {
    // @ts-ignore
    document.title = to.meta.title
    next()
})

export default router
