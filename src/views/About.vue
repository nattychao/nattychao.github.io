<script setup>
import { ref } from 'vue'
import { Calendar, Book, Code, Camera, Mountain, Music, Heart, Lightbulb, ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center overflow-hidden h-[max(calc(40vh),_320px)] md:h-[max(calc(60vh),_500px)]">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="About Me Background" 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/60 backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
      
      <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300">
            关于我
          </span>
        </h1>
        <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          用心创造，追求卓越
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <!-- 个人简介 -->
      <section class="mb-12 sm:mb-16">
        <div class="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
          <div class="flex items-center gap-4 sm:gap-6 mb-6">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-theme-100">
              <img src="https://avatars.githubusercontent.com/u/26376013?s=4000&u=0de45a7006d3bcded69f813ba870dceaf9ccf870&v=4" 
                   alt="Natty Chao" 
                   class="w-full h-full object-cover" />
            </div>
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Natty Chao</h2>
              <p class="text-theme-600 font-medium">高级iOS开发工程师</p>
            </div>
          </div>
          
          <div class="prose prose-slate max-w-none">
            <p class="text-slate-600 leading-relaxed">
              我是一名拥有6年经验的iOS开发工程师，专注于创建高性能、用户友好的移动应用。从大学时代接触编程开始，我就被技术创造的无限可能所吸引，特别是移动互联网领域，它让技术能够直接影响和改善人们的生活。
            </p>
            <p class="text-slate-600 leading-relaxed mt-4">
              工作中，我追求代码的优雅与可维护性，注重用户体验的每一个细节。生活里，我喜欢探索新事物，用不同的视角观察世界，这些经历常常为我的技术创新提供灵感。
            </p>
          </div>
        </div>
      </section>

      <!-- 个人成长历程 -->
      <section class="mb-12 sm:mb-16">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2">
          <Calendar class="w-5 h-5 text-theme-600" />
          个人成长历程
        </h2>
        
        <div class="relative">
          <!-- 时间线轴线 -->
          <div class="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-theme-200 transform -translate-x-1/2 hidden sm:block"></div>
          
          <!-- 时间线条目 -->
          <div class="space-y-8">
            <!-- 2019 - 毕业 -->
            <div class="relative sm:flex sm:items-center sm:gap-8">
              <div class="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-theme-600 border-4 border-white shadow-md transform -translate-x-1/2 z-10"></div>
              <div class="sm:w-1/2 sm:pr-12">
                <div class="text-sm font-medium text-theme-600 mb-1">2015 - 2019</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">科技大学 · 计算机科学与技术</h3>
                <p class="text-slate-600 text-sm">本科期间主修计算机科学，开始接触iOS开发并加入计算机协会，担任会长职务。</p>
              </div>
              <div class="hidden sm:block sm:w-1/2 sm:pl-12"></div>
            </div>
            
            <!-- 2019 - 入职 -->
            <div class="relative sm:flex sm:items-center sm:gap-8">
              <div class="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-theme-600 border-4 border-white shadow-md transform -translate-x-1/2 z-10"></div>
              <div class="hidden sm:block sm:w-1/2 sm:pr-12"></div>
              <div class="sm:w-1/2 sm:pl-12">
                <div class="text-sm font-medium text-theme-600 mb-1">2019 - 2021</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">互联网公司 · iOS开发工程师</h3>
                <p class="text-slate-600 text-sm">参与多个iOS应用开发项目，从初级工程师成长为核心开发人员，负责核心功能模块的设计与实现。</p>
              </div>
            </div>
            
            <!-- 2021 - 晋升 -->
            <div class="relative sm:flex sm:items-center sm:gap-8">
              <div class="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-theme-600 border-4 border-white shadow-md transform -translate-x-1/2 z-10"></div>
              <div class="sm:w-1/2 sm:pr-12">
                <div class="text-sm font-medium text-theme-600 mb-1">2021 - 2023</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">科技公司 · 高级iOS开发工程师</h3>
                <p class="text-slate-600 text-sm">负责公司核心产品的架构设计与性能优化，带领团队完成多个重要项目，推动技术栈升级。</p>
              </div>
              <div class="hidden sm:block sm:w-1/2 sm:pl-12"></div>
            </div>
            
            <!-- 2023 - 至今 -->
            <div class="relative sm:flex sm:items-center sm:gap-8">
              <div class="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-theme-600 border-4 border-white shadow-md transform -translate-x-1/2 z-10"></div>
              <div class="hidden sm:block sm:w-1/2 sm:pr-12"></div>
              <div class="sm:w-1/2 sm:pl-12">
                <div class="text-sm font-medium text-theme-600 mb-1">2023 - 至今</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">创新科技 · 资深iOS开发工程师</h3>
                <p class="text-slate-600 text-sm">专注于前沿技术研究与应用，推动AI在移动应用中的落地，探索SwiftUI和跨平台开发的最佳实践。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 价值观与理念 -->
      <section class="mb-12 sm:mb-16">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2">
          <Heart class="w-5 h-5 text-theme-600" />
          价值观与理念
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div class="bg-white rounded-xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-lg bg-theme-100 flex items-center justify-center mb-4">
              <Lightbulb class="w-6 h-6 text-theme-600" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">持续创新</h3>
            <p class="text-slate-600 text-sm">保持好奇心，不断探索新技术和新方法，用创新思维解决问题。</p>
          </div>
          
          <div class="bg-white rounded-xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-lg bg-theme-100 flex items-center justify-center mb-4">
              <Code class="w-6 h-6 text-theme-600" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">卓越品质</h3>
            <p class="text-slate-600 text-sm">追求代码的优雅与可维护性，注重每一个细节，交付高质量的产品。</p>
          </div>
          
          <div class="bg-white rounded-xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform">
            <div class="w-12 h-12 rounded-lg bg-theme-100 flex items-center justify-center mb-4">
              <Book class="w-6 h-6 text-theme-600" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">终身学习</h3>
            <p class="text-slate-600 text-sm">技术发展日新月异，保持学习的热情，不断提升自己的能力和认知。</p>
          </div>
        </div>
      </section>

      <!-- 兴趣爱好 -->
      <section class="mb-12 sm:mb-16">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2">
          <Music class="w-5 h-5 text-theme-600" />
          兴趣爱好
        </h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-12 h-12 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-3">
              <Camera class="w-6 h-6 text-theme-600" />
            </div>
            <p class="text-slate-900 font-medium text-sm">摄影</p>
          </div>
          
          <div class="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-12 h-12 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-3">
              <Mountain class="w-6 h-6 text-theme-600" />
            </div>
            <p class="text-slate-900 font-medium text-sm">徒步旅行</p>
          </div>
          
          <div class="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-12 h-12 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-3">
              <Book class="w-6 h-6 text-theme-600" />
            </div>
            <p class="text-slate-900 font-medium text-sm">阅读</p>
          </div>
          
          <div class="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-12 h-12 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-3">
              <Music class="w-6 h-6 text-theme-600" />
            </div>
            <p class="text-slate-900 font-medium text-sm">音乐</p>
          </div>
        </div>
      </section>

      <!-- 个人使命/愿景 -->
      <section>
        <div class="bg-gradient-to-r from-theme-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-theme-100">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="w-20 h-20 rounded-full bg-theme-600 text-white flex items-center justify-center flex-shrink-0">
              <Lightbulb class="w-10 h-10" />
            </div>
            <div class="flex-1">
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-3">个人使命</h2>
              <blockquote class="text-slate-600 leading-relaxed italic border-l-4 border-theme-400 pl-4">
                用技术创造价值，通过创新的移动应用改善人们的生活体验，同时不断成长为一名有影响力的技术领导者，激励和帮助更多开发者实现他们的潜力。
              </blockquote>
              <div class="mt-4 flex items-center gap-2">
                <span class="text-theme-600 font-medium">— Natty Chao</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>