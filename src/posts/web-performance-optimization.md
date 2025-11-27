---
title: Web 性能优化实战
date: 2025-11-25
description: 深入探讨 Web 性能优化的各种技术和策略，从加载性能到运行时性能，全面提升用户体验。
tags: ['性能优化', '前端开发', 'Web']
---

# Web 性能优化实战

网站性能直接影响用户体验和转化率。本文将全面介绍 Web 性能优化的各种技术和策略。

## 加载性能优化

### 资源压缩与合并

```javascript
// 使用 Webpack 进行代码分割
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
};
```

### 图片优化

```html
<!-- 使用现代图片格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jp2" type="image/jp2">
  <img src="image.jpg" alt="描述" loading="lazy">
</picture>

<!-- 响应式图片 -->
<img srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1024w"
     sizes="(max-width: 600px) 480px, (max-width: 900px) 768px, 1024px"
     src="medium.jpg" alt="描述">
```

### 预加载关键资源

```html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="important-font.woff2" as="font" crossorigin>

<!-- 预连接到第三方域名 -->
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">
```

## 运行时性能优化

### JavaScript 优化

```javascript
// 使用 requestAnimationFrame 优化动画
function animate() {
  // 动画逻辑
  requestAnimationFrame(animate);
}

// 使用防抖和节流
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### 虚拟滚动

```javascript
// 虚拟滚动实现示例
class VirtualScroll {
  constructor(container, itemHeight, renderItem) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight);
    this.scrollTop = 0;
    this.startIndex = 0;
    
    container.addEventListener('scroll', this.handleScroll.bind(this));
  }
  
  handleScroll() {
    this.scrollTop = this.container.scrollTop;
    this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    this.render();
  }
  
  render() {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < this.visibleItems; i++) {
      const index = this.startIndex + i;
      const item = this.renderItem(index);
      item.style.position = 'absolute';
      item.style.top = `${index * this.itemHeight}px`;
      fragment.appendChild(item);
    }
    
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  }
}
```

## 缓存策略

### Service Worker 缓存

```javascript
// Service Worker 缓存策略
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中，返回缓存资源
        if (response) {
          return response;
        }
        
        // 缓存未命中，从网络获取
        return fetch(event.request).then(response => {
          // 检查是否是有效响应
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // 克隆响应，因为响应流只能被使用一次
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});
```

### HTTP 缓存

```javascript
// 设置适当的缓存头
app.use(express.static('public', {
  maxAge: '1y', // 静态资源缓存一年
  etag: true,
  lastModified: true
}));

// API 缓存策略
app.get('/api/data', (req, res) => {
  // 设置缓存控制头
  res.set('Cache-Control', 'public, max-age=300'); // 5分钟
  res.json(data);
});
```

## 性能监控

### Web Vitals

```javascript
// 测量 Core Web Vitals
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// 发送到分析服务
function sendToAnalytics(metric) {
  // 发送到 Google Analytics
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 性能预算

```javascript
// 使用 webpack-bundle-analyzer 分析包大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};

// 性能预算配置
module.exports = {
  extends: ['@wordpress/scripts/config/webpack.config.js'],
  performance: {
    maxEntrypointSize: 250000, // 250KB
    maxAssetSize: 250000
  }
};
```

## 最佳实践

1. **测量优先**：先测量，再优化
2. **持续监控**：性能优化是一个持续过程
3. **用户体验至上**：优化应以提升用户体验为目标
4. **平衡性能与功能**：不要为了性能牺牲核心功能
5. **渐进增强**：确保在低性能设备上也能正常使用