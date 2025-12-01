<script setup>
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import { useWallpapers } from '../composables/useWallpapers.js'
import { useRoute, useRouter } from 'vue-router'

const { wallpapers, loading, loadWallpapers } = useWallpapers()
const route = useRoute()
const router = useRouter()

// Initialize from query param or default to '全部'
// 确保从任何页面返回和刷新时都保持状态
const selectedCategory = ref(route.query.category || '全部')
const isInitialLoad = ref(true) // 用于区分初始化和点击切换
const hasTransition = ref(false) // 控制是否应用过渡动画
const tabRefs = ref([])
const activeTabUnderlineLeft = ref('0px')
const activeTabUnderlineWidth = ref('0px')
// 标签栏吸顶状态
const isSticky = ref(false)

// 保存滚动位置
const scrollPosition = ref(0)

// 标签栏容器引用
const tabsContainerRef = ref(null)

// 定义分类
const categories = [
  { id: '全部', name: '全部' },
  { id: '自然', name: '自然' },
  { id: '城市', name: '城市' },
  { id: '抽象', name: '抽象' },
  { id: '科技', name: '科技' },
  { id: '艺术', name: '艺术' },
  { id: '动物', name: '动物' }
]

// 更新下划线位置和宽度
const updateUnderline = async () => {
  await nextTick()
  const activeTabIndex = categories.findIndex(cat => cat.id === selectedCategory.value)
  if (activeTabIndex !== -1 && tabRefs.value[activeTabIndex]) {
    const activeTab = tabRefs.value[activeTabIndex]

    // 控制动画效果
    if (isInitialLoad.value) {
      // 初始化时不使用动画
      hasTransition.value = false
      activeTabUnderlineLeft.value = `${activeTab.offsetLeft}px`
      activeTabUnderlineWidth.value = `${activeTab.offsetWidth}px`
    } else {
      // 点击切换时使用动画
      hasTransition.value = true
      activeTabUnderlineLeft.value = `${activeTab.offsetLeft}px`
      activeTabUnderlineWidth.value = `${activeTab.offsetWidth}px`
    }

    // 滚动到选中的标签
    if (tabsContainerRef.value) {
      const container = tabsContainerRef.value
      const scrollLeft =
        activeTab.offsetLeft - container.offsetWidth / 2 + activeTab.offsetWidth / 2
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }
}

// 处理标签点击
const handleTabClick = categoryId => {
  selectedCategory.value = categoryId
  // 标记不是初始加载，需要动画
  isInitialLoad.value = false
  updateUnderline()

  // Update URL query parameter
  router.push({
    query: {
      ...route.query,
      category: categoryId
    }
  })
}

// 获取壁纸所属的分类
const getWallpaperCategory = wallpaper => {
  return wallpaper.category || ''
}

// 根据选中的分类过滤壁纸
const filteredWallpapers = computed(() => {
  if (selectedCategory.value === '全部') {
    return wallpapers.value
  }

  return wallpapers.value.filter(wallpaper => {
    const wallpaperCategory = getWallpaperCategory(wallpaper)
    // 如果category为空，则只在"全部"分类下显示
    if (!wallpaperCategory) {
      return selectedCategory.value === '全部'
    }
    // 否则，如果壁纸属于当前选中的分类，则显示
    return wallpaperCategory === selectedCategory.value
  })
})

// 响应式顶部内边距
const paddingTop = ref('calc(64px + var(--safe-area-inset-top, 0px) + 2rem)')

// 处理窗口大小变化
const handleResize = () => {
  if (window.innerWidth >= 768) { // md断点及以上
    paddingTop.value = 'calc(64px + var(--safe-area-inset-top, 0px) + 3rem)'
  } else {
    paddingTop.value = 'calc(64px + var(--safe-area-inset-top, 0px) + 2rem)'
  }
}

// 节流函数，用于优化滚动事件处理
const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0
  return function (...args) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// 处理滚动事件，实现标签栏吸顶效果和保存滚动位置
const handleScroll = () => {
  if (!tabsContainerRef.value) return

  // 获取安全区域高度（考虑刘海屏或灵动岛）
  const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')

  // 获取标签栏的位置
  const rect = tabsContainerRef.value.getBoundingClientRect()
  // 如果标签栏顶部距离视口顶部的距离小于等于header高度+安全区域，则认为已经吸顶
  const threshold = 64 + safeAreaTop
  isSticky.value = rect.top <= threshold

  // 保存当前滚动位置
  scrollPosition.value = window.scrollY
}

// 节流后的滚动处理函数
const throttledHandleScroll = throttle(handleScroll, 16) // 约60fps

// 处理壁纸下载
const handleDownload = (wallpaper) => {
  // 创建一个临时链接元素来触发下载
  const link = document.createElement('a')
  link.href = wallpaper.url
  link.download = `${wallpaper.title}.${wallpaper.format}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 处理壁纸预览
const handlePreview = (wallpaper) => {
  // 这里可以实现一个预览模态框
  window.open(wallpaper.url, '_blank')
}

onMounted(() => {
  loadWallpapers()
  // 初始化下划线位置
  setTimeout(() => {
    updateUnderline()
  }, 100)

  // 监听窗口大小变化 - 窗口大小变化也不使用动画
  window.addEventListener('resize', () => {
    hasTransition.value = false
    updateUnderline()
  })

  // 添加滚动事件监听
  window.addEventListener('scroll', throttledHandleScroll)
  // 初始检查一次吸顶状态
  handleScroll()

  // 恢复滚动位置
  nextTick(() => {
    window.scrollTo(0, scrollPosition.value)
  })

  // 初始化顶部内边距
  handleResize()
  window.addEventListener('resize', handleResize)
})

// 在离开页面时保存滚动位置
onBeforeUnmount(() => {
  // 移除滚动事件监听
  window.removeEventListener('scroll', throttledHandleScroll)
  // 保存当前滚动位置
  scrollPosition.value = window.scrollY
  // 移除窗口大小变化监听
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="py-8 sm:py-12 md:py-20" :style="{ paddingTop }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 md:mb-6">
        壁纸
      </h1>
    </div>
    <!-- 分类标签栏 -->
    <div ref="tabsContainerRef"
      :class="['w-full pt-2 sticky z-50', isSticky ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent']" :style="{
        top: isSticky ? `calc(4rem + var(--safe-area-inset-top, 0px))` : ''
      }">
      <!-- 滚动容器 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="tabsContainerRef" class="overflow-x-auto scrollbar-hide">
          <div class="relative flex gap-2 border-b border-slate-200 whitespace-nowrap pb-px min-w-max">
            <button v-for="(category, index) in categories" :key="category.id" :ref="el => (tabRefs[index] = el)"
              @click="handleTabClick(category.id)" :class="[
                'px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm transition-all duration-200',
                selectedCategory === category.id
                  ? 'text-theme-600'
                  : 'text-slate-600 hover:text-slate-900'
              ]">
              {{ category.name }}
            </button>
            <!-- 活动标签下划线 -->
            <div :class="[
              'absolute bottom-0 h-0.5 bg-theme-600',
              hasTransition ? 'transition-all duration-300 ease-out' : ''
            ]" :style="{
              left: activeTabUnderlineLeft,
              width: activeTabUnderlineWidth
            }"></div>
          </div>
        </div>
      </div>

      <!-- 吸顶状态下的全宽分割线 -->
      <div v-if="isSticky" class="absolute bottom-0 left-0 right-0 h-px bg-slate-200"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div v-if="loading" class="text-center py-16 sm:py-20">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-theme-600 mx-auto"></div>
      </div>
      <div v-else>
        <!-- 当前分类的壁纸数量 -->
        <div class="mb-4 sm:mb-6 text-sm sm:text-base text-slate-600">
          找到 {{ filteredWallpapers.length }} 张{{
            selectedCategory === '全部' ? '' : selectedCategory
          }}壁纸
        </div>
        <!-- 壁纸列表 -->
        <div v-if="filteredWallpapers.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="wallpaper in filteredWallpapers" :key="wallpaper.id"
            class="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
            <!-- 壁纸图片 -->
            <div class="aspect-video sm:aspect-[4/3] lg:aspect-[3/2] overflow-hidden bg-slate-100">
              <img :src="wallpaper.thumbnail" :alt="wallpaper.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <!-- 悬浮信息层 -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 class="text-white font-semibold text-lg mb-1">{{ wallpaper.title }}</h3>
              <p class="text-white/80 text-sm mb-3">{{ wallpaper.description }}</p>
              <div class="flex gap-2">
                <button @click="handlePreview(wallpaper)"
                  class="flex-1 bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                  预览
                </button>
                <button @click="handleDownload(wallpaper)"
                  class="flex-1 bg-theme-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-theme-700 transition-colors">
                  下载
                </button>
              </div>
            </div>

            <!-- 壁纸信息 -->
            <div class="p-4">
              <div class="flex justify-between items-center">
                <span class="text-xs sm:text-sm text-slate-500">{{ wallpaper.resolution }}</span>
                <span class="text-xs sm:text-sm text-slate-500">{{ wallpaper.category }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 无内容提示 -->
        <div v-else class="text-center py-12 sm:py-16">
          <div class="text-slate-400 text-sm sm:text-lg mb-3 sm:mb-4">
            暂无{{ selectedCategory }}相关的壁纸
          </div>
          <button @click="handleTabClick('全部')"
            class="px-3 sm:px-4 py-2 bg-theme-600 text-white rounded-full hover:bg-theme-700 transition-colors text-sm sm:text-base">
            查看全部壁纸
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}
</style>
