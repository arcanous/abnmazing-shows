<template>
  <section class="relative h-screen bg-cover bg-center">
    <!-- Semi-transparent overlay -->
    <div class="absolute inset-0 bg-black opacity-50" />
    <!-- Hero content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">Experience the Thrill</h1>
      <p class="text-xl md:text-2xl mb-8">Stream the Latest Shows and Movies</p>
      <NuxtLink to="/shows" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded">
        Watch Now
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})
</script>
