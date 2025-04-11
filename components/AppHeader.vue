<template>
  <header class="fixed top-0 z-50 w-full bg-gradient-to-r from-gray-900 to-gray-800 py-4 bg-opacity-95 shadow-lg backdrop-blur-sm">
    <div class="container mx-auto flex items-center justify-between px-6">

      <NuxtLink to="/shows" class="group flex items-center">
        <span class="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text transition-all duration-300 group-hover:tracking-wide">
          ABNmazing Shows
        </span>
      </NuxtLink>
      
      <div class="ml-auto">
        <SearchComponent class="relative z-10" />
      </div>
    </div>
  </header>
  
  <!-- Spacer to prevent content from being hidden under fixed header -->
  <div class="h-16" />
</template>
