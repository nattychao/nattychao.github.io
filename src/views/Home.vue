<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-20 pb-20">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto"
             v-motion
             :initial="{ opacity: 0, y: 50 }"
             :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        >
          <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Building <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Digital Dreams</span>
          </h1>
          <p class="text-xl text-slate-600 mb-10 leading-relaxed">
            Hi, I'm Natty. I'm a Full Stack Developer passionate about creating beautiful, functional, and user-centric web experiences.
          </p>
          <div class="flex justify-center gap-4">
            <router-link to="/resume" class="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2">
              View Resume <ArrowRight class="w-4 h-4" />
            </router-link>
            <router-link to="/blog" class="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all">
              Read Blog
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Background decoration -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-3xl animate-blob"></div>
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>

    <!-- Recent Posts Preview (Placeholder) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-8">
        <h2 class="text-3xl font-bold text-slate-900">Recent Thoughts</h2>
        <router-link to="/blog" class="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
          View all <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Placeholder Cards -->
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="text-sm text-indigo-600 font-medium mb-2">Technology</div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">The Future of Web Development</h3>
          <p class="text-slate-600 mb-4 line-clamp-3">
            Exploring the latest trends in frontend frameworks and how they shape the way we build applications today.
          </p>
          <div class="text-sm text-slate-400">Nov 27, 2025</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>
