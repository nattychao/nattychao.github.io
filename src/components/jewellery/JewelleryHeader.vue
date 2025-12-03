<template>
  <header class="jewellery-header">
    <div class="max-w-[1366px] mx-auto px-4">
      <!-- Logo和导航菜单 -->
      <div class="flex items-center py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center cursor-pointer">
          <img src="/logo-jewellery.png" alt="My Jewellery Logo" class="h-16" />
        </router-link>

        <!-- 桌面导航 -->
        <nav class="hidden md:flex items-center space-x-8 ml-8">
          <a href="#" class="text-base font-light font-futura hover:text-pink-600 transition-colors">New In</a>
          <a href="#" class="text-base font-light font-futura hover:text-pink-600 transition-colors">Jewellery</a>
          <a href="#" class="text-base font-light font-futura hover:text-pink-600 transition-colors">Clothing</a>
          <a href="#" class="text-base font-light font-futura hover:text-pink-600 transition-colors">Accessories</a>
          <a href="#" class="text-base font-light font-futura hover:text-pink-600 transition-colors">Gift Shop</a>
          <a href="#" class="text-base font-light font-futura hover:text-pink-600 transition-colors">Sale</a>
        </nav>

        <!-- 占位元素，将用户操作图标推到右侧 -->
        <div class="flex-grow"></div>

        <!-- 用户操作图标 -->
        <div class="flex items-center space-x-5">
          <button class="hover:text-pink-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button class="hover:text-pink-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
          <button class="hover:text-pink-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
              </path>
            </svg>
          </button>
          <button class="hover:text-pink-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'JewelleryHeader'
}
</script>

<style scoped>
.jewellery-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
</style>
