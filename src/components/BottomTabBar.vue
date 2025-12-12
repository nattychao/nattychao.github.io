<script setup>
import { RouterLink } from 'vue-router'
import { useTabBar } from '@/composables/useTabBar.js'

// 使用Tab栏的composable函数
const { tabItems, isActive, isTabPage, tabRouteNames } = useTabBar()

// 导出计算属性供其他组件使用
defineExpose({
  isTabPage,
  tabRouteNames
})
</script>

<template>
  <!-- 底部Tab栏 - 当没有匹配的标签时隐藏 -->
  <nav class="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/80 backdrop-blur-md border-slate-100 shadow-sm"
    :style="{ height: 'calc(60px + var(--safe-area-inset-bottom, 0px))' }">
    <div class="grid grid-cols-5 gap-1 px-2 py-2 h-full"
      :style="{ paddingBottom: 'var(--safe-area-inset-bottom, 0px)' }">
      <RouterLink v-for="item in tabItems" :key="item.path" :to="item.path"
        class="flex flex-col items-center justify-center h-full px-1 rounded-lg transition-all duration-200 transform -translate-y-0.5"
        :class="[
          isActive(item.path)
            ? 'text-theme-600 font-medium' // 选中状态使用主题色
            : 'text-slate-500 hover:text-theme-500' // 未选中状态
        ]">
        <!-- 图标 -->
        <component :is="item.icon" :class="[
          isActive(item.path) ? 'text-theme-600' : 'text-slate-500',
          'h-[18px] w-[18px] mb-[2px]'
        ]" />
        <!-- 文字 -->
        <span class="text-[10px]">{{ item.name }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
