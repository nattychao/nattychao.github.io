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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <article v-else-if="post" class="prose prose-lg prose-slate mx-auto">
      <div class="mb-8 text-center">
        <div class="text-sm text-indigo-600 font-medium mb-2">{{ new Date(post.date).toLocaleDateString() }}</div>
        <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ post.title }}</h1>
      </div>
      <div v-html="post.html"></div>
    </article>

    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-slate-900">文章未找到</h1>
      <router-link to="/blog" class="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">返回博客</router-link>
    </div>
  </div>
</template>
