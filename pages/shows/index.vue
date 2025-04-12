<script setup lang="ts">
const { status, showListByGenre, top10Shows } = await useShows();
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white">
    
    <UiLoadingSpinner v-if="status === 'pending'" />

    <UiErrorMessage v-else-if="status ==='error'" />

    <section v-else class="container mx-auto px-4 py-8">
      <HeroCarousel v-if="top10Shows.length" :shows="top10Shows" />
      <GenreList v-for="genre in showListByGenre" :key="genre.name" :genre="genre" />
    </section>
  </main>
</template>

<style scoped>
.flex::-webkit-scrollbar {
  height: 8px;
}
.flex::-webkit-scrollbar-track {
  background: transparent;
}
.flex::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
</style>