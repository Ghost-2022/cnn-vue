import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/model-training/index',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/data',
    component: Layout,
    redirect: '/data/trainingset',
    name: 'DataModel',
    meta: {
      title: t('router.DataModel'),
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'trainingset',
        name: 'TrainingSet',
        component: () => import('@/views/DataModel/TrainingSet.vue'),
        meta: {
          title: t('router.TrainingSet')
        }
      },
      {
        path: 'testset',
        name: 'Testset',
        component: () => import('@/views/DataModel/Testset.vue'),
        meta: {
          title: t('router.Testset')
        }
      }
    ]
  },
  {
    path: '/model-training',
    component: Layout,
    redirect: '/model-training/index',
    name: 'ModelTraining',
    meta: {
      title: t('router.ModelTraining'),
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'index',
        name: 'ModelTraining',
        component: () => import('@/views/ModelTraining/ModelTraining.vue'),
        meta: {
          title: t('router.ModelTraining')
        }
      }
    ]
  },
  {
    path: '/traffic-identification',
    component: Layout,
    redirect: '/traffic-identification/index',
    name: 'TrafficIdentification',
    meta: {
      title: t('router.TrafficIdentification'),
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'index',
        name: 'TrafficIdentification',
        component: () => import('@/views/TrafficIdentification/TrafficIdentification.vue'),
        meta: {
          title: t('router.TrafficIdentification')
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
