<template>
  <section class="pt-4 pb-12 px-[12px] md:px-8 max-w-[1460px] mx-auto">
    <div class="px-[4px] mb-6">
      <h2 class="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">WHOLESALE NEW-IN</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <!-- Show More Button -->
    <div class="flex justify-center mt-8">
      <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'new-arrivals' } }"
        class="inline-flex items-center gap-2 text-sm hover:text-black transition-colors" style="color: #333333">
        <span class="underline underline-offset-4" style="text-decoration-color: #333333">Show More</span>
        <span class="text-lg">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'WholesaleNewArrivals',
  components: {
    ProductCard,
    RouterLink
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>
