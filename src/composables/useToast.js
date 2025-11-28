import { ref, createApp } from 'vue'
import Toast from '@/components/Toast.vue'

const toastInstance = ref(null)
let currentTimer = null
let isShowing = false
let pendingMessage = null
let pendingDuration = null

export function useToast() {
  const showToast = (message = '复制成功', duration = 2000) => {
    // 如果当前有Toast正在显示，保存新的消息为待处理
    if (isShowing) {
      pendingMessage = message
      pendingDuration = duration
      return
    }
    
    // 清除之前的定时器
    if (currentTimer) {
      clearTimeout(currentTimer)
      currentTimer = null
    }
    
    // 如果已有Toast实例，先移除
    if (toastInstance.value) {
      document.body.removeChild(toastInstance.value)
      toastInstance.value = null
    }
    
    // 创建新的Toast实例
    const toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    toastInstance.value = toastContainer
    
    // 标记为正在显示
    isShowing = true
    
    // 创建Vue应用并挂载Toast组件
    const app = createApp(Toast, {
      message,
      duration,
      onHide: () => {
        // Toast隐藏后的回调
        isShowing = false
        
        // 如果有待处理的消息，显示它
        if (pendingMessage) {
          const msg = pendingMessage
          const dur = pendingDuration
          pendingMessage = null
          pendingDuration = null
          
          // 使用setTimeout确保在下一个事件循环中显示
          setTimeout(() => {
            showToast(msg, dur)
          }, 50)
        } else {
          // 没有待处理消息，清理DOM
          setTimeout(() => {
            if (toastInstance.value && document.body.contains(toastInstance.value)) {
              document.body.removeChild(toastInstance.value)
              toastInstance.value = null
            }
          }, 300) // 等待过渡动画完成
        }
      }
    })
    
    app.mount(toastContainer)
  }
  
  return {
    showToast
  }
}