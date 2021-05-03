/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Assets from '../views/Assets.vue';
import AssetDetails from '../views/AssetDetails.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/assets/91',
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
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
