<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

// 处理跳转至 Unsplash 网站
const goToUnsplash = () => {
  window.open('https://unsplash.com/', '_blank')
}

// 动画控制
const isLoaded = ref(false)

onMounted(() => {
  // 触发页面加载动画
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <!-- 全屏背景容器 -->
  <div class="min-h-screen flex flex-col relative overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0 z-0 transition-opacity duration-1500 ease-in-out animate-pulse-scale"
      :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }" style="
        background-image: url('https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      ">
      <!-- 渐变覆盖层增强文字可读性 -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      <!-- 光效装饰 -->
      <div class="absolute top-1/4 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s;"></div>
    </div>

    <!-- 内容区域 -->
    <main class="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-3xl text-center">
        <!-- 标题文字 - 带动画效果 -->
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          :class="{ 'translate-y-0 opacity-100': isLoaded, 'translate-y-10 opacity-0': !isLoaded }"
          style="transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); transition-delay: 0.3s;">
          Unsplash
          <span class="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
            壁纸浏览
          </span>
        </h1>

        <!-- 描述文字 - 带动画效果 -->
        <p class="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto"
          :class="{ 'translate-y-0 opacity-100': isLoaded, 'translate-y-10 opacity-0': !isLoaded }"
          style="transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); transition-delay: 0.5s;">
          探索世界上最大的免费高质量图片库，下载数百万张精美壁纸，为您的设备增添无限灵感。
        </p>

        <!-- 跳转按钮 - 带动画和悬停效果 -->
        <button @click="goToUnsplash"
          class="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-bold text-lg rounded-full shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-blue-50 group"
          :class="{ 'translate-y-0 opacity-100': isLoaded, 'translate-y-10 opacity-0': !isLoaded }"
          style="transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); transition-delay: 0.7s;">
          <span class="group-hover:mr-3 transition-all duration-300">访问 Unsplash 官方网站</span>
          <ArrowRight class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />

          <!-- 按钮点击波纹效果容器 -->
          <span class="absolute inset-0 rounded-full overflow-hidden pointer-events-none"></span>
        </button>

        <!-- 额外说明 - 带动画效果 -->
        <p class="mt-16 text-sm sm:text-base text-white/70" :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
          style="transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); transition-delay: 1s;">
          ✨ 所有图片均由全球摄影师社区免费提供 · 适用于个人和商业用途
        </p>
      </div>
    </main>

    <!-- 页面底部装饰 -->
    <footer class="py-8 px-4 text-center relative z-10">
      <p class="text-white/50 text-sm">
        Powered by <span class="font-medium">Unsplash</span> • 高品质图片资源平台
      </p>
    </footer>

    <!-- 粒子装饰效果 (简化版) -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
      <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-float"
        style="animation-delay: 0.5s;"></div>
      <div class="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-float"
        style="animation-delay: 1s;"></div>
      <div class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/15 rounded-full animate-float"
        style="animation-delay: 1.5s;"></div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义浮动动画 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.2;
  }

  25% {
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 0.4;
  }

  50% {
    transform: translateY(-10px) translateX(-10px) scale(0.8);
    opacity: 0.3;
  }

  75% {
    transform: translateY(-30px) translateX(5px) scale(1.1);
    opacity: 0.5;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* 循环放大缩小动画 */
@keyframes pulse-scale {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-pulse-scale {
  animation: pulse-scale 4s ease-in-out infinite;
}

/* 增强响应式设计 */
@media (max-width: 768px) {
  h1 {
    font-size: 3rem !important;
  }

  p {
    font-size: 1.1rem !important;
  }

  button {
    padding: 1rem 2rem !important;
    font-size: 1rem !important;
  }
}
</style>
