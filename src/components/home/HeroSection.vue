<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

// 背景图片数组
const heroBgImages = [
  'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
]

// 当前显示的图片索引
const currentImageIndex = ref(0)

// 视差滚动偏移量
const parallaxOffset = ref(0)

// 轮播切换进度 (0-1)
const carouselProgress = ref(0)

// 是否正在切换中
const isTransitioning = ref(false)

// 定时器变量
let intervalId = null
let transitionStartTime = null
let transitionDuration = 1000 // 1秒切换动画

// 切换到下一张图片
const nextImage = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  transitionStartTime = Date.now()
  
  // 使用动画帧更新进度
  const updateProgress = () => {
    const elapsed = Date.now() - transitionStartTime
    const progress = Math.min(elapsed / transitionDuration, 1)
    
    // 使用缓动函数使动画更平滑
    carouselProgress.value = easeInOutCubic(progress)
    
    if (progress < 1) {
      requestAnimationFrame(updateProgress)
    } else {
      // 切换完成
      currentImageIndex.value = (currentImageIndex.value + 1) % heroBgImages.length
      carouselProgress.value = 0
      isTransitioning.value = false
    }
  }
  
  requestAnimationFrame(updateProgress)
}

// 缓动函数
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// 获取下一个索引
const getNextIndex = () => {
  return (currentImageIndex.value + 1) % heroBgImages.length
}

// 获取幻灯片位置
  const getSlidePosition = (index) => {
    if (index === currentImageIndex.value) {
      return -carouselProgress.value * 100
    } else if (index === getNextIndex()) {
      return (1 - carouselProgress.value) * 100
    } else {
      return index < currentImageIndex.value ? -100 : 100
    }
  }

  // 跳转到指定幻灯片
  const goToSlide = (index) => {
    if (isTransitioning.value || index === currentImageIndex.value) return
    
    // 简单实现：直接设置当前索引
    currentImageIndex.value = index
    carouselProgress.value = 0
  }

// 处理视差滚动
const handleParallaxScroll = () => {
  // 根据滚动位置计算视差偏移，创建视差效果
  parallaxOffset.value = window.scrollY * 0.5
}

// 组件挂载时启动轮播
onMounted(() => {
  intervalId = setInterval(nextImage, 6000) // 6秒切换一次
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <!-- Hero Section -->
  <section class="relative flex items-center justify-center overflow-hidden -mt-16 pt-16" :style="{ height: 'max(calc(100vh * 0.618), 600px)' }">
    <!-- Background Images with Parallax Carousel -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div 
        v-for="(image, index) in heroBgImages" 
        :key="index"
        class="absolute inset-0"
        :style="{
          transform: `translateX(${getSlidePosition(index)}%) translateY(${parallaxOffset}px)`,
          transition: isTransitioning && (index === currentImageIndex || index === getNextIndex()) ? 'none' : 'transform 0.5s ease-out'
        }"
      >
        <img :src="image" alt="Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
      <div class="text-center"
           v-motion
           :initial="{ opacity: 0, y: 50 }"
           :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <div class="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wide">
          全栈开发工程师
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight drop-shadow-lg">
          构建 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">数字梦想</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-100 mb-12 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-md">
          你好，我是 Nattychao。我致力于打造美观、实用且以用户为中心的 Web 体验，解决真实世界的问题。
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-5">
          <router-link to="/resume" class="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
            查看简历 <ArrowRight class="w-5 h-5" />
          </router-link>
          <router-link to="/blog" class="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center">
            阅读博客
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- 轮播指示器 -->
    <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      <button 
        v-for="(_, index) in heroBgImages" 
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="hidden absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
      <ArrowRight class="w-6 h-6 rotate-90" />
    </div>
  </section>
</template>