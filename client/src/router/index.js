import Vocabulary from '@/views/Vocabulary.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Words',
    },
  },
  {
    path: '/words',
    name: 'Words',
    component: Vocabulary,
  },
  {
    path: '/words/:origin',
    name: 'WordPage',
    component: () => import('@/views/WordPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
