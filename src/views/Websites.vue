<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20" :style="{ paddingTop }">
    <div class="mb-8 sm:mb-10 md:mb-12">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">网站导航</h1>
      <p class="text-sm sm:text-base text-slate-600">探索流行网站，快速访问您喜爱的在线服务</p>
    </div>

    <!-- 搜索框 -->
    <div class="mb-6 sm:mb-8">
      <div class="relative max-w-2xl mx-auto">
        <input v-model="keyword" @input="handleSearch" placeholder="搜索网站名称或描述..."
          class="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-theme-500 focus:border-transparent text-slate-900 placeholder:text-slate-400" />
        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button v-if="keyword" @click="clearSearch"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 分类筛选：PC端水平滚动，移动端垂直边栏 -->
    <div class="hidden sm:block mb-8 overflow-x-auto">
      <div class="flex space-x-2 pb-2">
        <button v-for="category in categories" :key="category.type + '-' + category.source"
          @click="selectCategory(category)" :class="[
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
            selectedCategory === (category.type || category.source) && !isSearching
              ? 'bg-theme-600 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          ]">
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- 主内容区：移动端布局 -->
    <div class="flex flex-row sm:hidden h-screen overflow-hidden">
      <!-- 分类筛选：移动端垂直边栏 (占30%) -->
      <div class="w-[40%] p-2 sticky top-0 self-start h-full bg-white border-r border-slate-100">
        <div class="flex flex-col space-y-1 h-[calc(100vh-150px)] overflow-y-auto pr-1">
          <button v-for="category in categories" :key="category.type + '-' + category.source"
            @click="selectCategory(category)" :class="[
              'px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 w-full',
              selectedCategory === (category.type || category.source) && !isSearching
                ? 'bg-theme-600 text-white shadow-md transform'
                : 'bg-slate-50 text-slate-700 hover:bg-theme-100'
            ]">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- 网站列表：移动端占70%宽度 -->
      <div class="w-[70%] grid grid-cols-1 gap-3 p-2 overflow-y-auto h-full">
        <a v-for="website in websites" :key="website._id" :href="website.url" target="_blank" rel="noopener noreferrer"
          class="bg-white rounded-xl px-4 pt-8 relative block md:hover:shadow-md md:hover:scale-105 active:scale-105 transition-all duration-300 mb-2">
          <!-- 地球图标 (访问网站) -->
          <div class="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
          </div>

          <!-- 网站信息 -->
          <div class="absolute -top-[12px] left-4 right-9 flex items-center">
            <!-- 网站图标 (带白色圆环) -->
            <div class="w-[60px] h-[60px] rounded-full flex items-center justify-center p-[6px]"
              style="background-color: white;">
              <div class="w-full h-full rounded-full flex items-center justify-center"
                :style="{ backgroundColor: website.color || '#f3f4f6' }">
                <img v-if="website.src" :src="website.src" :alt="website.name"
                  class="w-full h-full rounded-full object-cover"
                  @error="($event) => $event.target.style.display = 'none'" />
              </div>
            </div>
            <!-- 网站名称 -->
            <h3 class="text-[14px] font-semibold text-slate-900 truncate ml-2 translate-y-1 flex-1">
              {{ website.name }}
            </h3>
          </div>

          <div class="pt-4"> <!-- 描述部分距离图标底部12px -->
            <p v-if="website.description" class="text-xs text-slate-600 mb-4 mt-1 line-clamp-4">
              {{ website.description }}
            </p>
            <p v-else class="text-xs text-slate-400 mb-4 mt-1">无描述</p>
          </div>
        </a>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="fixed inset-0 flex flex-col justify-center items-center bg-white/80 z-50">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-600 mb-4"></div>
        <p class="text-slate-600">加载中...</p>
      </div>

      <!-- 无数据状态 -->
      <div v-else-if="websites.length === 0" class="text-center py-12">
        <p class="text-slate-600">暂无网站数据</p>
      </div>
    </div>

    <!-- 网站列表：PC端布局 -->
    <div class="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <a v-for="website in websites" :key="website._id" :href="website.url" target="_blank" rel="noopener noreferrer"
        class="bg-white rounded-xl px-4 pt-8 relative block md:hover:shadow-md md:hover:scale-105 active:scale-105 transition-all duration-300 mb-2">
        <!-- 地球图标 (访问网站) -->
        <div class="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
          </svg>
        </div>

        <!-- 网站信息 -->
        <div class="absolute -top-[12px] left-4 right-9 flex items-center">
          <!-- 网站图标 (带白色圆环) -->
          <div class="w-[60px] h-[60px] rounded-full flex items-center justify-center p-[6px]"
            style="background-color: white;">
            <div class="w-full h-full rounded-full flex items-center justify-center"
              :style="{ backgroundColor: website.color || '#f3f4f6' }">
              <img v-if="website.src" :src="website.src" :alt="website.name"
                class="w-full h-full rounded-full object-cover"
                @error="($event) => $event.target.style.display = 'none'" />
            </div>
          </div>
          <!-- 网站名称 -->
          <h3 class="text-[14px] font-semibold text-slate-900 truncate ml-2 translate-y-1 flex-1">
            {{ website.name }}
          </h3>
        </div>

        <div class="pt-4"> <!-- 描述部分距离图标底部12px -->
          <p v-if="website.description" class="text-xs text-slate-600 mb-4 mt-1 line-clamp-4">{{ website.description }}
          </p>
          <p v-else class="text-xs text-slate-400 mb-4 mt-1">无描述</p>
        </div>
      </a>
    </div>

    <!-- 分页 -->
    <div v-if="websites.length > 0" class="mt-8 sm:block">
      <!-- 统计信息 -->
      <div class="text-center text-sm text-slate-600 mb-4">
        共 {{ totalCount }} 个网站，每页 {{ pageSize }} 个，共 {{ totalPages }} 页
      </div>

      <!-- 分页控件 -->
      <!-- 分页控件 -->
      <div v-if="totalPages > 1" class="mt-4 flex justify-center items-center gap-2 sm:gap-3">
        <!-- 上一页按钮 -->
        <button @click="prevPage" :disabled="currentPage === 1" aria-label="Previous Page" :class="[
          'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
          currentPage === 1
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600 active:scale-95'
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- 第一页 -->
        <button v-if="visiblePages[0] > 1" @click="goToPage(1)"
          class="w-10 h-10 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-theme-600 transition-all duration-200">
          1
        </button>

        <!-- 省略号 -->
        <span v-if="visiblePages[0] > 2" class="w-10 h-10 flex items-center justify-center text-slate-400">
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
          {{ page }}
        </button>

        <!-- 省略号 -->
        <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
          class="w-10 h-10 flex items-center justify-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </span>

        <!-- 最后一页 -->
        <button v-if="visiblePages[visiblePages.length - 1] < totalPages" @click="goToPage(totalPages)"
          class="w-10 h-10 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-theme-600 transition-all duration-200">
          {{ totalPages }}
        </button>

        <!-- 下一页按钮 -->
        <button @click="nextPage" :disabled="currentPage === totalPages" aria-label="Next Page" :class="[
          'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
          currentPage === totalPages
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600 active:scale-95'
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

export default {
  name: 'Websites',
  setup() {
    const websites = ref([])
    const loading = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(0)
    const totalCount = ref(0)
    const pageSize = ref(50) // 每页显示数量
    const selectedCategory = ref('popular')
    const lang = 'zh-CN'

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

    // 可见页码计算
    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5 // 最多显示5个页码
      const halfVisible = Math.floor(maxVisible / 2)

      let startPage = Math.max(1, currentPage.value - halfVisible)
      let endPage = Math.min(totalPages.value, startPage + maxVisible - 1)

      // 调整起始页，确保始终显示maxVisible个页码（如果总页数足够）
      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      return pages
    })

    // 搜索相关状态
    const keyword = ref('')
    const isSearching = ref(false)

    // 网站分类
    const categories = [
      { name: '受欢迎的', type: 'popular', source: '' },
      { name: '用户分享', type: '', source: 'shareByUser' },
      { name: '应用', type: 'app', source: '' },
      { name: '新闻', type: 'news', source: '' },
      { name: '音乐视频', type: 'music', source: '' },
      { name: '图片', type: 'photos', source: '' },
      { name: '购物与团购', type: 'shopping', source: '' },
      { name: '社交与博客', type: 'social', source: '' },
      { name: '体育与旅行', type: 'sports', source: '' },
      { name: '生活方式', type: 'life', source: '' },
      { name: '游戏与娱乐', type: 'games', source: '' },
      { name: '教育与招聘', type: 'education', source: '' },
      { name: '数码科技', type: 'tech', source: '' },
      { name: '金融', type: 'finance', source: '' },
      { name: '阅读', type: 'read', source: '' },
      { name: '其他', type: 'others', source: '' }
    ]

    // 获取网站列表
    const fetchWebsites = async () => {
      loading.value = true
      try {
        let urlString = ''

        // 根据API逻辑构建不同的请求参数
        if (keyword.value.trim().length > 0) {
          // 搜索模式
          urlString += `?lang=${lang}`
          urlString += `&type=search`
          urlString += `&keyword=${encodeURIComponent(keyword.value.trim())}`
          urlString += `&page=${currentPage.value}`
        } else {
          // 分类筛选模式
          urlString += `?lang=${lang}&page=${currentPage.value}`

          // 找到当前选中的分类
          const category = categories.find(cat =>
            selectedCategory.value === (cat.type || cat.source)
          )

          if (category) {
            if (category.type) {
              urlString += `&type=${category.type}`
            }
            if (category.source) {
              urlString += `&source=${category.source}`
            }
          }
        }

        const response = await fetch(
          `https://infinity-api.infinitynewtab.com/get-icons${urlString}`
        )
        const data = await response.json()

        if (data.success) {
          // 更新网站列表，每次加载新页面时替换数据
          websites.value = data.icons

          // 更新总页数和总数量
          totalPages.value = data.totalPages || 0
          totalCount.value = data.count || 0

          // 更新每页显示数量
          pageSize.value = data.icons.length
        }
      } catch (error) {
        console.error('获取网站列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 搜索处理
    const handleSearch = () => {
      // 防抖处理，避免频繁请求
      clearTimeout(searchTimer.value)
      searchTimer.value = setTimeout(() => {
        isSearching.value = keyword.value.trim().length > 0
        currentPage.value = 1
        totalPages.value = 0
        totalCount.value = 0
        fetchWebsites()
      }, 300)
    }

    // 清除搜索
    const clearSearch = () => {
      keyword.value = ''
      isSearching.value = false
      currentPage.value = 1
      totalPages.value = 0
      totalCount.value = 0
      fetchWebsites()
    }

    // 选择分类
    const selectCategory = (category) => {
      selectedCategory.value = category.type || category.source
      keyword.value = ''
      isSearching.value = false
      currentPage.value = 1
      totalPages.value = 0
      totalCount.value = 0
      fetchWebsites()
    }

    // 搜索防抖计时器
    const searchTimer = ref(null)

    // 上一页
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
        fetchWebsites()
      }
    }

    // 下一页
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
        fetchWebsites()
      }
    }

    // 跳转到指定页码
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        fetchWebsites()
      }
    }

    // 页面加载时获取数据
    onMounted(() => {
      fetchWebsites()
      window.addEventListener('resize', handleResize)
      handleResize() // 初始调用一次
    })

    // 页面卸载前移除事件监听
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      websites,
      loading,
      currentPage,
      totalPages,
      totalCount,
      pageSize,
      selectedCategory,
      categories,
      paddingTop,
      visiblePages,
      fetchWebsites,
      selectCategory,
      prevPage,
      nextPage,
      goToPage,
      keyword,
      isSearching,
      handleSearch,
      clearSearch
    }
  }
}
</script>
