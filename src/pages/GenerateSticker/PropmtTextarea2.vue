<script setup>
import { ref, onMounted } from 'vue';
import Replicate from 'replicate';

// Setup prompt state
const prompt = ref(null);
const textareaRef = ref(null);
const stickerUrl = ref(null);
const isLoading = ref(false);

// Function to resize the textarea dynamically
const resizeTextarea = () => {
  const textarea = textareaRef.value;
  textarea.style.height = 'auto';
  const maxHeight = 200;
  textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
};

const generateSticker = async () => {
  if (!prompt.value) return;

  isLoading.value = true;
  
  const replicate = new Replicate({
    auth: import.meta.env.VUE_APP_REPLICATE_API_TOKEN 
  });

  try {
    const input = {
      prompt: prompt.value,
      output_quality: 100
    };

    const output = await replicate.run(
      'fofr/sticker-maker:4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a',
      { input }
    );

    stickerUrl.value = output[0];
    console.log(output);
  } catch (error) {
    console.error('Error generating sticker:', error);
  } finally {
    isLoading.value = false;
  }
};

// Auto-resize textarea on mount
onMounted(() => {
  resizeTextarea();
});
</script>

<template>
  <div
    ref="formContainerRef"
    class="min:h-[200px] w-full overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700"
    style="border-radius: 12px"
  >
    <form
      class="flex h-full flex-col"
      @submit.prevent="generateSticker"
    >
      <!-- Dynamic height textarea -->
      <textarea
        ref="textareaRef"
        v-model="prompt"
        @input="resizeTextarea"
        class="w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
        style="max-height: 200px;"
        autofocus
        placeholder="Enter your prompt to generate a sticker..."
      />
      
      <div class="flex justify-end px-4 py-3 w-full">
        <!-- Submit Button -->
        <button
          :disabled="isLoading"
          class="flex gap-2 h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50"
          type="submit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd"></path>
          </svg>
          {{ isLoading ? 'Generating...' : 'Submit prompt' }}
        </button>
      </div>
      
      <!-- Display generated sticker -->
      <div v-if="stickerUrl" class="mt-4 flex justify-center">
        <img :src="stickerUrl" alt="Generated Sticker" class="max-w-full h-auto rounded-md border border-zinc-300" />
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Optional styling adjustments */
textarea {
  overflow-y: auto; /* Adds scroll if needed after hitting max-height */
}
</style>
