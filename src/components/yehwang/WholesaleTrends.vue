<template>
  <section class="pt-0 px-4 md:px-8 max-w-[1460px] mx-auto">
    <h2 class="text-xl font-bold uppercase tracking-wide mb-8">Wholesale Trends</h2>
    
    <div class="flex flex-col gap-8">
      <!-- Top Row - 4 items -->
      <CarouselSection :items="topTrends" :visible-items="4" :is-square="false" :infinite="true" />
      
      <!-- Bottom Row - 3 items -->
      <CarouselSection :items="bottomTrends" :visible-items="3" :is-square="true" />
    </div>
  </section>
</template>

<script>
const CarouselSection = {
  props: {
    items: Array,
    visibleItems: Number,
    isSquare: Boolean,
    infinite: Boolean
  },
  data() {
    return {
      currentIndex: this.infinite ? this.items.length : 0,
      isTransitioning: true
    }
  },
  computed: {
    displayItems() {
      return this.infinite ? [...this.items, ...this.items, ...this.items] : this.items;
    },
    totalItems() {
      return this.displayItems.length;
    },
    maxIndex() {
      return this.infinite ? this.totalItems : this.items.length - this.visibleItems;
    },
    slideWidthPercent() {
      return 100 / this.displayItems.length;
    },
    gap() {
      return 16;
    },
    itemWidthCalc() {
      return `((100% - ${(this.visibleItems - 1) * this.gap}px) / ${this.visibleItems})`;
    },
    centerOffsetCalc() {
      return this.infinite ? `calc((${this.itemWidthCalc} + ${this.gap}px) / 2)` : '0px';
    },
    transformStyle() {
      return `translateX(calc(-${this.currentIndex} * (${this.itemWidthCalc} + ${this.gap}px) + ${this.centerOffsetCalc}))`;
    }
  },
  methods: {
    nextSlide() {
      if (this.infinite || this.currentIndex < this.maxIndex) {
        if (!this.isTransitioning) this.isTransitioning = true;
        this.currentIndex++;
      }
    },
    prevSlide() {
      if (this.infinite || this.currentIndex > 0) {
        if (!this.isTransitioning) this.isTransitioning = true;
        this.currentIndex--;
      }
    },
    checkLoop() {
      if (!this.infinite) return;
      
      if (this.currentIndex >= this.items.length * 2) {
        setTimeout(() => {
          this.isTransitioning = false;
          this.currentIndex = this.items.length;
        }, 500);
      } else if (this.currentIndex < this.items.length) {
        setTimeout(() => {
          this.isTransitioning = false;
          this.currentIndex = this.items.length * 2 - 1;
        }, 500);
      }
    }
  },
  watch: {
    currentIndex() {
      this.checkLoop();
    }
  },
  template: `
    <div class="relative group">
      <button 
        v-if="infinite || currentIndex > 0"
        @click="prevSlide"
        class="absolute left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      
      <button 
        v-if="infinite || currentIndex < maxIndex"
        @click="nextSlide"
        class="absolute right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div class="overflow-hidden">
        <div 
          :class="['flex', isTransitioning ? 'transition-transform duration-500 ease-out' : '']"
          :style="{ transform: transformStyle, gap: gap + 'px' }"
        >
          <div 
            v-for="(item, index) in displayItems" 
            :key="index" 
            class="flex-shrink-0 relative overflow-hidden group/card cursor-pointer"
            :style="{ width: 'calc(' + itemWidthCalc + ')' }"
          >
            <div :class="['w-full overflow-hidden rounded-[4px]', isSquare ? 'aspect-square' : 'aspect-[353/530]']">
              <img 
                :src="item.image" 
                :alt="item.title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
            </div>
            
            <div class="absolute inset-0 flex flex-col justify-end p-6">
              <div v-if="isSquare" class="text-white">
                <h3 class="text-3xl font-serif mb-1">{{ item.title }}</h3>
                <p class="text-sm uppercase tracking-wider">{{ item.subtitle }}</p>
              </div>
              <div v-else class="w-full flex justify-center">
                <button class="rounded-[4px] bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-wider w-max hover:bg-black hover:text-white transition-colors">
                  SHOP CAMPAIGN
                </button>
              </div>
            </div>
            
            <div v-if="isSquare" class="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  `
};

export default {
  name: 'WholesaleTrends',
  components: {
    CarouselSection
  },
  props: {
    topTrends: {
      type: Array,
      default: () => []
    },
    bottomTrends: {
      type: Array,
      default: () => []
    }
  }
}
</script>
