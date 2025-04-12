<script setup lang="ts">
defineProps<{
  show: TVShow;
}>();
</script> 

<template>
  <NuxtLink 
    :to="`/shows/${show.id}`" 
    class="group relative flex-none w-40 transform transition duration-200 hover:scale-105"
  >
    <NuxtImg 
      :src="show.image?.medium || '/placeholder-image.webp'" 
      :alt="show.name" 
      width="160" 
      height="225" 
      class="rounded-md shadow-lg"
      loading="lazy"
      format="webp"
    />
    <div class="absolute bottom-0 left-0 right-0 rounded-b-md bg-gradient-to-t from-black to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <p class="truncate text-sm font-medium text-white">{{ show.name }}</p>
      <div class="mt-1 flex items-center">
        <span v-if="show.rating?.average" class="text-xs text-yellow-400">★ {{ show.rating.average }}</span>
        <span v-else class="text-xs text-gray-400">No rating</span>
      </div>
    </div>
  </NuxtLink>
</template> 