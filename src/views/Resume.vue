<script setup>
import { Briefcase, GraduationCap, Code, User, Mail, Github, Linkedin, Globe } from 'lucide-vue-next'

const experience = [
  {
    role: 'Senior Frontend Developer',
    company: 'Tech Corp',
    period: '2022 - Present',
    description: 'Leading the frontend team in building scalable web applications using Vue 3 and TypeScript. Improved performance by 40%.'
  },
  {
    role: 'Full Stack Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Developed full-stack features using Node.js and React. Implemented real-time collaboration tools.'
  }
]

const education = [
  {
    degree: 'B.S. Computer Science',
    school: 'University of Technology',
    period: '2016 - 2020'
  }
]

const skills = [
  'Vue.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Docker', 'AWS'
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <!-- Header -->
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-8">
      <div class="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-4xl">
        NC
      </div>
      <div class="text-center md:text-left flex-grow">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">Natty Chao</h1>
        <p class="text-xl text-indigo-600 font-medium mb-4">Full Stack Developer</p>
        <div class="flex flex-wrap justify-center md:justify-start gap-4 text-slate-600">
          <a href="mailto:contact@nattychao.com" class="flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <Mail class="w-4 h-4" /> contact@nattychao.com
          </a>
          <a href="https://github.com/nattychao" target="_blank" class="flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <Github class="w-4 h-4" /> nattychao
          </a>
          <a href="https://linkedin.com/in/nattychao" target="_blank" class="flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <Linkedin class="w-4 h-4" /> nattychao
          </a>
          <a href="https://nattychao.github.io" target="_blank" class="flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <Globe class="w-4 h-4" /> nattychao.github.io
          </a>
        </div>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-12">
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-12">
        <!-- Experience -->
        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div class="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Briefcase class="w-6 h-6" />
            </div>
            Experience
          </h2>
          <div class="space-y-8">
            <div v-for="(job, index) in experience" :key="index" class="relative pl-8 border-l-2 border-slate-200 last:border-0 pb-8 last:pb-0">
              <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-600"></div>
              <h3 class="text-xl font-bold text-slate-900">{{ job.role }}</h3>
              <div class="text-indigo-600 font-medium mb-2">{{ job.company }} • {{ job.period }}</div>
              <p class="text-slate-600">{{ job.description }}</p>
            </div>
          </div>
        </section>

        <!-- Projects (Placeholder) -->
        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Code class="w-6 h-6" />
            </div>
            Recent Projects
          </h2>
          <div class="grid gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-2">E-Commerce Platform</h3>
              <p class="text-slate-600 text-sm mb-4">A full-featured shopping platform built with Vue 3 and Node.js.</p>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Vue.js</span>
                <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Node.js</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-12">
        <!-- Skills -->
        <section>
          <h2 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User class="w-5 h-5 text-indigo-600" /> Skills
          </h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in skills" :key="skill" class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
              {{ skill }}
            </span>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <GraduationCap class="w-5 h-5 text-indigo-600" /> Education
          </h2>
          <div v-for="(edu, index) in education" :key="index" class="mb-4">
            <h3 class="font-bold text-slate-900">{{ edu.school }}</h3>
            <div class="text-slate-600 text-sm">{{ edu.degree }}</div>
            <div class="text-slate-400 text-sm">{{ edu.period }}</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
