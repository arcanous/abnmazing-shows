<template>
  <main class="min-h-screen bg-gray-900 text-white">
    <!-- Loading state -->
    <section v-if="isLoading" class="flex flex-col items-center justify-center h-screen">
      <!-- Spinner -->
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



const loadShows = async (): Promise<void> => {
  isLoading.value = true
  const { data, error } = await useFetch<TVShow[]>(showsApiUrl);

  if (error.value) {
    hasError.value = true;
  } else if (data.value && Array.isArray(data.value)) {
    const genreMap = new Map<string, TVShow[]>();

    // Assemble Map of shows
    data.value.forEach((show: TVShow) => {
      show.genres.forEach((genre: string) => {
        if (genreMap.has(genre)) {
          genreMap.get(genre)!.push(show);
        } else {
          genreMap.set(genre, [show]);
        }
      })
    })

    // Assemble genre list with shows sorted with top rated first
    const showsByGenre: Genre[] = Array.from(genreMap.entries()).map(([name, shows]) => {
      const sortedShows = shows
        .sort((a, b) => {
          const ratingA = a.rating?.average || 0
          const ratingB = b.rating?.average || 0
          return ratingB - ratingA;
        })

      return { name, shows: sortedShows }
    })

    // Place genres with most popular shows on top
    showsByGenre.sort((a, b) => {
      const topRatingA = a.shows[0]?.rating?.average || 0
      const topRatingB = b.shows[0]?.rating?.average || 0
      return topRatingB - topRatingA;
    })

    showListByGenre.value = showsByGenre;
    
    isLoading.value = false;
  }

}


onMounted(async () => {
  await loadShows();
});

</script>