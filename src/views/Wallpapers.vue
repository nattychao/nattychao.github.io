<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// API Parameters
const client = ref('pc')
const currentSource = ref('')
const currentPage = ref(0)
const currentColor = ref('')
const currentTag = ref('')
const currentOrder = ref('')

// 响应式图片尺寸参数
const imageWidth = ref(800) // 默认宽度
const imageQuality = ref(80) // 默认质量

// Data Arrays
const sources = [
  { name: "全部壁纸源", value: "" },
  { name: "Infinity风景", value: "InfinityLandscape" },
  { name: "Infinity动漫", value: "Infinity" },
  { name: "Bing", value: "bing" },
  { name: "Unsplash", value: "Unsplash" },
  { name: "Life Of Pix", value: "Life+Of+Pix" },
  { name: "MMT", value: "MMT" },
  { name: "Realistic Shots", value: "Realistic+Shots" },
  { name: "Jay Mantri", value: "Jay+Mantri" },
  { name: "Free Nature Stock", value: "Free+Nature" },
  { name: "Skitter Photo", value: "Skitter+Photo" },
  { name: "Startup Stock Photos", value: "Startup+Stock+Photos" },
  { name: "Barn Images", value: "Barn+Images" },
  { name: "Picography", value: "Picography" }
]

const availableTags = [
  { name: "自然", value: "nature" },
  { name: "海洋", value: "ocean" },
  { name: "建筑", value: "architecture" },
  { name: "动物", value: "animals" },
  { name: "旅行", value: "travel" },
  { name: "美食", value: "food-drink" },
  { name: "动漫", value: "anime" },
  { name: "运动", value: "athletics" },
  { name: "技术", value: "technology" },
  { name: "街头", value: "street-photography" },
  { name: "Bing每日", value: "Bing" }
]

// State
const wallpapers = ref([])
const loading = ref(false)
const isInitialLoad = ref(true)
const hasTransition = ref(false)
const tabRefs = ref([])
const activeTabUnderlineLeft = ref('0px')
const activeTabUnderlineWidth = ref('0px')
const isSticky = ref(false)
const scrollPosition = ref(0)
const totalCount = ref(0)
const totalPages = ref(0)
// 直接加载原图，移除所有图片优化

// 节流函数
const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Refs
const stickyHeaderRef = ref(null)
const tabsScrollRef = ref(null)

// Initialize from query param
if (route.query.source) {
  currentSource.value = route.query.source
}
if (route.query.tag) {
  currentTag.value = route.query.tag
}

// Fetch Wallpapers
const fetchWallpapers = async () => {
  loading.value = true
  try {
    // 始终使用完整的 API 地址
    let urlString = "https://api.infinitynewtab.com/v2/get_wallpaper_list"
    urlString += "?client=" + client.value
    urlString += "&source=" + currentSource.value
    urlString += "&page=" + currentPage.value
    urlString += "&color=" + currentColor.value
    urlString += "&tag=" + currentTag.value
    urlString += "&order=" + currentOrder.value

    const response = await fetch(urlString)
    const data = await response.json()

    let list = []
    // The API structure is data -> data -> list
    if (data && data.data && Array.isArray(data.data.list)) {
      list = data.data.list
      // Extract pagination info
      totalCount.value = data.data.count || 0
      totalPages.value = data.data.totalPages || 0
    } else if (data && Array.isArray(data.data)) {
      // Fallback or other structure
      list = data.data
    } else {
      console.warn('Unexpected API response structure:', data)
    }

    wallpapers.value = list.map(item => {
      const rawSrc = item.src?.rawSrc || ''

      // 直接使用真实地址，不使用代理
      const smallImageUrl = 'https://wsrv.nl/?url=' + rawSrc + '&w=600'
      const largeImageUrl = rawSrc

      return {
        id: item._id,
        title: item.source || 'Wallpaper',
        description: item.dimensions || '',
        category: item.source || '',
        resolution: item.dimensions || '',
        format: 'jpg',
        thumbnail: smallImageUrl, // 根据环境选择图片 URL
        url: largeImageUrl,
        fallbackUrl: 'https://picsum.photos/seed/wallpaper' + item._id + '/400/300.jpg' // 添加备用图片URL
      }
    })

  } catch (error) {
    console.error('Failed to fetch wallpapers:', error)
    wallpapers.value = []
  } finally {
    loading.value = false
  }
}

// Update Underline
const updateUnderline = async () => {
  await nextTick()
  const activeTabIndex = sources.findIndex(s => s.value === currentSource.value)
  if (activeTabIndex !== -1 && tabRefs.value[activeTabIndex]) {
    const activeTab = tabRefs.value[activeTabIndex]

    if (isInitialLoad.value) {
      hasTransition.value = false
      activeTabUnderlineLeft.value = `${activeTab.offsetLeft}px`
      activeTabUnderlineWidth.value = `${activeTab.offsetWidth}px`
    } else {
      hasTransition.value = true
      activeTabUnderlineLeft.value = `${activeTab.offsetLeft}px`
      activeTabUnderlineWidth.value = `${activeTab.offsetWidth}px`
    }

    if (tabsScrollRef.value) {
      const container = tabsScrollRef.value
      const scrollLeft =
        activeTab.offsetLeft - container.offsetWidth / 2 + activeTab.offsetWidth / 2
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }
}

// Handle Tab Click (Source)
const handleTabClick = (sourceValue) => {
  currentSource.value = sourceValue
  currentPage.value = 0 // Reset page on source change
  isInitialLoad.value = false
  updateUnderline()

  router.push({
    query: {
      ...route.query,
      source: sourceValue
    }
  })

  fetchWallpapers()
}

// Handle Tag Click
const handleTagClick = (tagValue) => {
  // Toggle tag if clicking the same one, or just set it? 
  // User said "click tab and new added tag to dynamic modify params"
  // If I click the same tag, maybe deselect? For now just set it.
  if (currentTag.value === tagValue) {
    currentTag.value = '' // Allow deselecting
  } else {
    currentTag.value = tagValue
  }

  currentPage.value = 0 // Reset page on tag change

  router.push({
    query: {
      ...route.query,
      tag: currentTag.value
    }
  })

  fetchWallpapers()
}

// Pagination Controls
const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
    fetchWallpapers()
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    goToPage(currentPage.value - 1)
  }
}

// Computed property for visible page numbers
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)

  let start = Math.max(0, currentPage.value - half)
  let end = Math.min(totalPages.value - 1, start + maxVisible - 1)

  // Adjust start if we're near the end
  if (end - start < maxVisible - 1) {
    start = Math.max(0, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Responsive Padding
const paddingTop = ref('calc(64px + var(--safe-area-inset-top, 0px) + 2rem)')

// Scroll Handling
const handleScroll = () => {
  if (!stickyHeaderRef.value) return
  const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')
  const rect = stickyHeaderRef.value.getBoundingClientRect()
  const threshold = 64 + safeAreaTop
  isSticky.value = rect.top <= threshold
  scrollPosition.value = window.scrollY
}

const throttledHandleScroll = throttle(handleScroll, 16)

// Actions
const handleDownload = (wallpaper) => {
  // 使用 wsrv.nl 服务处理下载链接，避免防盗链问题
  const processedUrl = 'https://wsrv.nl/?url=' + wallpaper.url
  const link = document.createElement('a')
  link.href = processedUrl
  link.download = `wallpaper-${wallpaper.id}.jpg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handlePreview = (wallpaper) => {
  // 使用 wsrv.nl 服务处理预览链接，避免防盗链问题
  const processedUrl = 'https://wsrv.nl/?url=' + wallpaper.url
  window.open(processedUrl, '_blank')
}

// 根据图片真实尺寸比例计算样式
const getImageStyle = (wallpaper) => {
  if (!wallpaper.resolution) {
    return { aspectRatio: '3/4' } // 默认比例
  }

  // 解析分辨率字符串，例如 "1920x1080"
  const [width, height] = wallpaper.resolution.split('x').map(Number)

  if (!width || !height) {
    return { aspectRatio: '3/4' } // 默认比例
  }

  // 计算宽高比
  const aspectRatio = width / height

  // 设置最小和最大高度限制
  const minHeight = 150
  const maxHeight = 400

  // 根据屏幕宽度计算列宽
  const screenWidth = window.innerWidth
  let columnWidth

  if (screenWidth < 640) { // 移动端两列
    columnWidth = (screenWidth - 48) / 2 // 减去padding和gap
  } else if (screenWidth < 768) { // 平板端三列
    columnWidth = (screenWidth - 64) / 3
  } else if (screenWidth < 1024) { // 中等屏幕四列
    columnWidth = (screenWidth - 80) / 4
  } else { // 大屏幕四列
    columnWidth = (screenWidth - 80) / 4
  }

  // 根据宽高比计算高度
  let calculatedHeight = columnWidth / aspectRatio

  // 限制高度范围
  calculatedHeight = Math.max(minHeight, Math.min(calculatedHeight, maxHeight))

  return {
    height: `${calculatedHeight}px`
  }
}

// 根据屏幕尺寸调整图片参数
const adjustImageParams = () => {
  const screenWidth = window.innerWidth

  if (screenWidth < 640) { // 移动设备
    imageWidth.value = 300
    imageQuality.value = 60
  } else if (screenWidth < 1024) { // 平板设备
    imageWidth.value = 500
    imageQuality.value = 70
  } else { // 桌面设备
    imageWidth.value = 700
    imageQuality.value = 75
  }

  console.log(`调整图片参数: 宽度=${imageWidth.value}, 质量=${imageQuality.value}`)

  // 重新获取壁纸以应用新的图片参数
  fetchWallpapers()
}

onMounted(() => {
  // 初始化图片参数
  adjustImageParams()
  fetchWallpapers()
  updateUnderline()

  // 添加事件监听
  window.addEventListener('resize', () => {
    hasTransition.value = false
    updateUnderline()
    adjustImageParams() // 添加图片参数调整
  })
  window.addEventListener('scroll', throttledHandleScroll)

  // 恢复滚动位置
  nextTick(() => {
    window.scrollTo(0, scrollPosition.value)
  })
})

onBeforeUnmount(() => {
  // 保存滚动位置
  scrollPosition.value = window.scrollY

  // 移除事件监听
  window.removeEventListener('scroll', throttledHandleScroll)
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
    <div ref="stickyHeaderRef"
      :class="['w-full pt-2 sticky z-50 transition-colors duration-200', isSticky ? 'bg-white/90 backdrop-blur-sm' : 'bg-slate-50']"
      :style="{
        top: `calc(4rem + var(--safe-area-inset-top, 0px))`
      }">
      <!-- 滚动容器 (Sources) -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="tabsScrollRef" class="overflow-x-auto scrollbar-hide">
          <div class="relative flex gap-2 border-b border-slate-200 whitespace-nowrap pb-px min-w-max">
            <button v-for="(source, index) in sources" :key="source.value" :ref="el => (tabRefs[index] = el)"
              @click="handleTabClick(source.value)" :class="[
                'px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm transition-all duration-200',
                currentSource === source.value
                  ? 'text-theme-600'
                  : 'text-slate-600 hover:text-slate-900'
              ]">
              {{ source.name }}
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

        <!-- Tags List -->
        <div class="overflow-x-auto scrollbar-hide mt-2 pb-2">
          <div class="flex gap-2 whitespace-nowrap min-w-max px-1">
            <button v-for="tag in availableTags" :key="tag.value" @click="handleTagClick(tag.value)" :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
              currentTag === tag.value
                ? 'bg-theme-600 text-white border-theme-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-theme-300 hover:text-theme-600'
            ]">
              {{ tag.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- 吸顶状态下的全宽分割线 -->
      <div
        :class="['absolute bottom-0 left-0 right-0 h-px bg-slate-200 transition-opacity duration-200', isSticky ? 'opacity-100' : 'opacity-0']">
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div v-if="loading" class="text-center py-16 sm:py-20">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-theme-600 mx-auto"></div>
      </div>
      <div v-else>
        <!-- 当前分类的壁纸数量 -->
        <div class="mb-4 sm:mb-6 text-sm sm:text-base text-slate-600">
          找到 {{ totalCount }} 张壁纸 <span v-if="totalPages > 0">(第 {{ currentPage + 1 }} / {{ totalPages }} 页)</span>
        </div>
        <!-- 壁纸列表 -->
        <div v-if="wallpapers.length > 0"
          class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4 md:gap-5">
          <div v-for="wallpaper in wallpapers" :key="wallpaper.id" :id="`wallpaper-${wallpaper.id}`"
            class="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
            <!-- 壁纸图片 -->
            <div class="overflow-hidden bg-slate-100" :style="getImageStyle(wallpaper)">
              <div class="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                <!-- 直接加载原图 特别注意一个非常经典的**防盗链（Hotlink Protection）**问题。-->
                <img :src="wallpaper.thumbnail" referrerpolicy="no-referrer" :alt="wallpaper.title || 'Wallpaper'"
                  class="absolute inset-0 w-full h-full object-cover" />

                <!-- 移动设备下载按钮（始终显示） -->
                <button @click.stop="handleDownload(wallpaper)"
                  class="absolute bottom-3 right-3 bg-white/90 text-slate-800 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-1 sm:hidden"
                  title="下载壁纸">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span class="text-xs">下载</span>
                </button>

                <!-- 桌面设备鼠标移入浮层 -->
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div class="flex gap-2 sm:gap-3">
                    <!-- 下载按钮 -->
                    <button @click.stop="handleDownload(wallpaper)"
                      class="bg-white/90 hover:bg-white text-slate-800 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-1"
                      title="下载壁纸">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span class="text-xs">下载</span>
                    </button>

                    <!-- 预览按钮 -->
                    <button @click.stop="handlePreview(wallpaper)"
                      class="bg-white/90 hover:bg-white text-slate-800 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-1"
                      title="预览壁纸">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span class="text-xs">预览</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>



            <!-- 壁纸信息 -->
            <!-- <div class="p-4">
              <div class="flex justify-between items-center">
                <span class="text-xs sm:text-sm text-slate-500">{{ wallpaper.resolution }}</span>
                <span class="text-xs sm:text-sm text-slate-500 truncate max-w-[50%]">{{ wallpaper.category }}</span>
              </div>
            </div> -->
          </div>
        </div>

        <!-- 分页控件 -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2">
          <!-- 上一页按钮 -->
          <button @click="prevPage" :disabled="currentPage === 0" :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-all',
            currentPage === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-theme-300'
          ]">
            上一页
          </button>

          <!-- 第一页 -->
          <button v-if="visiblePages[0] > 0" @click="goToPage(0)"
            class="px-3 py-2 rounded-lg text-sm font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-theme-300 transition-all">
            1
          </button>

          <!-- 省略号 -->
          <span v-if="visiblePages[0] > 1" class="text-slate-400">...</span>

          <!-- 页码按钮 -->
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-all',
            currentPage === page
              ? 'bg-theme-600 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-theme-300'
          ]">
            {{ page + 1 }}
          </button>

          <!-- 省略号 -->
          <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 2" class="text-slate-400">...</span>

          <!-- 最后一页 -->
          <button v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" @click="goToPage(totalPages - 1)"
            class="px-3 py-2 rounded-lg text-sm font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-theme-300 transition-all">
            {{ totalPages }}
          </button>

          <!-- 下一页按钮 -->
          <button @click="nextPage" :disabled="currentPage === totalPages - 1" :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-all',
            currentPage === totalPages - 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-theme-300'
          ]">
            下一页
          </button>
        </div>

        <!-- 无内容提示 -->
        <div v-else class="text-center py-12 sm:py-16">
          <div class="text-slate-400 text-sm sm:text-lg mb-3 sm:mb-4">
            暂无壁纸
          </div>
          <button @click="handleTabClick('')"
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
