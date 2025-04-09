<template>
  <div 
    class="fixed inset-0 bg-gray-900/98 backdrop-blur-md z-50"
    @click.self="$emit('close')"
  >
    <div class="container mx-auto px-4 pt-24 max-w-3xl">
      <!-- Search input -->
      <div 
        class="flex items-center bg-gray-800/70 rounded-xl border border-gray-700/40 shadow-2xl overflow-hidden mb-8 transform transition-all duration-500"
        :class="[animationStage === 0 ? 'scale-90 opacity-0' : 'scale-100 opacity-100']"
      >
        <div class="flex items-center px-4 py-3 w-full">
          <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-white flex-shrink-0" />
          <input
            ref="searchInput"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            type="text"
            :placeholder="placeholder"
            class="w-full bg-transparent border-none outline-none px-3 py-2 text-white placeholder-gray-400"
            @keyup.esc="$emit('close')"
          />
          <button
            @click="$emit('clear')"
            class="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
          >
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <!-- Results container -->
      <slot name="results"></slot>
    </div>
    
    <slot name="close-button"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  animationStage: number;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'close' | 'clear'): void;
}>();

const searchInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  searchInput.value?.focus();
});
</script> 