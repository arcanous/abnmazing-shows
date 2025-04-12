<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})
</script>

<template>
  <section class="relative h-screen overflow-hidden bg-gradient-to-br from-slate-600 via-purple-800 to-slate-600">
    <!-- Animated gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-tr from-black/30 via-indigo-900/20 to-black/40 animate-gradient" />
    
    <!-- Hero content with subtle animations -->
    <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <h1 
        class="mb-6 text-5xl font-bold tracking-tight text-white animate-fade-in md:text-7xl"
        :style="{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }"
      >
        ABNmazing shows
      </h1>
      <p class="mx-auto mb-10 max-w-2xl text-xl text-gray-100 animate-slide-up md:text-2xl">
        Immerse yourself in captivating stories with our curated collection of shows and movies
      </p>
      <NuxtLink 
        to="/shows" 
        class="group relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-8 py-3.5 font-medium text-white transition-all duration-300 transform hover:scale-105 animate-pulse-subtle"
      >
        <span class="relative z-10 flex items-center gap-2">
          Watch Now
          <Icon 
            name="heroicons:chevron-right" 
            class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
          />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

.animate-pulse-subtle {
  animation: pulseSoft 3s infinite;
}

.animate-gradient {
  animation: gradientShift 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulseSoft {
  0%, 100% { box-shadow: 0 0 0 rgba(157, 55, 55, 0); }
  50% { box-shadow: 0 0 20px rgba(205, 143, 143, 0.75); }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
