<template>
    <Breadcrumb />
    <div class="flex flex-col items-center justify-center gap-4 h-full w-full px-[4%] md:px-[10%] py-[10%]" v-motion-fade>
      <h2 class="text-center text-3xl font-medium text-gray-900 sm:text-6xl">
        Generate a Story,
        <span class="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
          Start using our AI Story generator
        </span>
      </h2>
      <div class="mt-6 w-full lg:w-[80%] promptTextArea">
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
        <div v-if="responseData.success" class="w-full lg:w-[80%] mx-auto">
            <div
                class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border card rounded-xl w-full p-5 transition-opacity duration-500 ease-in-out"
                v-motion-slide-bottom
            >
                <h3 class="text-xl font-bold mb-2">Generated Story:</h3>
                <p>{{ responseData.story }}</p>
            </div>
            <div class="inline-flex flex-wrap items-center gap-3 group mx-auto mt-4 justify-end w-full">
                <!-- regenerate text -->
                <span
                    @click="generateStory"
                    class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <img src="../../assets/startover.png" class="w-5 h-5" alt="start over">
                </span>
                 <!-- Copy text -->
                 <span
                    @click="copyText"
                    class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <svg class="w-5 h-5" alt="copy text" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#31BAFD;" cx="256" cy="256" r="256"></circle> <path style="fill:#2B9ED8;" d="M511.245,275.797L369.778,134.332L206.583,319.785l-70.087,78.438l113.705,113.705 c1.929,0.043,3.862,0.072,5.801,0.072C390.723,512,501.138,407.931,511.245,275.797z"></path> <polygon style="fill:#E6F3FF;" points="320.779,85.333 193.384,85.333 193.384,337.325 369.778,337.325 369.778,134.332 "></polygon> <polygon style="fill:#CFDBE6;" points="369.778,134.332 320.779,85.333 268.643,85.333 268.643,337.325 369.778,337.325 "></polygon> <polygon style="fill:#B8C9D9;" points="320.779,134.332 369.778,134.332 320.779,85.333 "></polygon> <polygon style="fill:#B5F1F4;" points="292.335,113.778 164.94,113.778 164.94,365.77 341.333,365.77 341.333,162.776 "></polygon> <polygon style="fill:#94E0E0;" points="341.333,162.776 292.335,113.778 231.865,113.778 231.865,365.77 341.333,365.77 "></polygon> <polygon style="fill:#B5F1F4;" points="292.335,162.776 341.333,162.776 292.335,113.778 "></polygon> <polygon style="fill:#FFFFFF;" points="263.89,146.232 136.495,146.232 136.495,398.222 312.889,398.222 312.889,195.229 "></polygon> <polygon style="fill:#E6F3FF;" points="312.889,195.229 263.89,146.23 210.604,146.23 210.604,398.222 312.889,398.222 "></polygon> <polygon style="fill:#CFDBE6;" points="263.89,195.229 312.889,195.229 263.89,146.232 "></polygon> </g></svg>
                </span>
            </div>
        </div>
        <div v-else class="mt-6 text-center text-gray-600" v-motion-slide-bottom>
            <p class="text-xl font-semibold">Oops! Please try again.</p>
            <p>{{ responseData.message }}</p>
        </div>
      </div>
    </div>
    <!-- Alert Component -->
    <Alert v-if="showAlert" :messageText="messageText" :status="status" />
  </template>
  
<script setup>
  import { ref } from 'vue';
  import PromptTextarea from './PromptTextarea.vue';
  import Breadcrumb from '../../components/Breadcrumb.vue';
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import Alert from '../../components/Alert.vue';
  const showAlert = ref(false);
  
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_API_KEY);
  
  // State variables
  const prompt = ref('');
  const isLoading = ref(false);
  const responseData = ref(null);
  const messageText = ref('');
  const status = ref('');
  
  // Method to generate the story
  const generateStory = async () => {
    
    if (!prompt.value) return;
  
    isLoading.value = true;
    responseData.value = null;
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" }, { apiVersion:'v1beta' });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
            // response_mime_type:'application/json'
        };

        const parts = [
            { text: prompt.value },
        ];

        const response = await model.generateContent({
            contents: [
                { role: "user", parts }
            ],
            generationConfig
        });

      // Set response data
      responseData.value = {
        success: true,
        story: response.response.text()
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

// Copy Text Method
const copyText = () => {
  if (responseData.value && responseData.value.success) {
    navigator.clipboard.writeText(responseData.value.story).then(() => {
      messageText.value = "Text copied successfully!";
      status.value = "success";
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
        }, "2000");
    }).catch(() => {
      messageText.value = "Failed to copy text.";
      status.value = "error";
      showAlert.value = true;
    });
  }
};
</script>
  
<style lang="css" scoped>
  .animate-text-gradient {
    background-size: 200% auto;
    animation: shine 3s linear infinite;
  }
  .promptTextArea {
    transition: all 0.3s ease-in;
  }
  .card {
    text-align: justify;
    text-justify: inter-word;
    transition: all 0.3s ease-in;
  }
  .card:hover, .promptTextArea:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  
  
  @keyframes shine {
    to {
      background-position: -200% center;
    }
  }

</style>
  