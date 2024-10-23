<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import { RouterLink } from 'vue-router';
import imgUrl1 from '../../assets/heroBg1.webp'
import imgUrl2 from '../../assets/heroBg2.avif'
import imgUrl3 from '../../assets/heroBg3.avif'
import imgUrl4 from '../../assets/heroBg4.avif'

const images = [
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
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

</script>


<template>
  <section 
    :style="{ backgroundImage: `url(${backgroundImage})`, transition: 'background-image 1s ease-in-out' }" 
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
