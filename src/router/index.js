import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top : 0};
        }
    },
    routes: [
        {
            path: '/',
            name: "Home",
            component: Home,
        }
    ]
})

export default router;