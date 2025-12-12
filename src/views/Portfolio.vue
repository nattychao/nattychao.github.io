<script setup>
import { ref, computed } from 'vue'
import { Github, ExternalLink, ChevronRight } from 'lucide-vue-next'

// 作品数据
const portfolioItems = ref([
  {
    id: 1,
    title: 'iOS 音乐播放器应用',
    category: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '一个功能完整的音乐播放器应用，支持在线流媒体播放和本地音乐管理。',
    tech: ['Swift', 'UIKit', 'AVFoundation', 'Firebase'],
    github: 'https://github.com/nattychao/music-player',
    demo: '#'
  },
  {
    id: 2,
    title: '电商网站前端重构',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '使用现代化技术栈重构的电商网站，提升了用户体验和性能。',
    tech: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Pinia'],
    github: 'https://github.com/nattychao/ecommerce-website',
    demo: '#'
  },
  {
    id: 3,
    title: '任务管理应用',
    category: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1542744095-a72707616267?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '一个优雅的任务管理应用，支持看板视图、日历视图和提醒功能。',
    tech: ['SwiftUI', 'Core Data', 'CloudKit', 'Swift Charts'],
    github: 'https://github.com/nattychao/task-manager',
    demo: '#'
  },
  {
    id: 4,
    title: '数据可视化仪表盘',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '实时数据可视化仪表盘，支持多种图表类型和数据导出功能。',
    tech: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    github: 'https://github.com/nattychao/data-dashboard',
    demo: '#'
  },
  {
    id: 5,
    title: 'AI 图像识别应用',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1581092322693-22022c314474?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '基于 Core ML 的图像识别应用，可以识别多种物体和场景。',
    tech: ['Swift', 'UIKit', 'Core ML', 'Vision Framework'],
    github: 'https://github.com/nattychao/image-recognition',
    demo: '#'
  },
  {
    id: 6,
    title: '社交分享平台',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '一个功能完整的社交分享平台，支持用户发布、点赞和评论内容。',
    tech: ['Vue 3', 'Express.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/nattychao/social-platform',
    demo: '#'
  }
])

// 分类列表
const categories = ref(['All', 'Mobile Apps', 'Web Development', 'AI/ML', 'Full Stack'])

// 当前选中的分类
const selectedCategory = ref('All')

// 过滤后的作品
const filteredItems = computed(() => {
  if (selectedCategory.value === 'All') {
    return portfolioItems.value
  }
  return portfolioItems.value.filter(item => item.category === selectedCategory.value)
})

// 切换分类
const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center overflow-hidden h-[max(calc(40vh),_320px)] md:h-[max(calc(60vh),_500px)]">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="Portfolio Background" 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/60 backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
      
      <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300">
            作品集
          </span>
        </h1>
        <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          探索我的精选项目，见证技术与创意的完美结合
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <!-- 分类标签 -->
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectCategory(category)"
            class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all"
            :class="{
              'bg-theme-600 text-white hover:bg-theme-700': selectedCategory === category,
              'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedCategory !== category
            }"
          >
            {{ category }}
          </button>
        </div>
      </div>
      
      <!-- 作品列表 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
        >
          <!-- 作品图片 -->
          <div class="relative overflow-hidden h-48 sm:h-56">
            <img 
              :src="item.image" 
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-slate-700 backdrop-blur-sm">
                {{ item.category }}
              </span>
            </div>
          </div>
          
          <!-- 作品内容 -->
          <div class="p-4 sm:p-5">
            <h3 class="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">
              {{ item.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 line-clamp-2">
              {{ item.description }}
            </p>
            
            <!-- 技术栈 -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="(tech, index) in item.tech" 
                :key="index"
                class="px-2.5 py-1 rounded-full bg-theme-100 text-theme-700 text-xs font-medium"
              >
                {{ tech }}
              </span>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex gap-3">
              <a 
                :href="item.github" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm"
              >
                <Github class="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a 
                :href="item.demo" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm"
              >
                <ExternalLink class="w-4 h-4" />
                <span>Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredItems.length === 0" class="text-center py-12 sm:py-16">
        <div class="w-20 h-20 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-4">
          <ChevronRight class="w-10 h-10 text-theme-600" />
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-2">暂无作品</h3>
        <p class="text-slate-600 max-w-md mx-auto">
          该分类下暂无作品，敬请期待更多精彩内容
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Portfolio'
}
</script>