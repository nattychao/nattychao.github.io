<template>
  <section v-if="!isLoggedIn" class="py-12 px-4 md:px-8 max-w-[1460px] mx-auto">
    <div class="flex justify-between items-end mb-8">
      <div>
        <h2 class="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900 mb-1">WHAT OUR CLIENTS SAY</h2>
        <p class="text-sm text-gray-500">Trust Pilots Wholesale Reviews.</p>
      </div>
      
      <div class="flex gap-2">
        <button 
          @click="prevSlide"
          :disabled="startIndex === 0"
          :class="['transition-colors', startIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-black']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
        <button 
          @click="nextSlide"
          :disabled="startIndex >= reviews.length - itemsPerPage"
          :class="['transition-colors', startIndex >= reviews.length - itemsPerPage ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-black']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
    
    <div class="relative overflow-hidden">
      <div 
        class="flex transition-transform duration-500 ease-out gap-4"
        :style="{ transform: `translateX(calc(-${startIndex * (100 / itemsPerPage)}% - ${startIndex * 1}rem))` }"
      >
        <div 
          v-for="(review, index) in reviews" 
          :key="index" 
          class="bg-white border border-[#E0E0E0] p-6 rounded-lg flex-shrink-0 shadow-sm hover:scale-95 transition-transform duration-300 cursor-pointer"
          :style="{ width: `calc((100% - ${(itemsPerPage - 1) * 16}px) / ${itemsPerPage})` }"
        >
          <div class="flex items-start gap-3 mb-4">
            <img v-if="review.image" :src="review.image" :alt="review.name" class="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <div v-else :class="['w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0', review.bgColor]">
              {{ review.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-base text-gray-900 mb-0.5">{{ review.name }}</h4>
              <p class="text-sm text-gray-500">{{ review.date }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3 mb-4">
            <div class="flex gap-0.5">
              <div 
                v-for="i in 5" 
                :key="i"
                class="w-4 h-4 flex items-center justify-center"
                :style="{ background: getStarBackground(review.rating, i - 1) }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </div>
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
              <span class="text-sm text-green-600 font-medium">Verified</span>
            </div>
          </div>

          <div class="relative">
            <p 
              class="text-sm text-gray-700 leading-relaxed m-0"
              style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;"
            >
              {{ review.text.replace(' See more', '').replace('... See more', '...') }}
            </p>
            <span 
              v-if="review.text.includes('See more')"
              class="text-blue-600 hover:text-blue-700 cursor-pointer absolute bg-white leading-relaxed"
              style="bottom: 0; right: 0; padding-left: 8px; font-size: 0.875rem; font-weight: 400; line-height: 1.625;"
            >
              <span class="text-gray-700">... </span>See more
            </span>
          </div>
          
          <div v-if="review.reply" class="mt-3 pl-3 border-l-2 border-gray-200">
            <p class="text-xs text-gray-500">Company replied</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WholesaleCommunity',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    reviews: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      startIndex: 0,
      itemsPerPage: 4
    }
  },
  methods: {
    nextSlide() {
      if (this.startIndex + 1 <= this.reviews.length - this.itemsPerPage) {
        this.startIndex++;
      }
    },
    prevSlide() {
      if (this.startIndex - 1 >= 0) {
        this.startIndex--;
      }
    },
    getStarBackground(rating, index) {
      let starColor;
      if (rating >= 4) {
        starColor = "#00B67A";
      } else if (rating >= 3) {
        starColor = "#FFD700";
      } else {
        starColor = "#FF8622";
      }
      const emptyColor = "#E0E0E0";
      
      let fillPercentage = 0;
      if (index < Math.floor(rating)) {
        fillPercentage = 100;
      } else if (index < rating) {
        fillPercentage = (rating - index) * 100;
      }
      
      return fillPercentage === 100 
        ? starColor 
        : fillPercentage === 0 
          ? emptyColor 
          : `linear-gradient(to right, ${starColor} ${fillPercentage}%, ${emptyColor} ${fillPercentage}%)`;
    }
  }
}
</script>
