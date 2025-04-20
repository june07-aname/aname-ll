// Composables
import { createRouter, createWebHistory } from 'vue-router'

export default (app) => {
    const setupRoutes = () => {
        return [
            {
                path: '/:name/:publicKey',
                name: 'aname-index',
                meta: {
                    title: 'Aname Index',
                    transition: 'animate__animated animate__bounceIn',
                },
                component: () => import('@/views/IndexMain.vue')
            }, {
                path: '/:catchAll(.*)',
                name: 'catchall',
                component: () => import('@/views/IndexMain.vue')
            },
        ]
    }
    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes: setupRoutes(),
    })

    app.use(router)
}
