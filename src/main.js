import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
import { MotionPlugin } from '@vueuse/motion'
import VueHead from 'vue-head'

createApp(App)
  .use(router)
  .use(MotionPlugin)
  .use(VueHead)
  .mount('#app');


 