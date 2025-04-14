<template>
  <header class="fixed top-0 z-50 w-full bg-gray-900 py-4 shadow-lg backdrop-blur-sm">
    <div class="container mx-auto flex items-center justify-between px-6">
      <NuxtLink to="/shows" class="group flex items-center">
        <span class="text-2xl font-bold tracking-tight text-red-600 transition-all duration-300 group-hover:tracking-wide">
          ABNmazing Shows
        </span>
      </NuxtLink>
      
      <div class="ml-auto">
        <Search class="relative z-10" />
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from being hidden under fixed header -->
  <div class="h-16" />
</template>
