<script setup>
import { ref } from 'vue'
import { Database, Layout, Smartphone, Globe } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const skills = [
  { name: '前端开发', icon: Layout, items: ['Vue.js', 'React', 'Tailwind CSS', 'TypeScript'] },
  { name: '移动端开发', icon: Smartphone, items: ['Objective-C', 'Swift', 'React Native', 'Flutter'] },
  // { name: '后端开发', icon: Server, items: ['Node.js', 'Python', 'Go', 'PostgreSQL'] },
  { name: '开发工具', icon: Database, items: ['TRAE', 'Antigravity', 'Cursor', 'VS Code'] }
]

const showMarquee = false
const swiperInstance = ref(null)
const modules = [Pagination]

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}
</script>

<template>
  <!-- Skills Section -->
  <section class="pt-12 pb-6 sm:py-12 md:py-12 bg-gradient-to-br from-slate-50 to-theme-50">
    <div class="max-w-7xl mx-auto px-0 md:px-4 sm:px-6 lg:px-8">
      <div class="px-4 mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left sm:text-center md:text-center lg:text-center">
        <h2 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">技术专长</h2>
        <p
          class="text-sm sm:text-base text-slate-600 max-w-2xl px-0 sm:px-4 text-left sm:text-center md:text-center lg:text-center mx-auto sm:mx-auto">
          我用于构建可扩展和健壮应用的工具箱。</p>
      </div>

      <!-- Desktop Grid View -->
      <div class="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
              {{ skill.name }}
            </h3>

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

      <!-- Mobile Swiper View -->
      <div class="md:hidden">
        <swiper :modules="modules" :pagination="{ clickable: true }" :slidesPerView="'auto'" :spaceBetween="16"
          :slidesOffsetBefore="16" :slidesOffsetAfter="16" class="mySwiper !overflow-visible !pb-8">
          <swiper-slide v-for="(skill, index) in skills" :key="skill.name" class="!w-[75%] !h-auto group/card">
            <!-- Gradient Border Wrapper (Marquee Effect) -->
            <div
              :class="['relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-theme-200/50 bg-white', showMarquee ? 'p-[3px]' : 'border border-slate-100']">

              <!-- Rotating Conic Gradient Border -->
              <div v-if="showMarquee"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-border-flow"
                style="background: conic-gradient(from 0deg, #ec4899, #8b5cf6, #3b82f6, #10b981, #eab308, #f97316, #ec4899);">
              </div>

              <!-- Card Content Container -->
              <div
                :class="['relative h-full bg-white p-6 flex flex-col overflow-hidden', showMarquee ? 'rounded-[13px]' : 'rounded-2xl']">

                <div class="relative z-10 flex flex-col h-full">
                  <!-- Header: Floating Icon & Title -->
                  <div class="flex flex-col items-center mb-6">
                    <div class="relative mb-4 group-hover/card:scale-110 transition-transform duration-500">
                      <!-- Glow behind icon -->
                      <div
                        class="absolute inset-0 bg-gradient-to-tr from-theme-500 to-purple-500 rounded-2xl blur-lg opacity-40 animate-pulse">
                      </div>

                      <!-- Icon Container -->
                      <div
                        class="relative w-16 h-16 bg-gradient-to-br from-white to-slate-50 rounded-2xl flex items-center justify-center shadow-lg shadow-theme-500/20 border border-white/50 animate-float">
                        <component :is="skill.icon" class="w-8 h-8 text-slate-700" />
                      </div>
                    </div>

                    <h3
                      class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
                      {{ skill.name }}
                    </h3>
                    <div class="h-1 w-12 bg-gradient-to-r from-theme-400 via-purple-400 to-pink-400 rounded-full mt-3">
                    </div>
                  </div>

                  <!-- Skills Tags Cloud -->
                  <div class="flex-1">
                    <div class="flex flex-wrap justify-center gap-2.5 content-start">
                      <span v-for="(item, itemIndex) in skill.items" :key="item"
                        class="relative px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-sm font-medium text-slate-600 flex items-center shadow-sm overflow-hidden group/tag hover:border-theme-300 transition-colors duration-300">
                        <!-- Tag subtle gradient bg -->
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-theme-50 to-purple-50 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300">
                        </div>

                        <!-- Dot -->
                        <div
                          class="relative w-1.5 h-1.5 rounded-full bg-gradient-to-r from-theme-400 to-purple-400 mr-2 animate-pulse">
                        </div>
                        <span class="relative">{{ item }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
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

.animate-spin-slow-reverse {
  animation: spin-slow 8s linear infinite reverse;
}

.animate-shine {
  animation: shine 2s ease-in-out infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.animate-border-flow {
  animation: border-flow 4s linear infinite;
}

@keyframes border-flow {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background-color: #e2e8f0;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 9999px;
  margin: 0 4px !important;
}

:deep(.swiper-pagination-bullet-active) {
  width: 24px;
  background-color: #e2e8f0;
}

:deep(.swiper-pagination) {
  bottom: 0 !important;
}
</style>
