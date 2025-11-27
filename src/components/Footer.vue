<script setup>
import { Phone, MessageCircle, Mail, Github, Twitter, Linkedin } from 'lucide-vue-next'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white border-t border-slate-100 pt-16 pb-8 mt-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-3 gap-12 mb-12">
        <!-- Brand -->
        <div class="text-center md:text-left">
          <h3 class="text-2xl font-bold text-slate-900 mb-4">NattyChao</h3>
          <p class="text-slate-600 leading-relaxed">
            打造有意义的数字体验。让我们一起创造一些令人惊叹的东西。
          </p>
        </div>

        <!-- Contact Info -->
        <div class="text-center md:text-left">
          <h4 class="text-lg font-bold text-slate-900 mb-4">联系我</h4>
          <ul class="space-y-3 text-slate-600">
            <li class="flex items-center justify-center md:justify-start gap-2">
              <Phone class="w-4 h-4 text-indigo-600" />
              <span>+86 176 8187 0768</span>
            </li>
            <li class="flex items-center justify-center md:justify-start gap-2">
              <MessageCircle class="w-4 h-4 text-indigo-600" />
              <span>WeChat: nattychao</span>
            </li>
            <li class="flex items-center justify-center md:justify-start gap-2">
              <Mail class="w-4 h-4 text-indigo-600" />
              <a href="mailto:nattychaoo@gmail.com" class="hover:text-indigo-600 transition-colors">nattychaoo@gmail.com</a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="text-center md:text-left">
          <h4 class="text-lg font-bold text-slate-900 mb-4">关注我</h4>
          <div class="flex justify-center md:justify-start gap-4">
            <a href="https://github.com/nattychao" target="_blank" class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">
              <Github class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-400 hover:text-white transition-all">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
              <Linkedin class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-100 pt-8 text-center">
        <p class="text-slate-500 text-sm">
          &copy; {{ currentYear }} NattyChao. All rights reserved.
        </p>
        <p class="text-slate-400 text-xs mt-2">
          使用 Vue 3、Tailwind CSS 和❤️打造。
        </p>
      </div>
    </div>
  </footer>
</template>