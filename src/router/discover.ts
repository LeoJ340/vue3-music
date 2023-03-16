// 发现音乐子级路由
export default [
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
