<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const showId = route.params.id;
const showApiUrl = `${config.public.apiBase}/shows/${showId}`;

const { data: show, status } = useFetch<TVShow>(showApiUrl, { key: `show_${showId}` });
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white">
    <UiLoadingSpinner v-if="status === 'pending'" />
    <UiErrorMessage v-else-if="status === 'error'" />
    <ShowDetail v-else-if="show" :show="show" />
  </main>
</template>
