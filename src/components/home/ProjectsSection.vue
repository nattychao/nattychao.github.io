<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { projects } from '@/data/projects.js'

// 限制首页最多显示6个项目
const featuredProjects = projects.slice(0, 6)

// Method to open project link or show toast
const openProjectLink = (url) => {
  if (url) {
    window.open(url, '_blank')
  } else {
    // Show toast notification
    showToast('功能开发中')
  }
}

// Simple toast notification function
const showToast = (message) => {
  // Create toast element if it doesn't exist
  let toast = document.getElementById('toast-notification')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'toast-notification'
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-full transition-transform duration-300 z-50'
    document.body.appendChild(toast)
  }
  
  // Set message and show toast
  toast.textContent = message
  toast.style.transform = 'translateY(0)'
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateY(100%)'
  }, 3000)
}
</script>

<template>
  <!-- Featured Projects -->
  <section class="py-12 sm:py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-8 sm:mb-10 md:mb-12">
        <div>
          <h2 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">精选项目</h2>
          <p class="text-sm sm:text-base text-slate-600">我最近的一些作品。</p>
        </div>
        <RouterLink to="/projects" class="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
          查看所有项目 <ArrowRight class="w-4 h-4 ml-1" />
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div v-for="project in featuredProjects" :key="project.title" class="group">
          <div class="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4 aspect-video">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span 
                class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-sm sm:text-base"
                @click="openProjectLink(project.href)"
              >
                查看详情
              </span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{{ project.title }}</h3>
          <p class="text-sm sm:text-base text-slate-600 mb-3 line-clamp-2">{{ project.description }}</p>
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            <span v-for="tag in project.tags" :key="tag" class="text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-100 text-slate-600 rounded-md">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="mt-6 sm:mt-8 text-center md:hidden">
        <RouterLink to="/projects" class="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
          查看所有项目 <ArrowRight class="w-4 h-4 ml-1" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>