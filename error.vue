<template>
  <main class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="container mx-auto px-6 py-10 text-center max-w-2xl">
      <div class="mb-8 inline-block">
        <div class="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
          <Icon name="heroicons:exclamation-triangle" class="h-12 w-12 text-red-500" />
        </div>
      </div>
      
      <h1 class="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Oops! Something went wrong' }}
      </h1>
      
      <p class="text-gray-300 mb-8">
        {{ error?.statusCode === 404 
          ? 'The page you are looking for does not exist or has been moved.'
          : 'We encountered an unexpected error. Please try again later.'
        }}
      </p>
      
      <div class="flex justify-center">
        <button
          class="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-md shadow-lg hover:from-red-500 hover:to-rose-400 transition-all duration-300 text-white font-medium cursor-pointer"
          @click="handleError"
        >
          Back to Shows
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

const handleError = () => clearError({ redirect: '/shows' });
</script>
