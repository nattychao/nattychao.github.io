<script setup>
import NavBar from './components/NavBar.vue'
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
