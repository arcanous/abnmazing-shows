<template>
  <NuxtLink 
    :to="to"
    class="inline-flex items-center text-gray-400 transition-colors hover:text-white"
  >
    <Icon name="heroicons:arrow-left" class="mr-2 h-5 w-5" />
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  text: string;
}>();
</script> 