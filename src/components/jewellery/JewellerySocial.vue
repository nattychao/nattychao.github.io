<template>
  <section class="jewellery-social w-full bg-[#f3efeb] py-8 md:py-12">
    <div class="max-w-[1366px] mx-auto px-4 mb-6">
      <h2 class="text-center font-medium text-sm md:text-base mb-1 font-futura">#myjewellery styled by you!</h2>
      <p class="text-center text-xs md:text-sm text-gray-500">Tag your photos with #myjewellery and appear on our feed
      </p>
    </div>

    <!-- 轮播容器 -->
    <div class="w-full px-3 relative">
      <!-- 左翻页按钮 -->
      <button @click="prevSlide"
        class="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- 轮播内容 -->
      <div class="overflow-hidden">
        <div class="flex gap-2 transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(${translateX}%)` }">
          <!-- 图片卡片 -->
          <div v-for="(item, index) in infiniteImages" :key="index"
            class="relative overflow-hidden flex-shrink-0 w-1/2 md:w-1/4 cursor-pointer group bg-slate-100">
            <img :src="item" alt="Jewellery Style"
              class="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110" />
            <!-- 悬停效果层 -->
            <div
              class="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <!-- 中心用户信息 -->
              <div class="absolute inset-0 flex flex-col justify-center items-center px-4">
                <div class="text-white text-center">
                  <div class="flex items-center justify-center space-x-2 mb-2">
                    <span class="font-medium">margaux.marissen</span>
                  </div>
                  <div class="flex items-center justify-center space-x-4">
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span class="text-sm">161</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path
                          d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h11c.55 0 1-.45 1-1z" />
                      </svg>
                      <span class="text-sm">37</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 底部按钮 -->
              <div class="absolute bottom-0 left-0 right-0 p-0 w-full">
                <div class="w-full">
                  <button
                    class="w-full py-2 px-4 bg-black/50 text-white text-sm font-medium hover:bg-gray-200 transition-colors duration-300">
                    VIEW AND SHOP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右翻页按钮 -->
      <button @click="nextSlide"
        class="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JewellerySocial',
  data() {
    return {
      currentIndex: 0, // 当前滑动位置
      slidesToShow: 3, // 一次翻页移动的卡片数量
      socialImages: [
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RSWFozeklpTmYzLw==/0',
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RRNGpJdlZDTk0wLw==/0',
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RSajBsc3RDT01pLw==/0',
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RSbkhBWDVqZmhDLw==/0',
        // 可以添加更多图片
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RSWFozeklpTmYzLw==/0',
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RRNGpJdlZDTk0wLw==/0',
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RSajBsc3RDT01pLw==/0',
        'https://cdn.flbx.io/aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9wL0RSbkhBWDVqZmhDLw==/0'
      ]
    }
  },
  computed: {
    // 可见卡片数（响应式）
    visibleSlides() {
      return window.innerWidth >= 768 ? 4 : 2
    },
    // 计算每张卡片的宽度百分比
    cardWidth() {
      return 100 / this.visibleSlides
    },
    // 计算每次滑动的总宽度百分比
    slideWidth() {
      return this.cardWidth * this.slidesToShow
    },
    // 无限循环图片数组
    infiniteImages() {
      // 复制原数组三次以实现无限循环效果
      return [...this.socialImages, ...this.socialImages, ...this.socialImages]
    },
    // 滑动的总距离百分比
    translateX() {
      // 计算当前应该滑动的总距离百分比
      return -this.currentIndex * this.cardWidth
    },
    // 最大滑动索引
    maxIndex() {
      return this.socialImages.length
    }
  },
  methods: {
    nextSlide() {
      // 实现无限循环：将第四张卡片移动到原来第一张卡片的位置
      this.currentIndex += this.slidesToShow

      // 当滑动到复制数组的中间部分时，重置索引以实现无缝循环
      if (this.currentIndex >= this.maxIndex + this.visibleSlides) {
        // 使用setTimeout确保动画完成后再重置
        setTimeout(() => {
          this.currentIndex = this.currentIndex - this.maxIndex
        }, 500)
      }
    },
    prevSlide() {
      // 实现无限循环：将最后一张卡片移动到原来第一张卡片的位置
      this.currentIndex -= this.slidesToShow

      // 当滑动到复制数组的开始部分时，重置索引以实现无缝循环
      if (this.currentIndex < 0) {
        // 使用setTimeout确保动画完成后再重置
        setTimeout(() => {
          this.currentIndex = this.currentIndex + this.maxIndex
        }, 500)
      }
    },
    handleResize() {
      // 窗口大小变化时重新计算当前滑动位置，确保不会超出范围
      this.$nextTick(() => {
        this.currentIndex = Math.min(this.currentIndex, this.maxIndex)
      })
    }
  },
  mounted() {
    // 添加窗口大小监听
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // 移除窗口大小监听
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
