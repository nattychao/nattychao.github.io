<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts'

const route = useRoute()
const { getPost } = usePosts()
const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  post.value = await getPost(route.params.slug)
  loading.value = false
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20"
    :style="{ paddingTop: 'calc(64px + var(--safe-area-inset-top, 0px) + 2rem)' }">
    <div v-if="loading" class="fixed inset-0 flex flex-col justify-center items-center bg-white/80 z-50">
      <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-theme-600 mb-4"></div>
      <p class="text-slate-600">加载中...</p>
    </div>

    <article v-else-if="post" class="prose prose-sm sm:prose-base md:prose-lg prose-slate mx-auto">
      <div class="hidden mb-6 sm:mb-8 text-center">
        <div class="text-xs sm:text-sm text-theme-600 font-medium mb-1.5 sm:mb-2">
          {{ new Date(post.date).toLocaleDateString() }}
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">{{ post.title }}</h1>
      </div>
      <div v-html="post.html"></div>
    </article>

    <div v-else class="text-center py-16 sm:py-20">
      <h1 class="text-xl sm:text-2xl font-bold text-slate-900">文章未找到</h1>
      <router-link to="/blog"
        class="text-theme-600 md:hover:text-theme-700 mt-3 sm:mt-4 inline-block text-sm sm:text-base">返回博客</router-link>
    </div>
  </div>
</template>
