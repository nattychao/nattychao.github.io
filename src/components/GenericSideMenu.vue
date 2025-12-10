<template>
  <!-- 手势检测区域 -->
  <div class="absolute inset-y-0 left-0 w-[50px]" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"></div>

  <!-- 蒙版层 -->
  <div v-if="isOpen || isTouching" class="fixed inset-0 z-40" :style="overlayStyle" @click="closeMenu"></div>

  <!-- 侧滑菜单 -->
  <div ref="menuContainer" class="fixed left-0 top-0 h-full z-50 bg-white shadow-2xl" :style="menuStyle"
    @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <!-- 菜单内容 - 使用插槽让用户自定义 -->
    <div class="menu-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'open'])

// 手势相关状态
const touchStartX = ref(0)
const touchCurrentX = ref(0)
const isTouching = ref(false)
const swipeThreshold = ref(50) // 触发滑动的最小距离
const edgeThreshold = ref(50) // 屏幕左侧边缘触发区域宽度
const menuContainer = ref(null)
const menuWidth = ref(0)

// 关闭菜单
const closeMenu = () => {
  emit('close')
}

// 计算菜单样式 - 实现连续滑动效果
const menuStyle = computed(() => {
  if (!isTouching.value) {
    return {
      transform: props.isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '75%', // 默认宽度，可以通过props自定义
      maxWidth: '80%',
      overflowY: 'auto'
    }
  }

  let translateX = 0

  // 从左侧边缘打开菜单的情况
  if (touchStartX.value < edgeThreshold.value && !props.isOpen) {
    // 菜单从屏幕左侧边缘开始，随着手势向右滑动
    // translateX从0开始增加到menuWidth.value
    translateX = Math.max(0, Math.min(touchCurrentX.value - touchStartX.value, menuWidth.value))
    // 将菜单从隐藏位置(translateX(-100%))开始移动，加上当前滑动距离
    return {
      transform: `translateX(${-menuWidth.value + translateX}px)`,
      transition: 'none', // 滑动过程中禁用过渡，实现实时跟随
      width: '75%',
      maxWidth: '80%',
      overflowY: 'auto'
    }
  }
  // 从菜单内关闭菜单的情况
  else if (props.isOpen) {
    // 菜单从当前位置向左滑动
    translateX = Math.max(-menuWidth.value, Math.min(touchCurrentX.value - touchStartX.value, 0))
    return {
      transform: `translateX(${translateX}px)`,
      transition: 'none', // 滑动过程中禁用过渡，实现实时跟随
      width: '75%',
      maxWidth: '80%',
      overflowY: 'auto'
    }
  }
  else {
    return {
      transform: props.isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '75%',
      maxWidth: '80%',
      overflowY: 'auto'
    }
  }
})

// 计算蒙版层样式 - 毛玻璃效果随菜单移动逐渐变化
const overlayStyle = computed(() => {
  let blurAmount = 4; // 默认模糊强度
  let opacity = 0.2;  // 默认不透明度
  let progress = 1;   // 菜单显示进度（1为完全显示，0为完全隐藏）

  // 计算菜单当前位置的进度
  if (isTouching.value) {
    // 触摸滑动过程中，根据当前位置计算进度
    if (props.isOpen) {
      // 关闭菜单时，进度从1减少到0
      const translateX = touchCurrentX.value - touchStartX.value;
      progress = 1 + (translateX / menuWidth.value);
      progress = Math.max(0, Math.min(1, progress));
    } else if (touchStartX.value < edgeThreshold.value) {
      // 打开菜单时，进度从0增加到1
      const translateX = touchCurrentX.value - touchStartX.value;
      progress = Math.min(1, translateX / menuWidth.value);
    } else {
      // 不符合打开或关闭条件时，根据菜单是否打开设置进度
      progress = props.isOpen ? 1 : 0;
    }
  } else {
    // 非触摸状态下，根据菜单是否打开设置进度
    progress = props.isOpen ? 1 : 0;
  }

  // 根据进度计算毛玻璃强度和透明度
  blurAmount = progress * 16; // 模糊强度从0px到16px
  opacity = progress * 0.2;  // 不透明度从0到0.2

  return {
    backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    backdropFilter: `blur(${blurAmount}px)`,
    opacity: 1, // 保持元素完全不透明，不透明度由backgroundColor控制
    transition: isTouching.value ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
})

// 手势处理相关方法 - 实现连续滑动
const handleTouchStart = (e) => {
  if (menuContainer.value) {
    menuWidth.value = menuContainer.value.offsetWidth
  }
  isTouching.value = true
  touchStartX.value = e.touches[0].clientX
  touchCurrentX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  if (!isTouching.value) return

  touchCurrentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isTouching.value) return

  const deltaX = touchCurrentX.value - touchStartX.value

  // 从左侧边缘滑动打开菜单
  if (touchStartX.value < edgeThreshold.value && !props.isOpen) {
    if (deltaX > swipeThreshold.value || deltaX > menuWidth.value * 0.3) {
      emit('open')
    }
  }
  // 从菜单内滑动关闭菜单
  else if (props.isOpen) {
    if (deltaX < -swipeThreshold.value || deltaX < -menuWidth.value * 0.3) {
      emit('close')
    }
  }

  isTouching.value = false
}

// 阻止背景滚动
const preventBodyScroll = (prevent) => {
  if (prevent) {
    // 保存当前滚动位置
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
  } else {
    // 恢复滚动位置
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}

// 监听菜单开关状态
watch(() => props.isOpen, (newVal) => {
  preventBodyScroll(newVal)
})
</script>

<style scoped>
.menu-content {
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

/* 自定义滚动条 */
.menu-content::-webkit-scrollbar {
  width: 6px;
}

.menu-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.menu-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.menu-content::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
