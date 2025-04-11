<template>
  <div 
    class="flex h-10 items-center overflow-hidden rounded-full border border-gray-700/50 bg-gray-800/80 shadow-md transition-all duration-500"
    :class="[isVisible ? 'w-full opacity-100 md:w-64' : 'w-10 opacity-0']"
  >
    <div class="flex h-full w-full items-center px-4 py-2">
      <Icon name="heroicons:magnifying-glass" class="h-5 w-5 flex-shrink-0 text-gray-400" />
      <input
        ref="inputElement"
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        class="w-full border-none bg-transparent px-3 py-1 text-white outline-none placeholder-gray-400"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('submit')"
        @keyup.esc="$emit('cancel')"
      >
      <button
        v-if="modelValue"
        class="flex-shrink-0 cursor-pointer text-gray-400 transition-colors hover:text-white"
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