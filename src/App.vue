<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { useGlobalState } from './composables/useGlobalState.js'

const router = useRouter()
const { addToNavigationHistory, markAsVisited } = useGlobalState()

onMounted(() => {
  // 初始路由添加到导航历史，但不立即标记为已访问
  const initialRoute = router.currentRoute.value
  addToNavigationHistory(initialRoute.name)

  // 监听路由变化
  router.afterEach((to) => {
    addToNavigationHistory(to.name)
    markAsVisited(to.name)
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans">
    <NavBar v-if="$route.name !== 'Jewellery'" />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="$route.name !== 'Jewellery' && $route.name !== 'Inftab'" />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
