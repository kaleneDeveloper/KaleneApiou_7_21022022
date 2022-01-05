import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login",
        },
        metaTags: [
            {
                name: "description",
                content: "The home page of our example app.",
            },
            {
                property: "og:description",
                content: "The home page of our example app.",
            },
        ],
    },
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Home.vue"),
        meta: {
            title: "Home",
        },
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
            meta: {
              title: "About",
          },
    },
    {
        path: "/posts",
        name: "posts",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Posts.vue"),
            meta: {
              title: "Posts",
          },
    },   
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => { 
    document.title = to.name;
    next();
});
export default router;
