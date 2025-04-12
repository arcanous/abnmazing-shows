<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>();
</script> 

<template>
  <button
    class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/80 text-gray-300 shadow-inner transition-all duration-300 hover:bg-gray-700/80 hover:text-white hover:shadow-md"
    aria-label="Open search"
    @click="$emit('click')"
  >
    <Icon name="heroicons:magnifying-glass" class="h-5 w-5" />
  </button>
</template> 