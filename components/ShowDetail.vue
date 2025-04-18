<script setup lang="ts">
defineProps<{
  show: TVShow;
}>();
</script> 

<template>
  <!-- Show content -->
  <section class="pb-16">
    <!-- Top back button (visible on mobile) -->
    <div class="container mx-auto px-4 pt-5 pb-4 md:hidden">
      <UiBackButton to="/shows" text="Back to shows" />
    </div>
    
    <!-- Hero banner -->
    <div class="relative h-[70vh] overflow-hidden">
      <!-- Background image with gradient overlay -->
      <div class="absolute inset-0">
        <NuxtImg
          :src="show.image?.original || show.image?.medium"
          :alt="show.name"
          class="h-full w-full object-cover"
          loading="eager"
          format="webp"
          quality="90"
          width="1920"
          height="1080"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>
      
      <!-- Top back button (visible on desktop) -->
      <div class="absolute top-6 left-0 right-0 z-10 hidden md:block">
        <div class="container mx-auto px-12">
          <div class="inline-flex rounded-full border border-gray-700/30 bg-gray-900/40 px-3 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-900/60">
            <UiBackButton to="/shows" text="Back to shows" />
          </div>
        </div>
      </div>
      
      <!-- Show details overlay -->
      <div class="absolute bottom-0 left-0 right-0 container mx-auto p-6 md:p-12">
        <div class="flex flex-col items-end gap-8 md:flex-row">
          <!-- Poster -->
          <div class="relative hidden h-72 w-48 -translate-y-8 flex-none overflow-hidden rounded-lg border-2 border-gray-800 shadow-2xl md:block transform">
            <NuxtImg
              :src="show.image?.medium"
              :alt="show.name"
              class="h-full w-full object-cover"
              loading="eager"
              format="webp"
              quality="90"
              width="240"
              height="360"
            />
          </div>
          
          <!-- Title and basics -->
          <div class="flex-grow">
            <h1 class="mb-3 text-4xl font-bold text-white md:text-5xl">{{ show.name }}</h1>
            
            <div class="mb-4 flex flex-wrap gap-2">
              <UiPill 
                v-for="genre in show.genres || []" 
                :key="genre" 
                :text="genre" 
              />
            </div>
            
            <div class="mb-3 flex items-center gap-4 text-sm md:text-base">
              <div v-if="show.rating?.average" class="flex items-center">
                <Icon name="heroicons:star-solid" class="mr-1 h-5 w-5 text-yellow-400" />
                <span class="font-medium">{{ show.rating?.average }}/10</span>
              </div>
              
              <div v-if="show.runtime" class="flex items-center">
                <Icon name="heroicons:clock" class="mr-1 h-4 w-4 text-gray-400" />
                <span>{{ show.runtime }} min</span>
              </div>
              
              <div v-if="show.premiered" class="flex items-center">
                <Icon name="heroicons:calendar" class="mr-1 h-4 w-4 text-gray-400" />
                <span>{{ show.premiered }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Content container -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Main content -->
        <div class="space-y-8 md:col-span-2">
          <!-- Summary -->
          <div class="rounded-xl bg-gray-800/50 p-6">
            <UiSectionHeader title="Synopsis" icon="heroicons:information-circle" />
            <div class="leading-relaxed text-gray-300" v-html="show.summary || ''"/>
          </div>
          
          <!-- Schedule -->
          <div v-if="show.schedule" class="rounded-xl bg-gray-800/50 p-6">
            <UiSectionHeader title="Schedule" icon="heroicons:calendar-days" />
            <div class="flex flex-wrap gap-2">
              <UiPill 
                v-for="day in show.schedule?.days || []" 
                :key="day" 
                :text="day"
              />
            </div>
            <p v-if="show.schedule?.time" class="mt-3 text-gray-300">
              Airs at <span class="font-medium text-white">{{ show.schedule.time }}</span>
            </p>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Network info -->
          <div v-if="show.network" class="rounded-xl bg-gray-800/50 p-6">
            <UiSectionHeader title="Network" icon="heroicons:tv" />
            <ul class="space-y-2 text-gray-300">
              <li class="flex justify-between">
                <span>Name:</span>
                <span class="text-white">{{ show.network.name }}</span>
              </li>
              <li v-if="show.network?.country" class="flex justify-between">
                <span>Country:</span>
                <span class="text-white">{{ show.network.country.name }} ({{ show.network.country.code }})</span>
              </li>
              <li v-if="show.network.officialSite" class="mt-2">
                <a 
                  :href="show.network.officialSite" 
                  target="_blank" 
                  rel="noopener" 
                  class="flex items-center text-red-400 hover:text-red-300"
                >
                  Visit network site
                  <Icon name="heroicons:arrow-top-right-on-square" class="ml-1 h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Show info -->
          <div class="rounded-xl bg-gray-800/50 p-6">
            <UiSectionHeader title="Details" icon="heroicons:document-text" />
            <ul class="space-y-2 text-gray-300">
              <li class="flex justify-between">
                <span>Status:</span>
                <span :class="show.status === 'Ended' ? 'text-gray-300' : 'text-green-400'">
                  {{ show.status }}
                </span>
              </li>
              <li class="flex justify-between">
                <span>Type:</span>
                <span class="text-white">{{ show.type }}</span>
              </li>
              <li class="flex justify-between">
                <span>Language:</span>
                <span class="text-white">{{ show.language }}</span>
              </li>
              <li v-if="show.premiered" class="flex justify-between">
                <span>Premiered:</span>
                <span class="text-white">{{ show.premiered }}</span>
              </li>
              <li v-if="show.ended" class="flex justify-between">
                <span>Ended:</span>
                <span class="text-white">{{ show.ended }}</span>
              </li>
            </ul>
            
            <!-- External links -->
            <div v-if="show.externals" class="mt-6 border-t border-gray-700 pt-4">
              <h3 class="mb-3 text-sm font-medium text-gray-400">External Links</h3>
              <div class="flex flex-wrap gap-3">
                <UiExternalLink
                  v-if="show.externals?.imdb" 
                  :href="`https://www.imdb.com/title/${show.externals.imdb}`"
                  text="IMDb"
                  color="yellow"
                />
                <UiExternalLink
                  v-if="show.officialSite" 
                  :href="show.officialSite"
                  text="Official Site"
                  color="blue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom back button (with subtle enhancement) -->
      <div class="mt-10 text-center md:text-left">
        <div class="inline-block">
          <UiBackButton to="/shows" text="Back to all shows" />
        </div>
      </div>
    </div>
  </section>
</template> 