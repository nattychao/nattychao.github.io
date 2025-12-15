<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:py-16 md:py-20">
    <!-- 页面标题 -->
    <div class="mb-12 text-center">
      <div class="inline-block p-3 bg-theme-100 rounded-full mb-4">
        <svg class="w-8 h-8 text-theme-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
          </path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
          </path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-slate-900 mb-2">设置</h1>
      <p class="text-slate-500 max-w-2xl mx-auto">管理应用的所有页面入口</p>
    </div>

    <!-- 页面列表卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- 列表项 -->
      <router-link v-for="page in pages" :key="page.path" :to="page.path"
        class="bg-white rounded-3xl shadow-sm overflow-hidden md:hover:shadow-md transition-all duration-300 transform md:hover:-translate-y-1 group">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- 图标 -->
            <div :class="getIconBgClass(page.icon)"
              class="w-12 h-12 rounded-xl flex items-center justify-center text-white md:group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="page.icon === 'home'" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                <path v-else-if="page.icon === 'about'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                </path>
                <path v-else-if="page.icon === 'ai'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z">
                </path>
                <path v-else-if="page.icon === 'blog'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z">
                </path>
                <path v-else-if="page.icon === 'contact'"
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z">
                </path>
                <path v-else-if="page.icon === 'faq'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
                </path>
                <path v-else-if="page.icon === 'github'"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z">
                </path>
                <path v-else-if="page.icon === 'info'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
                </path>
                <path v-else-if="page.icon === 'jewellery'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z">
                </path>
                <path v-else-if="page.icon === 'portfolio'"
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z">
                </path>
                <path v-else-if="page.icon === 'privacy'"
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z">
                </path>
                <path v-else-if="page.icon === 'profile'"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                </path>
                <path v-else-if="page.icon === 'projects'"
                  d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z">
                </path>
                <path v-else-if="page.icon === 'resources'"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm4-8h-2V9h2v2zm0 4h-2v-2h2v2z">
                </path>
                <path v-else-if="page.icon === 'resume'"
                  d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z">
                </path>
                <path v-else-if="page.icon === 'unsplash'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z">
                </path>
                <path v-else-if="page.icon === 'wallpapers'"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-2.35 3.02-1.56-1.88a.501.501 0 00-.78.62l2 2.5c.2.26.59.26.79 0l3.05-3.81c.2-.25.2-.65-.01-.9z">
                </path>
                <path v-else-if="page.icon === 'websites'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z">
                </path>
                <path v-else-if="page.icon === 'error'"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z">
                </path>
                <path v-else
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <!-- 页面信息 -->
            <div>
              <h3
                class="text-lg font-medium text-slate-900 md:group-hover:text-theme-600 transition-colors duration-200">
                {{ page.title }}
              </h3>
            </div>
          </div>
          <!-- 箭头 -->
          <svg class="w-5 h-5 text-slate-400 md:group-hover:text-theme-600 transition-colors duration-200" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 获取图标背景颜色类
const getIconBgClass = (icon) => {
  const colors = {
    home: 'bg-gradient-to-br from-blue-500 to-blue-600',
    about: 'bg-gradient-to-br from-purple-500 to-purple-600',
    ai: 'bg-gradient-to-br from-teal-500 to-teal-600',
    blog: 'bg-gradient-to-br from-red-500 to-red-600',
    contact: 'bg-gradient-to-br from-green-500 to-green-600',
    faq: 'bg-gradient-to-br from-amber-500 to-amber-600',
    github: 'bg-gradient-to-br from-gray-500 to-gray-600',
    info: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    jewellery: 'bg-gradient-to-br from-pink-500 to-pink-600',
    portfolio: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    privacy: 'bg-gradient-to-br from-violet-500 to-violet-600',
    profile: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    projects: 'bg-gradient-to-br from-orange-500 to-orange-600',
    resources: 'bg-gradient-to-br from-sky-500 to-sky-600',
    resume: 'bg-gradient-to-br from-lime-500 to-lime-600',
    unsplash: 'bg-gradient-to-br from-rose-500 to-rose-600',
    wallpapers: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    websites: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600',
    error: 'bg-gradient-to-br from-gray-500 to-gray-600',
  }
  return colors[icon] || 'bg-gradient-to-br from-blue-500 to-blue-600'
}

// 定义所有页面信息
const pages = ref([
  { path: '/', title: '首页', icon: 'home' },
  { path: '/about', title: '关于我们', icon: 'about' },
  { path: '/ai-bio', title: 'AI 个人简介', icon: 'ai' },
  { path: '/blog', title: '博客', icon: 'blog' },
  { path: '/contact', title: '联系我们', icon: 'contact' },
  { path: '/faq', title: '常见问题', icon: 'faq' },
  { path: '/github', title: 'GitHub', icon: 'github' },
  { path: '/inftab', title: '信息标签', icon: 'info' },
  { path: '/jewellery', title: '珠宝', icon: 'jewellery' },
  { path: '/portfolio', title: '作品集', icon: 'portfolio' },
  { path: '/privacy', title: '隐私政策', icon: 'privacy' },
  { path: '/profile', title: '个人中心', icon: 'profile' },
  { path: '/projects', title: '项目', icon: 'projects' },
  { path: '/resources', title: '资源', icon: 'resources' },
  { path: '/resume', title: '简历', icon: 'resume' },
  { path: '/unsplash', title: 'Unsplash', icon: 'unsplash' },
  { path: '/wallpapers', title: '壁纸', icon: 'wallpapers' },
  { path: '/websites', title: '网站', icon: 'websites' },
  { path: '/404', title: '404错误页面', icon: 'error' },
])
</script>

<script>
export default {
  name: 'Settings'
}
</script>
