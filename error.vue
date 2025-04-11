<template>
  <main class="flex min-h-screen items-center justify-center bg-gray-900 text-white">
    <div class="container mx-auto max-w-2xl px-6 py-10 text-center">
      <div class="mb-8 inline-block">
        <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
          <Icon name="heroicons:exclamation-triangle" class="h-12 w-12 text-red-500" />
        </div>
      </div>
      
      <h1 class="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Oops! Something went wrong' }}
      </h1>
      
      <p class="mb-8 text-gray-300">
        {{ error?.statusCode === 404 
          ? 'The page you are looking for does not exist or has been moved.'
          : 'We encountered an unexpected error. Please try again later.'
        }}
      </p>
      
      <div class="flex justify-center">
        <button
          class="cursor-pointer rounded-md bg-gradient-to-r from-red-600 to-rose-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-red-500 hover:to-rose-400"
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
