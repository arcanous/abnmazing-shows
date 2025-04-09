<template>
  <div 
    class="bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700/40 shadow-2xl p-8 max-h-[calc(100vh-220px)] overflow-y-auto transform transition-all duration-700"
    :class="[animationStage < 2 ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100']"
  >
    <div v-if="query.trim().length > 0" class="text-center text-gray-300 py-12">
      <div class="w-16 h-16 border-4 border-t-transparent border-red-500/70 rounded-full animate-spin mx-auto mb-6"></div>
      <p class="text-xl font-medium">Searching for "{{ query }}"</p>
      <p class="text-sm mt-4 text-gray-400">Looking far and beyond...</p>
    </div>
    <div v-else class="text-center text-gray-300 py-12">
      <div class="relative mx-auto w-24 h-24 mb-6">
        <Icon name="heroicons:sparkles" size="36" class="text-red-500/70" />
      </div>
      <p class="text-xl font-medium">Start typing to search</p>
      <p class="text-sm mt-4 text-gray-400">Find your favorite shows</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  query: string;
  animationStage: number;
}>();
</script>
