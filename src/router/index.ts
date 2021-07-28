/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import {
  Assets,
  Asset,
  WidgetLayouts,
  ReportPrint,
  Dashboards,
  DashboardRedirect,
  NotFound,
  Reporting,
  Admin,
} from '@/views';
import { WidgetEditor, DashboardsAdmin } from '@/components/admin';
import { AssetData, AssetAttributes } from '@/components/assets';
import { Analysis, Reports, Report } from '@/components/reporting';
import { Health } from '../components/util';
import { ProtectedRoutes } from '../components/auth/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/health',
    component: Health,
  },
  {
    path: '/',
    component: ProtectedRoutes,
    children: [
      {
        path: '',
        redirect: '/dashboards',
      },
      {
        path: '/dashboards',
        component: DashboardRedirect, // use redirect component because target is dynamic (_id of first dashboard)
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
        redirect: '/assets/:assetId/data',
        component: Asset,
        children: [
          {
            path: 'data',
            props: true,
            component: AssetData,
          },
          {
            path: 'attributes',
            props: true,
            component: AssetAttributes,
          },
        ],
      },
      {
        path: '/reporting',
        props: true,
        redirect: '/reporting/reports',
        component: Reporting,
        children: [
          {
            path: 'reports',
            component: Reports,
          },
          {
            path: 'reports/:reportId',
            props: true,
            component: Report,
          },
          {
            path: 'analysis',
            component: Analysis,
          },
        ],
      },
      {
        path: '/reporting/reports/:reportId/print',
        props: true,
        component: ReportPrint,
      },
      {
        path: '/admin',
        props: true,
        redirect: '/admin/layouts',
        component: Admin,
        children: [
          {
            path: 'layouts',
            component: WidgetLayouts,
          },
          {
            path: 'layouts/:layoutId',
            props: true,
            component: WidgetEditor,
          },
          {
            path: 'dashboards',
            component: DashboardsAdmin,
          },
        ],
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
