<template>
  <main class="min-h-screen bg-gray-900 text-white">
  
    <UiLoadingSpinner v-if="isLoading && shows.length === 0" />

    <UiErrorMessage v-else-if="hasError" />

    <section v-else class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-8">
        <UiBackButton to="/shows" text="Back to shows" />
        <h1 class="text-4xl font-bold">{{ genreName }}</h1>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        <ShowCard 
          v-for="show in shows" 
          :key="show.id" 
          :show="show" 
        />
      </div>

      <!-- Pagination loader -->
      <UiPaginationLoader v-if="isLoading && shows.length > 0" />

      <!-- End of results message -->
      <p v-if="!isLoading && reachedEnd" class="text-center text-gray-400 my-8">
        You've reached the end of the results
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const showsApiUrl = `${config.public.apiBase}/shows`;

// Get genre name from URL and decode it
const genreParam = route.params.name as string;
const genreName = decodeURIComponent(genreParam.charAt(0).toUpperCase() + genreParam.slice(1));

// State variables
const currentPage = ref(0);
const isLoading = ref(false);
const hasError = ref(false);
const shows = ref<TVShow[]>([]);
const reachedEnd = ref(false);
const totalPages = 335; // Maximum API page limit

// Load shows from the API page-by-page
const loadShows = async (): Promise<void> => {
  if (reachedEnd.value || isLoading.value) return;
  
  isLoading.value = true;
  
  try {
    const { data, error } = await useFetch<TVShow[]>(`${showsApiUrl}?page=${currentPage.value}`);
    
    if (error.value) {
      hasError.value = true;
    } else if (data.value && Array.isArray(data.value)) {
      // Filter for shows that match the selected genre (case insensitive)
      const filteredShows = data.value.filter((show) => 
        show.genres.some((g) => g.toLowerCase() === genreName.toLowerCase())
      );
      
      shows.value.push(...filteredShows);
      currentPage.value++;
      
      // Check if we've reached the end
      if (currentPage.value >= totalPages || filteredShows.length === 0) {
        reachedEnd.value = true;
      }
    }
  } catch (error) {
    console.error('Error loading shows:', error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Infinite scroll handler
const handleScroll = () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;
  
  // Load more when near the bottom (200px threshold)
  if (scrollY + viewportHeight >= fullHeight - 200 && !isLoading.value && !reachedEnd.value) {
    loadShows();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // Clean up
  window.removeEventListener('scroll', handleScroll);
});

await loadShows();
</script>