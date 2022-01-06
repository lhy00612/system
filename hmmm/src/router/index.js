import { createRouter, createWebHistory } from "vue-router";

// 导入登录页面组件
import Login from "@/views/Login";

import Home from "@/views/Home"

// 声明路由规则
const routes = [
  // 如果地址为根路径，直接跳转到登录页面
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
