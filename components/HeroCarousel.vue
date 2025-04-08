<template>
  <div class="mb-12">
    <div class="bg-gray-800 rounded-lg overflow-hidden md:flex md:h-[500px]">
      <div class="md:w-1/2 relative">
        <NuxtImg
:src="shows[currentHero].image.original || shows[currentHero].image.medium"
          :alt="shows[currentHero].name" class="object-cover w-full h-64 md:h-full transition-all duration-500"
          width="960" height="1080" />
        <div class="absolute inset-0 bg-black opacity-20"/>
      </div>
      <div class="p-4 md:p-8 md:w-1/2 flex flex-col justify-center">
        <h2 class="text-2xl md:text-4xl font-bold mb-4">{{ shows[currentHero].name }}</h2>
        <p class="text-sm md:text-lg mb-2">
          <span class="font-semibold">Rating:</span>
          {{ shows[currentHero].rating.average ? shows[currentHero].rating.average : 'N/A' }}
        </p>
        <p class="text-sm md:text-lg mb-2">
          <span class="font-semibold">Premiered:</span>
          {{ shows[currentHero].premiered }}
        </p>
        <p class="text-sm md:text-lg mb-2">
          <span class="font-semibold">Status:</span>
          {{ shows[currentHero].status }}
        </p>
        <p class="text-sm md:text-lg mb-2">
          <span class="font-semibold">Language:</span>
          {{ shows[currentHero].language }}
        </p>
        <p class="text-sm md:text-lg mb-2">
          <span class="font-semibold">Genres:</span>
          {{ shows[currentHero].genres.join(', ') }}
        </p>
        <p v-if="shows[currentHero].network" class="text-sm md:text-lg mb-2">
          <span class="font-semibold">Network:</span>
          {{ shows[currentHero].network.name }} ({{ shows[currentHero].network.country.code }})
        </p>
        <p class="text-sm md:text-base mt-4" v-html="truncatedSummary(shows[currentHero].summary)"/>
        <!-- CTA -->
        <NuxtLink
          :to="`/show/${shows[currentHero].id}`"
          class="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded text-white font-semibold text-center">
          View Show Details
        </NuxtLink>
      </div>
    </div>
    <!-- Carousel Dots for Navigation -->
    <div class="flex justify-center mt-4 space-x-2">
      <button
        v-for="(show, index) in shows" :key="show.id"
        :class="{'bg-white': currentHero === index, 'bg-gray-500': currentHero !== index}"
        class="w-3 h-3 rounded-full focus:outline-none cursor-pointer"
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