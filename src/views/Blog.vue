<script setup>
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import { usePosts } from '../composables/usePosts'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getCategoryClass } from '../utils/categoryColors.js'

const { posts, loading, loadPosts } = usePosts()
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
const stickyHeaderRef = ref(null)
const tabsScrollRef = ref(null)

// 定义分类
const categories = [
  { id: '全部', name: '全部' },
  { id: 'AI', name: 'AI' }, // 人工智能相关
  { id: 'Objective-C', name: 'Objective-C' },
  { id: 'Swift', name: 'Swift' },
  { id: 'Vue', name: 'Vue' },
  { id: 'React', name: 'React' },
  { id: '前端开发', name: '前端开发' },
  { id: 'Web开发', name: 'Web开发' }
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

// 获取文章所属的所有分类
const getPostCategories = post => {
  // 如果tags为空、不是数组或空数组，则返回空数组（表示不属于任何特定分类）
  if (!post.tags || !Array.isArray(post.tags) || post.tags.length === 0) {
    return []
  }

  // 获取文章所属的所有分类
  const postCategories = []

  // 检查tags中是否包含特定分类
  categories.forEach(category => {
    if (category.id !== '全部' && post.tags.includes(category.id)) {
      postCategories.push(category.id)
    }
  })

  return postCategories
}

// 根据选中的分类过滤博客
const filteredPosts = computed(() => {
  if (selectedCategory.value === '全部') {
    return posts.value
  }

  return posts.value.filter(post => {
    const postCategories = getPostCategories(post)
    // 如果tags为空或空数组，则只在"全部"分类下显示
    if (postCategories.length === 0) {
      return selectedCategory.value === '全部'
    }
    // 否则，如果文章属于当前选中的分类，则显示
    return postCategories.includes(selectedCategory.value)
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
  if (!stickyHeaderRef.value) return

  // 获取安全区域高度（考虑刘海屏或灵动岛）
  const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0')

  // 获取标签栏的位置
  const rect = stickyHeaderRef.value.getBoundingClientRect()
  // 如果标签栏顶部距离视口顶部的距离小于等于header高度+安全区域，则认为已经吸顶
  const threshold = 64 + safeAreaTop
  isSticky.value = rect.top <= threshold

  // 保存当前滚动位置
  scrollPosition.value = window.scrollY
}

// 节流后的滚动处理函数
const throttledHandleScroll = throttle(handleScroll, 16) // 约60fps

// 导航到博客详情页
const navigateToPost = (slug) => {
  router.push(`/blog/${slug}`)
}

onMounted(() => {
  loadPosts()
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
        宋的技术博客
      </h1>
    </div>
    <!-- 分类标签栏 -->
    <div ref="stickyHeaderRef"
      :class="['w-full pt-2 sticky z-50 transition-colors duration-200', isSticky ? 'bg-white/90 backdrop-blur-sm' : 'bg-slate-50']"
      :style="{
        top: `calc(4rem + var(--safe-area-inset-top, 0px))`
      }">
      <!-- 滚动容器 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="tabsScrollRef" class="overflow-x-auto scrollbar-hide">
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
        <!-- 当前分类的博客数量 -->
        <div class="mb-4 sm:mb-6 text-sm sm:text-base text-slate-600">
          找到 {{ filteredPosts.length }} 篇{{
            selectedCategory === '全部' ? '' : selectedCategory
          }}相关博客
        </div>
        <!-- 博客列表 -->
        <div v-if="filteredPosts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <article v-for="post in filteredPosts" :key="post.slug"
            class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col cursor-pointer"
            @click="navigateToPost(post.slug)">
            <!-- 分类标签 -->
            <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span v-for="tag in post.tags || []" :key="tag" :class="getCategoryClass(tag)"
                class="inline-block px-2 sm:px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 hover:shadow-sm">
                {{ tag }}
              </span>
            </div>
            <div class="text-xs sm:text-sm text-slate-500 mb-1.5 sm:mb-2">
              {{ new Date(post.date).toLocaleDateString() }}
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
              <RouterLink :to="'/blog/' + post.slug" class="hover:text-theme-600 transition-colors" @click.stop>
                {{ post.title }}
              </RouterLink>
            </h2>
            <p class="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 flex-grow">
              {{ post.description }}
            </p>
            <RouterLink :to="'/blog/' + post.slug"
              class="text-theme-600 font-medium hover:text-theme-700 inline-flex items-center gap-1 mt-auto text-sm sm:text-base"
              @click.stop>
              阅读更多 &rarr;
            </RouterLink>
          </article>
        </div>
        <!-- 无内容提示 -->
        <div v-else class="text-center py-12 sm:py-16">
          <div class="text-slate-400 text-sm sm:text-lg mb-3 sm:mb-4">
            暂无{{ selectedCategory }}相关的博客
          </div>
          <button @click="handleTabClick('全部')"
            class="px-3 sm:px-4 py-2 bg-theme-600 text-white rounded-full hover:bg-theme-700 transition-colors text-sm sm:text-base">
            查看全部博客
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
