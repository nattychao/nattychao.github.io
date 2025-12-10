<template>
  <!-- 手势检测区域 - 整个屏幕左侧边缘 -->
  <div class="fixed inset-y-0 left-0 w-[50px] z-[50] md:hidden" @touchstart="handleTouchStart"
    @touchmove="handleTouchMove" @touchend="handleTouchEnd" @touchcancel="handleTouchEnd">
  </div>

  <!-- 蒙版层 - 动态毛玻璃效果 -->
  <div :class="['fixed inset-0 z-[60] md:hidden', { 'pointer-events-none': !isOpen && !isTouching.value }]"
    :style="overlayStyle" @click="closeMenu"></div>

  <!-- 侧滑菜单 - 使用Swiper实现手势驱动 -->
  <div ref="menuContainer" :style="menuStyle"
    class="fixed top-0 left-0 h-full w-[75%] sm:w-[80%] max-w-sm bg-gradient-to-br from-slate-50 to-white z-[60] md:hidden overflow-y-auto shadow-2xl"
    style="touch-action: pan-y;" @touchstart.stop="handleTouchStart" @touchmove.stop="handleTouchMove"
    @touchend.stop="handleTouchEnd" @touchcancel.stop="handleTouchEnd">
    <!-- 菜单头部 -->
    <div
      class="sticky top-0 left-0 right-0 z-[100] overflow-hidden bg-gradient-to-r from-theme-500 to-purple-600 p-4 sm:p-6 shadow-lg">
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
          <p class="text-theme-100 text-xs sm:text-sm mt-1">探索更多精彩内容</p>
        </div>
        <button @click="closeMenu"
          class="p-1.5 sm:p-2 rounded-full bg-white/20 text-white md:hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
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
        <template v-for="link in navLinks" :key="link.name">
          <!-- 内部链接使用RouterLink -->
          <RouterLink v-if="!link.external" :to="link.path"
            class="group flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200"
            :class="isActiveLink(link.path)
              ? 'bg-gradient-to-r from-theme-50 to-purple-50 text-theme-700 shadow-sm'
              : 'text-slate-700 md:hover:bg-slate-50 md:hover:text-theme-600'" @click="closeMenu">
            <span
              class="w-7 h-7 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex items-center justify-center rounded-lg transition-all duration-200"
              :class="isActiveLink(link.path)
                ? 'bg-gradient-to-r from-theme-500 to-purple-600 text-white'
                : 'bg-slate-100 text-slate-500 md:group-hover:bg-theme-100 md:group-hover:text-theme-600'">
              <img v-if="link.icon" :src="link.icon" alt="link.name" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <component v-else :is="getMenuIcon(link.name)" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
            <span class="flex-1 text-sm sm:text-base">{{ link.name }}</span>
            <ChevronRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200"
              :class="isActiveLink(link.path) ? 'text-theme-600' : 'text-slate-400 md:group-hover:text-theme-600'" />
          </RouterLink>
          <!-- 外部链接使用a标签 -->
          <a v-else :href="link.path" target="_blank" rel="noopener noreferrer"
            class="group flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200"
            :class="'text-slate-700 md:hover:bg-slate-50 md:hover:text-theme-600'" @click="closeMenu">
            <span
              class="w-7 h-7 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex items-center justify-center rounded-lg transition-all duration-200"
              :class="'bg-slate-100 text-slate-500 md:group-hover:bg-theme-100 md:group-hover:text-theme-600'">
              <img v-if="link.icon" :src="link.icon" alt="link.name" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <component v-else :is="getMenuIcon(link.name)" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
            <span class="flex-1 text-sm sm:text-base">{{ link.name }}</span>
            <ChevronRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200"
              :class="'text-slate-400 md:group-hover:text-theme-600'" />
          </a>
        </template>
      </div>
    </div>

    <!-- 社交链接 -->
    <div class="mt-auto border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4 sm:p-6">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3 class="text-xs sm:text-sm font-semibold text-slate-900">联系方式</h3>
      </div>
      <div class="grid grid-cols-2 gap-2 sm:gap-3">
        <a href="https://github.com/nattychao" target="_blank"
          class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 md:hover:shadow-lg md:hover:border-theme-200 transition-all duration-300 overflow-hidden">
          <!-- 背景装饰 -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-theme-500/5 to-purple-600/5 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          </div>

          <!-- 图标容器 -->
          <div
            class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 md:group-hover:from-theme-100 md:group-hover:to-purple-100 transition-all duration-300 shadow-sm md:group-hover:shadow-md">
            <Github class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 md:group-hover:text-theme-600 transition-colors" />
          </div>

          <!-- 文字内容 -->
          <div class="text-center relative z-10">
            <div class="text-xs sm:text-sm font-medium text-slate-900 md:group-hover:text-theme-700 transition-colors">
              GitHub</div>
            <div class="text-xs text-slate-500 md:group-hover:text-theme-500 transition-colors mt-0.5">查看项目</div>
          </div>
        </a>
        <a href="mailto:2439194386@qq.com"
          class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 md:hover:shadow-lg md:hover:border-theme-200 transition-all duration-300 overflow-hidden">
          <!-- 背景装饰 -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-theme-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>

          <!-- 图标容器 -->
          <div
            class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 md:group-hover:from-theme-100 md:group-hover:to-purple-100 transition-all duration-300 shadow-sm md:group-hover:shadow-md">
            <Mail class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 md:group-hover:text-theme-600 transition-colors" />
          </div>

          <!-- 文字内容 -->
          <div class="text-center relative z-10">
            <div class="text-xs sm:text-sm font-medium text-slate-900 md:group-hover:text-theme-700 transition-colors">
              邮件</div>
            <div class="text-xs text-slate-500 md:group-hover:text-theme-500 transition-colors mt-0.5">发送邮件</div>
          </div>
        </a>
        <a href="tel:+8617681870768"
          class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 md:hover:shadow-lg md:hover:border-theme-200 transition-all duration-300 overflow-hidden">
          <!-- 背景装饰 -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-theme-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>

          <!-- 图标容器 -->
          <div
            class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 md:group-hover:from-theme-100 md:group-hover:to-purple-100 transition-all duration-300 shadow-sm md:group-hover:shadow-md">
            <Phone class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 md:group-hover:text-theme-600 transition-colors" />
          </div>

          <!-- 文字内容 -->
          <div class="text-center relative z-10">
            <div class="text-xs sm:text-sm font-medium text-slate-900 md:group-hover:text-theme-700 transition-colors">
              电话</div>
            <div class="text-xs text-slate-500 md:group-hover:text-theme-500 transition-colors mt-0.5">直接联系</div>
          </div>
        </a>
        <a href="#" @click.prevent="showWeChatQR"
          class="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100 md:hover:shadow-lg md:hover:border-theme-200 transition-all duration-300 overflow-hidden">
          <!-- 背景装饰 -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-theme-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>

          <!-- 图标容器 -->
          <div
            class="relative w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 md:group-hover:from-theme-100 md:group-hover:to-purple-100 transition-all duration-300 shadow-sm md:group-hover:shadow-md">
            <MessageCircle
              class="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 md:group-hover:text-theme-600 transition-colors" />
          </div>

          <!-- 文字内容 -->
          <div class="text-center relative z-10">
            <div class="text-xs sm:text-sm font-medium text-slate-900 md:group-hover:text-theme-700 transition-colors">
              微信</div>
            <div class="text-xs text-slate-500 md:group-hover:text-theme-500 transition-colors mt-0.5">扫码添加</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// 导入图标
import { X, Github, Mail, Phone, MessageCircle, Home, Briefcase, BookOpen, FileText, Image, Heart, ChevronRight, Settings, Brain, Bot, Globe, Infinity } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'open'])

const route = useRoute()

// Toast功能
const { showToast } = useToast()

// 手势相关状态
const touchStartX = ref(0)
const touchCurrentX = ref(0)
const isTouching = ref(false)
const swipeThreshold = ref(50) // 触发滑动的最小距离
const edgeThreshold = ref(50) // 屏幕左侧边缘触发区域宽度
const menuContainer = ref(null)
const menuWidth = ref(0)

// 导航链接
const navLinks = [
  { name: '首页', path: '/' },
  { name: '简历', path: '/resume' },
  { name: '项目', path: '/projects' },
  { name: '博客', path: '/blog' },
  { name: '壁纸', path: '/wallpapers' },
  { name: '网站导航', path: '/websites' },
  { name: 'AI工具箱', path: '/ai-bio' }, //本身的网页就有问题，会导致页面卡死问题
  { name: 'Inftab', path: '/inftab' }
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
    '简历': FileText,
    '工具': Settings,
    'AI-BIO': Bot,
    '网站导航': Globe,
    'Inftab': Infinity
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

// 计算菜单样式 - 实现连续滑动效果
const menuStyle = computed(() => {
  if (!isTouching.value) {
    return {
      transform: props.isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  let translateX = 0

  // 从左侧边缘打开菜单的情况
  if (touchStartX.value < edgeThreshold.value && !props.isOpen) {
    // 菜单从屏幕左侧边缘开始，随着手势向右滑动
    // translateX从0开始增加到menuWidth.value
    translateX = Math.max(0, Math.min(touchCurrentX.value - touchStartX.value, menuWidth.value))
    // 将菜单从隐藏位置(translateX(-100%))开始移动，加上当前滑动距离
    return {
      transform: `translateX(${-menuWidth.value + translateX}px)`,
      transition: 'none' // 滑动过程中禁用过渡，实现实时跟随
    }
  }
  // 从菜单内关闭菜单的情况
  else if (props.isOpen) {
    // 菜单从当前位置向左滑动
    translateX = Math.max(-menuWidth.value, Math.min(touchCurrentX.value - touchStartX.value, 0))
    return {
      transform: `translateX(${translateX}px)`,
      transition: 'none' // 滑动过程中禁用过渡，实现实时跟随
    }
  }
  else {
    return {
      transform: props.isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
});

// 计算蒙版层样式 - 毛玻璃效果随菜单移动逐渐变化
const overlayStyle = computed(() => {
  let blurAmount = 4; // 默认模糊强度
  let opacity = 0.2;  // 默认不透明度
  let progress = 1;   // 菜单显示进度（1为完全显示，0为完全隐藏）

  // 计算菜单当前位置的进度
  if (isTouching.value) {
    // 触摸滑动过程中，根据当前位置计算进度
    if (props.isOpen) {
      // 关闭菜单时，进度从1减少到0
      const translateX = touchCurrentX.value - touchStartX.value;
      progress = 1 + (translateX / menuWidth.value);
      progress = Math.max(0, Math.min(1, progress));
    } else if (touchStartX.value < edgeThreshold.value) {
      // 打开菜单时，进度从0增加到1
      const translateX = touchCurrentX.value - touchStartX.value;
      progress = Math.min(1, translateX / menuWidth.value);
    } else {
      // 不符合打开或关闭条件时，根据菜单是否打开设置进度
      progress = props.isOpen ? 1 : 0;
    }
  } else {
    // 非触摸状态下，根据菜单是否打开设置进度
    progress = props.isOpen ? 1 : 0;
  }

  // 根据进度计算毛玻璃强度和透明度
  blurAmount = progress * 16; // 模糊强度从0px到16px
  opacity = progress * 0.2;  // 不透明度从0到0.2

  return {
    backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    backdropFilter: `blur(${blurAmount}px)`,
    opacity: 1, // 保持元素完全不透明，不透明度由backgroundColor控制
    transition: isTouching.value ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
});

// 手势处理相关方法 - 实现连续滑动
const handleTouchStart = (e) => {
  if (menuContainer.value) {
    menuWidth.value = menuContainer.value.offsetWidth
  }
  isTouching.value = true
  touchStartX.value = e.touches[0].clientX
  touchCurrentX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  if (!isTouching.value) return

  touchCurrentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isTouching.value) return

  const deltaX = touchCurrentX.value - touchStartX.value

  // 从左侧边缘滑动打开菜单
  if (touchStartX.value < edgeThreshold.value && !props.isOpen) {
    if (deltaX > swipeThreshold.value || deltaX > menuWidth.value * 0.3) {
      emit('open')
    }
  }
  // 从菜单内滑动关闭菜单
  else if (props.isOpen) {
    if (deltaX < -swipeThreshold.value || deltaX < -menuWidth.value * 0.3) {
      emit('close')
    }
  }

  isTouching.value = false
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
