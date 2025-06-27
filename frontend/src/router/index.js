import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Start from "../views/HomeView.vue";
import Home from "../components/Home.vue";
import Profile from "../components/Profile.vue";
import CarDetail from "@/components/carDetail.vue";
import BookingView from "@/views/BookingView.vue";

const routes = [
  { path: "/profile", component: Profile },
  { path: "/home", component: Home },
  { path: "/", component: Start },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
  { path: "/car/:id", component: CarDetail, name: "carDetail" },
  {
    path: "/api/bookings/:id",
    component: BookingView,
    name: "bookingView",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({
        path: "/login",
        query: { redirect: to.fullPath }, // guarda a rota que o usuário tentou acessar
      });
    }
  }

  next();
});

export default router;
