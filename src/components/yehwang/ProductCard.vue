<template>
  <div class="group cursor-pointer transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 rounded-[4px] p-1.5">
    <div class="relative mb-3 overflow-hidden rounded-[4px]">
      <div class="aspect-[3/4] w-full relative">
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="rounded-[4px] w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
        />
        <!-- Badge - Top Left -->
        <div 
          v-if="product.badge"
          class="absolute top-2 left-2 text-white text-[10px] px-2 py-1 rounded-[4px]"
          :style="{ backgroundColor: product.badgeType === 'eu' ? '#645B58' : '#60445D' }"
        >
          {{ product.badge }}
        </div>
        <!-- 30% OFF Badge -->
        <div class="absolute bottom-0 left-0 bg-white px-1.5 py-0.5 text-[10px] font-bold border border-gray-200 rounded-tr-[4px] rounded-bl-[4px]">
          30% OFF
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between mb-1">
      <h3 class="text-xs text-gray-900 truncate flex-1 relative inline-block">
        <span class="relative">
          {{ product.title }}
          <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-900 group-hover:w-full transition-all duration-300 ease-out"></span>
        </span>
      </h3>
      <div class="flex items-center gap-1 ml-1 flex-none">
        <div class="flex">
          <div 
            v-for="(color, i) in displayedColors" 
            :key="i" 
            :class="['w-2 h-2 rounded-full border border-gray-200', i > 0 ? '-ml-[2px]' : '']"
            :style="{ backgroundColor: color, zIndex: displayedColors.length - i, position: 'relative' }"
          ></div>
        </div>
        <span class="text-[10px] text-gray-500">+{{ product.colorsCount }}</span>
      </div>
    </div>
    
    <div class="flex items-center gap-1 text-xs text-gray-500 underline decoration-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Unlock the wholesale price
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 最多显示3个颜色
    displayedColors() {
      return this.product.colors ? this.product.colors.slice(0, 3) : [];
    }
  }
}
</script>
