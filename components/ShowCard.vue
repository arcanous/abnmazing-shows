<template>
  <NuxtLink 
    :to="`/show/${show.id}`" 
    class="flex-none w-40 transform transition duration-200 hover:scale-105"
  >
    <NuxtImg 
      :src="show.image.medium" 
      :alt="show.name" 
      width="160" 
      height="225" 
      class="rounded-md shadow-lg"
      loading="lazy"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  show: TVShow;
}>();
</script> 