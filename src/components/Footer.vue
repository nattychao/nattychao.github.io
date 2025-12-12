<script setup>
import { Phone, MessageCircle, Mail, Github, Twitter, Linkedin, MapPin } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast.js'
import { useTabBar } from '@/composables/useTabBar.js'
const currentYear = new Date().getFullYear()
const { showToast } = useToast()
const { isTabPage } = useTabBar()

// 复制微信号
const copyWeChat = () => {
  const wechatId = 'nattychao'
  navigator.clipboard.writeText(wechatId)
    .then(() => {
      showToast('微信号已复制')
    })
    .catch(err => {
      console.error('复制失败:', err)
      // 降级方案：使用传统的复制方法
      const textArea = document.createElement('textarea')
      textArea.value = wechatId
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      showToast('微信号已复制')
    })
}

// 复制微信号（从关注我区域）
const copyWeChatFromSocial = () => {
  copyWeChat()
}
</script>

<template>
  <footer
    class="bg-gradient-to-br from-slate-50 to-white border-t border-slate-100 pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-7 md:pb-8 mt-0 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute top-0 left-0 w-full h-full opacity-5">
      <div class="absolute top-10 left-10 w-40 h-40 bg-theme-500 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
        <!-- Brand -->
        <div class="text-center md:text-left">
          <h3
            class="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 cursor-pointer md:hover:text-theme-600 transition-colors">
            <a href="/github" class="block">
              个人作品集
            </a>
          </h3>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            打造有意义的数字体验。我们一起创造一些令人惊叹的东西。
          </p>
          <div class="flex items-center justify-center md:justify-start mt-4 text-sm text-slate-500">
            <MapPin class="w-4 h-4 mr-1" />
            <a href="https://map.baidu.com/search/%E5%9C%86%E4%BC%A6%E5%A4%A7%E5%8E%A6/@13381212.069172671,3508106.77779075,19z?querytype=s&da_src=shareurl&wd=%E5%9C%86%E4%BC%A6%E5%A4%A7%E5%8E%A6&c=179&src=0&wd2=%E6%9D%AD%E5%B7%9E%E5%B8%82%E6%BB%A8%E6%B1%9F%E5%8C%BA&pn=0&sug=1&l=17&b=(13380041,3508425;13384923,3510911)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&sug_forward=622fc00d249f4223c92915e9&device_ratio=2"
              target="_blank" class="md:hover:text-theme-600 transition-colors cursor-pointer">
              中国 · 浙江 · 杭州
            </a>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="text-center md:text-left">
          <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">
            联系我
          </h4>
          <ul class="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
            <li class="flex items-center justify-center md:justify-start gap-2 group">
              <div
                class="w-8 h-8 rounded-full bg-theme-50 flex items-center justify-center md:group-hover:bg-theme-100 transition-colors">
                <Phone class="w-4 h-4 text-theme-600" />
              </div>
              <a href="tel:+8617681870768"
                class="md:hover:text-theme-600 transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-theme-600 after:transition-all after:duration-300 md:hover:after:w-full">+86
                176 8187 0768</a>
            </li>
            <li class="flex items-center justify-center md:justify-start gap-2 group cursor-pointer"
              @click="copyWeChat">
              <div
                class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center md:group-hover:bg-green-100 transition-colors">
                <MessageCircle class="w-4 h-4 text-green-600" />
              </div>
              <span
                class="md:hover:text-green-600 transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-green-600 after:transition-all after:duration-300 md:hover:after:w-full cursor-pointer">WeChat:
                nattychao</span>
            </li>
            <li class="flex items-center justify-center md:justify-start gap-2 group">
              <div
                class="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center md:group-hover:bg-red-100 transition-colors">
                <Mail class="w-4 h-4 text-red-600" />
              </div>
              <a href="mailto:nattychaoo@gmail.com"
                class="md:hover:text-red-600 transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-red-600 after:transition-all after:duration-300 md:hover:after:w-full">nattychaoo@gmail.com</a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="text-center md:text-left">
          <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">
            关注我
          </h4>
          <div class="flex justify-center md:justify-start gap-3 sm:gap-4">
            <a href="https://github.com/nattychao" target="_blank" class="group">
              <div
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 md:group-hover:bg-theme-600 md:group-hover:text-white transition-all duration-300 transform md:group-hover:scale-110">
                <Github class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </a>
            <div @click="copyWeChatFromSocial" class="group cursor-pointer">
              <div
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 md:group-hover:bg-green-500 md:group-hover:text-white transition-all duration-300 transform md:group-hover:scale-110">
                <MessageCircle class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <a href="#" class="group">
              <div
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 md:group-hover:bg-theme-400 md:group-hover:text-white transition-all duration-300 transform md:group-hover:scale-110">
                <Twitter class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </a>
            <a href="#" class="group">
              <div
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 md:group-hover:bg-theme-600 md:group-hover:text-white transition-all duration-300 transform md:group-hover:scale-110">
                <Linkedin class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-100 pt-6 sm:pt-7 md:pt-8 text-center">
        <p class="text-slate-500 text-xs sm:text-sm">
          &copy; {{ currentYear }} NattyChao. All rights reserved.
        </p>
        <p class="text-slate-400 text-xs mt-1 sm:mt-2">
          使用 Vue 3、Tailwind CSS 和 Vite 打造。
        </p>
      </div>
    </div>
    <!-- 在特定页面底部添加与Tab栏高度相同的透明区域，用来撑起页面底部间距 -->
    <div v-if="isTabPage" class="opacity-0 pointer-events-none"
      :style="{ height: 'calc(60px + var(--safe-area-inset-bottom, 0px))' }"></div>
  </footer>
</template>
