import { ref } from 'vue'

// 全局状态
const state = ref({
  homePagePostsCurrentPage: 1
})

export function useGlobalState() {
  const setHomePagePostsPage = (page) => {
    state.value.homePagePostsCurrentPage = page
  }

  const getHomePagePostsPage = () => {
    return state.value.homePagePostsCurrentPage
  }

  return {
    state,
    setHomePagePostsPage,
    getHomePagePostsPage
  }
}