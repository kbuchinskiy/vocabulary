import Vocabulary from '@/views/Vocabulary.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Vocabulary,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
