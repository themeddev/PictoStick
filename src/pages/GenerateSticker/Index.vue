<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import PropmtTextarea from './PropmtTextarea.vue';
</script>

<template>
    <Breadcrumb />
    <div 
        class="flex flex-col items-center justify-center gap-4 h-full w-full px-[4%] md:px-[10%] py-[10%]"
        v-motion-slide-bottom
    >
        <h2 class="text-center text-3xl font-medium text-gray-900 sm:text-6xl">Generate your Sticker,<!-- --> 
            <span class="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">Start using our AI sticker generator</span>
        </h2>
        <div class="mt-4 w-[97%] md:w-[90%]">
            <PropmtTextarea />
        </div>
    </div>
</template>
  
  
<style lang="css" scoped>
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
  