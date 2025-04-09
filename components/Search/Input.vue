<template>
  <div 
    class="flex items-center rounded-full bg-gray-800/80 border border-gray-700/50 shadow-md overflow-hidden transition-all duration-500 h-10"
    :class="[isVisible ? 'w-full md:w-64 opacity-100' : 'w-10 opacity-0']"
  >
    <div class="flex items-center px-4 py-2 w-full h-full">
      <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-gray-400 flex-shrink-0" />
      <input
        ref="inputElement"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="text"
        :placeholder="placeholder"
        class="w-full bg-transparent border-none outline-none px-3 py-1 text-white placeholder-gray-400"
        @keyup.enter="$emit('submit')"
        @keyup.esc="$emit('cancel')"
      />
      <button
        v-if="modelValue"
        class="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
        @click="$emit('clear')"
      >
        <Icon name="heroicons:x-mark" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  isVisible: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit' | 'cancel' | 'clear'): void;
}>();

const inputElement = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputElement.value?.focus();
});
</script> 