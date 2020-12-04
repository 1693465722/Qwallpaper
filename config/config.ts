// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: './content/index',
    },
    {
      path: '/admin',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/admin',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/admin',
              redirect: '/admin/welcome',
            },
            {
              path: '/admin/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/admin/list',
              component: './ListTableList',
            },
            {
              name: '用户管理',
              icon: 'table',
              path: '/admin/userManagement',
              // component: './userManagement',
              routes: [
                {
                  path: '/admin/userManagement/Registered',
                  name: '注册用户',
                  icon: 'smile',
                  component: './userManagement/Registered',
                  authority: ['admin'],
                },
                {
                  path: '/admin/userManagement/Tourist',
                  name: '游客管理',
                  icon: 'smile',
                  component: './userManagement/Tourist',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: '壁纸管理',
              icon: 'table',
              path: '/admin/Wallpaper/index',
              component: './Wallpaper/index',
            },
            {
              name: '日志管理',
              icon: 'table',
              path: '/admin/Log/index',
              component: './Log/index',
            },
 
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
