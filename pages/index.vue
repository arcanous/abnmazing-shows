<template>
  <section class="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Animated gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-tr from-black/30 via-indigo-900/20 to-black/40 animate-gradient" />
    
    <!-- Hero content with subtle animations -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
      <h1 
        class="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight animate-fade-in"
        :style="{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }"
      >
        ABNmazing shows
      </h1>
      <p class="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto animate-slide-up">
        Immerse yourself in captivating stories with our curated collection of shows and movies
      </p>
      <NuxtLink 
        to="/shows" 
        class="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white font-medium py-3.5 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 animate-pulse-subtle"
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

<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})
</script>

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
  0%, 100% { box-shadow: 0 0 0 rgba(239, 68, 68, 0); }
  50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
