<template>
  <article class="mb-12">
    <h2 class="text-2xl font-bold mb-4">{{ genre.name }}</h2>
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