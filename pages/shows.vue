<template>
  <main class="min-h-screen bg-gray-900 text-white">
    <!-- Loading state -->
    <section v-if="isLoading" class="flex flex-col items-center justify-center h-screen">
      <div class="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <p class="mt-4 text-xl">Loading...</p>
    </section>

    <!-- Error state -->
    <section v-else-if="hasError" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-red-500 mb-2">Oops! Something went wrong.</h2>
        <p class="text-lg">
          We’re having trouble loading your shows at the moment. Please try refreshing or come back later.
        </p>
      </div>
    </section>

    <!-- Loaded content -->
    <section v-else class="container mx-auto px-4 py-8">
      <!-- Hero Carousel for Top 10 Shows -->
      <div v-if="top10Shows.length" class="mb-12">
        <div class="bg-gray-800 rounded-lg overflow-hidden md:flex md:h-[500px]">
          <div class="md:w-1/2 relative">
            <NuxtImg :src="top10Shows[currentHero].image.original || top10Shows[currentHero].image.medium"
              :alt="top10Shows[currentHero].name" class="object-cover w-full h-64 md:h-full transition-all duration-500"
              width="960" height="1080" />
            <div class="absolute inset-0 bg-black opacity-20"></div>
          </div>
          <div class="p-4 md:p-8 md:w-1/2 flex flex-col justify-center">
            <h2 class="text-2xl md:text-4xl font-bold mb-4">{{ top10Shows[currentHero].name }}</h2>
            <p class="text-sm md:text-lg mb-2">
              <span class="font-semibold">Rating:</span>
              {{ top10Shows[currentHero].rating.average ? top10Shows[currentHero].rating.average : 'N/A' }}
            </p>
            <p class="text-sm md:text-lg mb-2">
              <span class="font-semibold">Premiered:</span>
              {{ top10Shows[currentHero].premiered }}
            </p>
            <p class="text-sm md:text-lg mb-2">
              <span class="font-semibold">Status:</span>
              {{ top10Shows[currentHero].status }}
            </p>
            <p class="text-sm md:text-lg mb-2">
              <span class="font-semibold">Language:</span>
              {{ top10Shows[currentHero].language }}
            </p>
            <p class="text-sm md:text-lg mb-2">
              <span class="font-semibold">Genres:</span>
              {{ top10Shows[currentHero].genres.join(', ') }}
            </p>
            <p class="text-sm md:text-lg mb-2" v-if="top10Shows[currentHero].network">
              <span class="font-semibold">Network:</span>
              {{ top10Shows[currentHero].network.name }} ({{ top10Shows[currentHero].network.country.code }})
            </p>
            <p class="text-sm md:text-base mt-4" v-html="truncatedSummary(top10Shows[currentHero].summary)"></p>
            <!-- CTA -->
            <button
              class="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded text-white font-semibold">
              View Show Details
            </button>
          </div>
        </div>
        <!-- Carousel Dots for Navigation -->
        <div class="flex justify-center mt-4 space-x-2">
          <button v-for="(show, index) in top10Shows" :key="show.id" @click="currentHero = index"
            :class="{'bg-white': currentHero === index, 'bg-gray-500': currentHero !== index}"
            class="w-3 h-3 rounded-full focus:outline-none cursor-pointer">
          </button>
        </div>
      </div>

      <!-- Genre List -->
      <article v-for="genre in showListByGenre" :key="genre.name" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">{{ genre.name }}</h2>
        <div class="flex space-x-4 overflow-x-auto pb-2">
          <div v-for="show in genre.shows" :key="show.id"
            class="flex-none w-40 transform transition duration-200 hover:scale-105">
            <NuxtImg :src="show.image.medium" :alt="show.name" width="160" height="225" class="rounded-md shadow-lg" />
          </div>
        </div>
      </article>
    </section>
  </main>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const showsApiUrl = `${config.public.apiBase}/shows`;

const isLoading = ref(false);
const hasError = ref(false);
const showListByGenre = ref<Genre[]>([]);
const top10Shows = ref<TVShow[]>([]);
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
}

const loadShows = async (): Promise<void> => {
  isLoading.value = true;
  const { data, error } = await useFetch<TVShow[]>(showsApiUrl);

  if (error.value) {
    hasError.value = true;
  } else if (data.value && Array.isArray(data.value)) {
    // All TV shows returned from the API
    const tvShows: TVShow[] = data.value;

    // Assemble Map of shows by genre
    const genreMap = new Map<string, TVShow[]>();
    tvShows.forEach((show: TVShow) => {
      show.genres.forEach((genre: string) => {
        if (genreMap.has(genre)) {
          genreMap.get(genre)!.push(show);
        } else {
          genreMap.set(genre, [show]);
        }
      });
    });

    // Create sorted genre list where each genre's shows are ordered by rating (highest first)
    const showsByGenre: Genre[] = Array.from(genreMap.entries()).map(([name, shows]) => {
      const sortedShows = [...shows].sort((a, b) => {
        const ratingA = a.rating?.average || 0;
        const ratingB = b.rating?.average || 0;
        return ratingB - ratingA;
      });
      return { name, shows: sortedShows };
    });

    // Sort genres so that the genre with the best top-rated show comes first
    showsByGenre.sort((a, b) => {
      const topRatingA = a.shows[0]?.rating?.average || 0;
      const topRatingB = b.shows[0]?.rating?.average || 0;
      return topRatingB - topRatingA;
    });
    showListByGenre.value = showsByGenre;

    // Gather top 10 rated shows from all returned shows
    const sortedAllShows = [...tvShows].sort((a, b) => {
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;
      return ratingB - ratingA;
    });
    top10Shows.value = sortedAllShows.slice(0, 10);
  }
  
  isLoading.value = false;
};

onMounted(async () => {
  await loadShows();
  
  // Start hero show cycle every 10 seconds
  if (top10Shows.value.length) {
    heroInterval = window.setInterval(() => {
      currentHero.value = (currentHero.value + 1) % top10Shows.value.length;
    }, 10000);
  }
});

onUnmounted(() => {
  if (heroInterval) {
    clearInterval(heroInterval);
  }
});
</script>

<style scoped>
.flex::-webkit-scrollbar {
  height: 8px;
}
.flex::-webkit-scrollbar-track {
  background: transparent;
}
.flex::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}
</style>