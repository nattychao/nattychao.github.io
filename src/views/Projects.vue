<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { projects } from '@/data/projects.js'
import { useToast } from '@/composables/useToast.js'

// 使用自定义Toast
const { showToast } = useToast()

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

// Method to open project link or show toast
const openProjectLink = (url) => {
  if (url) {
    window.open(url, '_blank')
  } else {
    // Show toast notification using custom toast component with info style
    showToast('功能开发中', 'info')
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20" :style="{ paddingTop }">
    <div class="mb-8 sm:mb-10 md:mb-12">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">所有项目</h1>
      <p class="text-sm sm:text-base text-slate-600">我开发的一些项目作品。</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      <div v-for="project in projects" :key="project.title" class="group">
        <div class="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4 aspect-video">
          <img :src="project.image" :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span
              class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-sm sm:text-base"
              @click="openProjectLink(project.href)">
              查看详情
            </span>
          </div>
        </div>
        <h3
          class="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-indigo-600 transition-colors">
          {{ project.title }}
        </h3>
        <p class="text-sm sm:text-base text-slate-600 mb-2 sm:mb-3 line-clamp-2">{{ project.description }}</p>
        <div class="flex flex-wrap gap-1.5 sm:gap-2">
          <span v-for="tag in project.tags" :key="tag"
            class="text-xs font-medium px-2 sm:px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
