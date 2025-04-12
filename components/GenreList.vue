<script setup lang="ts">
defineProps<{
  genre: Genre;
}>();

const scrollContainer = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

// Check scroll position to determine if arrows should be shown
const checkScrollPosition = () => {
  if (!scrollContainer.value) return;
  
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
  
  // Show left arrow if not at the beginning
  canScrollLeft.value = scrollLeft > 0;
  
  // Show right arrow if not at the end
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 5;
};

const scrollSideways = (direction: number = 1) => () => {
  if (!scrollContainer.value) return;
  
  scrollContainer.value.scrollBy({
    left: direction * 300,
    behavior: 'smooth'
  });
};

const scrollLeft = scrollSideways(-1);
const scrollRight = scrollSideways(1);;

onMounted(() => {
  checkScrollPosition();
  // Check if we can scroll right initially
  if (scrollContainer.value) {
    canScrollRight.value = scrollContainer.value.scrollWidth > scrollContainer.value.clientWidth;
  }
});
</script>

<template>
  <article class="relative mb-12 group">
    <!-- Header with improved styling -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
        {{ genre.name }}
      </h2>
      <NuxtLink 
        :to="`/genre/${encodeURIComponent(genre.name.toLowerCase())}`" 
        class="flex items-center gap-1 text-sm text-gray-400 transition-all duration-200 hover:text-white"
      >
        <span>View all</span>
        <Icon name="heroicons:arrow-small-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </NuxtLink>
    </div>

    <!-- Scroll container with indicators -->
    <div class="relative">
      <!-- Left scroll indicator -->
      <button 
        v-show="canScrollLeft" 
        aria-label="Scroll left"
        class="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 shadow-lg transition-all duration-300 hover:bg-black/70 focus:outline-none"
        @click="scrollLeft"
      >
        <Icon name="heroicons:chevron-left" class="h-5 w-5 text-white" />
      </button>

      <!-- Right scroll indicator -->
      <button 
        v-show="canScrollRight" 
        aria-label="Scroll right"
        class="absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 shadow-lg transition-all duration-300 hover:bg-black/70 focus:outline-none"
        @click="scrollRight"
      >
        <Icon name="heroicons:chevron-right" class="h-5 w-5 text-white" />
      </button>

      <!-- Show cards with improved scrolling -->
      <div 
        ref="scrollContainer"
        class="flex overflow-x-auto px-1 pb-4 pt-2 space-x-4 scroll-smooth scrollbar-hide"
        @scroll="checkScrollPosition"
      >
        <ShowCard 
          v-for="show in genre.shows" 
          :key="show.id" 
          :show="show" 
          class="flex-shrink-0 transform transition-transform duration-300 hover:scale-105 hover:z-10"
        />
      </div>
    </div>
  </article>
</template>
