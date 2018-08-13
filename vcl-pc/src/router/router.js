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
    title: '系统首页',
    role: [1, 2, 3, 4, 5, 6],
    icon: 'module-home'
  },
  component: Layout,
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '系统首页',
        navigator: true,
        role: [1, 2, 3, 4, 5, 6]
      },
      component: () => import('../../src/views/home/index/index.vue')
    }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/patient',
    name: 'patient',
    redirect: '/patient/index',
    meta: {
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
        meta: {
          title: '患者中心',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/patient/index/index.vue')
      },
      {
        path: 'detail/:id',
        name: 'patient_detail',
        navigator: false,
        meta: {
          title: '患者详情',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/patient/detail/detail.vue')
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    redirect: '/statistics/index',
    meta: {
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
          title: '数据统计',
          navigator: true,
          role: [1, 2, 3]
        },
        component: () => import('../../src/views/statistics/index/index.vue')
      }
    ]
  },
  {
    path: '/rules',
    name: 'rules',
    redirect: '/rules/index',
    meta: {
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
    redirect: '/form/index',
    meta: {
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
    redirect: '/systemManage/index',
    meta: {
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
        redirect: '/systemManage/index/user',
        meta: {
          title: '系统管理',
          navigator: false,
          role: [1]
        },
        component: () => import('../../src/views/systemManage/index/index.vue'),
        children: [
          {
            path: 'user',
            name: 'systemManage_user',
            meta: {
              title: '用户管理',
              navigator: false,
              role: [1]
            },
            component: () => import('../../src/views/systemManage/detail/user.vue')
          },
          {
            path: 'permission',
            name: 'systemManage_permission',
            meta: {
              title: '权限管理',
              navigator: false,
              role: [1]
            },
            component: () => import('../../src/views/systemManage/detail/permission.vue')
          },
          {
            path: 'log',
            name: 'systemManage_log',
            meta: {
              title: '日志管理',
              navigator: false,
              role: [1]
            },
            component: () => import('../../src/views/systemManage/detail/log.vue')
          },
          {
            path: 'settings',
            name: 'systemManage_settings',
            meta: {
              title: '系统设置',
              navigator: false,
              role: [1]
            },
            component: () => import('../../src/views/systemManage/detail/settings.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    redirect: '/project/index',
    meta: {
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
          title: '项目管理',
          navigator: false,
          role: [1, 2, 3]
        },
        component: () => import('../../src/views/project/index/index.vue')
      },
      {
        path: 'detail/:id',
        name: 'project_detail',
        meta: {
          title: '项目详情',
          navigator: false,
          role: [1, 2, 3]
        },
        component: () => import('../../src/views/project/detail/detail.vue'),
        children: [
          {
            path: 'basic',
            name: 'project_basic',
            meta: {
              title: '基本信息',
              navigator: false,
              role: [1, 2, 3]
            },
            component: () => import('../../src/views/project/detail/case/basic.vue')
          },
          {
            path: 'member',
            name: 'project_member',
            meta: {
              title: '项目成员',
              navigator: false,
              role: [1, 2, 3]
            },
            component: () => import('../../src/views/project/detail/case/member.vue')
          },
          {
            path: 'patientCase',
            name: 'project_patientCase',
            meta: {
              title: '入组案例',
              navigator: false,
              role: [1, 2, 3]
            },
            component: () => import('../../src/views/project/detail/case/patientCase.vue')
          },
          {
            path: 'projectStatistics',
            name: 'project_projectStatistics',
            meta: {
              title: '项目统计',
              navigator: false,
              role: [1, 2, 3]
            },
            component: () => import('../../src/views/project/detail/case/projectStatistics.vue')
          },
          {
            path: 'projectExport',
            name: 'project_projectExport',
            meta: {
              title: '数据导出',
              navigator: false,
              role: [1, 2, 3]
            },
            component: () => import('../../src/views/project/detail/case/projectExport.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    redirect: '/message/index',
    meta: {
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
          title: '消息中心',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/message/index/index.vue')
      }
    ]
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    redirect: '/helpCenter/index',
    meta: {
      title: '帮助中心',
      navigator: true,
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
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/helpCenter/index/index.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '开发测试',
      navigator: true,
      role: [1, 2, 3, 4, 5, 6],
      icon: 'general-relation'
    },
    component: Layout,
    redirect: '/test/index',
    children: [
      {
        path: 'index',
        name: 'test_index',
        meta: {
          title: '开发测试-导航列表同步滑动',
          navigator: false,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../../src/views/test/index.vue')
      },
      {
        path: '/test/editInput',
        name: 'editInput',
        meta: {
          title: '可编辑文本域',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../components/editInput/editInput.vue')
      },
      {
        path: '/test/print',
        name: 'print',
        meta: {
          title: '打印',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../components/print/print.vue')
      },
      {
        path: '/test/imgView',
        name: 'imgView',
        meta: {
          title: '图片预览',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../components/imgView/imgView.vue')
      },
      {
        path: '/test/c1',
        name: 'start',
        meta: {
          title: '表单1',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../views/content.vue')
      },
      {
        path: '/test/c2',
        name: 'c',
        meta: {
          title: '表单2',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../views/gc.vue')
      },
      {
        path: '/test/cartogram',
        name: 'cartogram',
        meta: {
          title: '统计图测试',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../components/cartogram/scalingChart.vue')
      },
      {
        path: '/test/order',
        name: 'order',
        meta: {
          title: 'order',
          navigator: true,
          role: [1, 2, 3, 4, 5, 6]
        },
        component: () => import('../components/order/order.vue')
      }
    ]
  }
]

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter
]
