<script setup>
import { Shield, FileText, Info, Lock, Users, Share2, Clock, Link, Mail } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center overflow-hidden h-[max(calc(40vh),_320px)] md:h-[max(calc(60vh),_500px)]">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1625723347539-de4c09b21b83?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="Privacy Background" 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/60 backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
      
      <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300">
            隐私政策
          </span>
        </h1>
        <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          了解我们如何收集、使用和保护您的个人信息
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <!-- 政策简介 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-theme-100 flex items-center justify-center">
            <Info class="w-5 h-5 text-theme-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">引言</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            感谢您访问我的个人网站。保护您的隐私对我来说非常重要。本隐私政策旨在说明我如何收集、使用、存储和保护您在访问我的网站时提供的个人信息。
          </p>
          <p class="text-slate-600 leading-relaxed mt-4">
            请您仔细阅读本隐私政策，了解我的隐私保护实践。如果您对本隐私政策有任何疑问或建议，请随时通过联系页面与我取得联系。
          </p>
        </div>
      </div>
      
      <!-- 收集的信息 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Users class="w-5 h-5 text-blue-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">收集的信息</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            我可能会收集以下类型的个人信息：
          </p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>联系信息：当您通过联系表单发送消息时，我会收集您的姓名、电子邮件地址和留言内容。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>使用数据：我可能会收集有关您如何使用网站的信息，例如访问的页面、停留时间、使用的浏览器和设备类型等。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>技术信息：包括您的IP地址、浏览器类型和版本、操作系统、引荐来源等。</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 信息的使用 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <FileText class="w-5 h-5 text-purple-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">信息的使用</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            我收集的信息将用于以下目的：
          </p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>回复您的咨询：使用您提供的联系信息回复您的留言和问题。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>改进网站：分析使用数据，了解用户如何与网站互动，以便改进网站的内容和功能。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>维护网站安全：监测网站使用情况，防止欺诈和滥用行为。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>遵守法律义务：在法律要求时披露个人信息。</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 信息的共享 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Share2 class="w-5 h-5 text-green-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">信息的共享</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            我非常重视您的隐私，不会向第三方出售或出租您的个人信息。但在以下情况下，我可能会共享您的信息：
          </p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>服务提供商：为了提供网站服务，我可能会与一些第三方服务提供商共享必要的信息，例如网站托管、分析工具和邮件服务提供商。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>法律要求：当法律要求我披露信息时，我会遵守相关法律法规。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>保护权利：为了保护我的权利、财产或安全，以及其他用户的权利、财产或安全。</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 数据安全 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Lock class="w-5 h-5 text-red-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">数据安全</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            我采取适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用、披露、修改或销毁。这些措施包括：
          </p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>使用安全的服务器和加密技术保护数据传输。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>定期更新网站的安全措施。</span>
            </li>
            <li class="flex items-start gap-2 text-slate-600">
              <span class="text-theme-600 mt-1">•</span>
              <span>限制访问个人信息的人员范围。</span>
            </li>
          </ul>
          <p class="text-slate-600 leading-relaxed mt-4">
            尽管我采取了这些安全措施，但请注意，互联网上的信息传输并不完全安全，我无法保证您的信息在传输过程中绝对安全。
          </p>
        </div>
      </div>
      
      <!-- Cookie的使用 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Shield class="w-5 h-5 text-orange-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Cookie的使用</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            本网站可能使用Cookie来提高您的浏览体验。Cookie是一种小型文本文件，由网站服务器存储在您的浏览器中，用于记录您的偏好和使用习惯。
          </p>
          <p class="text-slate-600 leading-relaxed mt-4">
            您可以在浏览器设置中禁用Cookie，但这可能会影响网站的某些功能。
          </p>
        </div>
      </div>
      
      <!-- 第三方链接 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Link class="w-5 h-5 text-indigo-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">第三方链接</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            本网站可能包含指向第三方网站的链接。这些第三方网站的隐私政策由其各自的运营商负责，我不对这些网站的隐私保护实践负责。建议您在访问这些网站时仔细阅读其隐私政策。
          </p>
        </div>
      </div>
      
      <!-- 政策更新 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <Clock class="w-5 h-5 text-teal-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">隐私政策的更新</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            我可能会不时更新本隐私政策，以反映网站服务的变化或法律法规的要求。更新后的隐私政策将在本页面发布，并注明更新日期。
          </p>
          <p class="text-slate-600 leading-relaxed mt-4">
            建议您定期查看本隐私政策，了解最新的隐私保护实践。您继续使用本网站即表示您同意更新后的隐私政策。
          </p>
        </div>
      </div>
      
      <!-- 联系信息 -->
      <div class="mb-8 sm:mb-12">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-theme-100 flex items-center justify-center">
            <Mail class="w-5 h-5 text-theme-600" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">联系信息</h2>
        </div>
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-600 leading-relaxed">
            如果您对本隐私政策有任何疑问或建议，或者希望访问、修改或删除您的个人信息，请通过以下方式与我联系：
          </p>
          <div class="mt-4 p-4 bg-theme-100 rounded-lg border border-theme-200">
            <div class="flex items-center gap-2 mb-2">
              <Mail class="w-5 h-5 text-theme-600" />
              <span class="font-medium text-theme-600">电子邮件：</span>
            </div>
            <p class="text-slate-600">contact@example.com</p>
            <div class="mt-4">
              <a 
                href="/contact"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm font-medium"
              >
                访问联系页面
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 最后更新时间 -->
      <div class="p-4 sm:p-6 rounded-xl bg-slate-100 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <Clock class="w-5 h-5 text-slate-600" />
          <span class="font-medium text-slate-900">最后更新：</span>
        </div>
        <p class="text-slate-600">2025年1月1日</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy'
}
</script>