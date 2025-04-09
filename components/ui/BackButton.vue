<template>
  <NuxtLink 
    :to="to"
    class="inline-flex items-center text-gray-400 hover:text-white transition-colors"
  >
    <Icon name="heroicons:arrow-left" class="h-5 w-5 mr-2" />
    {{ text }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
  text: string;
}>();
</script> 