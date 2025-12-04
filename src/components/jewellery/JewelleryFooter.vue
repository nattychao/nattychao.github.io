<template>
    <!-- Footer组件 -->
    <footer class="bg-white border-t border-gray-200 font-montserrat">
        <!-- 第一区域：促销文本 -->
        <div class="w-full bg-white py-12 px-4 border-b border-gray-200">
            <div class="max-w-[1200px] mx-auto text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-3 font-futura">Shop your fall & winter outfit at My
                    Jewellery
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed max-w-4xl mx-auto mb-2">
                    A new season means it's time for a new wardrobe! And you're definitely in the right place for new
                    clothes at My Jewellery! Shop the most on-trend <a href="#" class="underline">fall clothing</a> & <a
                        href="#" class="underline">winter clothing</a> with cool
                    prints, basic colours and beautiful patterns with us. Our webshop is updated with new items every
                    day, so you'll look the part every season. Let us line up all the fall & winter essentials fo...
                </p>
                <div class="mt-1">
                    <a href="#" class="text-sm text-gray-900 underline hover:no-underline">Read more</a>
                </div>
            </div>
        </div>

        <!-- 第二区域：四列内容 -->
        <div class="max-w-[1200px] mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- BOUTIQUES列 -->
                <div>
                    <h4 class="text-sm font-bold uppercase text-gray-900 mb-4 tracking-wider font-futura">Boutiques</h4>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        Find your nearest boutique here. We hope to see you soon!
                    </p>
                    <a href="#" class="text-sm text-gray-900 hover:text-pink-500 flex items-center group">
                        View all boutiques
                        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                    <div class="mt-6">
                        <a href="#" class="block hover:opacity-80 transition-opacity">
                            <img src="https://art.my-jewellery.com/m/3dbbeadac529010d/original/WEB-boutiques.jpg"
                                alt="Boutiques" class="w-full h-auto object-cover" />
                        </a>
                    </div>
                </div>

                <!-- CUSTOMER SERVICE列 -->
                <div>
                    <h4 class="text-sm font-bold uppercase text-gray-900 mb-4 tracking-wider font-futura">Customer
                        Service</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Customer
                                service</a></li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Delivery</a>
                        </li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Payments</a>
                        </li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Returns</a>
                        </li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Chat with
                                us</a></li>
                    </ul>
                </div>

                <!-- ABOUT MY JEWELLERY列 -->
                <div>
                    <h4 class="text-sm font-bold uppercase text-gray-900 mb-4 tracking-wider font-futura">About My
                        Jewellery</h4>
                    <ul class="space-y-3">
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">About us</a>
                        </li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Become a B2B
                                partner</a></li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Media &
                                Ambassadors</a></li>
                        <li><a href="#"
                                class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Sustainability</a>
                        </li>
                        <li><a href="#" class="text-sm text-gray-600 hover:text-pink-500 hover:underline">Jobs</a></li>
                    </ul>
                </div>

                <!-- NEWSLETTER列 -->
                <div>
                    <h4 class="text-sm font-bold uppercase text-gray-900 mb-4 tracking-wider font-futura">Newsletter
                    </h4>
                    <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        Sign up for our newsletter & receive a 10% welcome discount!
                    </p>
                    <a href="#" class="text-sm text-gray-900 hover:text-pink-500 flex items-center group mb-8">
                        Sign up for the newsletter
                        <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>

                    <!-- 语言选择 -->
                    <div>
                        <h5 class="text-sm font-bold uppercase text-gray-900 mb-3 tracking-wider font-futura">Choose
                            your language
                        </h5>
                        <a href="#" class="text-sm text-gray-600 hover:text-pink-500 flex items-center group">
                            Europe (English)
                            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 第三区域：底部品牌信息 -->
        <div class="w-full bg-[#e86eb0]">
            <div class="mx-auto px-6 py-3">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <!-- 品牌名称和社交媒体 -->
                    <div class="flex items-center mb-4 md:mb-0">
                        <span class="text-white font-bold uppercase text-lg mr-8 tracking-wider font-futura">MY
                            JEWELLERY</span>
                        <div class="flex space-x-4">
                            <!-- Instagram -->
                            <a href="#" class="text-white hover:opacity-80 transition-opacity">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z" />
                                </svg>
                            </a>
                            <!-- Facebook -->
                            <a href="#" class="text-white hover:opacity-80 transition-opacity">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <!-- Tiktok -->
                            <a href="#" class="text-white hover:opacity-80 transition-opacity">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                            <!-- Pinterest -->
                            <a href="#" class="text-white hover:opacity-80 transition-opacity">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
                                </svg>
                            </a>
                            <!-- Youtube -->
                            <a href="#" class="text-white hover:opacity-80 transition-opacity">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- 底部链接 -->
                    <div class="flex flex-wrap justify-center gap-6 text-[10px] text-white uppercase tracking-wide">
                        <a href="#" class="hover:underline">Terms & Conditions</a>
                        <a href="#" class="hover:underline">Privacy & Cookies</a>
                        <a href="#" class="hover:underline">Web Accessibility Statement</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
// No script needed for static image
</script>
