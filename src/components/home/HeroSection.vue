<template>
  <!-- Hero Section -->
  <section
    class="relative flex items-center justify-center overflow-hidden md:h-[max(calc(100vh_*_0.618),_600px)] h-[max(calc(40vh),_320px)]"
    :style="{ paddingTop: 'calc(64px + var(--safe-area-inset-top, 0px))' }">
    <!-- Background Image Carousel -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <Swiper :modules="[Autoplay]" :slides-per-view="1" :space-between="0" :loop="true"
        :autoplay="{ delay: 6000, disableOnInteraction: false }" :effect="'fade'" :fade-effect="{ crossFade: true }"
        @swiper="handleSwiperInit" @slide-change-transition-end="handleSlideChange" class="h-full w-full relative">
        <SwiperSlide v-for="(image, index) in carouselImages" :key="index" class="h-full w-full">
          <img :src="image" alt="Background {{ index + 1 }}" class="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-10 pointer-events-none"></div>

      <!-- 自定义页码指示器 -->
      <div class="absolute bottom-4 md:bottom-5 left-0 right-0 z-50 flex justify-center items-center gap-2 md:gap-3">
        <div v-for="(image, index) in carouselImages" :key="index" @click="goToSlide(index)"
          class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ffffff80] transition-all duration-300 cursor-pointer"
          :class="{ 'bg-white w-2 md:w-8': index === currentSlide }">
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
      <!-- 整个文本视图的过渡动画 -->
      <Transition name="view-slide" mode="out-in">
        <div class="text-center" :key="currentSlide">
          <!-- 徽章文字过渡动画 -->
          <Transition name="text-fade" mode="out-in">
            <div key="badge-{{ currentSlide }}"
              class="inline-block px-3 py-1 mb-4 sm:mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-wide">
              {{ carouselTexts[currentSlide].badge }}
            </div>
          </Transition>

          <!-- 主标题文字过渡动画 -->
          <Transition name="text-slide" mode="out-in">
            <h1 key="title-{{ currentSlide }}"
              class="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-lg">
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300 animate-gradient">
                {{ carouselTexts[currentSlide].title }}
              </span>
            </h1>
          </Transition>

          <!-- 副标题文字过渡动画 -->
          <Transition name="text-slide" mode="out-in">
            <p key="subtitle-{{ currentSlide }}"
              class="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-md px-4">
              <template v-if="carouselTexts[currentSlide].subtitle.includes('Nattychao')">
                {{ carouselTexts[currentSlide].subtitle.split('Nattychao')[0] }}
                <span
                  class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 via-purple-300 to-pink-300 animate-gradient">
                  Nattychao
                </span>
                {{ carouselTexts[currentSlide].subtitle.split('Nattychao')[1] || '' }}
              </template>
              <span v-else>
                {{ carouselTexts[currentSlide].subtitle }}
              </span>
            </p>
          </Transition>
          <div class="flex flex-row justify-center gap-2 sm:gap-3 md:gap-5 px-4">
            <router-link to="/resume"
              class="px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-theme-900 rounded-full font-bold md:hover:bg-slate-100 transition-all shadow-xl md:hover:shadow-2xl md:hover:-translate-y-1 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap">
              查看简历
              <ArrowRight class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </router-link>
            <router-link to="/blog"
              class="px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold md:hover:bg-white/20 transition-all md:hover:-translate-y-1 flex items-center justify-center text-xs sm:text-sm md:text-base whitespace-nowrap">
              阅读博客
            </router-link>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Scroll Indicator -->
    <div class="hidden absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70">
      <ArrowRight class="w-6 h-6 rotate-90" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
// 导入Swiper组件、样式和模块
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

// 轮播图片列表 - 开发相关专业图片
const carouselImages = [
  'https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%3D', // AI开发相关
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  // 编程开发相关
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Web开发相关
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // iOS开发相关
]

// 轮播文字内容 - 每个轮播图对应一组主标题和副标题
const carouselTexts = [
  {
    badge: '全栈开发工程师',
    title: 'AI构建数字梦想',
    subtitle: '利用人工智能技术打造智能化的Web应用，为用户带来全新体验。'
  },
  {
    badge: '编程专家',
    title: '代码创造未来',
    subtitle: '通过优雅的代码解决复杂问题，构建高效稳定的软件系统。'
  },
  {
    badge: 'Web开发者',
    title: '你好,我是Nattychao',
    subtitle: '我致力于打造美观、实用且以用户为中心的Web体验，解决真实世界的问题。'
  },
  {
    badge: '移动开发',
    title: '移动端解决方案',
    subtitle: '开发跨平台的移动应用，让技术触手可及。'
  }
]

// 自定义页码指示器状态
const currentSlide = ref(0)
const swiperInstance = ref(null)

// 处理Swiper实例
const handleSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  // 初始化时也更新当前幻灯片索引
  currentSlide.value = swiper.realIndex
}

// 处理幻灯片切换
const handleSlideChange = (swiper) => {
  // 当启用loop时，Swiper会创建额外的幻灯片，我们需要计算真实的索引
  // 使用swiper.realIndex来获取当前幻灯片的真实索引
  currentSlide.value = swiper.realIndex
}

// 点击页码指示器切换幻灯片
const goToSlide = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index)
  }
}

// 不再需要自己实现自动轮播，使用Swiper内置的autoplay选项即可
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* 整个文本视图的过渡动画样式 */
.view-slide-enter-active,
.view-slide-leave-active {
  transition: all 0.8s cubic-bezier(0.33, 1, 0.68, 1);
}

.view-slide-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
}

.view-slide-leave-to {
  opacity: 0;
  transform: translateY(-50px) scale(0.95);
}

/* 文字过渡动画样式 */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 1s ease;
}

.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
}

.text-slide-enter-active,
.text-slide-leave-active {
  transition: all 1s cubic-bezier(0.33, 1, 0.68, 1);
}

.text-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.text-slide-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
