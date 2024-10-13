<script setup>
import GlobalLayout from './components/GlobalLayout.vue'

</script>

<template>
  <GlobalLayout>
    <div class="h-screen w-screen bg-gradient-to-l from-gray-200 via-fuchsia-300 to-stone-100 flex items-center justify-center">
      <h1>PictoStick</h1>
    </div>
  </GlobalLayout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
