import { createRouter, createWebHistory } from 'vue-router';
import Hero from './pages/Welcome/Hero.vue';
import GenerateSticker from './pages/GenerateSticker/Index.vue';
import Nekosia from './pages/Nekosia/index.vue';
import NotFound from './pages/NotFound/Index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Hero
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: NotFound
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
