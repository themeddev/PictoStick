import { createRouter, createWebHistory } from 'vue-router';
import Hero from './pages/Welcome/Hero.vue';
import GenerateSticker from './pages/GenerateSticker/Index.vue';
import Nekosia from './pages/Nekosia/Index.vue'; // fix importing Nekosia/Index.vue

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
  },
  {
    path: '/generate-nekosia',
    name: 'generate-nekosia',
    component: Nekosia
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
