<template>
  <section class="py-16 bg-white">
    <div class="max-w-[1460px] mx-auto px-4 md:px-8">
      <h2 class="text-xl md:text-2xl font-bold uppercase tracking-wide mb-8 text-black">Wholesale Products Resources</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(res, index) in resources" :key="index" class="flex flex-col">
          <div class="relative overflow-hidden h-64 md:h-72 w-full mb-4 group rounded-[4px]">
            <img 
              :src="res.image" 
              :alt="res.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="cursor-pointer absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2 text-sm font-bold uppercase tracking-wider shadow-sm bg-white text-black rounded-[4px] hover:bg-black hover:text-white transition-colors duration-300">
              {{ res.label }}
            </div>
          </div>
          
          <div class="text-left">
            <h3 class="text-sm font-bold uppercase mb-1 tracking-wide text-black">{{ res.title }}</h3>
            <div class="flex items-center gap-1 text-gray-600">
              <svg v-if="res.hasIcon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p class="text-xs underline decoration-gray-400 underline-offset-2">{{ res.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WholesaleResources',
  props: {
    resources: {
      type: Array,
      default: () => []
    }
  }
}
</script>
