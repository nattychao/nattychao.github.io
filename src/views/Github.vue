<template>
  <div class="py-8 sm:py-12 md:py-20 bg-slate-50"
    :style="{ paddingTop: 'calc(64px + var(--safe-area-inset-top, 0px) + 2rem)' }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 md:mb-6">
        <a href="https://github.com/nattychao?tab=repositories" target="_blank"
          class="text-slate-900 md:hover:text-theme-600 transition-colors">
          我的GitHub公开仓库
        </a>
      </h1>

      <!-- 加载状态 -->
      <div v-if="loading && repos.length === 0"
        class="fixed inset-0 flex flex-col justify-center items-center bg-white/80 z-50">
        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-theme-600 mb-4"></div>
        <p class="text-slate-600">加载中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-24 sm:py-32">
        <div class="mb-6">
          <svg class="w-16 h-16 text-theme-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-800 mb-2">仓库列表加载失败</h3>
        <p class="text-slate-600 mb-6 max-w-md mx-auto">
          无法获取GitHub仓库数据，请稍后重试
        </p>
        <button @click="loadRepos"
          class="px-4 py-2 bg-white border border-slate-100 rounded-lg text-sm font-medium text-slate-700 md:hover:bg-theme-50 md:hover:text-theme-600 md:hover:border-theme-200 transition-colors shadow-sm">
          重新加载
        </button>
      </div>

      <!-- 仓库列表 -->
      <div v-else>
        <!-- 筛选和排序 -->
        <div class="mb-6 flex flex-wrap gap-3 items-center">
          <!-- 类型选择器 -->
          <div id="type-dropdown" class="relative">
            <button @click="toggleDropdown('type')"
              class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 md:hover:bg-slate-50 transition-colors flex items-center gap-1">
              {{ currentTypeText }}
              <svg class="w-4 h-4 text-slate-500 transition-transform" :class="isTypeOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- 类型选项 -->
            <div v-if="isTypeOpen"
              class="absolute left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]">
              <div v-for="option in typeOptions" :key="option.value"
                class="px-3 py-2 text-sm text-slate-700 md:hover:bg-slate-50 cursor-pointer transition-colors"
                @click="selectType(option.value)">
                {{ option.label }}
              </div>
            </div>
          </div>

          <!-- 语言选择器 -->
          <div id="language-dropdown" class="relative">
            <button @click="toggleDropdown('language')"
              class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 md:hover:bg-slate-50 transition-colors flex items-center gap-1">
              {{ filters.language || 'All Languages' }}
              <svg class="w-4 h-4 text-slate-500 transition-transform" :class="isLanguageOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- 语言选项 -->
            <div v-if="isLanguageOpen"
              class="absolute left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[150px] max-h-60 overflow-y-auto">
              <div v-for="language in uniqueLanguages" :key="language"
                class="px-3 py-2 text-sm text-slate-700 md:hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-2"
                @click="selectLanguage(language)">
                <span v-if="(language === 'All' && !filters.language) || filters.language === language"
                  class="w-4 h-4 text-theme-600">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
                <span v-else class="w-4 h-4 border border-slate-300 rounded"></span>
                {{ language }}
              </div>
            </div>
          </div>

          <!-- 排序选择器 -->
          <div id="sort-dropdown" class="relative">
            <button @click="toggleDropdown('sort')"
              class="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 md:hover:bg-slate-50 transition-colors flex items-center gap-1">
              {{ currentSortText }}
              <svg class="w-4 h-4 text-slate-500 transition-transform" :class="isSortOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <!-- 排序选项 -->
            <div v-if="isSortOpen"
              class="absolute left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[150px]">
              <div v-for="option in sortOptions" :key="option.value"
                class="px-3 py-2 text-sm text-slate-700 md:hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-2"
                @click="selectSort(option.value)">
                <span v-if="filters.sort === option.value" class="w-4 h-4 text-theme-600">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
                <span v-else class="w-4 h-4 border border-slate-300 rounded"></span>
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- 仓库数量 -->
        <div class="mb-4 sm:mb-6 text-sm sm:text-base text-slate-600">
          找到 {{ totalRepos }} 个{{ filters.type ? filters.type : '' }}仓库
        </div>

        <!-- 仓库列表 -->
        <div v-if="repos.length > 0" class="space-y-3">
          <div v-for="repo in repos" :key="repo.id"
            class="bg-white rounded-lg border border-slate-100 cursor-pointer overflow-hidden md:hover:scale-[0.98] transition-transform duration-200"
            @click="navigateToRepo(repo.html_url)">
            <div class="p-4 sm:p-5">
              <!-- 仓库名称和描述 -->
              <div class="mb-3">
                <h2 class="text-lg font-bold text-slate-900 mb-1.5">
                  <a :href="repo.html_url" target="_blank" class="md:hover:text-theme-600 transition-colors"
                    @click.stop>
                    {{ repo.name }}
                  </a>
                </h2>
                <p v-if="repo.description" class="text-sm text-slate-600 line-clamp-2">
                  {{ repo.description }}
                </p>
                <p v-else class="text-sm text-slate-400">无描述</p>
              </div>

              <!-- 仓库元信息 -->
              <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
                <span v-if="repo.language"
                  class="inline-block px-2 py-0.5 text-xs font-medium rounded-full border transition-colors"
                  :class="getLanguageClass(repo.language)">
                  {{ repo.language }}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.825 1.102.825 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  {{ repo.stargazers_count }}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.015-2.04-3.338.724-4.042-1.343-4.042-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.825 1.102.825 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A9.973 9.973 0 0 0 12 22c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z" />
                  </svg>
                  {{ repo.forks_count }}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  {{ formatDate(repo.updated_at) }}
                </span>
                <div class="ml-auto flex items-center gap-2">
                  <a :href="repo.html_url" target="_blank"
                    class="text-theme-600 font-medium md:hover:text-theme-700 text-xs sm:text-sm" @click.stop>
                    查看
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空白状态 -->
        <div v-else class="text-center py-24 sm:py-32">
          <div class="mb-6">
            <svg class="w-16 h-16 text-theme-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-800 mb-2">暂无仓库数据</h3>
          <p class="text-slate-600 mb-6 max-w-md mx-auto">
            没有找到匹配的仓库，请尝试调整筛选条件或稍后重试
          </p>
          <button @click="resetFilters"
            class="px-4 py-2 bg-white border border-slate-100 rounded-lg text-sm font-medium text-slate-700 md:hover:bg-theme-50 md:hover:text-theme-600 md:hover:border-theme-200 transition-colors shadow-sm">
            重置筛选条件
          </button>
        </div>

        <!-- 分页控件 -->
        <!-- 分页控件 -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 sm:gap-3 mt-8">
          <!-- 上一页按钮 -->
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" aria-label="Previous Page"
            class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200" :class="currentPage === 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600 active:scale-95'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <!-- 页码按钮 -->
          <div class="flex gap-1 sm:gap-2">
            <!-- 第一页 -->
            <button v-if="currentPage > 3" @click="changePage(1)"
              class="w-10 h-10 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-theme-600 transition-all duration-200">
              1
            </button>

            <!-- 省略号 -->
            <span v-if="currentPage > 3" class="w-10 h-10 flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </span>

            <!-- 前面的页码 -->
            <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
              class="w-10 h-10 rounded-full text-sm font-medium transition-all duration-200" :class="currentPage === page
                ? 'bg-theme-600 text-white shadow-lg shadow-theme-600/30 scale-110'
                : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600'">
              {{ page }}
            </button>

            <!-- 省略号 -->
            <span v-if="currentPage < totalPages - 2" class="w-10 h-10 flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </span>

            <!-- 最后一页 -->
            <button v-if="currentPage < totalPages - 2" @click="changePage(totalPages)"
              class="w-10 h-10 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-theme-600 transition-all duration-200">
              {{ totalPages }}</button>
          </div>

          <!-- 下一页按钮 -->
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" aria-label="Next Page"
            class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200" :class="currentPage === totalPages
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100 hover:text-theme-600 active:scale-95'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <!-- 分页信息 -->
        <div v-if="totalPages > 1" class="text-center mt-4 text-sm text-slate-500">
          第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getCategoryClass } from '@/utils/categoryColors.js'

// 配置参数
const GITHUB_USERNAME = 'nattychao' // GitHub用户名
const PER_PAGE = 20 // 每页加载数量

// 状态管理
const allRepos = ref([]) // 存储所有仓库数据
const repos = ref([]) // 当前页展示的仓库数据
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const totalRepos = ref(0)
const totalPages = ref(0)

// 筛选和排序状态
const filters = ref({
  type: '', // 仓库类型：public, private, forks, sources, member
  language: '', // 语言筛选
  sort: '', // 排序方式：updated, created, pushed, full_name
})

// 下拉框显示状态
const isTypeOpen = ref(false)
const isLanguageOpen = ref(false)
const isSortOpen = ref(false)

// 可用的排序选项
const sortOptions = [
  { label: 'Last updated', value: '' },
  { label: 'Name', value: 'name' },
  { label: 'Created', value: 'stargazers' }
]

// 可用的类型选项
const typeOptions = [
  { label: 'All', value: '' },
  { label: 'Public', value: 'public' },
  { label: 'Forks', value: 'fork' },
  { label: 'Sources', value: 'source' }
]

// 获取所有唯一的语言
const uniqueLanguages = computed(() => {
  const languages = new Set()
  allRepos.value.forEach(repo => {
    if (repo.language) {
      languages.add(repo.language)
    }
  })
  return ['All', ...Array.from(languages).sort()]
})

// 获取语言颜色类
const getLanguageClass = (language) => {
  return getCategoryClass(language)
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 跳转到GitHub仓库页面
const navigateToRepo = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}

// 加载所有仓库数据
const loadRepos = async () => {
  try {
    loading.value = true
    error.value = ''

    // 构建请求参数
    const params = new URLSearchParams({
      // per_page: 100, // 每次获取100条
      // page: 1
    })

    // 添加类型筛选
    //if (filters.value.type) {
    params.append('type', filters.value.type)
    //}

    // 添加语言筛选
    //if (filters.value.language) {
    params.append('language', filters.value.language.toLowerCase())
    //}

    // 添加排序
    //if (filters.value.sort) {
    params.append('sort', filters.value.sort)
    //params.append('direction', 'desc')
    //}

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?${params.toString()}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.length === 0) {
      allRepos.value = []
    } else {
      allRepos.value = data
    }
    totalRepos.value = allRepos.value.length
    totalPages.value = Math.ceil(allRepos.value.length / PER_PAGE)

    // 更新当前页数据
    updateCurrentPageRepos()
    // 重置到第一页
    currentPage.value = 1
  } catch (err) {
    console.error('Failed to fetch repos:', err)
    error.value = '加载仓库列表失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 更新当前页展示的仓库数据
const updateCurrentPageRepos = () => {
  const startIndex = (currentPage.value - 1) * PER_PAGE
  const endIndex = startIndex + PER_PAGE
  repos.value = allRepos.value.slice(startIndex, endIndex)
}

// 切换页面
const changePage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return
  }
  currentPage.value = page
  updateCurrentPageRepos()
  // 滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 计算可见的页码范围
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5 // 最多显示5个页码

  // 如果总页数小于等于maxVisible，显示所有页码
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 否则显示当前页码及其前后的页码
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages.value, start + maxVisible - 1)

    // 调整起始位置，确保显示maxVisible个页码
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

// 切换下拉框显示
const toggleDropdown = (dropdown) => {
  switch (dropdown) {
    case 'type':
      isTypeOpen.value = !isTypeOpen.value
      isLanguageOpen.value = false
      isSortOpen.value = false
      break
    case 'language':
      isLanguageOpen.value = !isLanguageOpen.value
      isTypeOpen.value = false
      isSortOpen.value = false
      break
    case 'sort':
      isSortOpen.value = !isSortOpen.value
      isTypeOpen.value = false
      isLanguageOpen.value = false
      break
  }
}

// 选择类型
const selectType = (type) => {
  filters.value.type = type
  isTypeOpen.value = false
  loadRepos()
}

// 选择语言
const selectLanguage = (language) => {
  filters.value.language = language === 'All' ? '' : language.toLowerCase()
  isLanguageOpen.value = false
  loadRepos()
}

// 选择排序
const selectSort = (sort) => {
  filters.value.sort = sort
  isSortOpen.value = false
  loadRepos()
}

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    type: 'all',
    language: '',
    sort: 'updated'
  }
  loadRepos()
}

// 获取当前排序的显示文本
const currentSortText = computed(() => {
  const option = sortOptions.find(opt => opt.value === filters.value.sort)
  return option ? option.label : 'Last updated'
})

// 获取当前类型的显示文本
const currentTypeText = computed(() => {
  const option = typeOptions.find(opt => opt.value === filters.value.type)
  return option ? option.label : 'All'
})

// 点击外部关闭下拉框
const closeDropdowns = (event) => {
  const dropdowns = ['type', 'language', 'sort']
  const isClickInside = dropdowns.some(dropdown => {
    const element = document.getElementById(`${dropdown}-dropdown`)
    return element && element.contains(event.target)
  })

  if (!isClickInside) {
    isTypeOpen.value = false
    isLanguageOpen.value = false
    isSortOpen.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadRepos()
  // 添加点击外部关闭下拉框的事件监听器
  document.addEventListener('click', closeDropdowns)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>
