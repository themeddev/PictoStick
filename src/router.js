import { createRouter, createWebHistory } from 'vue-router';
import Hero from './pages/Welcome/Hero.vue';
import GenerateSticker from './pages/GenerateSticker/Index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Hero
  },
  {
    path: '/generate-sticker',
    name: 'generate-sticker',
    component: GenerateSticker
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
