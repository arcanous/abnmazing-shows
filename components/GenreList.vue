<template>
  <article class="mb-12">
    <h2 class="text-2xl font-bold mb-4">{{ genre.name }}</h2>
    <div class="flex space-x-4 overflow-x-auto pb-2">
      <div
        v-for="show in genre.shows"
        :key="show.id"
        class="flex-none w-40 transform transition duration-200 hover:scale-105"
      >
        <NuxtImg :src="show.image.medium" :alt="show.name" width="160" height="225" class="rounded-md shadow-lg" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  genre: Genre;
}>();
</script> 