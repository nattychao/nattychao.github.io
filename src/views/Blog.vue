<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import { usePosts } from '../composables/usePosts'
import { RouterLink } from 'vue-router'
import { getCategoryClass } from '../utils/categoryColors.js'

const { posts, loading, loadPosts } = usePosts()
const selectedCategory = ref('全部')
const tabRefs = ref([])
const activeTabUnderlineLeft = ref('0px')
const activeTabUnderlineWidth = ref('0px')
const tabsContainerRef = ref(null)

// 定义分类
const categories = [
  { id: '全部', name: '全部' },
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
    activeTabUnderlineLeft.value = `${activeTab.offsetLeft}px`
    activeTabUnderlineWidth.value = `${activeTab.offsetWidth}px`
    
    // 滚动到选中的标签
    if (tabsContainerRef.value) {
      const container = tabsContainerRef.value
      const scrollLeft = activeTab.offsetLeft - (container.offsetWidth / 2) + (activeTab.offsetWidth / 2)
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }
}

// 处理标签点击
const handleTabClick = (categoryId) => {
  selectedCategory.value = categoryId
  updateUnderline()
}

// 获取文章所属的所有分类
const getPostCategories = (post) => {
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

onMounted(() => {
  loadPosts()
  // 初始化下划线位置
  setTimeout(() => {
    updateUnderline()
  }, 100)
  
  // 监听窗口大小变化
  window.addEventListener('resize', updateUnderline)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h1 class="text-4xl font-bold text-slate-900 mb-8">博客</h1>
    
    <!-- 分类标签栏 -->
    <div class="mb-12">
      <!-- 滚动容器 -->
      <div 
        ref="tabsContainerRef"
        class="overflow-x-auto scrollbar-hide"
      >
        <div class="relative flex gap-2 border-b border-slate-200 whitespace-nowrap pb-px min-w-max">
          <button 
            v-for="(category, index) in categories" 
            :key="category.id"
            :ref="el => tabRefs[index] = el"
            @click="handleTabClick(category.id)"
            :class="[
              'px-4 py-2 font-medium text-sm transition-all duration-200',
              selectedCategory === category.id 
                ? 'text-indigo-600' 
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            {{ category.name }}
          </button>
          
          <!-- 活动标签下划线 -->
          <div 
            class="absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-out"
            :style="{
              left: activeTabUnderlineLeft,
              width: activeTabUnderlineWidth
            }"
          ></div>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <div v-else>
      <!-- 当前分类的博客数量 -->
      <div class="mb-6 text-slate-600">
        找到 {{ filteredPosts.length }} 篇{{ selectedCategory === '全部' ? '' : selectedCategory }}相关博客
      </div>
      
      <!-- 博客列表 -->
      <div v-if="filteredPosts.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="post in filteredPosts" :key="post.slug" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 flex flex-col">
          <!-- 分类标签 -->
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-for="tag in (post.tags || [])" :key="tag" 
                  :class="getCategoryClass(tag)"
                  class="inline-block px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 hover:shadow-sm">
              {{ tag }}
            </span>
          </div>
          
          <div class="text-sm text-slate-500 mb-2">{{ new Date(post.date).toLocaleDateString() }}</div>
          <h2 class="text-xl font-bold text-slate-900 mb-3">
            <RouterLink :to="'/blog/' + post.slug" class="hover:text-indigo-600 transition-colors">
              {{ post.title }}
            </RouterLink>
          </h2>
          <p class="text-slate-600 mb-4 flex-grow">{{ post.description }}</p>
          <RouterLink :to="'/blog/' + post.slug" class="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center gap-1 mt-auto">
            阅读更多 &rarr;
          </RouterLink>
        </article>
      </div>
      
      <!-- 无内容提示 -->
      <div v-else class="text-center py-16">
        <div class="text-slate-400 text-lg mb-4">暂无{{ selectedCategory }}相关的博客</div>
        <button 
          @click="selectedCategory = '全部'"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          查看全部博客
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>