import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ResetPasswordView from '@/views/login/ResetPassword.vue'
import ProjectListView from '@/views/projects/ProjectListView.vue'
import ProjectCreateView from '@/views/projects/ProjectCreateView.vue'
import ProjectEditView from '@/views/projects/ProjectEditView.vue'
import ProjectDetailView from '@/views/projects/ProjectDetailView.vue'
import UserListView from '@/views/user/UserListView.vue'


const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/reset-password', component: ResetPasswordView },
  // { path: '/', redirect: '/projects' },
  { path: '/projects', component: ProjectListView },
  { path: '/projects/new', component: ProjectCreateView }, // 👈 新增这一行
  { path: '/projects/edit/:id', component: ProjectEditView },  
  { path: '/projects/:id', component: ProjectDetailView, props: true },
  // { path: '/projects/edit/:id', component: ProjectEditView },
  { path: '/users', component: UserListView, meta: { requiresAdmin: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to) => {
  // const token = localStorage.getItem('access_token') // ✅ 改为 'access_token'
  // const publicPaths = ['/login', '/register', '/reset-password']

  // // 1. 未登录用户只能访问公开页面
  // if (!publicPaths.includes(to.path) && !token) {
  //   return '/login'
  // }

  // // 2. 已登录用户访问登录/注册页，自动跳首页
  // if (publicPaths.includes(to.path) && token) {
  //   return '/projects'
  // }

  // // 3. 需要管理员权限的路由
  // if (to.meta.requiresAdmin) {
  //   const userInfoStr = localStorage.getItem('user_info')
  //   if (!userInfoStr) {
  //     // 用户信息缺失，重新登录
  //     localStorage.removeItem('access_token')
  //     return '/login'
  //   }

  //   try {
  //     const user = JSON.parse(userInfoStr)
  //     // 根据你的接口，字段是 level，值如 "超级管理员"
  //     if (user.level !== '超级管理员' && user.level !== '管理员') {
  //       ElMessage.warning('无权限访问')
  //       return '/projects'
  //     }
  //   } catch (e) {
  //     console.error('用户信息解析失败', e)
  //     localStorage.removeItem('access_token')
  //     localStorage.removeItem('user_info')
  //     return '/login'
  //   }
  // }
})

export default router