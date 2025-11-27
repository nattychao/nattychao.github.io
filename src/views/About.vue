<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">关于我们</h1>
    <p class="text-lg mb-4">这是一个测试页面，用于验证自动路由功能。</p>
    <p class="mb-4">如果您能看到这个页面，说明自动路由配置已成功生效！</p>
    <router-link to="/" class="text-blue-500 hover:text-blue-700 underline">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>