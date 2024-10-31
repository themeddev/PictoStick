<!-- src/components/HeadManager.vue -->
<template>
    <vue-head>
      <title>{{ title }}</title>
      <meta name="description" :content="description" />
      <meta name="keywords" :content="keywords" />
      <meta name="author" :content="author" />
      <meta property="og:title" :content="title" />
      <meta property="og:description" :content="description" />
      <meta property="og:type" content="website" />
      <meta property="og:url" :content="url" />
      <meta property="og:image" :content="image" />
    </vue-head>
  </template>
  
  <script setup>
    
  const props = defineProps({
    title: { type: String },
    description: { type: String, default: 'AI Genarators' },
    keywords: { type: String, default: 'AI, sticker generator, create stickers, unique designs' },
    author: { type: String, default: 'Themeddev' },
    url: { type: String, default: window.location.href },
    image: { type: String, default: 'image_URL' }
  });
  </script>
  
  <style scoped>

  </style>
  