import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/home',
    component: Layout,
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/data-analyse',
    component: Layout,
    children: [
      {
        path: '/data-analyse',
        name: 'DataAnalyse',
        component: () => import('@/views/data-analyse/index'),
        meta: { title: '数据分析', icon: 'el-icon-data-analysis' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/index'),
        meta: { title: '管理员列表', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/scenic',
    component: Layout,
    children: [
      {
        path: '/scenic',
        name: 'Scenic',
        component: () => import('@/views/scenic/index'),
        meta: { title: '景点列表', icon: 'el-icon-place' }
      }
    ]
  },
  {
    path: '/strategy',
    component: Layout,
    children: [
      {
        path: '/strategy',
        name: 'Strategy',
        component: () => import('@/views/strategy/index'),
        meta: { title: '攻略列表', icon: 'el-icon-notebook-1' }
      }
    ]
  },
  {
    path: '/forum',
    component: Layout,
    children: [
      {
        path: '/forum',
        name: 'Forum',
        component: () => import('@/views/forum/index'),
        meta: { title: '论坛列表', icon: 'el-icon-chat-dot-square' }
      }
    ]
  },
  {
    path: '/forum-comment',
    name: 'ForumComment',
    component: Layout,
    meta: { title: '论坛评论', icon: 'el-icon-chat-line-round' },
    children: [
      {
        path: '/main-comment',
        name: ' MainComment',
        component: () => import('@/views/forum-comment/main-comment'),
        meta: { title: '主评论', icon: 'el-icon-chat-line-round' }
      },
      {
        path: '/sub-comment',
        name: ' SubComment',
        component: () => import('@/views/forum-comment/sub-comment'),
        meta: { title: '子评论', icon: 'el-icon-chat-line-round' }
      }
    ]

  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {
        path: '/feedback',
        name: 'Feedback',
        component: () => import('@/views/feedback/index'),
        meta: { title: '意见反馈', icon: 'el-icon-question' }
      }
    ]
  },
  {
    path: '/files',
    component: Layout,
    children: [
      {
        path: '/files',
        name: 'Files',
        component: () => import('@/views/files/index'),
        meta: { title: '文件上传', icon: 'el-icon-folder-opened' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
