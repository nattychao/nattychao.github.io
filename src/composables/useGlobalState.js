import { ref } from 'vue'

// 全局状态
const state = ref({
  homePagePostsCurrentPage: 1,
  visitedRoutes: [],
  navigationHistory: []
})

export function useGlobalState() {
  const setHomePagePostsPage = (page) => {
    state.value.homePagePostsCurrentPage = page
  }

  const getHomePagePostsPage = () => {
    return state.value.homePagePostsCurrentPage
  }

  // 导航历史管理
  const addToNavigationHistory = (routeName) => {
    state.value.navigationHistory.push(routeName)
  }

  const getNavigationHistory = () => {
    return state.value.navigationHistory
  }

  // 路由访问管理
  const isFirstVisit = (routeName) => {
    return !state.value.visitedRoutes.includes(routeName)
  }

  const markAsVisited = (routeName) => {
    if (!state.value.visitedRoutes.includes(routeName)) {
      state.value.visitedRoutes.push(routeName)
    }
  }

  // 检查是否是从其他页面返回
  const isReturningFromOtherPage = (currentRouteName) => {
    if (state.value.navigationHistory.length < 2) return false
    const previousRoute = state.value.navigationHistory[state.value.navigationHistory.length - 2]
    return previousRoute !== currentRouteName
  }

  return {
    state,
    setHomePagePostsPage,
    getHomePagePostsPage,
    addToNavigationHistory,
    getNavigationHistory,
    isReturningFromOtherPage,
    isFirstVisit,
    markAsVisited
  }
}
