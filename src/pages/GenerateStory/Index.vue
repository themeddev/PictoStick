<template>
    <Breadcrumb />
    <div 
        class="flex flex-col items-center justify-center gap-4 h-full w-full px-[4%] md:px-[10%] py-[10%]"
        v-motion-fade 
    >
        <h2 class="text-center text-3xl font-medium text-gray-900 sm:text-6xl">
            Generate a Story,
            <span class="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
                Start using our AI Story generator
            </span>
        </h2>
  
        <div class="mt-6 w-full lg:w-[80%]">
            <PromptTextarea
                :prompt="prompt"
                :isLoading="isLoading"
                @update:prompt="(newPrompt) => prompt = newPrompt"
                @generateStory="generateStory"
            />
        </div>
  
        <div v-if="isLoading" class="mt-6 flex justify-center">
            <p class="text-gray-500">Generating your story...</p>
        </div>
  
        <div v-if="responseData" class="flex justify-center items-center w-full">
            <div v-if="responseData.success" class="w-full md:w-[720px] mx-auto">
                <div   
                    class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full p-4 transition-opacity duration-500 ease-in-out"
                    v-motion-slide-bottom
                >
                    <h3 class="text-xl font-bold">Generated Story:</h3>
                    <p>{{ responseData.story }}</p>
                </div>
            </div>
            <div v-else class="mt-6 text-center text-gray-600">
                <p class="text-xl font-semibold">Oops! Please try again.</p>
                <p>{{ responseData.message }}</p>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import PromptTextarea from './PromptTextarea.vue'; // Corrected component name
  import axios from 'axios';
  import Breadcrumb from '../../components/Breadcrumb.vue';
  import { GoogleGenerativeAI as GoogleAI } from '@google/generative-ai'; // Renamed variable
  
  // State variables
  const prompt = ref('');
  const isLoading = ref(false);
  const responseData = ref(null);
  
  // Method to generate the story
  const generateStory = async () => {
      if (!prompt.value) return;
  
      isLoading.value = true;
      responseData.value = null; // Reset previous response
  
      try {
          // Initialize Google Generative AI with the API key
          const googleAI = new GoogleAI({
              apiKey: import.meta.env.VUE_APP_GEMINI_API_KEY // Use environment variable for security
          });
  
          // Call the API to generate a story
          const response = await googleAI.generate({
              prompt: prompt.value,
              maxTokens: 200, // Adjust max tokens as needed
              temperature: 0.7 // Adjust creativity level
          });
  
          // Set response data
          responseData.value = {
              success: true,
              story: response.text // Assuming response.text contains the generated story
          };
      } catch (error) {
          console.error('Error generating story:', error);
          responseData.value = {
              success: false,
              message: 'Failed to generate story. Please try again later.'
          };
      } finally {
          isLoading.value = false;
      }
  };
  </script>
  
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
  