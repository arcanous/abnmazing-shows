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
          We're having trouble loading your shows at the moment. Please try refreshing or come back later.
        </p>
      </div>
    </section>

    <!-- Loaded content -->
    <section v-else class="container mx-auto px-4 py-8">

      <HeroCarousel v-if="top10Shows.length" :shows="top10Shows" />

      <!-- Genre List -->
      <article v-for="genre in showListByGenre" :key="genre.name" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">{{ genre.name }}</h2>
        <div class="flex space-x-4 overflow-x-auto pb-2">
          <div
            v-for="show in genre.shows"
            :key="show.id"
            class="flex-none w-40 transform transition duration-200 hover:scale-105"
          >
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