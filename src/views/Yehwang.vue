<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans">

    <!-- Draggable Login State Toggle -->
    <div class="fixed z-50 bg-white border border-gray-300 rounded-full shadow-2xl px-5 py-3 cursor-move select-none"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'width 300ms ease-in-out',
      }" @mousedown="handleMouseDown">
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-900">
          {{ isLoggedIn ? 'Logged In' : 'Logged Out' }}
        </span>
        <button @click.stop="toggleLogin"
          :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400', isLoggedIn ? 'bg-black' : 'bg-gray-400']"
          aria-label="Toggle login state">
          <span
            :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200', isLoggedIn ? 'translate-x-6' : 'translate-x-1']" />
        </button>
      </div>
    </div>

    <!-- Fixed Header and Navbar -->
    <WholesaleHeader @logo-click="handleLogoClick" />
    <WholesaleNavbar />

    <!-- Loading Skeleton -->
    <main v-if="isLoading" class="pt-[165px]">
      <div class="loading-wrapper">
        <!-- Hero Skeleton -->
        <div class="skeleton-hero-section">
          <div class="skeleton-shimmer" style="height: 500px; border-radius: 12px;"></div>
        </div>

        <!-- Categories Skeleton - matches WholesaleCategories layout -->
        <section class="skeleton-categories pt-12 px-4 md:px-8 max-w-[1460px] mx-auto">
          <div class="flex justify-between items-center mb-8">
            <div class="skeleton-shimmer" style="height: 32px; width: 350px; border-radius: 6px;"></div>
            <div class="flex gap-2">
              <div class="skeleton-shimmer" style="width: 36px; height: 36px; border-radius: 50%;"></div>
              <div class="skeleton-shimmer" style="width: 36px; height: 36px; border-radius: 50%;"></div>
            </div>
          </div>
          <div class="grid grid-cols-5 gap-4">
            <div v-for="i in 5" :key="'cat-' + i" class="flex flex-col">
              <div class="skeleton-shimmer aspect-[3/4] mb-4 rounded-[4px]"></div>
              <div class="skeleton-shimmer" style="height: 16px; width: 80%; margin: 0 auto; border-radius: 4px;"></div>
            </div>
          </div>
        </section>

        <!-- Resources Skeleton - matches WholesaleResources layout -->
        <section class="skeleton-resources py-16 px-4 md:px-8 max-w-[1460px] mx-auto">
          <div class="skeleton-shimmer mb-8" style="height: 32px; width: 400px; border-radius: 6px;"></div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="'res-' + i" class="flex flex-col">
              <div class="skeleton-shimmer mb-4 rounded-[4px]" style="height: 288px;"></div>
              <div class="skeleton-shimmer mb-2" style="height: 18px; width: 70%; border-radius: 4px;"></div>
              <div class="skeleton-shimmer" style="height: 14px; width: 50%; border-radius: 4px;"></div>
            </div>
          </div>
        </section>

        <!-- Trends Skeleton - matches WholesaleTrends layout -->
        <section class="skeleton-trends pt-0 px-4 md:px-8 max-w-[1460px] mx-auto">
          <div class="skeleton-shimmer mb-8" style="height: 32px; width: 250px; border-radius: 6px;"></div>

          <!-- Top Row - 4 items with aspect-[353/530] -->
          <div class="mb-8">
            <div class="grid grid-cols-4 gap-4">
              <div v-for="i in 4" :key="'trend-top-' + i" class="skeleton-shimmer aspect-[353/530] rounded-[4px]"></div>
            </div>
          </div>

          <!-- Bottom Row - 3 items square -->
          <div class="mb-8">
            <div class="grid grid-cols-3 gap-4">
              <div v-for="i in 3" :key="'trend-bottom-' + i" class="skeleton-shimmer aspect-square rounded-[4px]"></div>
            </div>
          </div>
        </section>

        <!-- Community Skeleton -->
        <section class="skeleton-community py-12 px-4 md:px-8 max-w-[1460px] mx-auto">
          <div class="skeleton-shimmer mb-8" style="height: 32px; width: 300px; border-radius: 6px;"></div>
          <div class="skeleton-shimmer rounded-[4px]" style="height: 400px;"></div>
        </section>

        <!-- Daily Deals Skeleton - matches WholesaleDailyDeals layout -->
        <section class="skeleton-daily-deals py-12 px-[12px] md:px-8 max-w-[1460px] mx-auto">
          <div class="px-[4px] flex justify-between items-center mb-6">
            <div class="skeleton-shimmer" style="height: 32px; width: 300px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 16px; width: 100px; border-radius: 4px;"></div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            <div v-for="i in 5" :key="'deal-' + i" class="p-1.5">
              <div class="skeleton-shimmer aspect-[3/4] mb-3 rounded-[4px]"></div>
              <div class="skeleton-shimmer mb-2" style="height: 12px; width: 90%; border-radius: 4px;"></div>
              <div class="skeleton-shimmer" style="height: 12px; width: 70%; border-radius: 4px;"></div>
            </div>
          </div>
        </section>

        <!-- Yehwang Family Skeleton -->
        <section class="skeleton-family py-12 px-4 md:px-8 max-w-[1460px] mx-auto">
          <div class="skeleton-shimmer mb-8" style="height: 32px; width: 280px; border-radius: 6px;"></div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="'brand-' + i" class="skeleton-shimmer aspect-square rounded-[4px]"></div>
          </div>
        </section>

        <!-- Services Skeleton -->
        <section class="skeleton-services py-12 px-4 md:px-8 max-w-[1460px] mx-auto">
          <div class="skeleton-shimmer rounded-[4px]" style="height: 300px;"></div>
        </section>

        <!-- New Arrivals Skeleton - matches product grid -->
        <section class="skeleton-new-arrivals py-12 px-[12px] md:px-8 max-w-[1460px] mx-auto">
          <div class="px-[4px] flex justify-between items-center mb-6">
            <div class="skeleton-shimmer" style="height: 32px; width: 280px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 16px; width: 100px; border-radius: 4px;"></div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            <div v-for="i in 5" :key="'new-' + i" class="p-1.5">
              <div class="skeleton-shimmer aspect-[3/4] mb-3 rounded-[4px]"></div>
              <div class="skeleton-shimmer mb-2" style="height: 12px; width: 90%; border-radius: 4px;"></div>
              <div class="skeleton-shimmer" style="height: 12px; width: 70%; border-radius: 4px;"></div>
            </div>
          </div>
        </section>

        <!-- Best Sellers Skeleton - matches product grid -->
        <section class="skeleton-best-sellers py-12 px-[12px] md:px-8 max-w-[1460px] mx-auto">
          <div class="px-[4px] flex justify-between items-center mb-6">
            <div class="skeleton-shimmer" style="height: 32px; width: 200px; border-radius: 6px;"></div>
            <div class="skeleton-shimmer" style="height: 16px; width: 100px; border-radius: 4px;"></div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            <div v-for="i in 5" :key="'best-' + i" class="p-1.5">
              <div class="skeleton-shimmer aspect-[3/4] mb-3 rounded-[4px]"></div>
              <div class="skeleton-shimmer mb-2" style="height: 12px; width: 90%; border-radius: 4px;"></div>
              <div class="skeleton-shimmer" style="height: 12px; width: 70%; border-radius: 4px;"></div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Actual Content -->
    <main v-else class="fade-in pt-[165px]">
      <WholesaleHeroLoggedIn v-if="isLoggedIn" :slides="heroSlidesData" :user-info="userInfoData" />
      <WholesaleHero v-else />
      <WholesaleCategories :categories="categoriesData" />
      <WholesaleResources :resources="resourcesData" />
      <WholesaleTrends :top-trends="trendsData.topTrends" :bottom-trends="trendsData.bottomTrends" />
      <WholesaleCommunity :is-logged-in="isLoggedIn" :reviews="reviewsData" />
      <WholesaleDailyDeals :products="dailyDealsData" />
      <WholesaleYehwangFamily :brands="brandsData" />
      <WholesaleServicesSection :is-logged-in="isLoggedIn" />
      <WholesaleNewArrivals :products="newArrivalsData" />
      <WholesaleBestSellers :products="bestSellersData" />
    </main>

    <!-- Footer -->
    <WholesaleFooter />
  </div>
</template>

<script>
import { useMockApi } from '@/composables/useMockApi';
import WholesaleHeader from '@/components/yehwang/WholesaleHeader.vue';
import WholesaleNavbar from '@/components/yehwang/WholesaleNavbar.vue';
import WholesaleHeroLoggedIn from '@/components/yehwang/WholesaleHeroLoggedIn.vue';
import WholesaleHero from '@/components/yehwang/WholesaleHero.vue';
import WholesaleCategories from '@/components/yehwang/WholesaleCategories.vue';
import WholesaleResources from '@/components/yehwang/WholesaleResources.vue';
import WholesaleTrends from '@/components/yehwang/WholesaleTrends.vue';
import WholesaleCommunity from '@/components/yehwang/WholesaleCommunity.vue';
import WholesaleDailyDeals from '@/components/yehwang/WholesaleDailyDeals.vue';
import WholesaleYehwangFamily from '@/components/yehwang/WholesaleYehwangFamily.vue';
import WholesaleServicesSection from '@/components/yehwang/WholesaleServicesSection.vue';
import WholesaleNewArrivals from '@/components/yehwang/WholesaleNewArrivals.vue';
import WholesaleBestSellers from '@/components/yehwang/WholesaleBestSellers.vue';
import WholesaleFooter from '@/components/yehwang/WholesaleFooter.vue';

export default {
  name: 'Yehwang',
  components: {
    WholesaleHeader,
    WholesaleNavbar,
    WholesaleHeroLoggedIn,
    WholesaleHero,
    WholesaleCategories,
    WholesaleResources,
    WholesaleTrends,
    WholesaleCommunity,
    WholesaleDailyDeals,
    WholesaleYehwangFamily,
    WholesaleServicesSection,
    WholesaleNewArrivals,
    WholesaleBestSellers,
    WholesaleFooter
  },
  data() {
    return {
      isLoggedIn: false,
      isLoading: true,
      position: { x: 0, y: 140 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
      // Data from mock API
      dailyDealsData: [],
      newArrivalsData: [],
      bestSellersData: [],
      trendsData: { topTrends: [], bottomTrends: [] },
      categoriesData: [],
      heroSlidesData: [],
      userInfoData: {},
      reviewsData: [],
      resourcesData: [],
      brandsData: []
    }
  },
  async mounted() {
    this.position.x = window.innerWidth - 200;

    // Fetch data from mock API
    const {
      fetchDailyDeals,
      fetchNewArrivals,
      fetchBestSellers,
      fetchTrends,
      fetchCategories,
      fetchHeroSlides,
      fetchUserInfo,
      fetchReviews,
      fetchResources,
      fetchBrands
    } = useMockApi();

    try {
      // Fetch all data concurrently
      const [
        dailyDeals,
        newArrivals,
        bestSellers,
        trends,
        categories,
        heroSlides,
        userInfo,
        reviews,
        resources,
        brands
      ] = await Promise.all([
        fetchDailyDeals(),
        fetchNewArrivals(),
        fetchBestSellers(),
        fetchTrends(),
        fetchCategories(),
        fetchHeroSlides(),
        fetchUserInfo(),
        fetchReviews(),
        fetchResources(),
        fetchBrands()
      ]);

      this.dailyDealsData = dailyDeals;
      this.newArrivalsData = newArrivals;
      this.bestSellersData = bestSellers;
      this.trendsData = trends;
      this.categoriesData = categories;
      this.heroSlidesData = heroSlides;
      this.userInfoData = userInfo;
      this.reviewsData = reviews;
      this.resourcesData = resources;
      this.brandsData = brands;

      console.log('[Index Page] All data loaded successfully');
    } catch (error) {
      console.error('[Index Page] Error fetching data:', error);
    } finally {
      // Hide loading state after data is loaded
      this.isLoading = false;
    }
  },
  methods: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    handleLogoClick() {
      // 可以在这里处理 logo 点击事件
      // 例如：切换登录状态等
    },
    handleMouseDown(e) {
      this.isDragging = true;
      this.dragStart = {
        x: e.clientX - this.position.x,
        y: e.clientY - this.position.y,
      };
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseMove(e) {
      if (this.isDragging) {
        let newX = e.clientX - this.dragStart.x;
        let newY = e.clientY - this.dragStart.y;

        const toggleWidth = 180;
        const toggleHeight = 56;

        newX = Math.max(0, Math.min(newX, window.innerWidth - toggleWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - toggleHeight));

        this.position = { x: newX, y: newY };
      }
    },
    handleMouseUp() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
}
</script>

<style scoped>
/* Loading Wrapper */
.loading-wrapper {
  background: white;
}

.skeleton-hero-section {
  max-width: 1460px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Skeleton Shimmer Animation */
.skeleton-shimmer {
  background: linear-gradient(90deg,
      #f0f0f0 0%,
      #f8f8f8 20%,
      #f0f0f0 40%,
      #f0f0f0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

/* Fade In Animation for Content */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {

  .skeleton-categories .grid,
  .skeleton-trends .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .skeleton-daily-deals .grid,
  .skeleton-new-arrivals .grid,
  .skeleton-best-sellers .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
