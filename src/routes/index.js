import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/v_search.vue")
        },
        {
            path: "/param",
            name: "param",
            component: () => import("@/views/v_entry.vue")
        },
    ]
})

export default router