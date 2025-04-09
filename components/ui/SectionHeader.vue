<template>
  <h2 class="text-xl font-semibold mb-4 flex items-center">
    <Icon :name="icon" class="h-5 w-5 text-red-500 mr-2" />
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script> 