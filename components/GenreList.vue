<template>
  <article class="mb-12">
    <div class="flex items-center mb-4">
      <h2 class="text-2xl font-bold">{{ genre.name }}</h2>
      <NuxtLink 
        :to="`/genre/${encodeURIComponent(genre.name.toLowerCase())}`" 
        class="ml-3 text-sm text-gray-400 transition-all duration-200 hover:text-white hover:underline hover:scale-110 hover:font-medium"
      >
        Show all
      </NuxtLink>
    </div>
    <div class="flex space-x-4 overflow-x-auto pb-2">
      <ShowCard 
        v-for="show in genre.shows" 
        :key="show.id" 
        :show="show" 
      />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  genre: Genre;
}>();
</script> 