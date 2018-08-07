import Layout from '../views/layout/index'

// 登录页面
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('../views/login/login')
}

// 错误页面:传入错误码
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error-错误'
  },
  component: () =>
    import('../views/error/index')
}

// 子页面子组件
export const otherRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    navigator: true,
    requireAuth: true,
    title: '首页',
    role: [1, 2, 3, 4, 5, 6],
    icon: 'module-home'
  },
  component: Layout,
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true,
        title: '首页',
        navigator: true,
        role: [1, 2, 3, 4, 5, 6]
      },
      component: () => import('../../src/views/home/index.vue')
    }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/patient',
    name: 'patient',
    title: '患者中心',
    redirect: '/patient/index',
    meta: {
      requireAuth: true,
      title: '患者中心',
      navigator: true,
      role: [1, 2, 3, 4, 5, 6],
      icon: 'module-patient'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'patient_index',
        title: '患者中心',
        navigator: true,
        meta: {
          requireAuth: true,
          title: '患者中心',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/patient/index.vue')
      },
      {
        path: 'detail/:id',
        name: 'patient_detail',
        title: '患者详情',
        navigator: true,
        meta: {
          requireAuth: true,
          title: '患者详情',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/patient/detail.vue')
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    redirect: '/statistics/index',
    title: '数据统计',
    meta: {
      requireAuth: true,
      title: '数据统计',
      navigator: true,
      role: [1, 2, 3],
      icon: 'module-data'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'statistics_index',
        meta: {
          requireAuth: true,
          title: '数据统计',
          navigator: true,
          role: [1, 2, 3]
        },
        component: () => import('../../src/views/statistics/index.vue')
      }
    ]
  },
  {
    path: '/rules',
    name: 'rules',
    title: '任务中心',
    redirect: '/rules/index',
    meta: {
      requireAuth: true,
      title: '任务中心',
      navigator: true,
      // role: [2, 3, 4, 5, 6],
      role: [1, 2, 3, 4, 5, 6],
      icon: 'module-task'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'rules_index',
        meta: {
          requireAuth: true,
          title: '任务中心',
          navigator: true,
          // role: [2, 3, 4, 5, 6]
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/rules/index.vue')
      },
      {
        path: 'lr/:data',
        name: 'lr',
        meta: {
          requireAuth: true,
          title: '数据录入',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/rules/lr.vue')
      },
      {
        path: 'sh/:data',
        name: 'sh',
        meta: {
          requireAuth: true,
          title: '数据审核',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/rules/sh.vue')
      },
      {
        path: 'xz/:data',
        name: 'xz',
        meta: {
          requireAuth: true,
          title: '数据修正',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/rules/xz.vue')
      },
      {
        path: 'sf/:data',
        name: 'sf',
        meta: {
          requireAuth: true,
          title: '随访',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/rules/sf.vue')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: '表单管理',
    redirect: '/form/index',
    meta: {
      requireAuth: true,
      title: '表单管理',
      navigator: true,
      role: [1],
      icon: 'module-form'
    },
    component: Layout,
    children: [
      {
        redirect: '/form/index/bdk',
        path: 'index',
        name: 'form_index',
        meta: {
          requireAuth: true,
          title: '表单管理',
          navigator: true,
          role: [1]
        },
        component: () => import('../../src/views/form/index.vue'),
        children: [
          {
            path: 'bdk',
            name: 'bdk',
            meta: {
              requireAuth: true,
              title: '表单库',
              navigator: true,
              role: [1]
            },
            component: () => import('../../src/views/form/bdk.vue')
          },
          {
            path: 'zdk',
            name: 'zdk',
            meta: {
              requireAuth: true,
              title: '字段库',
              navigator: true,
              role: [1]
            },
            component: () => import('../../src/views/form/zdk.vue')
          },
          {
            path: 'syk',
            name: 'syk',
            meta: {
              requireAuth: true,
              title: '术语库',
              navigator: true,
              role: [1]
            },
            component: () => import('../../src/views/form/syk.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/systemManage',
    name: 'systemManage',
    title: '系统管理',
    redirect: '/systemManage/index',
    meta: {
      requireAuth: true,
      title: '系统管理',
      navigator: true,
      role: [1],
      icon: 'module-system'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'systemManage_index',
        meta: {
          requireAuth: true,
          title: '系统管理',
          navigator: false,
          role: [1]
        },
        component: () => import('../../src/views/systemManage/index.vue')
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    title: '项目管理',
    redirect: '/project/index',
    meta: {
      requireAuth: true,
      title: '项目管理',
      navigator: true,
      role: [1, 2, 3],
      icon: 'module-project'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'project_index',
        meta: {
          requireAuth: true,
          title: '项目管理',
          navigator: false,
          role: [1, 2, 3]
        },
        component: () => import('../../src/views/project/index.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    title: '消息中心',
    redirect: '/message/index',
    meta: {
      requireAuth: true,
      title: '消息中心',
      navigator: false,
      role: [1, 2, 3, 4, 5, 6],
      icon: 'statistics'
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'message_index',
        meta: {
          requireAuth: true,
          title: '消息中心',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/message/index.vue')
      }
    ]
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    title: '帮助中心',
    redirect: '/helpCenter/index',
    meta: {
      title: '帮助中心',
      navigator: true,
      requireAuth: false,
      role: [1, 2, 3, 4, 5, 6]
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'helpCenter_index',
        meta: {
          title: '帮助中心',
          navigator: true,
          requireAuth: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/helpCenter/index.vue')
      }
    ]
  }
  // {
  //   path: '/test',
  //   name: 'test',
  //   title: '开发测试',
  //   meta: {
  //     title: '开发测试',
  //     navigator: true,
  //     requireAuth: true,
  //     role: [1, 2, 3, 4, 5, 6],
  //     icon: 'general-relation'
  //   },
  //   component: Layout,
  //   redirect: '/test/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'test_index',
  //       meta: {
  //         title: '开发测试-导航列表同步滑动',
  //         navigator: false,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../../src/views/test/index.vue')
  //     },
  //     {
  //       path: '/test/editInput',
  //       name: 'editInput',
  //       meta: {
  //         title: '可编辑文本域',
  //         navigator: true,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../components/editInput/editInput.vue')
  //     },
  //     {
  //       path: '/test/print',
  //       name: 'print',
  //       meta: {
  //         title: '打印',
  //         navigator: true,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../components/print/print.vue')
  //     },
  //     {
  //       path: '/test/imgView',
  //       name: 'imgView',
  //       meta: {
  //         title: '图片预览',
  //         navigator: true,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../components/imgView/imgView.vue')
  //     },
  //     {
  //       path: '/test/c1',
  //       name: 'start',
  //       meta: {
  //         title: '表单1',
  //         navigator: true,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../views/content.vue')
  //     },
  //     {
  //       path: '/test/c2',
  //       name: 'c',
  //       meta: {
  //         title: '表单2',
  //         navigator: true,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../views/gc.vue')
  //     },
  //     {
  //       path: '/test/cartogram',
  //       name: 'cartogram',
  //       meta: {
  //         title: '统计图测试',
  //         navigator: true,
  //         requireAuth: false,
  //         role: [1, 2, 3, 4, 5, 6]
  //       },
  //       component: () => import('../components/cartogram/scalingChart.vue')
  //     }
  //   ]
  // }
]

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter
]
