<template>
  <span
    class="px-3 py-1 bg-gray-700/70 text-xs rounded-full text-gray-200"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script> 