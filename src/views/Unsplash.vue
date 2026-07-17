<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight, RefreshCw, Download } from 'lucide-vue-next'

// 处理跳转至 Unsplash 网站
const goToUnsplash = () => {
  window.open('https://unsplash.com/', '_blank')
}

// 动画控制
const isLoaded = ref(false)

// 通过 wsrv.nl 代理图片，规避源站防盗链（Referer 校验），否则线上 github.io 会 403 不显示
const proxy = (url) => 'https://wsrv.nl/?url=' + encodeURIComponent(url)

// 兜底壁纸（本地无缓存时使用）
const FALLBACK_BG = 'https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const STORAGE_KEY = 'unsplash-random-wallpaper'

// 读取本地缓存的壁纸；无缓存则用兜底图
const readCache = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('读取壁纸缓存失败:', e)
  }
  return null
}

// 写入本地缓存，供下次打开页面直接加载
const writeCache = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('写入壁纸缓存失败:', e)
  }
}

// 随机壁纸相关状态：优先用本地缓存，其次兜底图
const cached = readCache()
const bgUrl = ref(cached?.bgUrl || FALLBACK_BG)
const rawUrl = ref(cached?.rawUrl || '')
const refreshing = ref(false)
const downloading = ref(false)

// 主动获取一张随机壁纸（用户点击刷新时触发）
const fetchWallpaper = async () => {
  refreshing.value = true
  try {
    const res = await fetch(`https://api.inftab.com/random-wallpaper?_=${Date.now()}`)
    const json = await res.json()
    const src = json?.data?.[0]?.src
    if (src) {
      // 用代理后的高清图作背景（CSS background 无法设置 referrerpolicy，必须走代理）
      const displayUrl = proxy(src.bigSrc || src.originalSrc || src.rawSrc)
      // 预加载，加载完成后再切换，避免闪烁
      await new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = displayUrl
      })
      bgUrl.value = displayUrl
      // 下载保留原始高清链接（不经 wsrv），下载时用 no-referrer 规避防盗链
      rawUrl.value = src.rawSrc || src.bigSrc
      // 每次获取成功都更新本地缓存
      writeCache({ bgUrl: bgUrl.value, rawUrl: rawUrl.value })
    }
  } catch (error) {
    console.error('获取随机壁纸失败:', error)
  } finally {
    refreshing.value = false
  }
}

// 下载当前壁纸原图
const downloadWallpaper = async () => {
  if (!rawUrl.value || downloading.value) return
  downloading.value = true
  try {
    // 用原始高清链接下载；no-referrer 避免源站防盗链返回 403（CDN 已开启 CORS *）
    const res = await fetch(rawUrl.value, { referrerPolicy: 'no-referrer' })
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = `wallpaper-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error('下载壁纸失败:', error)
    // 兜底：新窗口打开原图
    window.open(rawUrl.value, '_blank')
  } finally {
    downloading.value = false
  }
}

onMounted(() => {
  // 背景图直接使用本地缓存或兜底图，不自动请求随机壁纸；
  // 换壁纸由用户点击右下角刷新按钮主动触发
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
      :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }" :style="{
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }">
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

    <!-- 右下角操作按钮 -->
    <div class="absolute bottom-6 right-6 z-20 flex items-center gap-3">
      <!-- 换一张随机壁纸 -->
      <button @click="fetchWallpaper" :disabled="refreshing" title="换一张随机壁纸"
        class="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
        <RefreshCw class="w-5 h-5" :class="{ 'animate-spin': refreshing }" />
      </button>
      <!-- 下载当前壁纸 -->
      <button @click="downloadWallpaper" :disabled="downloading || !rawUrl" title="下载当前壁纸"
        class="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-all duration-300 hover:bg-white/30 hover:scale-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
        <Download class="w-5 h-5" :class="{ 'animate-bounce': downloading }" />
      </button>
    </div>

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
