<template>
  <section class="font-sans pt-4 md:pt-[70px]">
    <!-- Carousel -->
    <div class="w-full overflow-hidden relative mb-8 group">
      <div 
        class="flex"
        :style="{ 
          transform: `translateX(${translateX}%)`,
          transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
          width: `${extendedSlides.length * 100}%`
        }"
      >
        <div 
          v-for="(slide, index) in extendedSlides" 
          :key="`${slide.id}-${index}`" 
          class="flex-shrink-0 relative h-[500px]"
          :style="{ width: `${slideWidthPercent}%` }"
        >
          <img 
            :src="slide.image" 
            :alt="slide.alt" 
            class="w-full h-full object-cover"
          />
          <div v-if="slide.overlay" class="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/10">
            <h2 class="text-[120px] font-bold tracking-tighter leading-none opacity-30 stroke-white text-transparent select-none" style="-webkit-text-stroke: 2px white">
              BASICS
            </h2>
            <div class="absolute bottom-12 text-center">
              <p class="text-2xl font-bold drop-shadow-md">
                <span class="text-white">NEW-IN:</span> Back to Basics Part II
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <template v-if="showControls">
        <button
          @click="handlePrev"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
          aria-label="Previous slide"
        >
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="handleNext"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
          aria-label="Next slide"
        >
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>

      <!-- Page Indicators -->
      <div v-if="showControls" class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="setSlide(index)"
          :class="['w-2 h-2 rounded-full transition-all duration-300', isActive(index) ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80']"
        />
      </div>
    </div>

    <!-- User Info Bar -->
    <div class="max-w-[1460px] mx-auto px-4 md:px-8 mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Welcome back, {{ userInfo.name }}</h2>
      <div class="bg-[#F1E9EA] py-4 px-8 grid grid-cols-1 md:grid-cols-4 items-center gap-4 md:gap-0 rounded-[2px]">
        <!-- Membership -->
        <div class="flex items-center gap-3 justify-center md:border-r md:border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="text-sm">Membership: <span class="font-bold">{{ userInfo.membership }}</span></span>
        </div>
        
        <!-- Points -->
        <div class="flex items-center gap-3 justify-center md:border-r md:border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
          <span class="text-sm">Points: <span class="font-bold">{{ userInfo.points }}=€{{ userInfo.pointsValue }}</span></span>
        </div>

        <!-- Credit -->
        <div class="flex items-center gap-3 justify-center md:border-r md:border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span class="text-sm">Credit: <span class="font-bold">€{{ userInfo.credit }}</span></span>
        </div>

        <!-- Coupons -->
        <div class="flex items-center gap-3 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
          <span class="text-sm">Coupons: <span class="font-bold">{{ userInfo.coupons }}</span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WholesaleHeroLoggedIn',
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentIndex: 0,
      isTransitioning: true,
      autoplayInterval: null
    }
  },
  computed: {
    extendedSlides() {
      return [
        this.slides[this.slides.length - 1],
        ...this.slides,
        this.slides[0]
      ];
    },
    slideWidthPercent() {
      return 100 / this.extendedSlides.length;
    },
    translateX() {
      return -(this.currentIndex + 1) * this.slideWidthPercent;
    },
    showControls() {
      return this.slides.length > 1;
    }
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
  },
  methods: {
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.handleNext();
      }, 4000);
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    },
    handleNext() {
      this.isTransitioning = true;
      this.currentIndex++;
      this.checkLoop();
    },
    handlePrev() {
      this.isTransitioning = true;
      this.currentIndex--;
      this.checkLoop();
    },
    setSlide(index) {
      this.isTransitioning = true;
      this.currentIndex = index;
    },
    checkLoop() {
      this.$nextTick(() => {
        if (this.currentIndex === this.slides.length) {
          setTimeout(() => {
            this.isTransitioning = false;
            this.currentIndex = 0;
          }, 500);
        } else if (this.currentIndex === -1) {
          setTimeout(() => {
            this.isTransitioning = false;
            this.currentIndex = this.slides.length - 1;
          }, 500);
        }
      });
    },
    isActive(index) {
      return (this.currentIndex === index) || 
             (this.currentIndex === this.slides.length && index === 0) || 
             (this.currentIndex === -1 && index === this.slides.length - 1);
    }
  }
}
</script>
