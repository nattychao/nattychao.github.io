<script setup>
import { Home, ArrowLeft, Search, Mail, MapPin, MessageSquare } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section class="relative flex flex-col items-center justify-center overflow-hidden h-[max(calc(70vh),_500px)]">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1536304929831-ee1ca500f51c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="404 Background" 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/70 backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
      
      <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
        <!-- 404数字 -->
        <div class="mb-4 sm:mb-6">
          <h1 class="text-9xl sm:text-[12rem] md:text-[15rem] font-bold text-white/10 leading-none">
            404
          </h1>
        </div>
        
        <!-- 错误信息 -->
        <div class="mb-6 sm:mb-8">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            页面不存在
          </h2>
          <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            抱歉，您访问的页面可能已被删除、移动或输入了错误的URL
          </p>
        </div>
        
        <!-- 主要操作按钮 -->
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a 
            href="/"
            class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm sm:text-base font-medium shadow-lg"
          >
            <Home class="w-5 h-5" />
            返回首页
          </a>
          <a 
            href="/contact"
            class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all text-sm sm:text-base font-medium border border-white/30"
          >
            <Mail class="w-5 h-5" />
            联系我
          </a>
        </div>
      </div>
    </section>

    <!-- Additional Navigation -->
    <section class="py-8 sm:py-12 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
          您可以尝试访问这些页面
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <!-- 首页 -->
          <a 
            href="/"
            class="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all p-4 sm:p-5 text-center"
          >
            <div class="w-12 h-12 rounded-full bg-theme-100 flex items-center justify-center mx-auto mb-3">
              <Home class="w-6 h-6 text-theme-600" />
            </div>
            <h4 class="font-semibold text-slate-900 mb-1">首页</h4>
            <p class="text-slate-600 text-sm">返回网站首页</p>
          </a>
          
          <!-- 关于我 -->
          <a 
            href="/about"
            class="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all p-4 sm:p-5 text-center"
          >
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <MapPin class="w-6 h-6 text-blue-600" />
            </div>
            <h4 class="font-semibold text-slate-900 mb-1">关于我</h4>
            <p class="text-slate-600 text-sm">了解我的背景和经历</p>
          </a>
          
          <!-- 作品展示 -->
          <a 
            href="/portfolio"
            class="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all p-4 sm:p-5 text-center"
          >
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <MessageSquare class="w-6 h-6 text-purple-600" />
            </div>
            <h4 class="font-semibold text-slate-900 mb-1">作品展示</h4>
            <p class="text-slate-600 text-sm">查看我的项目作品</p>
          </a>
          
          <!-- 资源页面 -->
          <a 
            href="/resources"
            class="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all p-4 sm:p-5 text-center"
          >
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Search class="w-6 h-6 text-green-600" />
            </div>
            <h4 class="font-semibold text-slate-900 mb-1">资源页面</h4>
            <p class="text-slate-600 text-sm">浏览技术资源</p>
          </a>
        </div>
      </div>
    </section>
    
    <!-- 额外信息 -->
    <section class="py-8 sm:py-12 bg-slate-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6">
          <div class="flex flex-col md:flex-row items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-theme-100 flex items-center justify-center flex-shrink-0">
              <Search class="w-7 h-7 text-theme-600" />
            </div>
            <div class="text-center md:text-left">
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">找不到您需要的内容？</h3>
              <p class="text-slate-600 mb-4">
                如果您有任何疑问或需要帮助，请随时与我联系
              </p>
              <div class="flex flex-wrap justify-center md:justify-start gap-3">
                <a 
                  href="/contact"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm font-medium"
                >
                  <Mail class="w-4 h-4" />
                  发送邮件
                </a>
                <a 
                  href="/faq"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-sm font-medium"
                >
                  <MessageSquare class="w-4 h-4" />
                  常见问题
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>