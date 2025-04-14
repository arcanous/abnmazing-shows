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

<template>
  <div class="mb-12">
    <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl md:flex md:h-[500px]">
      <!-- Image section with fade transition -->
      <div class="relative overflow-hidden md:w-1/2">
        <Transition name="fade" mode="out-in">
          <NuxtImg
            :key="currentHero"
            :src="shows[currentHero].image?.original || shows[currentHero].image?.medium || '/placeholder-image.png'"
            :alt="shows[currentHero].name" 
            class="h-72 w-full object-cover transition-all duration-700 hover:scale-105 md:h-full"
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
      <div class="relative flex flex-col justify-center p-5 md:w-1/2 md:p-10">
        <Transition name="slide-fade" mode="out-in">
          <div :key="currentHero" class="space-y-2">
            <h2 class="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              {{ shows[currentHero].name }}
            </h2>
            
            <div class="mb-4 flex flex-wrap gap-2">
              <UiPill 
                v-for="genre in shows[currentHero].genres || []" 
                :key="genre"
                :text="genre"
              />
            </div>
            
            <div class="mb-4 grid grid-cols-2 gap-2">
              <p class="flex items-center gap-1 text-sm md:text-base">
                <span class="text-gray-400">Rating: </span>
                <span class="flex items-center font-medium text-white">
                  {{ shows[currentHero].rating?.average ? shows[currentHero].rating.average : 'N/A' }}
                  <Icon v-if="shows[currentHero].rating?.average" name="heroicons:star-solid" class="ml-1 h-4 w-4 text-yellow-400" />
                </span>
              </p>
              <p class="text-sm md:text-base">
                <span class="text-gray-400">Status: </span>
                <span class="font-medium text-white">{{ shows[currentHero].status }}</span>
              </p>
              <p class="text-sm md:text-base">
                <span class="text-gray-400">Premiered: </span>
                <span class="font-medium text-white">{{ shows[currentHero].premiered }}</span>
              </p>
              <p class="text-sm md:text-base">
                <span class="text-gray-400">Language: </span>
                <span class="font-medium text-white">{{ shows[currentHero].language }}</span>
              </p>
            </div>
            
            <p v-if="shows[currentHero].network" class="mb-4 text-sm md:text-base">
              <span class="text-gray-400">Network: </span>
              <span class="font-medium text-white">
                {{ shows[currentHero].network.name }} 
                {{ shows[currentHero].network.country ? `(${shows[currentHero].network.country.code})` : '' }}
              </span>
            </p>
            
            <p class="mt-2 line-clamp-3 text-sm text-gray-300 md:text-base" >
              {{ truncatedSummary(shows[currentHero].summary || '') }}
            </p>
            
            <!-- CTA Button -->
            <NuxtLink
              :to="`/shows/${shows[currentHero].id}`"
              class="group mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-medium text-white shadow-md shadow-red-900/20 transition-all duration-300 hover:from-red-500 hover:to-red-600 hover:scale-[1.02] hover:shadow-lg">
              View Details
              <Icon 
                name="heroicons:arrow-right" 
                class="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
              />
            </NuxtLink>
          </div>
        </Transition>
      </div>
    </div>
    
    <!-- Carousel Navigation -->
    <div class="mt-6 flex justify-center space-x-3">
      <button
        v-for="(show, index) in shows" 
        :key="show.id"
        :class="[
          'h-3 rounded-full transition-all duration-300 focus:outline-none cursor-pointer',
          currentHero === index 
            ? 'w-8 bg-red-500 shadow-md shadow-red-600/30' 
            : 'w-3 bg-gray-500/60 hover:bg-gray-400'
        ]"
        @click="selectHero(index)"
      />
    </div>
  </div>
</template>

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