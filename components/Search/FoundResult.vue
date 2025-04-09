<template>
  <div class="group flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-gray-800/50">
    <!-- Show image -->
    <div class="flex-shrink-0 w-16 h-24 md:w-20 md:h-28 overflow-hidden rounded-md shadow-md">
      <NuxtImg
        :src="show.image?.medium || '/placeholder-image.png'"
        :alt="show.name"
        class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        format="webp"
        quality="80"
        width="160"
        height="225"
      />
    </div>
    
    <!-- Show details -->
    <div class="flex-1 min-w-0">
      <NuxtLink 
        :to="`/shows/${show.id}`" 
        class="block"
        @click="closeSearch"
      >
        <h3 class="text-lg font-medium text-white truncate group-hover:text-red-400 transition-colors">
          {{ show.name }}
        </h3>
        
        <div class="flex items-center mt-1">
          <div v-if="show.rating?.average" class="flex items-center text-yellow-400 mr-3">
            <Icon name="heroicons:star-solid" class="h-4 w-4 mr-1" />
            <span class="text-sm">{{ show.rating.average }}</span>
          </div>
          
          <div class="flex items-center text-gray-400 text-sm">
            <Icon name="heroicons:calendar" class="h-4 w-4 mr-1" />
            <span>{{ show.premiered?.substring(0, 4) || 'Unknown' }}</span>
          </div>
        </div>
        
        <div class="mt-2 flex flex-wrap gap-1">
          <span
v-for="genre in show.genres.slice(0, 2)" :key="genre" 
            class="px-2 py-0.5 bg-gray-700/70 text-xs rounded-full text-gray-300">
            {{ genre }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: TVShow;
}>();

// Get the closeSearch method from the parent Search component
const closeSearch = inject<() => void>('closeSearch');
</script> 