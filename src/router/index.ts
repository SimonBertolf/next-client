/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import {
  Assets,
  AssetDetails,
  WidgetLayout,
  WidgetLayouts,
  Root,
  ReportPrint,
  Dashboards,
  DashboardRedirect,
  NotFound,
} from '../views';
import { Health } from '../components/util';
import { ProtectedRoutes } from '../components/auth/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '',
        redirect: '/health',
      },
      {
        path: '/health',
        component: Health,
      },
      {
        path: '',
        component: ProtectedRoutes,
        children: [
          {
            path: '/dashboards',
            component: DashboardRedirect,
          },
          {
            path: '/dashboards/:dashboardId',
            component: Dashboards,
            props: true,
          },
          {
            path: '/assets',
            component: Assets,
          },
          {
            path: '/assets/:assetId',
            props: true,
            component: AssetDetails,
          },
          {
            path: '/layouts',
            component: WidgetLayouts,
          },
          {
            path: '/layouts/:layoutId',
            props: true,
            component: WidgetLayout,
          },
          {
            path: '/reports/:reportId/print',
            props: true,
            component: ReportPrint,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
