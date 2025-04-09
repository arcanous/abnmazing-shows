<template>
  <div 
    class="fixed bottom-8 left-0 right-0 flex justify-center transition-all duration-700"
    :class="[animationStage < 3 ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0']"
  >
    <button 
      class="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-sm rounded-full border border-gray-700/30 text-gray-300 flex items-center shadow-lg transition-all duration-300 hover:shadow-xl"
      @click="emit('click')"
    >
      <Icon name="heroicons:x-mark" class="h-5 w-5 mr-2" />
      Close Search
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  animationStage: number;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script> 