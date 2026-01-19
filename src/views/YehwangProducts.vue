<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans">
    <!-- Fixed Header and Navbar -->
    <!-- <WholesaleHeader @logo-click="handleLogoClick" />
    <WholesaleNavbar /> -->

    <!-- Main Content with automatic top padding -->
    <main class="pt-[80px]">
      <div class="max-w-[1460px] mx-auto px-4 md:px-8 py-12">
        <!-- 页面标题和分类 -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2">
            {{ categoryTitle }}
          </h1>
          <p class="text-sm text-gray-500">Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ totalProducts }} products
          </p>
        </div>

        <!-- 商品网格 -->
        <div v-if="!isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 mb-12">
          <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
        </div>

        <!-- 加载状态 -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 mb-12">
          <div v-for="i in 20" :key="i" class="p-1.5">
            <div class="skeleton-shimmer aspect-[3/4] mb-3 rounded-[4px]"></div>
            <div class="skeleton-shimmer mb-2" style="height: 12px; width: 90%; border-radius: 4px;"></div>
            <div class="skeleton-shimmer" style="height: 12px; width: 70%; border-radius: 4px;"></div>
          </div>
        </div>

        <!-- 分页控件 -->
        <div class="flex items-center justify-center gap-2">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            :class="['px-4 py-2 rounded-[4px] border transition-colors', currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50']">
            ← Previous
          </button>

          <div class="flex gap-1">
            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
              :class="['px-4 py-2 rounded-[4px] border transition-colors', page === currentPage ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-700 hover:bg-gray-50']">
              {{ page }}
            </button>
          </div>

          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
            :class="['px-4 py-2 rounded-[4px] border transition-colors', currentPage === totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50']">
            Next →
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <WholesaleFooter />
  </div>
</template>

<script>
import { useMockApi } from '@/composables/useMockApi';
import ProductCard from '@/components/yehwang/ProductCard.vue';
import WholesaleHeader from '@/components/yehwang/WholesaleHeader.vue';
import WholesaleNavbar from '@/components/yehwang/WholesaleNavbar.vue';
import WholesaleFooter from '@/components/yehwang/WholesaleFooter.vue';

export default {
  name: 'YehwangProducts',
  components: {
    ProductCard,
    WholesaleHeader,
    WholesaleNavbar,
    WholesaleFooter
  },
  data() {
    return {
      isLoading: true,
      products: [],
      currentPage: 1,
      itemsPerPage: 60, // 12 rows x 5 columns = 60 items per page
      category: ''
    }
  },
  computed: {
    categoryTitle() {
      return this.category || 'All Products';
    },
    totalProducts() {
      return this.products.length;
    },
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      const end = this.startIndex + this.itemsPerPage;
      return end > this.totalProducts ? this.totalProducts : end;
    },
    paginatedProducts() {
      return this.products.slice(this.startIndex, this.endIndex);
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  async mounted() {
    // 从 URL 获取分类参数
    if (this.$route.query.category) {
      this.category = this.$route.query.category;
    }

    // 获取商品数据
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      const { fetchProductList } = useMockApi();

      try {
        this.products = await fetchProductList(this.category);
        console.log('[Yehwang Products Page] Loaded products:', this.products.length);
      } catch (error) {
        console.error('[Yehwang Products Page] Error fetching products:', error);
      } finally {
        this.isLoading = false;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    handleLogoClick() {
      // 可以在这里处理 logo 点击事件
      // 例如：切换登录状态等
    }
  },
  watch: {
    '$route.query.category'(newCategory) {
      this.category = newCategory || '';
      this.currentPage = 1;
      this.fetchProducts();
    }
  }
}
</script>

<style scoped>
/* Skeleton shimmer animation */
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
</style>
