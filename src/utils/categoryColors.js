// 标签颜色配置
// 基于GitHub语言色彩和设计系统定义的颜色方案

export const categoryColors = {
  // 编程语言颜色参考GitHub语言色彩
  'Objective-C': 'bg-theme-100 text-theme-800 border-theme-200', // GitHub: #438eff
  'Swift': 'bg-orange-100 text-orange-800 border-orange-200', // GitHub: #fa7343
  'Vue': 'bg-green-100 text-green-800 border-green-200', // Vue绿色
  'Vue3': 'bg-green-100 text-green-800 border-green-200', // Vue3绿色
  'Nuxt': 'bg-teal-100 text-teal-800 border-teal-200', // Nuxt绿色
  'Web开发': 'bg-purple-100 text-purple-800 border-purple-200', // 通用Web开发
  'React': 'bg-cyan-100 text-cyan-800 border-cyan-200', // GitHub: #61dafb
  'Svelte': 'bg-red-100 text-red-800 border-red-200', // GitHub: #ff3e00
  'Solid': 'bg-theme-100 text-theme-800 border-theme-200', // Solid蓝色
  'AFNetworking': 'bg-theme-100 text-theme-800 border-theme-200', // 与Objective-C相同
  '网络请求': 'bg-slate-100 text-slate-800 border-slate-200', // 网络相关
  'iOS': 'bg-gray-100 text-gray-800 border-gray-200', // iOS灰色
  'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200', // JavaScript黄色
  'TypeScript': 'bg-theme-100 text-theme-800 border-theme-200', // TypeScript蓝色
  '前端开发': 'bg-emerald-100 text-emerald-800 border-emerald-200', // 前端开发
  '性能优化': 'bg-amber-100 text-amber-800 border-amber-200', // 性能优化
  '安全': 'bg-red-100 text-red-800 border-red-200', // 安全相关
  '构建工具': 'bg-violet-100 text-violet-800 border-violet-200', // 构建工具
  'Webpack': 'bg-sky-100 text-sky-800 border-sky-200', // Webpack蓝色
  'Vite': 'bg-purple-100 text-purple-800 border-purple-200', // Vite紫色
  '测试': 'bg-rose-100 text-rose-800 border-rose-200', // 测试相关
  'CSS': 'bg-pink-100 text-pink-800 border-pink-200', // CSS粉色
  '布局': 'bg-theme-100 text-theme-800 border-theme-200', // 布局相关
  'Web': 'bg-theme-100 text-theme-800 border-theme-200', // Web相关
  'Jest': 'bg-red-100 text-red-800 border-red-200', // Jest红色
  'Cypress': 'bg-teal-100 text-teal-800 border-teal-200', // Cypress绿色
  
  // GitHub上其他主流语言标签
  'Python': 'bg-theme-100 text-theme-800 border-theme-200', // GitHub: #3572A5
  'Java': 'bg-orange-100 text-orange-800 border-orange-200', // GitHub: #b07219
  'Go': 'bg-cyan-100 text-cyan-800 border-cyan-200', // GitHub: #00ADD8
  'Rust': 'bg-orange-100 text-orange-800 border-orange-200', // GitHub: #dea584
  'C++': 'bg-theme-100 text-theme-800 border-theme-200', // GitHub: #f34b7d
  'C#': 'bg-purple-100 text-purple-800 border-purple-200', // GitHub: #239120
  'PHP': 'bg-theme-100 text-theme-800 border-theme-200', // GitHub: #4F5D95
  'Ruby': 'bg-red-100 text-red-800 border-red-200', // GitHub: #701516
  'Kotlin': 'bg-orange-100 text-orange-800 border-orange-200', // GitHub: #F18E33
  'Dart': 'bg-theme-100 text-theme-800 border-theme-200', // GitHub: #00B4AB
  'Scala': 'bg-red-100 text-red-800 border-red-200', // GitHub: #c22d40
  'Shell': 'bg-green-100 text-green-800 border-green-200', // GitHub: #89e051
  'HTML': 'bg-orange-100 text-orange-800 border-orange-200', // GitHub: #e34c26
  'AI': 'bg-yellow-100 text-yellow-800 border-yellow-200', // 人工智能相关
  
  // AI相关标签
  'AI编程': 'bg-yellow-100 text-yellow-800 border-yellow-200', // AI编程
  '提示词模板': 'bg-yellow-100 text-yellow-800 border-yellow-200', // 提示词模板
  '无代码开发': 'bg-yellow-100 text-yellow-800 border-yellow-200', // 无代码开发
  '0代码': 'bg-yellow-100 text-yellow-800 border-yellow-200', // 0代码
  
  // 技术相关标签
  'Android': 'bg-green-100 text-green-800 border-green-200', // Android绿色
  'AndroidStudio': 'bg-green-100 text-green-800 border-green-200', // Android Studio
  'TailwindCSS': 'bg-cyan-100 text-cyan-800 border-cyan-200', // Tailwind CSS
  'UI/UX': 'bg-purple-100 text-purple-800 border-purple-200', // UI/UX设计
  
  // 项目相关标签
  '迁移指南': 'bg-blue-100 text-blue-800 border-blue-200', // 迁移指南
  '网站开发': 'bg-indigo-100 text-indigo-800 border-indigo-200', // 网站开发
  '网站建设': 'bg-indigo-100 text-indigo-800 border-indigo-200', // 网站建设
  '网站实现': 'bg-indigo-100 text-indigo-800 border-indigo-200', // 网站实现
  '电商网站': 'bg-indigo-100 text-indigo-800 border-indigo-200', // 电商网站
  '组件设计': 'bg-teal-100 text-teal-800 border-teal-200', // 组件设计
  
  // 响应式设计相关
  '响应式设计': 'bg-pink-100 text-pink-800 border-pink-200', // 响应式设计
  '响应式布局': 'bg-pink-100 text-pink-800 border-pink-200', // 响应式布局
  
  // 其他标签
  '新手指南': 'bg-blue-100 text-blue-800 border-blue-200', // 新手指南
  '源码阅读': 'bg-gray-100 text-gray-800 border-gray-200', // 源码阅读
  '源码分析': 'bg-gray-100 text-gray-800 border-gray-200', // 源码分析
  'InterviewQuestions': 'bg-blue-100 text-blue-800 border-blue-200', // 面试问题
  'Resume': 'bg-blue-100 text-blue-800 border-blue-200', // 简历
  'QMUI': 'bg-teal-100 text-teal-800 border-teal-200', // QMUI框架
  'SourceCode': 'bg-gray-100 text-gray-800 border-gray-200', // 源代码
  'Analyze': 'bg-gray-100 text-gray-800 border-gray-200', // 分析
  'Libraries': 'bg-purple-100 text-purple-800 border-purple-200', // 库
  'Mac': 'bg-gray-100 text-gray-800 border-gray-200', // Mac
  
  '默认标签': 'bg-gray-100 text-gray-800 border-gray-200' // 默认标签颜色
}

// 获取标签颜色类
export function getCategoryClass(category) {
  return categoryColors[category] || categoryColors['默认标签']
}

// 添加新的标签颜色
export function addCategoryColor(category, colorClass) {
  categoryColors[category] = colorClass
}

// 移除标签颜色
export function removeCategoryColor(category) {
  delete categoryColors[category]
}

// 获取所有标签颜色
export function getAllCategoryColors() {
  return { ...categoryColors }
}
