<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20" :style="{ paddingTop: 'calc(64px + var(--safe-area-inset-top, 0px) + 2rem)' }">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 md:mb-6">
      AI-BIO
    </h1>
    <div class="border rounded-lg overflow-hidden shadow-lg">
      <iframe src="https://ai-bio.cn/" frameborder="0" class="w-full h-screen" title="AI工具箱"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiBio'
}
</script>