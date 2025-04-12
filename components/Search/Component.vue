<script setup lang="ts">
const isActive = ref(false);
const isExpanded = ref(false);
const searchQuery = ref('');
const animationStage = ref(0);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const activateSearch = async () => {
  isActive.value = true;
  
  if (isMobile.value) {
    expandSearch();
  }
};

const deactivateSearch = () => {
  isActive.value = false;
  searchQuery.value = '';
};

const expandSearch = async () => {
  if (searchQuery.value.trim().length > 0 || isMobile.value) {

    animationStage.value = 0;
    isExpanded.value = true;
    
    document.body.classList.add('overflow-hidden');
    
    // Orchestrate the animation sequence
    setTimeout(() => { animationStage.value = 1; }, 100);  // Search input
    setTimeout(() => { animationStage.value = 2; }, 300);  // Results area
    setTimeout(() => { animationStage.value = 3; }, 500);  // Close button
  }
};

const closeSearch = () => {
  isExpanded.value = false;
  document.body.classList.remove('overflow-hidden');
  animationStage.value = 0;
};

const clearSearch = () => {
  searchQuery.value = '';
};

const clearExpandedSearch = () => {
  searchQuery.value = '';
};

// Provide closeSearch method to FoundResult components
provide('closeSearch', closeSearch);

// Global ESC key handler
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (isExpanded.value) {
      closeSearch();
    } else if (isActive.value) {
      deactivateSearch();
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  window.removeEventListener('resize', checkMobile);
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <div class="h-10 flex items-center">
    <!-- Search button (collapsed state) -->
    <SearchButton  v-if="!isActive || (isActive && isMobile)" @click="activateSearch" />
    
    <!-- Search input (expanded but not full-screen) -->
    <div v-else-if="!isExpanded && !isMobile" class="relative h-10">
      <SearchInput
        v-model="searchQuery"
        placeholder="Search shows..."
        :is-visible="isActive"
        @submit="expandSearch"
        @cancel="deactivateSearch"
        @clear="clearSearch"
      />
    </div>
    
    <!-- Teleport the expanded search UI into body -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <SearchOverlay
          v-if="isExpanded"
          v-model="searchQuery"
          placeholder="Search shows..."
          :animation-stage="animationStage"
          @close="closeSearch"
          @clear="clearExpandedSearch"
        >
          <template #results>
            <SearchResults
              :query="searchQuery"
              :animation-stage="animationStage"
            />
          </template>
          
          <template #close-button>
            <SearchCloseButton
              :animation-stage="animationStage"
              @click="closeSearch"
            />
          </template>
        </SearchOverlay>
      </Transition>
    </Teleport>
  </div>
</template>
