<script setup>
import PrimaryButton from '../../components/PrimaryButton.vue';
import { RouterLink } from 'vue-router'
</script>

<template>
    <section class="w-full h-screen bg-[url('https://images.unsplash.com/photo-1543123452-278551b0e9a7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
       <div class="w-full h-full bg-black bg-opacity-70 flex items-center">
          <div class="mx-auto max-w-[510px] text-center">
            <span class="block text-lg font-semibold text-primary mb-2">
              PictoStick, we are creative
            </span>
            <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200  mb-2">
              PictoStick, <span class="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                  <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                      <li>we are creative</li>
                      <li>sticker generator</li>
                      <li>AI</li>
                      <li aria-hidden="true">we are creative</li>
                  </ul>
              </span>
            </div>
            <p class="text-base text-body-color dark:text-dark-6 mb-3">
              Start using our AI sticker generator!
            </p>
            <!-- <RouterLink :to="{ name: 'generate-sticker' }">
              <PrimaryButton>Let's get started</PrimaryButton>
            </RouterLink> -->
            <RouterLink :to="{ name: 'generate-nekosia' }">
              <PrimaryButton>nekosia</PrimaryButton>
            </RouterLink>
          </div>
       </div>
    </section>
</template>