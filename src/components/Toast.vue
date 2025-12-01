<template>
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 scale-90"
    enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
    <div v-if="isVisible"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center">
      <div class="bg-white text-gray-800 px-4 py-2.5 rounded-full shadow flex items-center space-x-2">
        <!-- 成功图标 -->
        <div v-if="type === 'success'" class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <!-- 警告图标 -->
        <div v-else-if="type === 'warning'" class="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01"></path>
          </svg>
        </div>

        <!-- 信息图标 -->
        <div v-else-if="type === 'info'" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 16h-1v-4h-1m1-4h.01"></path>
          </svg>
        </div>

        <!-- 消息内容 -->
        <span class="text-sm font-normal whitespace-nowrap">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: '复制成功'
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 2000
  },
  onHide: {
    type: Function,
    default: () => { }
  }
})

const isVisible = ref(false)
let timer = null

onMounted(() => {
  // 显示Toast
  isVisible.value = true

  // 设置定时器，duration后隐藏Toast
  timer = setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})

// 监听isVisible变化，当变为false时调用回调
watch(isVisible, (newValue) => {
  if (!newValue) {
    // 给过渡动画一些时间完成
    setTimeout(() => {
      props.onHide()
    }, 200)
  }
})

onUnmounted(() => {
  // 清除定时器
  if (timer) {
    clearTimeout(timer)
  }
})
</script>
