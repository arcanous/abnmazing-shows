<template>
  <!-- Main Card Container -->
  <div class="relative bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
    <!-- Backdrop: Using the show's original image -->
    <div class="relative h-96 bg-cover bg-center" :style="{ backgroundImage: `url(${show.image.original})` }">
      <!-- Gradient overlay for readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
      <!-- Text overlay on image -->
      <div class="absolute bottom-0 left-0 p-6">
        <h2 class="text-3xl md:text-5xl font-bold">{{ show.name }}</h2>
        <p class="mt-2 text-lg">
          <span v-if="show.rating.average" class="font-semibold">Rating: {{ show.rating.average }}</span>
          <span v-else class="font-light">No Rating</span>
        </p>
      </div>
    </div>
    <!-- Content Section -->
    <div class="p-6 space-y-4">
      <!-- Premiered/Ended Info -->
      <div>
        <p class="text-sm text-gray-400">
          {{ show.premiered }}
          <span v-if="show.ended"> - {{ show.ended }}</span>
        </p>
      </div>
      <!-- Genres -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="genre in show.genres"
          :key="genre"
          class="px-3 py-1 text-xs border border-gray-600 rounded-full"
        >
          {{ genre }}
        </span>
      </div>
      <!-- Summary (rendered as HTML) -->
      <div class="prose prose-invert max-w-none" v-html="show.summary"/>
      <!-- Call-To-Action Button -->
      <div>
        <a
          :href="show.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          View Show
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: TVShow }>();
</script>