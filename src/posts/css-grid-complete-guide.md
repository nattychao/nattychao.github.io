---
title: CSS Grid 布局完全指南
date: 2025-11-24
description: 全面介绍 CSS Grid 布局系统，从基础概念到高级技巧，帮助你掌握现代网页布局技术。
tags: ['CSS', '前端开发', '布局']
---

# CSS Grid 布局完全指南

CSS Grid 是一个强大的二维布局系统，可以同时处理行和列，为网页布局提供了前所未有的灵活性。

## 基础概念

### 网格容器和网格项

```css
.container {
  display: grid;
  /* 定义列和行 */
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}

.item {
  /* 网格项自动成为网格容器的子元素 */
}
```

### 网格线

网格线是网格结构的水平线和垂直线，它们构成了网格的边界。

```css
.item {
  /* 使用网格线定位 */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  
  /* 简写形式 */
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}
```

## 高级技巧

### 网格区域命名

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

### 自动填充和适应

```css
.container {
  display: grid;
  /* 创建尽可能多的列，每列最小200px，最大1fr */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
```

### 子网格 (Subgrid)

```css
.parent-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}

.child-grid {
  /* 子网格继承父网格的轨道定义 */
  display: grid;
  grid-template-columns: subgrid;
  /* 子网格可以跨越父网格的多列 */
  grid-column: 1 / -1;
}
```

## 实用布局模式

### 圣杯布局

```css
.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 20px;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

### 卡片网格

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 30px;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## 响应式设计

### 媒体查询与网格

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 容器查询与网格

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
  }
}
```

## 对齐和分布

### 对齐网格项

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  
  /* 水平对齐 */
  justify-items: center; /* start | end | center | stretch */
  
  /* 垂直对齐 */
  align-items: center; /* start | end | center | stretch */
  
  /* 整个网格在容器中的对齐 */
  justify-content: center; /* start | end | center | stretch | space-around | space-between | space-evenly */
  align-content: center;
}
```

## 最佳实践

1. **使用相对单位**：优先使用 fr、百分比和 em
2. **合理使用 gap**：避免使用 margin 创建间距
3. **考虑内容流**：确保网格布局在不同内容下依然美观
4. **结合 Flexbox**：对于一维布局，Flexbox 可能更合适
5. **渐进增强**：为不支持 Grid 的浏览器提供回退方案