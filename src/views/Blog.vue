<script setup>
import { onMounted } from 'vue'
import { usePosts } from '../composables/usePosts'
import { RouterLink } from 'vue-router'

const { posts, loading, loadPosts } = usePosts()

onMounted(() => {
  loadPosts()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h1 class="text-4xl font-bold text-slate-900 mb-12">博客</h1>
    
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    </div>

    <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="post in posts" :key="post.slug" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
        <div class="text-sm text-indigo-600 font-medium mb-2">{{ new Date(post.date).toLocaleDateString() }}</div>
        <h2 class="text-xl font-bold text-slate-900 mb-3">
          <RouterLink :to="'/blog/' + post.slug" class="hover:text-indigo-600 transition-colors">
            {{ post.title }}
          </RouterLink>
        </h2>
        <p class="text-slate-600 mb-4 flex-grow">{{ post.description }}</p>
        <RouterLink :to="'/blog/' + post.slug" class="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center gap-1 mt-auto">
          阅读更多 &rarr;
        </RouterLink>
      </article>
    </div>
  </div>
</template>
