<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import HeadManager from '../../components/HeadManager.vue';
import PromptTextarea from './PromptTextarea.vue';

const pageTitle = "Generate Your Sticker | AI Sticker Generator";
const pageDescription = "Create unique stickers using our AI-powered sticker generator. Easy to use and fun!";
const ogImage = "URL_of_your_image";
</script>

<template>
  <!-- Pass metadata dynamically through props -->
  <HeadManager
    :title="pageTitle"
    :description="pageDescription"
    :image="ogImage"
  />

  <Breadcrumb />
  <div
    class="flex flex-col items-center justify-center gap-4 h-full w-full px-[4%] md:px-[10%] py-[10%]"
    v-motion-fade
  >
    <h2 class="text-center text-3xl font-medium text-gray-900 sm:text-6xl">
      Generate your Sticker, 
      <span class="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
        Start using our AI sticker generator
      </span>
    </h2>
    <div class="mt-4 w-[97%] md:w-[90%]">
      <PromptTextarea />
    </div>
  </div>
</template>

<style scoped>
.animate-text-gradient {
  background-size: 200% auto;
  animation: shine 3s linear infinite;
}

@keyframes shine {
  to {
    background-position: -200% center;
  }
}
</style>
