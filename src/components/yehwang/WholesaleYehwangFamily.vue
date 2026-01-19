<template>
  <section class="w-full bg-[#f5e6e8] py-12">
    <div class="px-4 md:px-8 max-w-[1460px] mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Meet the Yehwang Family
        </h2>
        <p class="text-sm text-gray-600">
          From expressive clothing to fine jewelry— curated brands your customers will love.
        </p>
      </div>

      <!-- Brand Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="brand in brands" :key="brand.id" class="cursor-pointer transition-all duration-300 hover:-translate-y-1">
          <!-- Brand Image -->
          <div class="relative overflow-hidden rounded-[4px] mb-3" style="aspect-ratio: 353/248">
            <img
              :src="brand.image"
              :alt="brand.name"
              class="w-full h-full object-cover"
            />
            <!-- Brand Name Overlay -->
            <div class="absolute inset-0 flex items-center justify-center">
              <h3 class="text-white text-5xl lg:text-6xl font-bold lowercase" style="text-shadow: 0 2px 12px rgba(0,0,0,0.6)">
                {{ brand.name }}
              </h3>
            </div>
            <!-- Watermark - only show for first card -->
            <div v-if="brand.id === 1" class="absolute top-3 right-3 text-white/40 text-[10px] font-normal tracking-wide">
              gimme fall/winter
            </div>
          </div>

          <!-- Brand Info -->
          <div>
            <p class="text-[13px] text-gray-800 mb-3 leading-[1.5] line-clamp-2">
              {{ brand.description }}
            </p>

            <!-- Action Links -->
            <div class="space-y-[8px]">
              <a
                :href="brand.shopLink"
                class="inline-block bg-white text-center py-[8px] px-[16px] text-[13px] font-bold text-gray-900 hover:bg-gray-50 transition-colors uppercase tracking-wide border border-white hover:border-black rounded-[4px]"
              >
                SHOP {{ brand.name.toUpperCase() }}
              </a>
              <a
                :href="brand.connectLink"
                class="block text-[12px] font-semibold hover:text-black transition-colors uppercase tracking-wide underline decoration-1 underline-offset-4"
                style="color: #333333"
              >
                CONNECT SHOPIFY
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WholesaleYehwangFamily',
  props: {
    brands: {
      type: Array,
      default: () => []
    }
  }
}
</script>
