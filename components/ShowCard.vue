<template>
  <NuxtLink 
    :to="`/show/${show.id}`" 
    class="flex-none w-40 transform transition duration-200 hover:scale-105 relative group"
  >
    <NuxtImg 
      :src="show.image.medium" 
      :alt="show.name" 
      width="160" 
      height="225" 
      class="rounded-md shadow-lg"
      loading="lazy"
    />
    <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-md">
      <p class="text-white text-sm font-medium truncate">{{ show.name }}</p>
      <div class="flex items-center mt-1">
        <span v-if="show.rating?.average" class="text-yellow-400 text-xs">★ {{ show.rating.average }}</span>
        <span v-else class="text-gray-400 text-xs">No rating</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  show: TVShow;
}>();
</script> 