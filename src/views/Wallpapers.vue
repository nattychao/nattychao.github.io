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
  { name: "全部", value: "" },
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
        colors: item.colors || [],
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

// Generate placeholder background from colors
const getPlaceholderStyle = (colors) => {
  if (!colors || colors.length === 0) {
    return {}
  }
  const c1 = colors[0]
  const c2 = colors[1] || c1
  return {
    background: `linear-gradient(135deg, ${c1}, ${c2})`
  }
}

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

let lightbox = null

// Helper to get width/height from resolution string
const getResolutionWidth = (resolution) => {
  if (!resolution) return 0
  const match = resolution.match(/(\d+)\s*(?:px)?\s*[x×]\s*(\d+)/i)
  return match ? Number(match[1]) : 0
}

const getResolutionHeight = (resolution) => {
  if (!resolution) return 0
  const match = resolution.match(/(\d+)\s*(?:px)?\s*[x×]\s*(\d+)/i)
  return match ? Number(match[2]) : 0
}

onMounted(() => {
  fetchWallpapers()
  updateUnderline()

  // Initialize PhotoSwipe
  lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery',
    children: '.gallery-item',
    pswpModule: () => import('photoswipe'),
    bgOpacity: 1, // Pure black background
    showHideOpacity: false,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  })

  // Custom UI - Add Download Button
  lightbox.on('uiRegister', function () {
    lightbox.pswp.ui.registerElement({
      name: 'download-button',
      order: 9,
      isButton: true,
      tagName: 'a',

      // SVG with outline
      html: {
        isCustomSVG: true,
        inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
        outlineID: 'pswp__icn-download'
      },

      onInit: (el, pswp) => {
        el.setAttribute('download', '')
        el.setAttribute('target', '_blank')
        el.setAttribute('rel', 'noopener')

        pswp.on('change', () => {
          const currSlide = pswp.currSlide
          if (currSlide) {
            // Use wsrv.nl proxy to bypass referrer checks (anti-hotlinking)
            // Adding &output=jpg ensures it's treated as an image
            const originalUrl = currSlide.data.src
            el.href = `https://wsrv.nl/?url=${originalUrl}&output=jpg`
            el.download = `wallpaper-${currSlide.data.id || 'download'}.jpg`
          }
        })
      }
    })

    // Custom UI - Add Close Button
    lightbox.pswp.ui.registerElement({
      name: 'custom-close-button',
      order: 20,
      isButton: true,
      tagName: 'a',

      // SVG with outline
      html: {
        isCustomSVG: true,
        inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
        outlineID: 'pswp__icn-close'
      },

      onInit: (el, pswp) => {
        el.setAttribute('target', '_blank')
        el.setAttribute('rel', 'noopener')
        el.addEventListener('click', (e) => {
          e.preventDefault()
          pswp.close()
        })
      }
    })
  })

  lightbox.init()

  // Add event listeners
  window.addEventListener('resize', () => {
    hasTransition.value = false
    updateUnderline()
  })
  window.addEventListener('scroll', throttledHandleScroll)

  // Restore scroll position
  nextTick(() => {
    window.scrollTo(0, scrollPosition.value)
  })
})

onBeforeUnmount(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
    document.body.style.overflow = '';
  }
  // Save scroll position
  scrollPosition.value = window.scrollY

  // Remove event listeners
  window.removeEventListener('scroll', throttledHandleScroll)
})


// Get Aspect Ratio
const getAspectRatio = (resolution) => {
  if (!resolution) return 3 / 4
  // Handle "2048px × 1143px" or "1920x1080"
  const match = resolution.match(/(\d+)\s*(?:px)?\s*[x×]\s*(\d+)\s*(?:px)?/i)
  if (!match) return 3 / 4
  const width = Number(match[1])
  const height = Number(match[2])

  if (!width || !height) return 3 / 4
  return width / height
}

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
                  : 'text-slate-600 md:hover:text-slate-900'
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
          <div class="flex gap-2 whitespace-nowrap min-w-max px-0 md:px-1">
            <button v-for="tag in availableTags" :key="tag.value" @click="handleTagClick(tag.value)" :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border',
              currentTag === tag.value
                ? 'bg-theme-600 text-white border-theme-600'
                : 'bg-white text-slate-600 border-slate-200 md:hover:border-theme-300 md:hover:text-theme-600'
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
    <div id="gallery" class="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 pt-4">
      <div v-if="loading" class="fixed inset-0 flex flex-col justify-center items-center bg-white/80 z-50">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-theme-600 mb-4"></div>
        <p class="text-slate-600">加载中...</p>
      </div>
      <div v-else>
        <!-- 当前分类的壁纸数量 -->
        <div class="ml-3 md:ml-0 mb-4 sm:mb-6 text-sm sm:text-base text-slate-600 hidden md:block">
          找到 {{ totalCount }} 张壁纸 <span v-if="totalPages > 0">(第 {{ currentPage + 1 }} / {{ totalPages }} 页)</span>
        </div>

        <!-- Masonry Wall Layout -->
        <div v-if="wallpapers.length > 0" class="columns-2 md:columns-3 lg:columns-4 gap-1">
          <div v-for="wallpaper in wallpapers" :key="wallpaper.id" :id="`wallpaper-${wallpaper.id}`"
            class="break-inside-avoid mb-1 group relative rounded-[4px] md:rounded-none overflow-hidden bg-slate-100 transition-all duration-300 hover:shadow-lg">
            <!-- Image Container with Aspect Ratio -->
            <div
              :style="{ aspectRatio: getAspectRatio(wallpaper.resolution), ...getPlaceholderStyle(wallpaper.colors) }"
              class="relative w-full">

              <a :href="wallpaper.url" :data-pswp-width="getResolutionWidth(wallpaper.resolution)"
                :data-pswp-height="getResolutionHeight(wallpaper.resolution)" target="_blank" rel="noreferrer"
                class="gallery-item block w-full h-full">
                <img :src="wallpaper.thumbnail" referrerpolicy="no-referrer" :alt="wallpaper.title || 'Wallpaper'"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" />
              </a>

              <!-- Overlay (Desktop) -->
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                <!-- Overlay content removed as interaction is now handled by PhotoSwipe -->
              </div>

            </div>
          </div>
        </div>

        <!-- 当前分类的壁纸数量 -->
        <div class="mt-4 flex justify-center items-center text-sm sm:text-base text-slate-600 md:hidden">
          找到 {{ totalCount }} 张壁纸 <span v-if="totalPages > 0">(第 {{ currentPage + 1 }} / {{ totalPages }} 页)</span>
        </div>

        <!-- 分页控件 -->
        <!-- 分页控件 -->
        <div v-if="totalPages > 1" class="mt-8 md:mt-12 flex justify-center items-center gap-2 sm:gap-3">
          <!-- 上一页按钮 -->
          <button @click="prevPage" :disabled="currentPage === 0" aria-label="Previous Page" :class="[
            'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
            currentPage === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600 active:scale-95'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <!-- 第一页 -->
          <button v-if="visiblePages[0] > 0" @click="goToPage(0)"
            class="w-10 h-10 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-theme-600 transition-all duration-200">
            1
          </button>

          <!-- 省略号 -->
          <span v-if="visiblePages[0] > 1" class="w-10 h-10 flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </span>

          <!-- 页码按钮 -->
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
            'w-10 h-10 rounded-full text-sm font-medium transition-all duration-200',
            currentPage === page
              ? 'bg-theme-600 text-white shadow-lg shadow-theme-600/30 scale-110'
              : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600'
          ]">
            {{ page + 1 }}
          </button>

          <!-- 省略号 -->
          <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 2"
            class="w-10 h-10 flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </span>

          <!-- 最后一页 -->
          <button v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" @click="goToPage(totalPages - 1)"
            class="w-10 h-10 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-theme-600 transition-all duration-200">
            {{ totalPages }}
          </button>

          <!-- 下一页按钮 -->
          <button @click="nextPage" :disabled="currentPage === totalPages - 1" aria-label="Next Page" :class="[
            'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
            currentPage === totalPages - 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600 active:scale-95'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <!-- 无内容提示 -->
        <div v-else class="text-center py-12 sm:py-16">
          <div class="text-slate-400 text-sm sm:text-lg mb-3 sm:mb-4">
            暂无壁纸
          </div>
          <button @click="handleTabClick('')"
            class="px-3 sm:px-4 py-2 bg-theme-600 text-white rounded-full md:hover:bg-theme-700 transition-colors text-sm sm:text-base">
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



<style>
/* PhotoSwipe Custom Styles */
.pswp__bg {
  background: #000 !important;
}

/* Custom Download Button Style */
.pswp__button--download-button {
  background: none;
  margin-top: 0;
  margin-bottom: 0;
  position: fixed !important;
  bottom: 50px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  top: auto !important;
  right: auto !important;
  z-index: 200000 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 44px !important;
  height: 44px !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}

.pswp__button--download-button:hover {
  background: none;
  opacity: 0.8;
}

.pswp__button--download-button svg {
  fill: #fff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
}

/* Hide default close button, arrows, and zoom button */
.pswp__button--close,
.pswp__button--arrow--prev,
.pswp__button--arrow--next,
.pswp__button--zoom {
  display: none !important;
}

/* Center Counter */
.pswp__counter {
  position: absolute;
  top: 30px;
  left: 0 !important;
  width: 100% !important;
  text-align: center !important;
  font-size: 16px;
  opacity: 0.8;
  padding: 0 !important;
}

/* Custom Close Button Style */
.pswp__button--custom-close-button {
  background: none;
  margin-top: 0;
  position: absolute;
  top: 0;
  right: 0;
}

.pswp__button--custom-close-button:hover {
  background: none;
  opacity: 0.8;
}

.pswp__button--custom-close-button svg {
  fill: #fff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
}
</style>
