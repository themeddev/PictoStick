import { onMounted, onUnmounted } from 'vue';

export default function useClickOutside(ref, callback) {
  const handleClickOutside = (event) => {
    if (ref.value && !ref.value.contains(event.target)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
}
