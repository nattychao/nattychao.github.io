---
title: TypeScript 进阶技巧
date: 2025-11-23
description: 探讨 TypeScript 的高级特性和实用技巧，帮助你写出更类型安全、更易维护的代码。
tags: ['TypeScript', 'JavaScript', '前端开发']
---

# TypeScript 进阶技巧

TypeScript 不仅仅是 JavaScript 的类型超集，它还提供了许多强大的特性，可以显著提升代码质量和开发体验。

## 高级类型系统

### 条件类型

```typescript
// 基础条件类型
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// 实用示例：获取数组元素类型
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = string[];
type ElementType = ArrayElement<StringArray>; // string
```

### 映射类型

```typescript
// 将所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 实用示例：深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

## 实用工具类型

### Pick 和 Omit

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 只选择指定属性
type UserPublicInfo = Pick<User, 'id' | 'name' | 'email'>;

// 排除指定属性
type UserWithoutPassword = Omit<User, 'password'>;
```

### Record 和 Dictionary

```typescript
// 创建键值对类型
type Dictionary<T> = Record<string, T>;

type UserDictionary = Dictionary<User>;
// 等同于 { [key: string]: User }
```

## 装饰器

### 类装饰器

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
}
```

### 方法装饰器

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

## 实用模式

### 工厂模式

```typescript
interface Product {
  name: string;
  price: number;
}

class ProductFactory {
  static create(type: 'book' | 'electronics'): Product {
    switch (type) {
      case 'book':
        return { name: 'TypeScript Handbook', price: 29.99 };
      case 'electronics':
        return { name: 'Laptop', price: 999.99 };
      default:
        throw new Error('Unknown product type');
    }
  }
}
```

### 策略模式

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid $${amount} using credit card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal`);
  }
}

class ShoppingCart {
  constructor(private paymentStrategy: PaymentStrategy) {}
  
  checkout(amount: number): void {
    this.paymentStrategy.pay(amount);
  }
}
```

## 最佳实践

1. **严格模式**：始终启用 `strict` 编译选项
2. **避免 any**：尽可能使用具体类型
3. **类型推断**：让 TypeScript 推断类型，而不是显式声明
4. **接口优于类型别名**：对于对象结构使用接口
5. **使用泛型**：编写可重用的类型安全代码