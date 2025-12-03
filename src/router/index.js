import { createRouter, createWebHistory } from 'vue-router'

// 自动导入 views 文件夹中的所有 Vue 组件
const modules = import.meta.glob('../views/*.vue')

// 自动生成路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

// 遍历所有视图组件并生成路由
Object.keys(modules).forEach(filePath => {
  // 获取文件名（不含扩展名）
  const fileName = filePath.split('/').pop().replace('.vue', '')
  
  // 跳过 Home.vue 和 BlogPost.vue (BlogPost 使用动态路由)
  if (['Home', 'BlogPost'].includes(fileName)) return
  
  // 将组件名转换为路由路径
  // 例如：MyJewelleryStandalone -> my-jewellery-standalone
  // 先插入连字符，再转小写
  const path = `/${fileName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
  
  // 添加路由
  routes.push({
    path,
    name: fileName,
    component: modules[filePath]
  })
})

// 添加动态博客路由
routes.push({
  path: '/blog/:slug',
  name: 'BlogPost',
  component: () => import('../views/BlogPost.vue')
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），则恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到页面顶部
    return { top: 0, left: 0 }
  }
})

export default router
