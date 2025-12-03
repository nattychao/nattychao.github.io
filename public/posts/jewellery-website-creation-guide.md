---
title: Jewellery网站制作指南
date: 2025-12-03
description: 使用Vue 3和Tailwind CSS制作Jewellery网站的完整指南，包括组件设计、布局实现和优化技巧。
tags: ['Vue3', 'Tailwind CSS', '网站开发', '电商网站', '响应式设计']
---

# Jewellery 网站制作指南

## 对话截图区域

[此处可插入与AI助手的对话截图，展示制作过程中的关键交互]

本指南记录了使用 Vue 3 和 Tailwind CSS 制作 Jewellery 网站的完整流程，包括所有组件的设计、实现和优化步骤。

## 项目初始设置

### 1. 项目结构

确保项目具有以下基本结构：

```
src/
├── components/
│   ├── Footer.vue              # 页脚组件
│   ├── NavBar.vue              # 导航栏组件
│   └── jewellery/              # Jewellery 页面专用组件
├── views/
│   └── Jewellery.vue           # Jewellery 主页面
├── router/
│   └── index.js                # 路由配置
└── main.js                     # 应用入口
```

### 2. 技术栈

- Vue 3 (Composition API)
- Tailwind CSS
- Vue Router

## 组件实现流程

### 1. 导航栏组件 (JewelleryHeader.vue)

**需求**：
- 包含 logo、菜单链接和购物车图标
- logo 点击可返回主页
- 响应式设计

**实现要点**：
```vue
<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-[1366px] mx-auto px-4">
      <!-- 导航内容 -->
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <router-link to="/" class="cursor-pointer">
          <img src="/logo-jewellery.png" alt="Jewellery Logo" class="h-16">
        </router-link>
        
        <!-- 菜单和购物车 -->
        <div class="flex items-center space-x-6">
          <!-- 菜单链接 -->
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-sm font-medium text-gray-700 hover:text-pink-600">Home</a>
            <!-- 更多菜单链接 -->
          </nav>
          
          <!-- 购物车图标 -->
          <a href="#" class="text-gray-700 hover:text-pink-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- 购物车图标路径 -->
            </svg>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
```

### 2. 横幅组件 (JewelleryBanner.vue)

**需求**：
- 全屏宽度
- 包含标题和"Shop now"按钮
- 使用指定的背景图片

**实现要点**：
```vue
<template>
  <section class="relative w-full">
    <div class="max-w-[1366px] mx-auto">
      <img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2880&q=80" 
           alt="Jewellery Banner" 
           class="w-full object-cover aspect-[2/1]">
      
      <!-- 横幅内容 -->
      <div class="absolute bottom-10 left-10">
        <h1 class="text-4xl font-bold text-white mb-4">THE GIFTSHOP</h1>
        <a href="#" class="bg-white text-pink-600 px-6 py-3 text-sm font-medium hover:bg-pink-50 transition-colors">
          Shop now
        </a>
      </div>
    </div>
  </section>
</template>
```

### 3. 页脚组件 (Footer.vue)

**需求**：
- 分为三个明确的区域
- 底部粉条占满浏览器宽度
- 内容区域宽度与其他模块保持一致 (max-w-[1366px])
- 包含社交媒体链接

**实现要点**：

#### 第一区域：促销文本
```vue
<div class="w-full bg-gray-50 py-4 px-4">
  <div class="max-w-[1366px] mx-auto">
    <h3 class="text-sm font-medium text-gray-700 text-center">Shop your fall & winter outfit at My Jewellery</h3>
    <p class="text-xs text-gray-500 text-center mt-2">
      A new season means it's time for new wardrobe! And you're perfectly at the right place for new outfits at My Jewellery...
    </p>
    <div class="text-center mt-3">
      <a href="#" class="text-xs font-medium text-pink-600 hover:underline">Read more</a>
    </div>
  </div>
</div>
```

#### 第二区域：四列内容
```vue
<div class="max-w-[1366px] mx-auto px-4 py-8">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
    <!-- BOUTIQUES列 -->
    <div>
      <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">Boutiques</h4>
      <!-- 内容 -->
    </div>
    
    <!-- CUSTOMER SERVICE列 -->
    <div>
      <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">Customer Service</h4>
      <!-- 内容 -->
    </div>
    
    <!-- ABOUT MY JEWELLERY列 -->
    <div>
      <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">About My Jewellery</h4>
      <!-- 内容 -->
    </div>
    
    <!-- NEWSLETTER列 -->
    <div>
      <h4 class="text-xs font-bold uppercase text-gray-900 mb-4">Newsletter</h4>
      <!-- 内容 -->
    </div>
  </div>
</div>
```

#### 第三区域：底部品牌信息
```vue
<div class="w-full border-t border-gray-200">
  <div class="max-w-[1366px] mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <!-- 品牌名称和社交媒体 -->
      <div class="flex items-center justify-center md:justify-start mb-4 md:mb-0 bg-white">
        <router-link to="/" class="text-base font-bold uppercase text-pink-600 mr-4">MY JEWELLERY</router-link>
        
        <!-- 社交媒体图标 -->
        <div class="flex space-x-3">
          <a href="#" class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
            <!-- Facebook图标 -->
          </a>
          <!-- 更多社交媒体图标 -->
        </div>
      </div>
      
      <!-- 底部链接 -->
      <div class="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
        <a href="#" class="hover:text-pink-600 transition-colors">Terms & Conditions</a>
        <!-- 更多链接 -->
      </div>
    </div>
  </div>
</div>
```

#### 底部粉条
```vue
<div class="w-full h-1 bg-pink-500"></div>
```

### 4. 主页面整合 (Jewellery.vue)

[此处可插入主页面布局设计图或实现效果截图]

将所有组件整合到主页面：

```vue
<template>
  <div class="min-h-screen bg-white">
    <!-- 导航栏 -->
    <JewelleryHeader />
    
    <!-- 横幅 -->
    <JewelleryBanner />
    
    <!-- 产品展示区 -->
    <div class="max-w-[1366px] mx-auto px-4 py-12">
      <!-- 产品网格 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <!-- 产品卡片 -->
        <div class="group">
          <img src="product-image.jpg" alt="Product" class="w-full h-auto">
          <h3 class="text-sm font-medium text-gray-900 mt-2">Product Name</h3>
          <p class="text-sm text-gray-600">$99.99</p>
        </div>
        <!-- 更多产品卡片 -->
      </div>
    </div>
    
    <!-- 社交媒体链接 -->
    <div class="max-w-[1366px] mx-auto px-4 py-8">
      <!-- 社交媒体内容 -->
    </div>
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup>
import JewelleryHeader from '../components/jewellery/JewelleryHeader.vue'
import JewelleryBanner from '../components/jewellery/JewelleryBanner.vue'
import Footer from '../components/Footer.vue'
</script>
```

## 优化和调试

[此处可插入调试过程中的问题截图和解决方案对比图]

### 1. 页脚宽度调整

确保页脚内容区域与其他模块保持一致的宽度：

```vue
<!-- 将所有内容容器的 max-w-7xl 改为 max-w-[1366px] -->
<div class="max-w-[1366px] mx-auto px-4">
  <!-- 内容 -->
</div>
```

### 2. 页脚背景和对齐修复

```vue
<!-- 确保社交媒体部分背景为白色，且桌面端居左显示 -->
<div class="flex items-center justify-center md:justify-start mb-4 md:mb-0 bg-white">
  <!-- 内容 -->
</div>
```

### 3. Logo 处理

如果需要使用透明背景的 Logo，可以：

1. 提供处理好的透明背景 PNG 文件
2. 或者使用 SVG 格式的 Logo

```vue
<!-- 使用 SVG Logo -->
<img src="/logo-jewellery.svg" alt="Jewellery Logo" class="h-16">
```

## 开发和测试

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 访问网站

打开浏览器访问：`http://localhost:4401/jewellery`

### 3. 热更新

修改代码后，开发服务器会自动热更新，无需手动刷新页面。

## 总结

[此处可插入最终网站效果的完整截图]

按照以上步骤，您可以高效地创建一个与设计图一致的 Jewellery 网站。关键要点包括：

1. 使用一致的容器宽度 (max-w-[1366px])
2. 实现响应式布局
3. 遵循设计图的颜色方案 (粉色为主色调)
4. 确保组件结构清晰，易于维护

如果遇到问题，可以参考本指南的调试部分或使用 Vue DevTools 进行调试。
