<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

// 判断是否为首页
const isHomePage = computed(() => route.path === '/')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  // 只在首页处理滚动效果
  if (!isHomePage.value) {
    isScrolled.value = true // 非首页默认为已滚动状态
    return
  }
  
  // 当滚动超过轮播图高度减去导航栏高度时，改变样式
  // 轮播图高度为视口高度的0.618倍，但最小高度为600px
  const heroHeight = Math.max(window.innerHeight * 0.618, 600)
  isScrolled.value = window.scrollY > (heroHeight - 64)
}

// 检查当前滚动位置
const checkScrollPosition = () => {
  if (isHomePage.value) {
    const heroHeight = Math.max(window.innerHeight * 0.618, 600)
    isScrolled.value = window.scrollY > (heroHeight - 64)
  } else {
    isScrolled.value = true
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
  { name: '项目', path: '/projects' },
  { name: '博客', path: '/blog' },
  { name: '简历', path: '/resume' },
]

// 显示微信二维码
const showWeChatQR = () => {
  // 这里可以添加显示微信二维码的逻辑
  // 例如弹出一个模态框或者跳转到微信页面
  alert('微信号: nattychao')
}
</script>

<template>
  <nav :class="[
    'sticky top-0 z-50 border-b transition-all duration-300',
    !isHomePage || isScrolled 
      ? 'bg-white/80 backdrop-blur-md border-slate-100 shadow-sm' 
      : 'bg-transparent backdrop-blur-lg border-transparent'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" :class="[
            'text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300',
            !isHomePage || isScrolled 
              ? 'from-indigo-600 to-purple-600' 
              : 'from-white to-white'
          ]">
            NattyChao
          </RouterLink>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            :class="[
              'font-medium transition-colors',
              !isHomePage || isScrolled 
                ? 'text-slate-600 hover:text-indigo-600' 
                : 'text-white hover:text-white/80'
            ]"
            :active-class="(!isHomePage || isScrolled) ? 'text-indigo-600' : 'text-white'"
          >
            {{ link.name }}
          </RouterLink>
          <div :class="[
            'flex space-x-4 border-l pl-6 transition-all duration-300',
            !isHomePage || isScrolled 
              ? 'border-slate-200' 
              : 'border-white/30'
          ]">
            <a href="https://github.com/nattychao" target="_blank" :class="[
              'transition-colors',
              !isHomePage || isScrolled 
                ? 'text-slate-400 hover:text-slate-800' 
                : 'text-white/80 hover:text-white'
            ]">
              <Github class="w-5 h-5" />
            </a>
            <a href="mailto:2439194386@qq.com" :class="[
              'transition-colors',
              !isHomePage || isScrolled 
                ? 'text-slate-400 hover:text-indigo-600' 
                : 'text-white/80 hover:text-white'
            ]">
              <Mail class="w-5 h-5" />
            </a>
            <a href="tel:+8617681870768" :class="[
              'transition-colors',
              !isHomePage || isScrolled 
                ? 'text-slate-400 hover:text-indigo-600' 
                : 'text-white/80 hover:text-white'
            ]">
              <Phone class="w-5 h-5" />
            </a>
            <a href="#" @click.prevent="showWeChatQR" :class="[
              'transition-colors',
              !isHomePage || isScrolled 
                ? 'text-slate-400 hover:text-indigo-600' 
                : 'text-white/80 hover:text-white'
            ]">
              <MessageCircle class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" :class="[
            'focus:outline-none transition-colors',
            !isHomePage || isScrolled 
              ? 'text-slate-600 hover:text-slate-900' 
              : 'text-white hover:text-white/80'
          ]">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" :class="[
      'md:hidden border-b transition-all duration-300',
      !isHomePage || isScrolled 
        ? 'bg-white border-slate-100' 
        : 'bg-black/30 backdrop-blur-lg border-white/20'
    ]">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.name" 
          :to="link.path"
          :class="[
            'block px-3 py-2 rounded-md text-base font-medium transition-colors',
            !isHomePage || isScrolled 
              ? 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50' 
              : 'text-white hover:text-white/80 hover:bg-white/10'
          ]"
          :active-class="(!isHomePage || isScrolled) ? 'text-indigo-600 bg-slate-50' : 'text-white bg-white/10'"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>