<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { animate } from 'motion';
import useClickOutside from '../../hooks/useClickOutside';
// import { ArrowLeftIcon } from 'lucide-vue';

const isOpen = ref(false);
const note = ref(null);
const formContainerRef = ref(null);

const openMenu = () => {
  isOpen.value = true;
};

const closeMenu = () => {
  isOpen.value = false;
  note.value = null;
};

useClickOutside(formContainerRef, closeMenu);

// Handle Escape key press to close the popover
onMounted(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
});
</script>

<template>
  <div class="relative flex items-center justify-center">
    <!-- Button -->
    <button
      @click="openMenu"
      class="flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50"
      style="border-radius: 8px"
    >
      <span class="text-sm">Add Note</span>
    </button>

    <!-- Popover -->
    <div
      v-if="isOpen"
      ref="formContainerRef"
      class="absolute h-[200px] w-[364px] overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700"
      style="border-radius: 12px"
      v-motion
      v-motion:enter="{ opacity: 0, y: -20 }"
      v-motion:leave="{ opacity: 0, y: 20 }"
    >
      <form
        class="flex h-full flex-col"
        @submit.prevent
      >
        <span
          v-if="!note"
          class="absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400"
        >
          Add Note
        </span>
        <textarea
          class="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
          autofocus
          @input="(e) => note.value = e.target.value"
        />
        <div class="flex justify-between px-4 py-3">
          <!-- Close Button -->
          <button
            type="button"
            class="flex items-center"
            @click="closeMenu"
            aria-label="Close popover"
          >
            +
            <!-- <ArrowLeftIcon size="16" class="text-zinc-900 dark:text-zinc-100" /> -->
          </button>

          <!-- Submit Button -->
          <button
            class="relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
            type="submit"
            @click="closeMenu"
          >
            Submit Note
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add your scoped styles here */
</style>
