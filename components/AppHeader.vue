<template>
  <header class="bg-gradient-to-r from-gray-900 to-gray-800 py-4 fixed top-0 w-full z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <!-- Logo Section -->
      <NuxtLink to="/shows" class="group flex items-center">
        <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-red-600 tracking-tight transition-all duration-300 group-hover:tracking-wide">
          Abnmaze
        </span>
      </NuxtLink>
      
      <div class="relative flex items-center">
        Search will come here
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from being hidden under fixed header -->
  <div class="h-16" />
</template>

<script setup lang="ts">

</script> 