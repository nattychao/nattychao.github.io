<script setup>
import { ArrowRight } from 'lucide-vue-next'

// 背景图片 - 只保留第二张图片
const heroBgImage = 'https://images.unsplash.com/photo-1727434032773-af3cd98375ba?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%3D&auto=format&fit=crop&w=2070&q=80'
</script>

<template>
  <!-- Hero Section -->
  <section class="relative flex items-center justify-center overflow-hidden -mt-16 pt-16 
               md:h-[max(calc(100vh_*_0.618),_600px)] 
               h-[max(calc(40vh),_320px)]">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img :src="heroBgImage" alt="Background" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
      <div class="text-center">
        <div class="inline-block px-3 py-1 mb-4 sm:mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-wide">
          全栈开发工程师
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-lg">
          构建 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">数字梦想</span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-md px-4">
          你好,我是 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-gradient">Nattychao</span>。我致力于打造美观、实用且以用户为中心的 Web 体验,解决真实世界的问题。
        </p>
        <div class="flex flex-row justify-center gap-2 sm:gap-3 md:gap-5 px-4">
          <router-link to="/resume" class="px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap">
            查看简历 <ArrowRight class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </router-link>
          <router-link to="/blog" class="px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center text-xs sm:text-sm md:text-base whitespace-nowrap">
            阅读博客
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="hidden absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70">
      <ArrowRight class="w-6 h-6 rotate-90" />
    </div>
  </section>
</template>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>