import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import discoverChildren from "@/router/discover";
import videoChildren from "@/router/video";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
                    component: () => import('@/views/Video/MV/TopMV.vue'),
                    meta: { title: 'MV排行榜' }
                },
                {
                    path: 'allMV',
                    name: 'AllMV',
                    component: () => import('@/views/Video/MV/AllMV.vue'),
                    meta: { title: '全部MV' }
                },
                {
                    path: 'mv/:id',
                    name: 'MVDetail',
                    component: () => import('@/views/Video/MV/MVDetail.vue'),
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
        // 公共页
        {
            path: '/common',
            component: Layout,
            children: [
                {
                    path: 'playlist/:id',
                    name: 'CommonPlayList',
                    component: () => import('@/views/common/PlayList.vue')
                },
                {
                    path: 'artist/:id',
                    name: 'ArtistDetail',
                    component: () => import('@/views/common/Artist/index.vue'),
                    meta: { title: '歌手详情' }
                },
                {
                    path: 'user/:id',
                    name: 'User',
                    component: () => import('@/views/common/User.vue'),
                    meta: { title: '用户主页' }
                }
            ]
        }
    ]
})

router.beforeEach(async(to, from, next) => {
    document.title = to.meta?.title as string
    next()
})

export default router
