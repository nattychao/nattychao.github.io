<script setup>
import { Briefcase, GraduationCap, Code, User, Mail, Github, Linkedin, Globe } from 'lucide-vue-next'

const experience = [
  {
    role: '高级前端开发工程师',
    company: '科技公司',
    period: '2022 - 至今',
    description: '领导前端团队使用 Vue 3 和 TypeScript 构建可扩展的 Web 应用。将性能提升了 40%。'
  },
  {
    role: '全栈开发工程师',
    company: '创业公司',
    period: '2020 - 2022',
    description: '使用 Node.js 和 React 开发全栈功能。实现了实时协作工具。'
  }
]

const education = [
  {
    degree: '计算机科学学士',
    school: '科技大学',
    period: '2016 - 2020'
  }
]

const skills = [
  'Vue.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Docker', 'AWS'
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
    <!-- Header -->
    <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-slate-100 mb-6 sm:mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
      <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl sm:text-3xl md:text-4xl">
        NC
      </div>
      <div class="text-center md:text-left flex-grow">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-1.5 sm:mb-2">Natty Chao</h1>
        <p class="text-base sm:text-lg md:text-xl text-indigo-600 font-medium mb-3 sm:mb-4">全栈开发工程师</p>
        <div class="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start gap-2 sm:gap-3 md:gap-4 text-slate-600 text-xs sm:text-sm md:text-base">
          <a href="mailto:contact@nattychao.com" class="flex items-center gap-1.5 sm:gap-2 hover:text-indigo-600 transition-colors">
            <Mail class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> contact@nattychao.com
          </a>
          <a href="https://github.com/nattychao" target="_blank" class="flex items-center gap-1.5 sm:gap-2 hover:text-indigo-600 transition-colors">
            <Github class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychao
          </a>
          <a href="https://linkedin.com/in/nattychao" target="_blank" class="flex items-center gap-1.5 sm:gap-2 hover:text-indigo-600 transition-colors">
            <Linkedin class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychao
          </a>
          <a href="https://nattychao.github.io" target="_blank" class="flex items-center gap-1.5 sm:gap-2 hover:text-indigo-600 transition-colors">
            <Globe class="w-3.5 h-3.5 sm:w-4 sm:h-4" /> nattychao.github.io
          </a>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-8 sm:space-y-10 md:space-y-12">
        <!-- Experience -->
        <section>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Briefcase class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            工作经历
          </h2>
          <div class="space-y-6 sm:space-y-8">
            <div v-for="(job, index) in experience" :key="index" class="relative pl-6 sm:pl-8 border-l-2 border-slate-200 last:border-0 pb-6 sm:pb-8 last:pb-0">
              <div class="absolute -left-[7px] sm:-left-[9px] top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-indigo-600"></div>
              <h3 class="text-lg sm:text-xl font-bold text-slate-900">{{ job.role }}</h3>
              <div class="text-indigo-600 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">{{ job.company }} • {{ job.period }}</div>
              <p class="text-slate-600 text-sm sm:text-base">{{ job.description }}</p>
            </div>
          </div>
        </section>

        <!-- Projects (Placeholder) -->
        <section>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-100 rounded-lg text-purple-600">
              <Code class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            最近项目
          </h2>
          <div class="grid gap-4 sm:gap-6">
            <div class="bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-1.5 sm:mb-2 text-base sm:text-lg">电商平台</h3>
              <p class="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">使用 Vue 3 和 Node.js 构建的功能齐全的购物平台。</p>
              <div class="flex gap-1.5 sm:gap-2">
                <span class="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Vue.js</span>
                <span class="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Node.js</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8 sm:space-y-10 md:space-y-12">
        <!-- Skills -->
        <section>
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <User class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" /> 技能
          </h2>
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            <span v-for="skill in skills" :key="skill" class="px-2 sm:px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs sm:text-sm font-medium">
              {{ skill }}
            </span>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <GraduationCap class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" /> 教育背景
          </h2>
          <div v-for="(edu, index) in education" :key="index" class="mb-3 sm:mb-4">
            <h3 class="font-bold text-slate-900 text-sm sm:text-base">{{ edu.school }}</h3>
            <div class="text-slate-600 text-xs sm:text-sm">{{ edu.degree }}</div>
            <div class="text-slate-400 text-xs sm:text-sm">{{ edu.period }}</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>