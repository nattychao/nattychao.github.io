<script setup>
import { Database, Layout, Smartphone, Globe } from 'lucide-vue-next'

const skills = [
  { name: '前端开发', icon: Layout, items: ['Vue.js', 'React', 'Tailwind CSS', 'TypeScript'] },
  { name: '移动端开发', icon: Smartphone, items: ['Objective-C', 'Swift', 'React Native', 'Flutter'] },
  // { name: '后端开发', icon: Server, items: ['Node.js', 'Python', 'Go', 'PostgreSQL'] },
  { name: '开发工具', icon: Database, items: ['TRAE', 'Antigravity', 'Cursor', 'VS Code'] }
]
</script>

<template>
  <!-- Skills Section -->
  <section class="py-12 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 to-theme-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left sm:text-center md:text-center lg:text-center">
        <h2 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">技术专长</h2>
        <p
          class="text-sm sm:text-base text-slate-600 max-w-2xl px-0 sm:px-4 text-left sm:text-center md:text-center lg:text-center mx-auto sm:mx-auto">
          我用于构建可扩展和健壮应用的工具箱。</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div v-for="(skill, index) in skills" :key="skill.name"
          class="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-slate-100 md:hover:shadow-2xl transition-all duration-500 md:hover:-translate-y-2 overflow-hidden"
          v-motion :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100, ease: 'easeOut' } }">
          <!-- Animated border gradient effect on hover -->
          <div
            class="absolute inset-0 rounded-xl sm:rounded-2xl p-[2px] bg-gradient-to-r from-theme-500 via-purple-500 to-pink-500 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <div class="w-full h-full bg-white rounded-xl sm:rounded-2xl"></div>
          </div>

          <!-- Rotating gradient border animation -->
          <div
            class="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <div
              class="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-theme-500 via-purple-500 to-pink-500 opacity-0 md:group-hover:opacity-75 md:group-hover:animate-spin-slow transition-opacity duration-500">
            </div>
            <div class="absolute inset-[2px] bg-white rounded-xl sm:rounded-2xl"></div>
          </div>

          <!-- Glow effect -->
          <div
            class="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-theme-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 md:group-hover:opacity-100 transition-all duration-500 -z-10 md:group-hover:animate-pulse">
          </div>

          <!-- Moving shine effect -->
          <div
            class="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <div
              class="absolute h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 md:group-hover:opacity-100 md:group-hover:animate-shine transition-opacity duration-500">
            </div>
          </div>

          <!-- Decorative background element -->
          <div
            class="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-theme-50 to-purple-50 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 opacity-70 md:group-hover:scale-150 transition-transform duration-700">
          </div>

          <div class="relative z-10">
            <!-- Icon with gradient background -->
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-theme-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg md:group-hover:shadow-xl transition-all duration-300 md:group-hover:scale-110">
              <component :is="skill.icon" class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>

            <!-- Title with gradient text -->
            <h3
              class="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-3 sm:mb-4">
              {{ skill.name }}</h3>

            <!-- Skills list with custom styling -->
            <ul class="space-y-2 sm:space-y-3">
              <li v-for="(item, itemIndex) in skill.items" :key="item"
                class="flex items-center text-slate-700 group/item text-sm sm:text-base" v-motion
                :initial="{ opacity: 0, x: -20 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 300, delay: (index * 100) + (itemIndex * 50) + 200, ease: 'easeOut' } }">
                <div
                  class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-theme-400 to-purple-500 rounded-full mr-2 sm:mr-3 md:group-hover/item:scale-150 transition-transform duration-200">
                </div>
                <span class="font-medium">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom animation for slow rotation */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Custom animation for shine effect */
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(300%);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-shine {
  animation: shine 2s ease-in-out infinite;
}
</style>
