<script setup>
import { ref, computed } from 'vue'
import { Book, Code, Wrench, FileText, Search, ExternalLink, Star } from 'lucide-vue-next'

// 资源分类
const resourceCategories = ref([
  { id: 'tools', name: '技术工具', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
  { id: 'books', name: '精选书籍', icon: Book, color: 'bg-green-100 text-green-600' },
  { id: 'tutorials', name: '优质教程', icon: Code, color: 'bg-purple-100 text-purple-600' },
  { id: 'templates', name: '实用模板', icon: FileText, color: 'bg-orange-100 text-orange-600' }
])

// 资源数据
const resources = ref([
  // 技术工具
  {
    id: 1,
    title: 'VS Code',
    category: 'tools',
    description: '强大的代码编辑器，支持多种编程语言和丰富的扩展',
    url: 'https://code.visualstudio.com/',
    rating: 5
  },
  {
    id: 2,
    title: 'Figma',
    category: 'tools',
    description: '基于浏览器的设计工具，支持团队协作和原型设计',
    url: 'https://www.figma.com/',
    rating: 5
  },
  {
    id: 3,
    title: 'Postman',
    category: 'tools',
    description: 'API开发和测试工具，支持多种请求方式和环境配置',
    url: 'https://www.postman.com/',
    rating: 4
  },
  // 精选书籍
  {
    id: 4,
    title: 'Swift Programming Language',
    category: 'books',
    description: '苹果官方出版的Swift编程语言权威指南',
    url: 'https://docs.swift.org/swift-book/',
    rating: 5
  },
  {
    id: 5,
    title: 'Clean Code',
    category: 'books',
    description: 'Robert C. Martin撰写的经典软件工程书籍，讲解代码整洁之道',
    url: 'https://www.oreilly.com/library/view/clean-code/9780136083238/',
    rating: 5
  },
  {
    id: 6,
    title: 'Design Patterns',
    category: 'books',
    description: '四人帮编写的设计模式经典著作，讲解面向对象设计原则',
    url: 'https://www.oreilly.com/library/view/design-patterns-elements/0201633612/',
    rating: 4
  },
  // 优质教程
  {
    id: 7,
    title: 'Vue Mastery',
    category: 'tutorials',
    description: 'Vue.js官方推荐的高质量教程平台，包含基础到高级内容',
    url: 'https://www.vuemastery.com/',
    rating: 5
  },
  {
    id: 8,
    title: 'Ray Wenderlich',
    category: 'tutorials',
    description: 'iOS开发和游戏开发的优质教程网站，内容深入浅出',
    url: 'https://www.raywenderlich.com/',
    rating: 4
  },
  {
    id: 9,
    title: 'freeCodeCamp',
    category: 'tutorials',
    description: '免费的编程学习平台，包含前端、后端、数据科学等内容',
    url: 'https://www.freecodecamp.org/',
    rating: 5
  },
  // 实用模板
  {
    id: 10,
    title: 'Vue 3 Starter Template',
    category: 'templates',
    description: '基于Vue 3 + TypeScript + Tailwind CSS的项目模板',
    url: 'https://github.com/vuejs/create-vue',
    rating: 4
  },
  {
    id: 11,
    title: 'SwiftUI Templates',
    category: 'templates',
    description: '包含多种SwiftUI界面组件和应用模板',
    url: 'https://developer.apple.com/swiftui/',
    rating: 5
  },
  {
    id: 12,
    title: 'GitHub Action Templates',
    category: 'templates',
    description: '常用的GitHub Actions工作流模板集合',
    url: 'https://github.com/actions/starter-workflows',
    rating: 4
  }
])

// 当前选中的分类
const selectedCategory = ref('all')

// 搜索关键词
const searchQuery = ref('')

// 过滤后的资源
const filteredResources = computed(() => {
  let result = resources.value
  
  // 按分类过滤
  if (selectedCategory.value !== 'all') {
    result = result.filter(resource => resource.category === selectedCategory.value)
  }
  
  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(resource => 
      resource.title.toLowerCase().includes(query) || 
      resource.description.toLowerCase().includes(query)
    )
  }
  
  return result
})

// 获取分类信息
const getCategoryInfo = (categoryId) => {
  if (categoryId === 'all') {
    return { name: '全部资源', icon: null, color: '' }
  }
  return resourceCategories.value.find(cat => cat.id === categoryId) || {}
}

// 生成评分星星
const getRatingStars = (rating) => {
  return Array(5).fill(0).map((_, index) => index < rating)
}
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center overflow-hidden h-[max(calc(40vh),_320px)] md:h-[max(calc(60vh),_500px)]">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1581092322693-22022c314474?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="Resources Background" 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/60 backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
      
      <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300">
            资源分享
          </span>
        </h1>
        <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          精选技术资源，助力你的学习和开发之旅
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <!-- 搜索和分类 -->
      <div class="mb-6 sm:mb-8">
        <!-- 搜索框 -->
        <div class="relative mb-4 sm:mb-6">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search class="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="搜索资源..."
            class="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all"
          />
        </div>
        
        <!-- 分类标签 -->
        <div class="flex flex-wrap gap-2 sm:gap-3">
          <button 
            @click="selectedCategory = 'all'"
            class="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all"
            :class="{
              'bg-theme-600 text-white hover:bg-theme-700': selectedCategory === 'all',
              'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedCategory !== 'all'
            }"
          >
            全部资源
          </button>
          
          <button 
            v-for="category in resourceCategories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            class="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all"
            :class="{
              'bg-theme-600 text-white hover:bg-theme-700': selectedCategory === category.id,
              'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedCategory !== category.id
            }"
          >
            <component :is="category.icon" class="w-4 h-4" />
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <!-- 资源列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div 
          v-for="resource in filteredResources" 
          :key="resource.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
        >
          <div class="p-4 sm:p-5">
            <!-- 分类标签 -->
            <div class="flex items-center gap-2 mb-3">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="getCategoryInfo(resource.category).color"
              >
                <component :is="getCategoryInfo(resource.category).icon" class="w-4 h-4" />
              </div>
              <span class="text-xs font-medium text-slate-500">
                {{ getCategoryInfo(resource.category).name }}
              </span>
            </div>
            
            <!-- 资源标题 -->
            <h3 class="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">
              {{ resource.title }}
            </h3>
            
            <!-- 资源描述 -->
            <p class="text-slate-600 text-sm mb-3 line-clamp-2">
              {{ resource.description }}
            </p>
            
            <!-- 评分 -->
            <div class="flex items-center gap-1 mb-4">
              <Star 
                v-for="(isFilled, index) in getRatingStars(resource.rating)" 
                :key="index"
                class="w-4 h-4"
                :class="isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'"
              />
              <span class="ml-2 text-xs text-slate-500">{{ resource.rating }}/5</span>
            </div>
            
            <!-- 访问链接 -->
            <a 
              :href="resource.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm font-medium"
            >
              访问资源
              <ExternalLink class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredResources.length === 0" class="text-center py-12 sm:py-16">
        <div class="w-20 h-20 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-4">
          <Search class="w-10 h-10 text-theme-600" />
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-2">未找到资源</h3>
        <p class="text-slate-600 max-w-md mx-auto mb-4">
          没有找到匹配的资源，请尝试其他搜索关键词或分类
        </p>
        <button 
          @click="searchQuery = ''; selectedCategory = 'all'"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm font-medium"
        >
          重置筛选
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resources'
}
</script>