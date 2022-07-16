import { defineConfig } from 'umi';
import Router from './src/index'

export default defineConfig({
  layout: {},			
  nodeModulesTransform: {
    type: 'none',
  },
  routes: Router,
  fastRefresh: {},
  dva: {
    immer: true,
  },
});
