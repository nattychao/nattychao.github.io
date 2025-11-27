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
  
  // 跳过 Home.vue，因为已经手动添加了
  if (fileName === 'Home') return
  
  // 将组件名转换为路由路径
  // 例如：BlogPost -> /blog-post
  // 例如：Resume -> /resume
  const path = `/${fileName.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2')}`
  
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
  history: createWebHistory('/nattychao.github.io/'),
  routes
})

export default router