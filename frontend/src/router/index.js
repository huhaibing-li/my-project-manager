import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ResetPasswordView from '@/views/login/ResetPassword.vue'
import ProjectListView from '@/views/projects/ProjectListView.vue'
import ProjectDetailView from '@/views/projects/ProjectDetailView.vue'
import UserListView from '@/views/user/UserListView.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/reset-password', component: ResetPasswordView },
  { path: '/', redirect: '/projects' },
  { path: '/projects', component: ProjectListView },
  { path: '/projects/:id', component: ProjectDetailView, props: true },
  { path: '/users', component: UserListView, meta: { requiresAdmin: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && to.path !== '/register' && to.path !== '/reset-password' && !token) {
    return '/login'
  }
  if (to.meta.requiresAdmin) {
    // 简化：假设 token 解码后有 role
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.role !== 'admin') {
      return '/projects'
    }
  }
})

export default router
