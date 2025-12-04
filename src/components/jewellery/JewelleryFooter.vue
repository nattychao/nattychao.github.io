<script setup>
// Footer组件脚本
</script>

<template>
    <!-- Footer组件 -->
    <footer class="bg-white">
        <!-- 第一区域：促销文本 -->
        <div class="w-full bg-gray-50 py-4 px-4">
            <div class="max-w-[1366px] mx-auto">
                <h3 class="text-sm font-medium text-gray-700 text-center">Shop your fall & winter outfit at My Jewellery
                </h3>
                <p class="text-xs text-gray-500 text-center mt-2">
                    A new season means it's time for new wardrobe! And you're perfectly at the right place for new
                    outfits at My
                    Jewellery Shop the on-trend fall & winter collection with cool prints, basic colours and beautiful
                    patterns.
                    Our webshop is updated with new items every day, so you'll find the best every season. Let us line
                    up all fall
                    & winter essentials for...
                </p>
                <div class="text-center mt-3">
                    <a href="#" class="text-xs font-medium text-pink-600 hover:underline">Read more</a>
                </div>
            </div>
        </div>

        <!-- 第二区域：四列内容 -->
        <div class="max-w-[1366px] mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- BOUTIQUES列 -->
                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">Boutiques</h4>
                    <p class="text-xs text-gray-600 mb-3">
                        Find your nearest boutique here. We hope to welcome you!
                    </p>
                    <a href="#" class="text-xs font-medium text-pink-600 hover:underline flex items-center">
                        View all boutiques
                        <svg class="w-2 h-2 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <!-- CUSTOMER SERVICE列 -->
                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">Customer Service</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Customer service</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Delivery</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Payments</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Returns</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Chat with us</a></li>
                    </ul>
                </div>

                <!-- ABOUT MY JEWELLERY列 -->
                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">About My Jewellery</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">About us</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Become a S925 partner</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Media & Ambassadors</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Sustainability</a></li>
                        <li><a href="#" class="text-xs text-gray-600 hover:text-pink-600">Jobs</a></li>
                    </ul>
                </div>

                <!-- NEWSLETTER列 -->
                <div>
                    <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">Newsletter</h4>
                    <p class="text-xs text-gray-600 mb-3">
                        Sign up for our newsletter & receive 10%
                    </p>
                    <a href="#" class="text-xs font-medium text-pink-600 hover:underline flex items-center">
                        Sign up for the newsletter
                        <svg class="w-2 h-2 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>

                    <!-- 语言选择 -->
                    <div class="mt-6">
                        <h5 class="text-xs uppercase text-gray-500 mb-2">Choose your language</h5>
                        <a href="#" class="text-xs text-gray-600 hover:text-pink-600 flex items-center">
                            Europe (English)
                            <svg class="w-2 h-2 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 第三区域：底部品牌信息 -->
        <div class="w-full border-t border-gray-200">
            <div class="max-w-[1366px] mx-auto px-4 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <!-- 品牌名称和社交媒体 -->
                    <div class="flex items-center justify-center md:justify-start mb-4 md:mb-0 bg-white">
                        <router-link to="/" class="text-base font-bold uppercase text-pink-600 mr-4">MY
                            JEWELLERY</router-link>
                        <div class="flex space-x-3">
                            <a href="#"
                                class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- 底部链接 -->
                    <div class="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                        <a href="#" class="hover:text-pink-600 transition-colors">Terms & Conditions</a>
                        <a href="#" class="hover:text-pink-600 transition-colors">Privacy & Cookies</a>
                        <a href="#" class="hover:text-pink-600 transition-colors">Web Accessibility Statement</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部粉条 -->
        <div class="w-full h-1 bg-pink-500"></div>
    </footer>
</template>
