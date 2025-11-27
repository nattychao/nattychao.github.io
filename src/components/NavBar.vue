<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navLinks = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '简历', path: '/resume' },
]
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 flex items-center">
          <RouterLink to="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            NattyChao
          </RouterLink>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            class="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
            active-class="text-indigo-600"
          >
            {{ link.name }}
          </RouterLink>
          <div class="flex space-x-4 border-l pl-6 border-slate-200">
            <a href="https://github.com/nattychao" target="_blank" class="text-slate-400 hover:text-slate-800 transition-colors">
              <Github class="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/nattychao" target="_blank" class="text-slate-400 hover:text-blue-700 transition-colors">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="mailto:contact@nattychao.com" class="text-slate-400 hover:text-indigo-600 transition-colors">
              <Mail class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-slate-600 hover:text-slate-900 focus:outline-none">
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-b border-slate-100">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink 
          v-for="link in navLinks" 
          :key="link.name" 
          :to="link.path"
          class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
          active-class="text-indigo-600 bg-slate-50"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
