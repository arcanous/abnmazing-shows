<script setup lang="ts">
defineProps<{
  href: string;
  text: string;
  color: 'yellow' | 'blue' | 'red' | 'green' | 'gray';
}>();
</script> 

<template>
  <a 
    :href="href" 
    target="_blank" 
    rel="noopener" 
    class="px-3 py-1 inline-flex items-center rounded text-sm"
    :class="`bg-${color}-600/30 hover:bg-${color}-600/50 text-${color}-400`"
  >
    <span>{{ text }}</span>
    <Icon name="heroicons:arrow-top-right-on-square" class="h-3.5 w-3.5 ml-1.5" />
  </a>
</template>
