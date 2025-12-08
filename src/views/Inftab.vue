<template>
  <div class="w-full h-screen" style="padding-top: calc(64px + var(--safe-area-inset-top, 0px));">
    <!-- 内嵌网站的iframe容器 -->
    <div class="w-full h-full overflow-hidden">
      <iframe :src="inftabUrl" class="w-full h-full border-0" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        title="Inftab Website"></iframe>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Inftab',
  setup() {
    const inftabUrl = ref('https://inftab.com/')

    return {
      inftabUrl
    }
  }
}
</script>
