<script setup>
import { onMounted, computed } from 'vue'
import { ArrowRight, Code, Database, Layout, Server, Smartphone, Globe } from 'lucide-vue-next'
import heroBgImage from '@/assets/hero-bg.png'
import { usePosts } from '@/composables/usePosts'

const skills = [
  { name: '前端开发', icon: Layout, items: ['Vue.js', 'React', 'Tailwind CSS', 'TypeScript'] },
  { name: '后端开发', icon: Server, items: ['Node.js', 'Python', 'Go', 'PostgreSQL'] },
  { name: '开发工具', icon: Database, items: ['Docker', 'Git', 'AWS', 'Figma'] },
]

const projects = [
  {
    title: '电商平台',
    description: '一个功能齐全的电商平台，具备实时库存管理和支付处理功能。',
    tags: ['Vue 3', 'Node.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '任务管理应用',
    description: '为远程团队打造的协作项目管理工具。',
    tags: ['React', 'Firebase', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'AI 内容生成器',
    description: '基于大语言模型的 SaaS 应用，帮助写作者更快地创作内容。',
    tags: ['Python', 'OpenAI API', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
,
  {
    title: 'Yehwang 个人网站',
    description: '我的个人主页，展示我的作品和博客。',
    tags: ['Vue', 'Vite', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80',
    href: 'https://yehwang.com'
  },
  {
    title: 'Dropshipping 项目',
    description: '基于 dropshipping 的电商平台示例。',
    tags: ['Node.js', 'Express', 'MongoDB'],    
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    href: 'https://dropshipping.yehwang.com'
  }
]

// Load blog posts
const { posts, loadPosts } = usePosts()

onMounted(() => {
  loadPosts()
})

// Get latest 3 posts
const recentPosts = computed(() => posts.value.slice(0, 3))
</script>

<template>
  <div class="space-y-0">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img :src="heroBgImage" alt="Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="text-center max-w-4xl mx-auto"
             v-motion
             :initial="{ opacity: 0, y: 50 }"
             :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        >
          <div class="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium tracking-wide">
            全栈开发工程师
          </div>
          <h1 class="text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-8 leading-tight drop-shadow-lg">
            构建 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">数字梦想</span>
          </h1>
          <p class="text-xl md:text-2xl text-slate-100 mb-12 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-md">
            你好，我是 Natty。我致力于打造美观、实用且以用户为中心的 Web 体验，解决真实世界的问题。
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-5">
            <router-link to="/resume" class="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
              查看简历 <ArrowRight class="w-5 h-5" />
            </router-link>
            <router-link to="/blog" class="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center">
              阅读博客
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
        <ArrowRight class="w-6 h-6 rotate-90" />
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">技术专长</h2>
          <p class="text-slate-600 max-w-2xl mx-auto">我用于构建可扩展和健壮应用的工具箱。</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="skill in skills" :key="skill.name" class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
              <component :is="skill.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">{{ skill.name }}</h3>
            <ul class="space-y-2">
              <li v-for="item in skill.items" :key="item" class="flex items-center text-slate-600">
                <div class="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">精选项目</h2>
            <p class="text-slate-600">我最近的一些作品。</p>
          </div>
          <a href="#" class="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            查看所有项目 <ArrowRight class="w-4 h-4 ml-1" />
          </a>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.title" class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-2xl mb-4 aspect-video">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-white font-semibold border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">查看详情</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{{ project.title }}</h3>
            <p class="text-slate-600 mb-3 line-clamp-2">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center md:hidden">
          <a href="#" class="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            查看所有项目 <ArrowRight class="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>

    <!-- Recent Posts Preview -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">最近思考</h2>
            <p class="text-slate-600">关于 Web 开发和设计的见解。</p>
          </div>
          <router-link to="/blog" class="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            阅读博客 <ArrowRight class="w-4 h-4 ml-1" />
          </router-link>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <router-link 
            v-for="post in recentPosts" 
            :key="post.slug" 
            :to="`/blog/${post.slug}`"
            class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 block"
          >
            <div class="text-xs font-bold tracking-wider text-indigo-600 uppercase mb-3">技术</div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 leading-tight">{{ post.title }}</h3>
            <p class="text-slate-600 mb-6 line-clamp-3">
              {{ post.description }}
            </p>
            <div class="flex items-center justify-between pt-6 border-t border-slate-100">
              <div class="text-sm text-slate-500">{{ formatDate(post.date) }}</div>
              <span class="text-sm font-medium text-slate-900">{{ estimateReadTime(post.body) }}</span>
            </div>
          </router-link>
          
          <!-- Placeholder if less than 3 posts -->
          <div 
            v-for="i in Math.max(0, 3 - recentPosts.length)" 
            :key="`placeholder-${i}`"
            class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 opacity-50"
          >
            <div class="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">即将推出</div>
            <h3 class="text-xl font-bold text-slate-400 mb-3 leading-tight">更多内容即将到来</h3>
            <p class="text-slate-400 mb-6">
              敬请期待更多关于 Web 开发、编程和技术的文章。
            </p>
          </div>
        </div>
        
        <div class="mt-8 text-center md:hidden">
          <router-link to="/blog" class="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            阅读博客 <ArrowRight class="w-4 h-4 ml-1" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Helper functions for formatting
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function estimateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
</script>

<style scoped>
/* No custom CSS needed, using Tailwind */
</style>

