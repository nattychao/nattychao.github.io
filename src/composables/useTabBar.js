import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Home, FileText, Briefcase, BookOpen, User, Image } from 'lucide-vue-next'

/**
 * Tab栏相关的composable函数
 * 管理Tab栏的菜单项和相关逻辑
 */
export function useTabBar() {
  const route = useRoute()

  // 定义底部Tab栏的菜单项
  const tabItems = [
    { name: '首页', path: '/', icon: Home },
    { name: '简历', path: '/resume', icon: FileText },
    { name: '项目', path: '/projects', icon: Briefcase },
    { name: '博客', path: '/blog', icon: BookOpen },
    // { name: '壁纸', path: '/wallpapers', icon: Image },
    { name: '我的', path: '/profile', icon: User },
  ]

  // 获取所有需要显示Tab栏的页面名称
  const tabRouteNames = computed(() => {
    // 从tabItems中动态生成路由名称，与路由配置保持一致
    return tabItems.map(item => {
      if (item.path === '/') {
        return 'Home' // 首页特殊处理
      }
      // 将路径转换为路由名称格式：/resume -> Resume
      const routeName = item.path.replace('/', '')
      return routeName.charAt(0).toUpperCase() + routeName.slice(1)
    })
  })

  // 检查当前路由是否需要显示Tab栏
  const isTabPage = computed(() => {
    return tabRouteNames.value.includes(route.name)
  })

  // 检查当前路由是否与Tab项匹配
  const isActive = (path) => {
    // 精确匹配根路径，其他路径使用startsWith
    if (path === '/') {
      return route.path === '/'
    }
    return route.path.startsWith(path)
  }

  return {
    tabItems,
    tabRouteNames,
    isTabPage,
    isActive
  }
}
