<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white border-t border-slate-100 py-8 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-slate-500 text-sm">
        &copy; {{ currentYear }} NattyChao. All rights reserved.
      </p>
      <p class="text-slate-400 text-xs mt-2">
        Built with Vue 3, Tailwind CSS, and Love.
      </p>
    </div>
  </footer>
</template>
