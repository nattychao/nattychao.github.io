<template>
  <nav
    :class="['fixed left-0 right-0 z-40 bg-white border-b border-gray-100 hidden md:block transition-transform duration-300 ease-in-out']"
    :style="{
      top: '125px',
      transform: showNav ? 'translateY(0)' : 'translateY(-100%)'
    }">
    <div class="max-w-[1460px] mx-auto px-4 md:px-8">
      <ul
        class="flex items-center justify-center gap-10 py-4 text-[13px] font-bold tracking-wide text-gray-900 uppercase">
        <!-- New In 菜单项 (无下拉菜单) -->
        <li class="group relative">
          <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'new-in' } }"
            class="text-red-600 hover:text-red-700 flex items-center gap-1 py-2 cursor-pointer">
            New In
            <!-- 下划线动画：默认缩放为0，悬停时展开到100% -->
            <span
              class="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </RouterLink>
        </li>

        <!-- 
          带下拉菜单的菜单项
          核心实现：Tailwind CSS 的 group-hover 功能
          
          工作原理：
          1. 父元素 <li> 添加 class="group relative"
             - group: 标记为组，使子元素可以响应父元素的 hover 状态
             - relative: 相对定位，为绝对定位的子元素提供定位上下文
          
          2. 子元素使用 group-hover:* 类
             - 当鼠标悬停在父元素上时，所有 group-hover:* 类会被激活
             - 例如：group-hover:opacity-100 会在父元素悬停时将透明度设为100%
          
          3. 纯 CSS 实现，无需 JavaScript 状态管理
        -->
        <li v-for="item in menuItems" :key="item.name" class="group relative">
          <!-- 菜单链接 -->
          <RouterLink
            :to="{ name: 'YehwangProducts', query: { category: item.name.toLowerCase().replace(/\s+/g, '-') } }"
            class="hover:text-black flex items-center gap-1 py-2 transition-colors cursor-pointer">
            {{ item.name }}
            <!-- 下拉箭头：悬停时旋转180度 -->
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-gray-400 group-hover:text-black transition-colors group-hover:rotate-180 duration-300">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </RouterLink>

          <!-- 下划线动画：从左到右展开 (origin-left 设置变换起点为左侧) -->
          <span
            class="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>

          <!-- 
            下拉菜单面板 (Mega Menu)
            
            定位策略：
            - absolute: 绝对定位，脱离文档流
            - top-full: 紧贴父元素底部 (100% 的位置)
            - left-1/2 -translate-x-1/2: 水平居中对齐
            - w-[800px]: 固定宽度 800px
            
            显示/隐藏机制：
            - 默认状态: opacity-0 invisible (完全隐藏，不占空间，不可交互)
            - 悬停状态: group-hover:opacity-100 group-hover:visible (完全显示)
            - transition-all duration-300: 300ms 平滑过渡动画
            
            布局：
            - grid grid-cols-4: 4列网格布局
            - gap-8: 列间距 2rem
          -->
          <div
            :class="['absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl border-t border-gray-100 opacity-0 invisible transition-all duration-300 transform origin-top z-40 p-8 grid grid-cols-4 gap-8', showNav ? 'group-hover:opacity-100 group-hover:visible' : '']">
            <!-- 第一列：分类 -->
            <div>
              <h4 class="font-bold mb-4 text-xs text-gray-400">SHOP BY CATEGORY</h4>
              <ul class="space-y-2 text-gray-600 font-normal capitalize">
                <li class="group/item cursor-pointer">
                  <RouterLink
                    :to="{ name: 'YehwangProducts', query: { category: `all-${item.name.toLowerCase().replace(/\s+/g, '-')}` } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    All {{ item.name }}
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
                <li class="group/item cursor-pointer">
                  <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'new-arrivals' } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    New Arrivals
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
                <li class="group/item cursor-pointer">
                  <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'best-sellers' } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    Best Sellers
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
                <li class="group/item cursor-pointer">
                  <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'trending-now' } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    Trending Now
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
              </ul>
            </div>

            <!-- 第二列：系列 -->
            <div>
              <h4 class="font-bold mb-4 text-xs text-gray-400">COLLECTIONS</h4>
              <ul class="space-y-2 text-gray-600 font-normal capitalize">
                <li class="group/item cursor-pointer">
                  <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'summer-2025' } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    Summer 2025
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
                <li class="group/item cursor-pointer">
                  <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'minimalist' } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    Minimalist
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
                <li class="group/item cursor-pointer">
                  <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'statement-pieces' } }"
                    class="hover:text-black inline-block relative cursor-pointer">
                    Statement Pieces
                    <span
                      class="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </RouterLink>
                </li>
              </ul>
            </div>

            <!-- 第三、四列：特色图片 (col-span-2 占据2列) -->
            <div class="col-span-2 overflow-hidden rounded-[4px]">
              <img v-if="item.featuredImage" :src="item.featuredImage" :alt="`Featured ${item.name}`"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div v-else class="bg-gray-50 p-4 flex items-center justify-center text-gray-400 text-xs h-full">
                Featured Image for {{ item.name }}
              </div>
            </div>
          </div>
        </li>

        <!-- Sale 菜单项 (无下拉菜单) -->
        <li class="group relative">
          <RouterLink :to="{ name: 'YehwangProducts', query: { category: 'sale' } }"
            class="cursor-pointer text-red-600 hover:text-red-700 flex items-center gap-1 py-2">
            Sale
            <!-- 下划线动画 -->
            <span
              class="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useMockApi } from '@/composables/useMockApi';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

export default {
  name: 'WholesaleNavbar',
  components: {
    RouterLink
  },
  data() {
    return {
      showNav: true,
      lastScrollY: 0,
      menuItems: []
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // 从 API 获取菜单项数据
    const { fetchMenuItems } = useMockApi();
    try {
      this.menuItems = await fetchMenuItems();
      console.log('[WholesaleNavbar] Menu items loaded:', this.menuItems);
    } catch (error) {
      console.error('[WholesaleNavbar] Error fetching menu items:', error);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentY = window.scrollY;
      const categoriesSection = document.getElementById('wholesale-popular-categories');
      let threshold = 100;

      if (categoriesSection) {
        threshold = categoriesSection.offsetTop;
      }

      if (currentY > this.lastScrollY && currentY > threshold) {
        this.showNav = false;
      } else {
        this.showNav = true;
      }
      this.lastScrollY = currentY;
    }
  }
}
</script>
