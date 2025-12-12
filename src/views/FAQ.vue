<script setup>
import { ref, computed } from 'vue'
import { ChevronDown, ChevronUp, HelpCircle, User, Code, Briefcase, Mail, FileText } from 'lucide-vue-next'

// FAQ分类
const faqCategories = ref([
  { id: 'all', name: '全部问题', icon: HelpCircle, color: 'bg-theme-100 text-theme-600' },
  { id: 'about', name: '关于我', icon: User, color: 'bg-blue-100 text-blue-600' },
  { id: 'tech', name: '技术问题', icon: Code, color: 'bg-purple-100 text-purple-600' },
  { id: 'work', name: '工作合作', icon: Briefcase, color: 'bg-green-100 text-green-600' },
  { id: 'contact', name: '联系咨询', icon: Mail, color: 'bg-orange-100 text-orange-600' },
  { id: 'other', name: '其他问题', icon: FileText, color: 'bg-slate-100 text-slate-600' }
])

// FAQ数据
const faqs = ref([
  // 关于我
  {
    id: 1,
    category: 'about',
    question: '你有多少年的开发经验？',
    answer: '我拥有超过5年的软件开发经验，主要专注于iOS和前端开发领域。在这段时间里，我参与了多个大小不一的项目，积累了丰富的开发经验和技术栈。'
  },
  {
    id: 2,
    category: 'about',
    question: '你的技术栈主要包括哪些？',
    answer: '我的技术栈涵盖iOS开发（Swift, SwiftUI, UIKit）、前端开发（Vue.js, React, HTML/CSS/JavaScript）、后端开发（Node.js, Python）以及数据库设计和项目管理等方面。'
  },
  {
    id: 3,
    category: 'about',
    question: '你目前在哪个公司工作？',
    answer: '我目前在一家专注于移动应用开发的科技公司担任高级iOS工程师，负责公司核心产品的开发和维护工作。'
  },
  // 技术问题
  {
    id: 4,
    category: 'tech',
    question: 'SwiftUI和UIKit的区别是什么？',
    answer: 'SwiftUI是苹果推出的声明式UI框架，语法简洁，支持跨平台开发；而UIKit是命令式UI框架，功能更强大，生态更成熟。在实际项目中，我通常会根据项目需求选择合适的框架，或者两者结合使用。'
  },
  {
    id: 5,
    category: 'tech',
    question: '你如何学习新技术？',
    answer: '我学习新技术的方式包括：阅读官方文档、参与开源项目、观看技术视频教程、参加技术会议和研讨会，以及通过实践项目来巩固所学知识。'
  },
  {
    id: 6,
    category: 'tech',
    question: '你对未来的技术发展有什么看法？',
    answer: '我认为人工智能、增强现实、区块链等技术将在未来发挥越来越重要的作用。作为开发者，我会持续关注这些领域的发展，并努力提升自己的技术能力以适应未来的挑战。'
  },
  // 工作合作
  {
    id: 7,
    category: 'work',
    question: '你是否接受自由职业项目？',
    answer: '是的，我会在业余时间接受一些有趣的自由职业项目。如果你有相关需求，可以通过联系页面的方式与我取得联系，详细讨论项目需求和合作方式。'
  },
  {
    id: 8,
    category: 'work',
    question: '你如何收费？',
    answer: '我的收费标准会根据项目的复杂度、时间周期和技术要求等因素来确定。具体的收费情况可以在项目需求明确后进行详细讨论。'
  },
  {
    id: 9,
    category: 'work',
    question: '你能提供哪些服务？',
    answer: '我可以提供iOS应用开发、前端网站开发、技术咨询、代码审查、技术培训等服务。如果你有其他方面的需求，也可以与我联系讨论。'
  },
  // 联系咨询
  {
    id: 10,
    category: 'contact',
    question: '如何与你取得联系？',
    answer: '你可以通过联系页面的表单发送消息，或者直接通过电子邮件、社交媒体等方式与我取得联系。我通常会在24小时内回复你的消息。'
  },
  {
    id: 11,
    category: 'contact',
    question: '你是否提供技术支持服务？',
    answer: '是的，我可以为我的客户提供技术支持服务。具体的支持内容和期限可以在项目合作时进行约定。'
  },
  {
    id: 12,
    category: 'contact',
    question: '你是否愿意参与技术分享或演讲？',
    answer: '是的，我非常愿意参与技术分享和演讲活动。如果你需要我在某个技术会议或活动上进行分享，可以与我联系讨论具体的主题和安排。'
  },
  // 其他问题
  {
    id: 13,
    category: 'other',
    question: '你的个人博客更新频率如何？',
    answer: '我会尽量每周更新一篇技术博客，分享我在开发过程中的经验和见解。有时候可能会因为工作繁忙而延迟更新，但我会保持稳定的更新频率。'
  },
  {
    id: 14,
    category: 'other',
    question: '你有哪些开源项目？',
    answer: '我在GitHub上维护了多个开源项目，包括iOS开发工具库、前端组件库等。你可以在我的GitHub主页上查看这些项目的详细信息。'
  },
  {
    id: 15,
    category: 'other',
    question: '你如何平衡工作和生活？',
    answer: '我认为工作和生活的平衡非常重要。在工作时间，我会专注于工作；在业余时间，我会尽量减少工作相关的事情，多陪伴家人和朋友，参加一些自己感兴趣的活动。'
  }
])

// 当前选中的分类
const selectedCategory = ref('all')

// 展开的FAQ ID
const expandedIds = ref([])

// 过滤后的FAQ
const filteredFaqs = computed(() => {
  if (selectedCategory.value === 'all') {
    return faqs.value
  }
  return faqs.value.filter(faq => faq.category === selectedCategory.value)
})

// 切换FAQ展开状态
const toggleFaq = (id) => {
  const index = expandedIds.value.indexOf(id)
  if (index === -1) {
    expandedIds.value.push(id)
  } else {
    expandedIds.value.splice(index, 1)
  }
}

// 检查FAQ是否展开
const isExpanded = (id) => {
  return expandedIds.value.includes(id)
}

// 获取分类信息
const getCategoryInfo = (categoryId) => {
  return faqCategories.value.find(cat => cat.id === categoryId) || {}
}
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section class="relative flex items-center justify-center overflow-hidden h-[max(calc(40vh),_320px)] md:h-[max(calc(60vh),_500px)]">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
             alt="FAQ Background" 
             class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-theme-900/80 to-theme-900/60 backdrop-blur-sm z-10 pointer-events-none"></div>
      </div>
      
      <div class="px-4 sm:px-6 lg:px-8 relative z-20 w-full max-w-5xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme-300 to-purple-300">
            常见问题
          </span>
        </h1>
        <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          解答你可能有的疑问，了解更多关于我的信息和服务
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <!-- 分类标签 -->
      <div class="mb-6 sm:mb-8">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">问题分类</h2>
        <div class="flex flex-wrap gap-2 sm:gap-3">
          <button 
            v-for="category in faqCategories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            class="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all"
            :class="{
              'bg-theme-600 text-white hover:bg-theme-700': selectedCategory === category.id,
              'bg-slate-100 text-slate-700 hover:bg-slate-200': selectedCategory !== category.id
            }"
          >
            <component :is="category.icon" class="w-4 h-4" />
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <!-- 分类标题 -->
      <div class="mb-4 sm:mb-6">
        <div class="flex items-center gap-3">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center"
            :class="getCategoryInfo(selectedCategory).color"
          >
            <component :is="getCategoryInfo(selectedCategory).icon" class="w-5 h-5" />
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
            {{ getCategoryInfo(selectedCategory).name }}
          </h2>
        </div>
        <p class="text-slate-600 mt-2">
          共 {{ filteredFaqs.length }} 个问题
        </p>
      </div>
      
      <!-- FAQ列表 -->
      <div class="space-y-3 sm:space-y-4">
        <div 
          v-for="faq in filteredFaqs" 
          :key="faq.id"
          class="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all overflow-hidden"
        >
          <!-- FAQ头部 -->
          <button 
            @click="toggleFaq(faq.id)"
            class="w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left focus:outline-none"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="getCategoryInfo(faq.category).color"
              >
                <component :is="getCategoryInfo(faq.category).icon" class="w-4 h-4" />
              </div>
              <h3 class="font-semibold text-slate-900 text-base sm:text-lg">
                {{ faq.question }}
              </h3>
            </div>
            <div class="flex items-center gap-2">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 transition-all"
                :class="isExpanded(faq.id) ? 'bg-theme-100' : ''"
              >
                <ChevronDown 
                  v-if="!isExpanded(faq.id)" 
                  class="w-5 h-5 text-slate-600 transition-transform"
                />
                <ChevronUp 
                  v-else 
                  class="w-5 h-5 text-theme-600 transition-transform"
                />
              </div>
            </div>
          </button>
          
          <!-- FAQ内容 -->
          <div 
            v-if="isExpanded(faq.id)"
            class="px-4 sm:px-5 pb-3 sm:pb-4 border-t border-slate-100"
          >
            <p class="text-slate-600 leading-relaxed">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredFaqs.length === 0" class="text-center py-12 sm:py-16">
        <div class="w-20 h-20 mx-auto rounded-full bg-theme-100 flex items-center justify-center mb-4">
          <HelpCircle class="w-10 h-10 text-theme-600" />
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-2">暂无问题</h3>
        <p class="text-slate-600 max-w-md mx-auto mb-4">
          该分类下暂无问题，你可以尝试查看其他分类
        </p>
        <button 
          @click="selectedCategory = 'all'"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm font-medium"
        >
          查看全部问题
        </button>
      </div>
      
      <!-- 联系提示 -->
      <div class="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-theme-100 border border-theme-200">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-theme-600 flex items-center justify-center flex-shrink-0">
            <Mail class="w-7 h-7 text-white" />
          </div>
          <div class="text-center md:text-left">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">还有其他问题？</h3>
            <p class="text-slate-600 mb-3">
              如果你的问题没有在上面找到答案，欢迎随时联系我
            </p>
            <a 
              href="/contact"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-600 text-white hover:bg-theme-700 transition-all text-sm font-medium"
            >
              联系我
              <ChevronUp class="w-4 h-4 rotate-90" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQ'
}
</script>