<template>
  <section id="wholesale-popular-categories" class="pt-12 px-4 md:px-8 max-w-[1460px] mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">Wholesale Popular Categories</h2>

      <div class="flex items-center gap-4">
        <div class="flex gap-2">
          <button @click="prevSlide" :disabled="startIndex === 0"
            :class="['p-2 rounded-full transition-colors', startIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-black']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <button @click="nextSlide" :disabled="startIndex + itemsPerPage >= categories.length"
            :class="['p-2 rounded-full transition-colors', startIndex + itemsPerPage >= categories.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-black']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="relative overflow-hidden">
      <div class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }">
        <div v-for="(cat, index) in categories" :key="index" class="min-w-[20%] px-2">
          <RouterLink
            :to="{ name: 'YehwangProducts', query: { category: cat.name.toLowerCase().replace(/\s+/g, '-') } }"
            class="group cursor-pointer flex flex-col items-center">
            <div class="w-full aspect-[3/4] overflow-hidden mb-4 relative bg-gray-50">
              <img :src="cat.image" :alt="cat.name"
                class="rounded-[4px] w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div
                class="absolute inset-0 border border-transparent group-hover:border-black/5 transition-colors pointer-events-none">
              </div>
            </div>
            <span
              class="font-medium text-xs md:text-sm uppercase tracking-wide text-gray-700 group-hover:text-black text-center">{{ cat.name }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

export default {
  name: 'WholesaleCategories',
  components: {
    RouterLink
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      startIndex: 0,
      itemsPerPage: 5
    }
  },
  methods: {
    nextSlide() {
      if (this.startIndex + this.itemsPerPage < this.categories.length) {
        this.startIndex += this.itemsPerPage;
      }
    },
    prevSlide() {
      if (this.startIndex - this.itemsPerPage >= 0) {
        this.startIndex -= this.itemsPerPage;
      }
    }
  }
}
</script>
