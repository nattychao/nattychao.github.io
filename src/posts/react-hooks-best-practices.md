---
title: React Hooks 最佳实践
date: 2025-11-21
description: 探讨 React Hooks 的使用技巧和最佳实践，帮助你编写更清晰、更可维护的 React 组件。
tags: ['React', 'JavaScript', '前端开发']
---

# React Hooks 最佳实践

React Hooks 彻底改变了我们编写 React 组件的方式，让我们能够在函数组件中使用状态和其他 React 特性。

## 常用 Hooks 介绍

### useState

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 自定义 Hooks

自定义 Hooks 是重用状态逻辑的强大方式：

```javascript
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
```

## 最佳实践

1. **只在顶层调用 Hooks**：不要在循环、条件或嵌套函数中调用
2. **使用 ESLint 插件**：确保遵循 Hooks 规则
3. **合理拆分自定义 Hooks**：保持单一职责原则