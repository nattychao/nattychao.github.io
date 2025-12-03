<template>
  <div class="min-h-screen bg-pink-200 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-pink-800 mb-4">测试页面</h1>
      <p class="text-2xl text-pink-600">如果您能看到这个，说明路由工作正常</p>
      <div class="mt-8">
        <button @click="count++" class="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
          点击测试: {{ count }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
