<template>
  <button
    class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/80 border border-gray-700/50 shadow-inner hover:shadow-md hover:bg-gray-700/80 transition-all duration-300 text-gray-300 hover:text-white cursor-pointer"
    aria-label="Open search"
    @click="$emit('click')"
  >
    <Icon name="heroicons:magnifying-glass" class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void
}>();
</script> 