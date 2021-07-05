import { createWebHistory, createRouter } from "vue-router";
import Main from './components/Main.vue'
import About from './components/About.vue'
import PostsBySection from './components/PostsBySection.vue'
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import Register from "./components/Users/Registration";
import Login from "./components/Users/Login";
import Profile from "./components/Users/Profile";
import Contact from "./components/Contact";

const routes = [
    {
        path:  "/:catchAll(.*)",
        redirect: '/'
    },
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
    },
    {
        path: "/posts-by-section/:section",
        name: "post-by-section",
        component: PostsBySection,
        props: true
    },
    {
        path: "/user/:user",
        name: "user-profile",
        component: Profile,
        props: true
    },
    {
        path: "/post/:post",
        name: "post",
        component: Post,
        props: true
    },
    {
        path: "/new-post",
        name: "NewPost",
        component: NewPost,
    },
    {
        path: "/sign-up",
        name: "signUp",
        component: Register,
    },
    {
        path: "/sign-in",
        name: "signIn",
        component: Login,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
