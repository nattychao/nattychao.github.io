<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, Github, Mail, Phone, MessageCircle } from 'lucide-vue-next'
import SideMenu from './SideMenu.vue'
import { useToast } from '@/composables/useToast.js'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isFullyScrolled = ref(false)
const scrollY = ref(0)
const route = useRoute()

// Toast功能
const { showToast } = useToast()

// 判断是否为首页
const isHomePage = computed(() => route.path === '/')

// 计算滚动进度（0-1）
const scrollProgress = computed(() => {
  if (!isHomePage.value) return 1 // 非首页返回1，表示完全滚动状态

  // 获取安全区域高度（考虑刘海屏或灵动岛）
  const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')

  // 根据屏幕宽度计算不同的Hero高度
  let heroHeight
  if (window.innerWidth >= 768) { // md breakpoint
    // PC端：视口高度的0.618倍，但最小高度为600px
    heroHeight = Math.max(window.innerHeight * 0.618, 600)
  } else {
    // H5端：视口高度的40%，但最小高度为320px，并考虑安全区域
    heroHeight = Math.max((window.innerHeight - safeAreaTop) * 0.4, 320)
  }

  // 计算背景图高度的一半
  const halfHeroHeight = heroHeight / 2

  // 计算滚动进度，限制在0-1之间
  const progress = Math.min(scrollY.value / halfHeroHeight, 1)

  return progress
})

const handleScroll = () => {
  // 更新滚动位置
  scrollY.value = window.scrollY

  // 只在首页处理滚动效果
  if (!isHomePage.value) {
    isScrolled.value = true // 非首页默认为已滚动状态
    isFullyScrolled.value = true
    return
  }

  // 获取安全区域高度（考虑刘海屏或灵动岛）
  const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')

  // 根据屏幕宽度计算不同的Hero高度
  let heroHeight
  if (window.innerWidth >= 768) { // md breakpoint
    // PC端：视口高度的0.618倍，但最小高度为600px
    heroHeight = Math.max(window.innerHeight * 0.618, 600)
  } else {
    // H5端：视口高度的40%，但最小高度为320px，并考虑安全区域
    heroHeight = Math.max((window.innerHeight - safeAreaTop) * 0.4, 320)
  }

  // 考虑header高度和安全区域
  const headerHeight = 64 + safeAreaTop

  // 第一阶段：一开始滚动就显示毛玻璃效果
  const firstThreshold = 0
  // 第二阶段：滚动距离大于背景图高度减去导航栏高度时触发（原来的逻辑）
  const secondThreshold = heroHeight - headerHeight

  isScrolled.value = window.scrollY > firstThreshold
  isFullyScrolled.value = window.scrollY > secondThreshold
}

// 检查当前滚动位置
const checkScrollPosition = () => {
  // 更新滚动位置
  scrollY.value = window.scrollY

  if (isHomePage.value) {
    // 获取安全区域高度（考虑刘海屏或灵动岛）
    const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')

    // 根据屏幕宽度计算不同的Hero高度
    let heroHeight
    if (window.innerWidth >= 768) { // md breakpoint
      // PC端：视口高度的0.618倍，但最小高度为600px
      heroHeight = Math.max(window.innerHeight * 0.618, 600)
    } else {
      // H5端：视口高度的40%，但最小高度为320px，并考虑安全区域
      heroHeight = Math.max((window.innerHeight - safeAreaTop) * 0.4, 320)
    }

    // 考虑header高度和安全区域
    const headerHeight = 64 + safeAreaTop

    // 第一阶段：一开始滚动就显示毛玻璃效果
    const firstThreshold = 0
    // 第二阶段：滚动距离大于背景图高度减去导航栏高度时触发（原来的逻辑）
    const secondThreshold = heroHeight - headerHeight

    isScrolled.value = window.scrollY > firstThreshold
    isFullyScrolled.value = window.scrollY > secondThreshold
  } else {
    isScrolled.value = true
    isFullyScrolled.value = true
  }
}

onMounted(() => {
  // 初始化时设置滚动状态
  checkScrollPosition()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 监听路由变化，更新滚动状态
watch(route, () => {
  // 使用nextTick确保DOM已更新
  setTimeout(checkScrollPosition, 0)
})

const navLinks = [
  { name: '首页', path: '/' },
  { name: '简历', path: '/resume' },
  { name: '项目', path: '/projects' },
  { name: '博客', path: '/blog' },
  { name: '壁纸', path: '/wallpapers' },
  { name: 'jewellery', path: '/jewellery', icon: '/myjwfavicon.svg' },
]

// 显示微信二维码
const showWeChatQR = () => {
  // 复制微信号到剪贴板
  const wechatId = 'nattychao'
  navigator.clipboard.writeText(wechatId)
    .then(() => {
      showToast('微信号已复制到剪贴板')
    })
    .catch(err => {
      showToast('复制失败，请手动复制微信号', 'error')
    })
}

// 切换侧滑菜单
const toggleSideMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 border-b',
    !isHomePage
      ? 'bg-white/80 backdrop-blur-md border-slate-100 shadow-sm'
      : isFullyScrolled
        ? 'bg-white/80 backdrop-blur-md border-slate-100 shadow-sm'
        : 'border-transparent'
  ]" :style="{
    paddingTop: 'var(--safe-area-inset-top, 0px)',
    backgroundColor: isHomePage && !isFullyScrolled ? `rgba(255, 255, 255, ${0.1 * scrollProgress})` : '',
    backdropFilter: isHomePage && !isFullyScrolled ? `blur(${16 * scrollProgress}px)` : ''
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" :class="[
            'text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
            !isHomePage
              ? 'from-theme-600 to-purple-600'
              : isFullyScrolled
                ? 'from-theme-600 to-purple-600'
                : 'from-white to-white'
          ]">
            NattyChao
          </RouterLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink v-for="link in navLinks" :key="link.name" :to="link.path" :class="[
            'font-medium transition-colors relative flex items-center',
            !isHomePage
              ? route.path === link.path ? 'text-theme-600' : 'text-slate-600 hover:text-theme-600'
              : isFullyScrolled
                ? route.path === link.path ? 'text-theme-600' : 'text-slate-600 hover:text-theme-600'
                : route.path === link.path ? 'text-white' : 'text-white hover:text-white/80'
          ]">
            <!-- 选中指示器 -->
            <span v-if="route.path === link.path" class="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"></span>
            <img v-if="link.icon" :src="link.icon" alt="link.name" class="w-6 h-6" />
            <span v-else>{{ link.name }}</span>
          </RouterLink>

          <div :class="[
            'flex space-x-4 border-l pl-6',
            !isHomePage
              ? 'border-slate-200'
              : isFullyScrolled
                ? 'border-slate-200'
                : 'border-white/30'
          ]">
            <a href="https://github.com/nattychao" target="_blank" :class="[
              'transition-colors',
              !isHomePage
                ? 'text-slate-400 hover:text-slate-800'
                : isFullyScrolled
                  ? 'text-slate-400 hover:text-slate-800'
                  : 'text-white/80 hover:text-white'
            ]">
              <Github class="w-5 h-5" />
            </a>
            <a href="mailto:2439194386@qq.com" :class="[
              'transition-colors',
              !isHomePage
                ? 'text-slate-400 hover:text-theme-600'
                : isFullyScrolled
                  ? 'text-slate-400 hover:text-theme-600'
                  : 'text-white/80 hover:text-white'
            ]">
              <Mail class="w-5 h-5" />
            </a>
            <a href="tel:+8617681870768" :class="[
              'transition-colors',
              !isHomePage
                ? 'text-slate-400 hover:text-theme-600'
                : isFullyScrolled
                  ? 'text-slate-400 hover:text-theme-600'
                  : 'text-white/80 hover:text-white'
            ]">
              <Phone class="w-5 h-5" />
            </a>
            <a href="#" @click.prevent="showWeChatQR" :class="[
              'transition-colors',
              !isHomePage
                ? 'text-slate-400 hover:text-theme-600'
                : isFullyScrolled
                  ? 'text-slate-400 hover:text-theme-600'
                  : 'text-white/80 hover:text-white'
            ]">
              <MessageCircle class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleSideMenu" :class="[
            'focus:outline-none transition-colors',
            !isHomePage
              ? 'text-slate-600 hover:text-slate-900'
              : isFullyScrolled
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-white hover:text-white/80'
          ]">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- SideMenu Component -->
  <SideMenu :isOpen="isMenuOpen" @close="isMenuOpen = false" />
</template>
