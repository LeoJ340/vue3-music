export default [
    {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/Video/Video.vue'),
        meta: { title: '视频' }
    },
    {
        path: 'mv',
        name: 'MV',
        component: () => import('@/views/Video/MV/index.vue'),
        meta: { title: 'MV' }
    }
]
