<template>
  <span
    class="rounded-full bg-gray-700/70 px-3 py-1 text-xs text-gray-200"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script> 