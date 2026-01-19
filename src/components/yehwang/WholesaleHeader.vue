<template>
  <header class="fixed top-0 left-0 right-0 w-full font-sans z-50 bg-white shadow-sm h-[125px]">
    <!-- Top Bar -->
    <div class="bg-theme-dark text-white text-[11px] tracking-wide py-2.5 bg-black">
      <div class="max-w-[1460px] mx-auto px-4 md:px-8 flex justify-between items-center">
        <div class="hidden md:flex gap-4">
          <a href="#" class="hover:text-gray-300 transition-colors">Blog</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Showroom</a>
        </div>
        <div class="text-center flex-1">
          <span class="font-semibold">FREE SHIPPING</span> ON ALL ORDERS OVER $200
          <span class="mx-3 text-gray-600">|</span>
          <span class="text-theme-pink font-semibold">HOT SALE:</span> UP TO 50% OFF
        </div>
        <div class="flex items-center gap-6">
          <div class="group relative cursor-pointer hover:text-gray-300 flex items-center gap-1 transition-colors">
            <span>English</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="group-hover:rotate-180 transition-transform duration-300">
              <path d="m6 9 6 6 6-6" />
            </svg>
            <!-- Dropdown Placeholder -->
            <div
              class="absolute top-full right-0 mt-2 w-32 bg-white text-black shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
              <div class="py-2">
                <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer">English</div>
                <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer">Español</div>
                <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer">Français</div>
              </div>
            </div>
          </div>
          <div class="group relative cursor-pointer hover:text-gray-300 flex items-center gap-1 transition-colors">
            <span>USD $</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="group-hover:rotate-180 transition-transform duration-300">
              <path d="m6 9 6 6 6-6" />
            </svg>
            <!-- Dropdown Placeholder -->
            <div
              class="absolute top-full right-0 mt-2 w-24 bg-white text-black shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
              <div class="py-2">
                <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer">USD $</div>
                <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer">EUR €</div>
                <div class="px-4 py-2 hover:bg-gray-50 cursor-pointer">GBP £</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="bg-white py-5">
      <div class="max-w-[1460px] mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="group cursor-pointer">
            <h1
              class="text-2xl md:text-3xl font-bold tracking-tighter font-serif group-hover:opacity-80 transition-opacity">
              WHOLESALE
            </h1>
            <span
              class="block text-[10px] font-medium tracking-[0.3em] text-gray-500 uppercase mt-0.5 group-hover:text-black transition-colors">Jewelry
              & Fashion</span>
          </RouterLink>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl mx-auto hidden md:block">
          <div class="relative group">
            <input type="text" placeholder="Search for products, categories..."
              class="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5 transition-all placeholder:text-gray-400 group-hover:bg-white group-hover:shadow-sm" />
            <button
              class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors hover:scale-105 active:scale-95 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Icons -->
        <div class="flex items-center gap-6 text-gray-800">
          <button class="group hover:text-black flex flex-col items-center gap-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="group-hover:scale-110 transition-transform duration-300">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button class="group hover:text-black flex flex-col items-center gap-1 relative transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="group-hover:scale-110 transition-transform duration-300">
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button class="group hover:text-black flex flex-col items-center gap-1 relative transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="group-hover:scale-110 transition-transform duration-300">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span
              class="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">2</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'WholesaleHeader',
  components: {
    RouterLink
  }
}
</script>
