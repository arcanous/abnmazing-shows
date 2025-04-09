<template>
  <div class="mb-12">
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl relative md:flex md:h-[500px]">
      <!-- Image section with fade transition -->
      <div class="md:w-1/2 relative overflow-hidden">
        <Transition name="fade" mode="out-in">
          <NuxtImg
            :key="currentHero"
            :src="shows[currentHero].image.original || shows[currentHero].image.medium"
            :alt="shows[currentHero].name" 
            class="object-cover w-full h-72 md:h-full transform hover:scale-105 transition-all duration-700"
            loading="eager"
            format="webp"
            quality="90"
            width="960" 
            height="1080" 
          />
        </Transition>
        <!-- Gradient overlay for better text contrast -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"/>
      </div>
      
      <!-- Content section with staggered animation -->
      <div class="p-5 md:p-10 md:w-1/2 flex flex-col justify-center relative">
        <Transition name="slide-fade" mode="out-in">
          <div :key="currentHero" class="space-y-2">
            <h2 class="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white">
              {{ shows[currentHero].name }}
            </h2>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="genre in shows[currentHero].genres" :key="genre"
                class="px-3 py-1 bg-gray-700/70 text-xs rounded-full text-gray-200">
                {{ genre }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-2 mb-4">
              <p class="text-sm md:text-base flex items-center gap-1">
                <span class="text-gray-400">Rating: </span>
                <span class="text-white font-medium flex items-center">
                  {{ shows[currentHero].rating.average ? shows[currentHero].rating.average : 'N/A' }}
                  <Icon v-if="shows[currentHero].rating.average" name="heroicons:star-solid" class="h-4 w-4 text-yellow-400 ml-1" />
                </span>
              </p>
              <p class="text-sm md:text-base">
                <span class="text-gray-400">Status: </span>
                <span class="text-white font-medium">{{ shows[currentHero].status }}</span>
              </p>
              <p class="text-sm md:text-base">
                <span class="text-gray-400">Premiered: </span>
                <span class="text-white font-medium">{{ shows[currentHero].premiered }}</span>
              </p>
              <p class="text-sm md:text-base">
                <span class="text-gray-400">Language: </span>
                <span class="text-white font-medium">{{ shows[currentHero].language }}</span>
              </p>
            </div>
            
            <p v-if="shows[currentHero].network" class="text-sm md:text-base mb-4">
              <span class="text-gray-400">Network: </span>
              <span class="text-white font-medium">{{ shows[currentHero].network.name }} ({{ shows[currentHero].network.country.code }})</span>
            </p>
            
            <p class="text-sm md:text-base mt-2 text-gray-300 line-clamp-3" v-html="truncatedSummary(shows[currentHero].summary)"/>
            
            <!-- CTA Button -->
            <NuxtLink
              :to="`/shows/${shows[currentHero].id}`"
              class="group mt-6 px-6 py-3 inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-lg text-white font-medium text-center transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md shadow-red-900/20">
              View Details
              <Icon 
                name="heroicons:arrow-right" 
                class="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
              />
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </div>
    
    <!-- Carousel Navigation -->
    <div class="flex justify-center mt-6 space-x-3">
      <button
        v-for="(show, index) in shows" 
        :key="show.id"
        :class="[
          'transition-all duration-300 focus:outline-none cursor-pointer',
          currentHero === index 
            ? 'w-8 bg-red-500 shadow-md shadow-red-600/30' 
            : 'w-3 bg-gray-500/60 hover:bg-gray-400'
        ]"
        class="h-3 rounded-full"
        @click="selectHero(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  shows: TVShow[];
}>();

const currentHero = ref(0);
let heroInterval: number | undefined;

/**
 * Returns a truncated version of the summary (up to 200 characters)
 * and appends ellipsis if the text is longer.
 */
const truncatedSummary = (text: string, maxLength = 200): string => {
  if (!text) return '';
  // Remove HTML tags (if summary is in HTML) for safe truncation.
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, '');
  return plainText.length > maxLength ? plainText.slice(0, maxLength).trim() + '...' : plainText;
};

const startCarouselTimer = (): void => {
  if (heroInterval) {
    clearInterval(heroInterval);
  }
  
  if (props.shows.length > 1) {
    heroInterval = window.setInterval(() => {
      currentHero.value = (currentHero.value + 1) % props.shows.length;
    }, 10000);
  }
};

const selectHero = (index: number): void => {
  currentHero.value = index;
  startCarouselTimer(); // Reset the timer when user selects
};

onMounted(() => {
  startCarouselTimer();
});

onUnmounted(() => {
  if (heroInterval) {
    clearInterval(heroInterval);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 