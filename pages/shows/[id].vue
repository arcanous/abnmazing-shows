<template>
  <main class="min-h-screen bg-gray-900 text-white">
    
    <UiLoadingSpinner v-if="isLoading" />

    <UiErrorMessage v-else-if="hasError" />

    <ShowDetail v-else-if="show" :show="show" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const showId = route.params.id;
const showApiUrl = `${config.public.apiBase}/shows/${showId}`;

const isLoading = ref(true);
const hasError = ref(false);
const show = ref<TVShow | null>(null);

const fetchShow = async (): Promise<void> => {
  try {
    const { data, error } = await useFetch<TVShow>(showApiUrl);
    
    if (error.value) {
      hasError.value = true;
    } else if (data.value) {
      show.value = data.value;
    }
  } catch (error) {
    hasError.value = true;
    console.error('Error fetching show:', error);
  } finally {
    isLoading.value = false;
  }
};

await fetchShow();
</script>
