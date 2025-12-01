<template>
  <!-- 侧滑菜单容器 -->
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <!-- 蒙版层 -->
    <div v-if="isOpen" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden" @click="closeMenu"></div>
  </Transition>

  <!-- 侧滑菜单 -->
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0" leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
    <div v-if="isOpen"
      class="fixed top-0 left-0 h-full w-[75%] sm:w-[80%] max-w-sm bg-gradient-to-br from-slate-50 to-white z-[60] md:hidden overflow-y-auto shadow-2xl">
      <!-- 菜单头部 -->
      <div class="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6 shadow-lg">
        <!-- 装饰性背景元素 - 添加无规则运动的半圆 -->
        <div
          class="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 floating-irregular-1">
        </div>
        <div
          class="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full -ml-10 -mb-10 sm:-ml-12 sm:-mb-12 floating-irregular-2">
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-white">菜单</h2>
            <p class="text-indigo-100 text-xs sm:text-sm mt-1">探索更多精彩内容</p>
          </div>
          <button @click="closeMenu"
            class="p-1.5 sm:p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
            <X class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <!-- 菜单内容 -->
      <div class="py-4 sm:py-6">
        <div class="px-4 mb-3 sm:mb-4">
          <h3 class="text-xs font-semibold text-slate-900 uppercase tracking-wider">导航</h3>
        </div>
        <div class="space-y-1 px-2">
          <RouterLink v-for="link in navLinks" :key="link.name" :to="link.path"
            class="group flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200"
            :class="isActiveLink(link.path)
              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-sm'
              : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'" @click="closeMenu">
            <span
              class="w-7 h-7 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex items-center justify-center rounded-lg transition-all duration-200"
              :class="isActiveLink(link.path)
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'">
              <component :is="getMenuIcon(link.name)" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
            <span class="flex-1 text-sm sm:text-base">{{ link.name }}</span>
            <ChevronRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200"
              :class="isActiveLink(link.path) ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'" />
          </RouterLink>
        </div>
      </div>

      <!-- 社交链接 -->
      <div class="mt-auto border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4 sm:p-6">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-xs sm:text-sm font-semibold text-slate-900">联系方式</h3>
        </div>
        <div class="grid grid-cols-2 gap-2 sm:gap-3">
          <a href="https://github.com/nattychao" target="_blank"
            class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden">
            <!-- 背景装饰 -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>

            <!-- 图标容器 -->
            <div
              class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Github class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            </div>

            <!-- 文字内容 -->
            <div class="text-center relative z-10">
              <div class="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                GitHub</div>
              <div class="text-xs text-slate-500 group-hover:text-indigo-500 transition-colors mt-0.5">查看项目</div>
            </div>
          </a>
          <a href="mailto:2439194386@qq.com"
            class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden">
            <!-- 背景装饰 -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>

            <!-- 图标容器 -->
            <div
              class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Mail class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            </div>

            <!-- 文字内容 -->
            <div class="text-center relative z-10">
              <div class="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                邮件</div>
              <div class="text-xs text-slate-500 group-hover:text-indigo-500 transition-colors mt-0.5">发送邮件</div>
            </div>
          </a>
          <a href="tel:+8617681870768"
            class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden">
            <!-- 背景装饰 -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>

            <!-- 图标容器 -->
            <div
              class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Phone class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            </div>

            <!-- 文字内容 -->
            <div class="text-center relative z-10">
              <div class="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                电话</div>
              <div class="text-xs text-slate-500 group-hover:text-indigo-500 transition-colors mt-0.5">直接联系</div>
            </div>
          </a>
          <a href="#" @click.prevent="showWeChatQR"
            class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 overflow-hidden">
            <!-- 背景装饰 -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>

            <!-- 图标容器 -->
            <div
              class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <MessageCircle
                class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            </div>

            <!-- 文字内容 -->
            <div class="text-center relative z-10">
              <div class="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                微信</div>
              <div class="text-xs text-slate-500 group-hover:text-indigo-500 transition-colors mt-0.5">扫码添加</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { X, Github, Mail, Phone, MessageCircle, Home, Briefcase, BookOpen, FileText, Image, ChevronRight } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const route = useRoute()

// Toast功能
const { showToast } = useToast()

// 导航链接
const navLinks = [
  { name: '首页', path: '/' },
  { name: '简历', path: '/resume' },
  { name: '项目', path: '/projects' },
  { name: '博客', path: '/blog' },
  { name: '壁纸', path: '/wallpapers' },
]

// 关闭菜单
const closeMenu = () => {
  emit('close')
}

// 判断链接是否激活
const isActiveLink = (path) => {
  return route.path === path
}

// 获取菜单图标
const getMenuIcon = (name) => {
  const icons = {
    '首页': Home,
    '项目': Briefcase,
    '博客': BookOpen,
    '壁纸': Image,
    '简历': FileText
  }
  return icons[name] || Home
}

// 显示微信二维码
const showWeChatQR = () => {
  // 复制微信号到剪贴板
  const wechatId = 'nattychao'
  navigator.clipboard.writeText(wechatId)
    .then(() => {
      showToast()
    })
    .catch(err => {
      console.error('复制失败:', err)
      // 降级方案：使用传统的复制方法
      const textArea = document.createElement('textarea')
      textArea.value = wechatId
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      showToast()
    })
}

// 阻止背景滚动
const preventBodyScroll = (prevent) => {
  if (prevent) {
    // 保存当前滚动位置
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
  } else {
    // 恢复滚动位置
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}

// 监听菜单开关状态
watch(() => props.isOpen, (newVal) => {
  preventBodyScroll(newVal)
})

// 监听路由变化，关闭菜单
watch(route, () => {
  closeMenu()
})

// 组件卸载时恢复滚动
onUnmounted(() => {
  preventBodyScroll(false)
})
</script>

<style scoped>
/* 无规则运动动画 */
@keyframes floating-irregular-1 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  25% {
    transform: translate(15px, -10px) rotate(90deg) scale(1.1);
  }

  50% {
    transform: translate(-10px, 15px) rotate(180deg) scale(0.9);
  }

  75% {
    transform: translate(20px, 5px) rotate(270deg) scale(1.05);
  }

  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

@keyframes floating-irregular-2 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }

  20% {
    transform: translate(-12px, 8px) rotate(-60deg) scale(1.15);
  }

  40% {
    transform: translate(8px, -12px) rotate(-120deg) scale(0.85);
  }

  60% {
    transform: translate(-15px, -5px) rotate(-180deg) scale(1.1);
  }

  80% {
    transform: translate(10px, 10px) rotate(-240deg) scale(0.95);
  }

  100% {
    transform: translate(0, 0) rotate(-360deg) scale(1);
  }
}

.floating-irregular-1 {
  animation: floating-irregular-1 8s infinite ease-in-out;
}

.floating-irregular-2 {
  animation: floating-irregular-2 10s infinite ease-in-out;
}

@keyframes floating-irregular-3 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.5;
  }

  30% {
    transform: translate(-8px, 12px) rotate(120deg) scale(1.2);
    opacity: 0.7;
  }

  60% {
    transform: translate(10px, -8px) rotate(240deg) scale(0.8);
    opacity: 0.3;
  }

  90% {
    transform: translate(-5px, -10px) rotate(320deg) scale(1.1);
    opacity: 0.6;
  }

  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
    opacity: 0.5;
  }
}

@keyframes floating-irregular-4 {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 0.7;
  }

  25% {
    transform: translate(12px, 5px) rotate(-90deg) scale(0.7);
    opacity: 0.4;
  }

  50% {
    transform: translate(-5px, 10px) rotate(-180deg) scale(1.3);
    opacity: 0.9;
  }

  75% {
    transform: translate(8px, -5px) rotate(-270deg) scale(0.9);
    opacity: 0.5;
  }

  100% {
    transform: translate(0, 0) rotate(-360deg) scale(1);
    opacity: 0.7;
  }
}

.floating-irregular-3 {
  animation: floating-irregular-3 7s infinite ease-in-out;
}

.floating-irregular-4 {
  animation: floating-irregular-4 9s infinite ease-in-out;
}
</style>
