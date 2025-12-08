<script setup>
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref, computed, onMounted, watch } from 'vue'
import { getCategoryClass } from '../../utils/categoryColors.js'
import { usePosts } from '../../composables/usePosts.js'
import { useGlobalState } from '../../composables/useGlobalState.js'

// Load blog posts
const { posts, loadPosts } = usePosts()

// 使用全局状态管理页码
const { state, setHomePagePostsPage, getHomePagePostsPage } = useGlobalState()

// 当前页码 - 从全局状态获取
const currentPage = ref(getHomePagePostsPage())

// 每页显示的文章数量
const postsPerPage = 3

// 总共显示的文章数量
const totalPostsToShow = 12

// Load posts on mount
onMounted(() => {
  loadPosts()
})

// 监听页码变化，保存到全局状态
watch(currentPage, (newPage) => {
  setHomePagePostsPage(newPage)
})

// 获取最新的12篇文章
const allRecentPosts = computed(() => posts.value.slice(0, totalPostsToShow))

// 计算总页数
const totalPages = computed(() => Math.ceil(allRecentPosts.value.length / postsPerPage))

// 获取当前页的文章
const recentPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return allRecentPosts.value.slice(start, end)
})

// 切换到上一页
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 切换到下一页
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 跳转到指定页
const goToPage = (page) => {
  currentPage.value = page
}



// Helper functions for formatting
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

function estimateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} 分钟阅读`
}
</script>

<template>
  <!-- Recent Posts Preview -->
  <section class="py-12 sm:py-20 md:py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-start mb-8 sm:mb-10 md:mb-12">
        <div>
          <h2 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">最近思考</h2>
          <p class="text-sm sm:text-base text-slate-600">关于 全栈 开发和设计的见解。</p>
        </div>
        <router-link to="/blog"
          class="flex items-center text-theme-600 font-semibold md:hover:text-theme-700 transition-colors md:hidden text-sm sm:text-base mt-1">
          更多博客
          <ArrowRight class="w-4 h-4 ml-1" />
        </router-link>
      </div>

      <!-- Mobile: Horizontal Scroll -->
      <div class="flex overflow-x-auto gap-3 pb-4 hide-scrollbar md:hidden -mx-4 px-2">
        <router-link v-for="(post, index) in allRecentPosts" :key="post.slug" :to="`/blog/${post.slug}`"
          class="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 flex-shrink-0 w-[80vw] mx-1">
          <!-- Card Header with Unique Gradient -->
          <div class="h-2 bg-gradient-to-r bg-size-200 animate-gradient" :class="{
            'from-violet-600 via-purple-500 to-theme-600': index === 0,
            'from-pink-500 via-rose-500 to-red-500': index === 1,
            'from-emerald-500 via-teal-500 to-cyan-600': index === 2,
            'from-amber-500 via-orange-500 to-red-600': index === 3,
            'from-theme-500 via-theme-500 to-purple-600': index === 4,
            'from-green-500 via-teal-500 to-cyan-500': index === 5,
            'from-purple-500 via-pink-500 to-rose-500': index === 6,
            'from-theme-500 via-theme-500 to-cyan-500': index === 7,
            'from-rose-500 via-red-500 to-orange-500': index === 8,
            'from-cyan-500 via-teal-500 to-green-500': index === 9,
            'from-orange-500 via-amber-500 to-yellow-500': index === 10,
            'from-teal-500 via-cyan-500 to-theme-500': index === 11
          }"></div>

          <div class="p-4 sm:p-5 md:p-7">
            <h3
              class="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight md:group-hover:text-theme-600 transition-colors line-clamp-1 md:line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600 mb-4 sm:mb-5 line-clamp-2 md:line-clamp-3 leading-relaxed">
              {{ post.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 overflow-hidden">
              <div class="flex flex-wrap gap-1.5 sm:gap-2 whitespace-nowrap overflow-hidden">
                <span v-for="tag in (post.tags || [])" :key="tag" :class="getCategoryClass(tag)"
                  class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full border transition-all duration-200 md:hover:shadow-sm md:hover:scale-105">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Footer with date and read time -->
            <div class="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100">
              <div class="text-xs text-slate-500 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ formatDate(post.date) }}
              </div>
              <span class="text-xs font-medium text-slate-700 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                  </path>
                </svg>
                {{ estimateReadTime(post.content) }}
              </span>
            </div>
          </div>
        </router-link>

        <!-- Placeholder if less than 3 posts on current page -->
        <div v-for="i in Math.max(0, postsPerPage - allRecentPosts.length)" :key="`placeholder-${i}`"
          class="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-slate-100 opacity-50 flex-shrink-0">
          <div class="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2 sm:mb-3">即将推出</div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-400 mb-2 sm:mb-3 leading-tight">更多内容即将到来</h3>
          <p class="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">
            敬请期待更多关于 Web 开发、编程和技术的文章。
          </p>
        </div>
      </div>

      <!-- PC: Grid Layout -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <router-link v-for="(post, index) in recentPosts" :key="post.slug" :to="`/blog/${post.slug}`"
          class="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-slate-100 md:hover:shadow-xl transition-all duration-300 md:hover:-translate-y-2">
          <!-- Card Header with Animated Gradient -->
          <div class="h-2 bg-gradient-to-r bg-size-200 animate-gradient" :class="{
            'from-violet-600 via-purple-500 to-theme-600': (currentPage - 1) * postsPerPage + index === 0,
            'from-pink-500 via-rose-500 to-red-500': (currentPage - 1) * postsPerPage + index === 1,
            'from-emerald-500 via-teal-500 to-cyan-600': (currentPage - 1) * postsPerPage + index === 2,
            'from-amber-500 via-orange-500 to-red-600': (currentPage - 1) * postsPerPage + index === 3,
            'from-theme-500 via-theme-500 to-purple-600': (currentPage - 1) * postsPerPage + index === 4,
            'from-green-500 via-teal-500 to-cyan-500': (currentPage - 1) * postsPerPage + index === 5,
            'from-purple-500 via-pink-500 to-rose-500': (currentPage - 1) * postsPerPage + index === 6,
            'from-theme-500 via-theme-500 to-cyan-500': (currentPage - 1) * postsPerPage + index === 7,
            'from-rose-500 via-red-500 to-orange-500': (currentPage - 1) * postsPerPage + index === 8,
            'from-cyan-500 via-teal-500 to-green-500': (currentPage - 1) * postsPerPage + index === 9,
            'from-orange-500 via-amber-500 to-yellow-500': (currentPage - 1) * postsPerPage + index === 10,
            'from-teal-500 via-cyan-500 to-theme-500': (currentPage - 1) * postsPerPage + index === 11
          }"></div>

          <div class="p-4 sm:p-5 md:p-7">
            <h3
              class="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight md:group-hover:text-theme-600 transition-colors line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600 mb-4 sm:mb-5 line-clamp-3 leading-relaxed">
              {{ post.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              <span v-for="tag in (post.tags || [])" :key="tag" :class="getCategoryClass(tag)"
                class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full border transition-all duration-200 md:hover:shadow-sm md:hover:scale-105">
                {{ tag }}
              </span>
            </div>

            <!-- Footer with date and read time -->
            <div class="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100">
              <div class="text-xs text-slate-500 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {{ formatDate(post.date) }}
              </div>
              <span class="text-xs font-medium text-slate-700 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                  </path>
                </svg>
                {{ estimateReadTime(post.content) }}
              </span>
            </div>
          </div>
        </router-link>

        <!-- Placeholder if less than 3 posts on current page -->
        <div v-for="i in Math.max(0, postsPerPage - recentPosts.length)" :key="`placeholder-${i}`"
          class="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-slate-100 opacity-50">
          <div class="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2 sm:mb-3">即将推出</div>
          <h3 class="text-lg sm:text-xl font-bold text-slate-400 mb-2 sm:mb-3 leading-tight">更多内容即将到来</h3>
          <p class="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6">
            敬请期待更多关于 Web 开发、编程和技术的文章。
          </p>
        </div>
      </div>

      <!-- 分页控件 - Only show on PC -->
      <div v-if="totalPages > 1" class="mt-8 sm:mt-10 md:mt-12 hidden md:flex justify-center items-center space-x-2">
        <!-- 上一页按钮 -->
        <button @click="goToPrevPage" :disabled="currentPage === 1" class="p-2 rounded-full transition-colors" :class="currentPage === 1
          ? 'text-slate-300 cursor-not-allowed'
          : 'text-slate-600 hover:bg-slate-100'">
          <ChevronLeft class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <!-- 页码按钮 -->
        <div class="flex space-x-1">
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full font-medium transition-colors text-sm sm:text-base" :class="currentPage === page
              ? 'bg-theme-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'">
            {{ page }}
          </button>
        </div>

        <!-- 下一页按钮 -->
        <button @click="goToNextPage" :disabled="currentPage === totalPages" class="p-2 rounded-full transition-colors"
          :class="currentPage === totalPages
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100'">
          <ChevronRight class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <!-- PC: View More Button at Bottom -->
      <div class="mt-6 sm:mt-8 text-center md:block hidden">
        <router-link to="/blog"
          class="inline-flex items-center text-theme-600 font-semibold hover:text-theme-700 transition-colors">
          更多博客
          <ArrowRight class="w-4 h-4 ml-1" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
