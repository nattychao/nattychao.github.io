<template>
  <div class="container mx-auto px-4 py-6 sm:py-8" :style="{ paddingTop: 'calc(64px + var(--safe-area-inset-top, 0px) + 1.5rem)' }">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">关于我们</h1>
    <p class="text-base sm:text-lg mb-3 sm:mb-4">这是一个测试页面，用于验证自动路由功能。</p>
    <p class="mb-3 sm:mb-4 text-sm sm:text-base">如果您能看到这个页面，说明自动路由配置已成功生效！</p>
    <router-link to="/" class="text-blue-500 hover:text-blue-700 underline text-sm sm:text-base">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>