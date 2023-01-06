import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

// interface Route {
//     path: string
//     name?: string
//     hidden?: boolean
//     component: any
//     meta?: {
//         title: string
//     }
//     redirect?: string
//     children?: Array<Route>
// }

const routes= [
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
