<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { projects } from '@/data/projects.js'
import { useToast } from '@/composables/useToast.js'

// 使用toast组件
const { showToast } = useToast()

// 限制首页最多显示6个项目
const featuredProjects = projects.slice(0, 6)

// Method to open project link or show toast
const openProjectLink = (url) => {
  if (url) {
    // 外部链接在新标签页打开
    if (!url.startsWith('/')) {
      window.open(url, '_blank')
    }
    // 内部链接通过RouterLink处理，不需要额外操作
  } else {
    // Show toast notification with info style
    showToast('功能开发中', 'info')
  }
}
</script>

<template>
  <!-- Featured Projects -->
  <section class="py-10 sm:py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-start mb-6 sm:mb-10 md:mb-12">
        <div>
          <h2 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">精选项目</h2>
          <p class="text-sm sm:text-base text-slate-600">我最近的一些作品。</p>
        </div>
        <RouterLink to="/projects"
          class="flex items-center text-theme-600 font-semibold md:hover:text-theme-700 transition-colors md:hidden text-sm sm:text-base mt-1">
          查看所有项目
          <ArrowRight class="w-4 h-4 ml-1" />
        </RouterLink>
      </div>

      <!-- Mobile: Horizontal Scroll -->
      <div class="flex overflow-x-auto gap-4 pb-0 hide-scrollbar md:hidden -mx-4 px-2">
        <div v-for="project in featuredProjects" :key="project.title" class="group flex-shrink-0 w-[80vw] mx-1">
          <div class="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4 aspect-video bg-slate-100">
            <img :src="project.image" :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
            <div
              class="absolute inset-0 bg-black/50 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <!-- 内部链接使用RouterLink，外部链接使用span -->
              <RouterLink v-if="project.href && project.href.startsWith('/')" :to="project.href"
                class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer md:hover:bg-white/20 transition-colors text-sm sm:text-base">
                查看详情
              </RouterLink>
              <span v-else
                class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-sm sm:text-base"
                @click="openProjectLink(project.href)">
                查看详情
              </span>
            </div>
          </div>
          <!-- 项目标题也添加链接 -->
          <h3
            class="text-lg sm:text-xl font-bold text-slate-900 mb-2 md:group-hover:text-theme-600 transition-colors line-clamp-1">
            <RouterLink v-if="project.href && project.href.startsWith('/')" :to="project.href" class="block">
              {{ project.title }}
            </RouterLink>
            <span v-else>{{ project.title }}</span>
          </h3>
          <p class="text-sm sm:text-base text-slate-600 mb-3 line-clamp-1">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-1.5 sm:gap-2 overflow-hidden">
            <div class="flex flex-wrap gap-1.5 sm:gap-2 whitespace-nowrap">
              <span v-for="tag in project.tags" :key="tag"
                class="text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-100 text-slate-600 rounded-md">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- PC: Grid Layout -->
      <div class="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="project in featuredProjects" :key="project.title" class="group">
          <div class="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4 aspect-video bg-slate-100">
            <img :src="project.image" :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <!-- 内部链接使用RouterLink，外部链接使用span -->
              <RouterLink v-if="project.href && project.href.startsWith('/')" :to="project.href"
                class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-sm sm:text-base">
                查看详情
              </RouterLink>
              <span v-else
                class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-sm sm:text-base"
                @click="openProjectLink(project.href)">
                查看详情
              </span>
            </div>
          </div>
          <!-- 项目标题也添加链接 -->
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-theme-600 transition-colors">
            <RouterLink v-if="project.href && project.href.startsWith('/')" :to="project.href" class="block">
              {{ project.title }}
            </RouterLink>
            <span v-else>{{ project.title }}</span>
          </h3>
          <p class="text-sm sm:text-base text-slate-600 mb-3 line-clamp-2">{{ project.description }}</p>
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            <span v-for="tag in project.tags" :key="tag"
              class="text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-100 text-slate-600 rounded-md">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- PC: View All Projects Button at Bottom -->
      <div class="mt-6 sm:mt-8 text-center md:block hidden">
        <RouterLink to="/projects"
          class="inline-flex items-center text-theme-600 font-semibold md:hover:text-theme-700 transition-colors">
          查看所有项目
          <ArrowRight class="w-4 h-4 ml-1" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
