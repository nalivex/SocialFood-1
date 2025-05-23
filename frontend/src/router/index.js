import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Start from "../views/HomeView.vue";
import Home from "../components/Home.vue";
import Profile from "../components/Profile.vue";
import UserProfile from "../components/UserProfile.vue";

const routes = [
  { path: "/user/:id", component: UserProfile },
  { path: "/profile", component: Profile },
  { path: "/home", component: Home },
  { path: "/", component: Start },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
