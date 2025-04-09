<template>
  <div 
    class="bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700/40 shadow-2xl p-4 max-h-[calc(100vh-220px)] overflow-y-auto transform transition-all duration-700"
    :class="[animationStage < 2 ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100']"
  >
    <!-- Loading/empty states -->
    <div v-if="!searchResults.length" class="py-8">
      <!-- Loading state -->
      <div v-if="query.trim().length > 0 && isSearching" class="text-center text-gray-300 py-12">
        <div class="w-16 h-16 border-4 border-t-transparent border-red-500/70 rounded-full animate-spin mx-auto mb-6"/>
        <p class="text-xl font-medium">Searching for "{{ query }}"</p>
        <p class="text-sm mt-4 text-gray-400">Looking far and beyond...</p>
      </div>
      
      <!-- Invalid query state -->
      <div v-else-if="query.trim().length > 0 && !isSearching" class="text-center text-gray-300 py-12">
        <p class="text-xl font-medium">Almost there...</p>
        <p class="text-sm mt-4 text-gray-400">Type at least 3 characters to search</p>
      </div>
      
      <!-- Empty state -->
      <div v-else class="text-center text-gray-300 py-12">
        <div class="relative mx-auto w-24 h-24 mb-6">
          <Icon name="heroicons:sparkles" size="36" class="text-red-500/70" />
        </div>
        <p class="text-xl font-medium">Start typing to search</p>
        <p class="text-sm mt-4 text-gray-400">Find your favorite shows</p>
      </div>
    </div>
    
    <!-- No results state -->
    <div v-else-if="searchResults.length === 0 && query.trim().length >= 3 && !isSearching" class="text-center text-gray-300 py-12">
      <Icon name="heroicons:magnifying-glass" class="h-16 w-16 mx-auto text-gray-600 mb-4" />
      <p class="text-xl font-medium">No results found</p>
      <p class="text-sm mt-4 text-gray-400">Try different keywords</p>
    </div>
    
    <!-- Search results -->
    <div v-else>
      <p class="text-sm text-gray-400 px-4 mb-2">Found {{ searchResults.length }} shows</p>
      <div class="divide-y divide-gray-700/30">
        <SearchFoundResult 
          v-for="item in searchResults" 
          :key="item.show.id" 
          :show="item.show" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const searchApiUrl = `${config.public.apiBase}/search/shows`;

const props = defineProps<{
  query: string;
  animationStage: number;
}>();

const isSearching = ref(false);
const hasError = ref(false);
const searchResults = ref<SearchResult[]>([]);
let searchTimeout: number | undefined;

const isValidQuery = (query: string) => query.trim().length >= 3;

// Debounced search function
const performSearch = async (query: string) => {
  if (!isValidQuery(query)) {
    isSearching.value = false;
    return;
  }
  
  isSearching.value = true;
  hasError.value = false;
  
  const { data, error } = await useFetch<SearchResult[]>(`${searchApiUrl}?q=${encodeURIComponent(query)}`);
  
  if (error.value) {
    hasError.value = true;
    console.error('Search error:', error.value);
  } else if (data.value) {
    searchResults.value = data.value;
  }
  isSearching.value = false;
};

// Simple basic debounce with watch
watch(() => props.query, (newQuery) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  if (!isValidQuery(newQuery)) {
    isSearching.value = false;
    // Clear results when query becomes invalid
    if (searchResults.value.length) {
      searchResults.value = [];
    }
    return;
  }
  
  searchTimeout = window.setTimeout(() => {
    performSearch(newQuery);
  }, 500);
}, { immediate: true });

onUnmounted(() => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
});
</script>