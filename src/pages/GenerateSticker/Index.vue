<script setup>
    import PropmtTextarea from './PropmtTextarea.vue';
</script>

<template>
    <div class="flex flex-col items-center justify-center min:h-screen w-full p-[4%] md:p-[10%]">
        <h2 class="text-center text-3xl font-medium text-gray-900 sm:text-6xl">Generate your Sticker,<!-- --> 
            <span class="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">Start using our AI sticker generator</span>
        </h2>
        <div class="mt-4 w-[95%]">
            <PropmtTextarea />
        </div>
    </div>
</template>
  
  
  <style scoped>
  
  </style>
  