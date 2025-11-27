---
title: 前端安全最佳实践
date: 2025-11-26
description: 探讨前端开发中的安全问题和防护措施，帮助你构建更安全的 Web 应用。
tags: ['安全', '前端开发', 'Web']
---

# 前端安全最佳实践

Web 安全是一个重要但常被忽视的领域。本文将介绍前端开发中的常见安全问题和最佳防护措施。

## 常见安全威胁

### XSS (跨站脚本攻击)

XSS 攻击通过在网页中注入恶意脚本，窃取用户数据或执行恶意操作。

```javascript
// 危险的做法 - 直接渲染用户输入
function renderUserInput(input) {
  document.getElementById('output').innerHTML = input;
}

// 安全的做法 - 转义用户输入
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderUserInput(input) {
  const safeInput = escapeHtml(input);
  document.getElementById('output').textContent = safeInput;
}

// 使用 DOMPurify 库进行更全面的清理
import DOMPurify from 'dompurify';

function renderUserInput(input) {
  const clean = DOMPurify.sanitize(input);
  document.getElementById('output').innerHTML = clean;
}
```

### CSRF (跨站请求伪造)

CSRF 攻击诱导用户在已认证的网站上执行非预期的操作。

```javascript
// 使用 CSRF 令牌
function setupCSRFProtection() {
  // 从 meta 标签获取 CSRF 令牌
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  // 在所有请求中添加 CSRF 令牌
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    options.headers = {
      ...options.headers,
      'X-CSRF-Token': csrfToken
    };
    return originalFetch(url, options);
  };
}

// SameSite Cookie 防护
// 在服务器端设置
Set-Cookie: sessionid=...; Secure; HttpOnly; SameSite=Strict
```

### 点击劫持

点击劫持通过将恶意网站透明层叠在目标网站之上，诱导用户点击。

```javascript
// 使用 X-Frame-Options 防止点击劫持
// 在服务器端设置响应头
X-Frame-Options: DENY
// 或
X-Frame-Options: SAMEORIGIN

// 使用 Content Security Policy (CSP)
Content-Security-Policy: frame-ancestors 'none';

// 前端检测
if (self !== top) {
  // 页面被嵌入到 iframe 中
  top.location = self.location;
}
```

## 内容安全策略 (CSP)

CSP 是一个额外的安全层，用于检测和缓解某些类型的攻击。

```html
<!-- 通过 HTTP 头设置 CSP -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
              script-src 'self' https://trusted.cdn.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              connect-src 'self' https://api.example.com;">
```

```javascript
// 报告 CSP 违规
document.addEventListener('securitypolicyviolation', (e) => {
  console.log('CSP Violation:', {
    blockedURI: e.blockedURI,
    documentURI: e.documentURI,
    effectiveDirective: e.effectiveDirective,
    originalPolicy: e.originalPolicy,
    referrer: e.referrer,
    sourceFile: e.sourceFile,
    statusCode: e.statusCode,
    violatedDirective: e.violatedDirective
  });
  
  // 发送违规报告到服务器
  fetch('/api/csp-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      blockedURI: e.blockedURI,
      documentURI: e.documentURI,
      effectiveDirective: e.effectiveDirective,
      originalPolicy: e.originalPolicy,
      referrer: e.referrer,
      sourceFile: e.sourceFile,
      statusCode: e.statusCode,
      violatedDirective: e.violatedDirective
    })
  });
});
```

## 安全存储

### 敏感数据处理

```javascript
// 避免在 localStorage 存储敏感信息
// 不安全
localStorage.setItem('token', userToken);

// 更安全 - 使用 httpOnly cookie
// 在服务器端设置
Set-Cookie: token=...; Secure; HttpOnly; SameSite=Strict

// 如果必须在前端存储，考虑加密
import CryptoJS from 'crypto-js';

function encryptData(data, secretKey) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

function decryptData(ciphertext, secretKey) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
```

### 内存管理

```javascript
// 及时清理敏感数据
function handleSensitiveData(data) {
  try {
    // 处理数据
    processData(data);
  } finally {
    // 清理内存中的敏感数据
    data.password = null;
    data.token = null;
    // 如果可能，覆盖整个对象
    for (const key in data) {
      data[key] = undefined;
    }
  }
}
```

## API 安全

### 认证与授权

```javascript
// 使用 JWT 进行认证
function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

function getAuthToken() {
  return localStorage.getItem('authToken');
}

function logout() {
  localStorage.removeItem('authToken');
  // 重定向到登录页
  window.location.href = '/login';
}

// 在请求中添加认证头
function authenticatedFetch(url, options = {}) {
  const token = getAuthToken();
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };
  return fetch(url, options);
}
```

### 请求验证

```javascript
// 验证 API 响应
async function fetchUserData(userId) {
  try {
    const response = await authenticatedFetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 验证响应数据结构
    if (!data || typeof data.id !== 'number' || typeof data.name !== 'string') {
      throw new Error('Invalid response data');
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    // 处理错误，可能需要重新登录
    if (error.message.includes('401') || error.message.includes('403')) {
      logout();
    }
    throw error;
  }
}
```

## 安全工具与库

### 安全检查工具

```javascript
// 使用 Helmet.js 设置安全头
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### 前端安全库

```javascript
// 使用 DOMPurify 防止 XSS
import DOMPurify from 'dompurify';

function sanitizeUserInput(input) {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}

// 使用 forge 进行加密
import forge from 'node-forge';

function generateSecureRandom() {
  return forge.random.getBytesSync(32);
}

function encryptWithRSA(publicKey, data) {
  const key = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = key.encrypt(data, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
}
```

## 最佳实践

1. **最小权限原则**：只给予必要的权限
2. **深度防御**：在多个层面实施安全措施
3. **保持更新**：及时更新依赖和框架
4. **安全编码**：从设计阶段考虑安全性
5. **定期审计**：定期进行安全审计和渗透测试