// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 公共页面（无布局）
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ResetPasswordView from '@/views/login/ResetPassword.vue'

// 布局组件
const MainLayout = () => import('@/layouts/MainLayout.vue')

// 需要布局的页面
const ProjectListView = () => import('@/views/projects/ProjectListView.vue')
const ProjectCreateView = () => import('@/views/projects/ProjectCreateView.vue')
const ProjectEditView = () => import('@/views/projects/ProjectEditView.vue')
const ProjectDetailView = () => import('@/views/projects/ProjectDetailView.vue')
const UserListView = () => import('@/views/user/UserListView.vue')

const routes = [
  // 公开路由（无布局）
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/reset-password', component: ResetPasswordView },

  // 受保护路由（使用 MainLayout）
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', redirect: '/projects' },
      { path: 'projects', component: ProjectListView },
      { path: 'projects/new', component: ProjectCreateView },
      { path: 'projects/edit/:id', component: ProjectEditView },
      { path: 'projects/:id', component: ProjectDetailView, props: true },
      { path: 'users', component: UserListView, meta: { requiresAdmin: true } }
    ]
  },

  // 404
  { path: '/:pathMatch(.*)*', redirect: '/projects' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to) => {
  // const token = localStorage.getItem('access_token')
  // const publicPaths = ['/login', '/register', '/reset-password']

  // if (!publicPaths.includes(to.path) && !token) {
  //   return '/login'
  // }

  // if (publicPaths.includes(to.path) && token) {
  //   return '/projects'
  // }

  // if (to.meta.requiresAdmin) {
  //   const userStr = localStorage.getItem('user_info')
  //   if (!userStr) {
  //     localStorage.removeItem('access_token')
  //     return '/login'
  //   }
  //   try {
  //     const user = JSON.parse(userStr)
  //     if (!['超级管理员', '管理员'].includes(user.level)) {
  //       return '/projects'
  //     }
  //   } catch (e) {
  //     localStorage.removeItem('access_token')
  //     localStorage.removeItem('user_info')
  //     return '/login'
  //   }
  // }
})

export default router