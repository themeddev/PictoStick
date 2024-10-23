<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import { RouterLink } from 'vue-router';

const images = [
  'https://images.unsplash.com/photo-1543123452-278551b0e9a7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1725069625011-bde91dc663af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1636690581110-a512fed05fd3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const currentImageIndex = ref(0);
const backgroundImage = ref(images[currentImageIndex.value]);

const changeBackgroundImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  backgroundImage.value = images[currentImageIndex.value];
};

let interval;

onMounted(() => {
  interval = setInterval(changeBackgroundImage, 5000); 
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
console.log(backgroundImage.value);
</script>


<template>
  <section 
    :style="{ backgroundImage: `url(${backgroundImage.value})`, transition: 'background-image 1s ease-in-out' }" 
    class="w-full h-screen bg-cover bg-center relative"
  >
    <div class="w-full h-full bg-black bg-opacity-70 flex items-center">
      <div 
        class="mx-auto flex items-center flex-col gap-4 text-center"
        v-motion-slide-visible-bottom
      >
        <div>
          <span class="block text-lg font-semibold text-primary mb-2">
            PictoStick
          </span>
          <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200 mb-2">
            PictoStick, 
            <span class="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                <li>we are creative</li>
                <li>sticker generator</li>
                <li>nekosia generator</li>
                <li>AI</li>
                <li aria-hidden="true">we are creative</li>
              </ul>
            </span>
          </div>
          <p class="text-base text-body-color dark:text-dark-6 mb-3">
            Start using our AI sticker generator!
          </p>
        </div>
        <div class="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
          <RouterLink :to="{ name: 'generate-sticker' }">
            <PrimaryButton>Stickers</PrimaryButton>
          </RouterLink>
          <RouterLink :to="{ name: 'generate-nekosia' }">
            <PrimaryButton>Nekosia</PrimaryButton>
          </RouterLink> 
        </div>
      </div>
    </div>
  </section>
</template>
