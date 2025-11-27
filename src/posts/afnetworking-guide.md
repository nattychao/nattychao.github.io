---
title: AFNetworking 完全指南：iOS 网络请求最佳实践
date: 2025-11-29
description: 深入探讨 AFNetworking 网络库的核心功能、使用方法和最佳实践，帮助 iOS 开发者构建高效可靠的网络层。
---

# AFNetworking 完全指南：iOS 网络请求最佳实践

AFNetworking 是 iOS 和 macOS 开发中最流行的网络库之一，它为 Foundation 的 URL 加载系统提供了优雅的封装。本文将深入介绍 AFNetworking 的核心功能和使用方法。

## 目录

1. [简介](#简介)
2. [安装配置](#安装配置)
3. [核心组件](#核心组件)
4. [基础使用](#基础使用)
5. [高级特性](#高级特性)
6. [最佳实践](#最佳实践)

## 简介

AFNetworking 是一个功能强大的网络库，它建立在 NSURLSession 之上，提供了：

- **简洁的 API**：链式调用，代码更易读
- **自动序列化**：JSON、XML、Plist 等格式自动解析
- **网络监控**：实时监测网络状态变化
- **安全特性**：SSL Pinning 支持
- **UIKit 扩展**：图片异步加载等实用功能

### 为什么选择 AFNetworking？

```objective-c
// 传统 NSURLSession 方式
NSURL *url = [NSURL URLWithString:@"https://api.example.com/users"];
NSURLRequest *request = [NSURLRequest requestWithURL:url];
NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request 
    completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            NSLog(@"Error: %@", error);
            return;
        }
        NSError *jsonError;
        NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
        // 处理数据...
    }];
[task resume];

// AFNetworking 方式
AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
[manager GET:@"https://api.example.com/users" parameters:nil headers:nil progress:nil 
    success:^(NSURLSessionDataTask *task, id responseObject) {
        // responseObject 已经是解析好的 JSON 对象
        NSLog(@"Users: %@", responseObject);
    } failure:^(NSURLSessionDataTask *task, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
```

## 安装配置

### CocoaPods 安装

在 `Podfile` 中添加：

```ruby
pod 'AFNetworking', '~> 4.0'
```

然后执行：

```bash
pod install
```

### Swift Package Manager

在 Xcode 中：`File > Add Packages...`，输入仓库地址：

```
https://github.com/AFNetworking/AFNetworking.git
```

### 导入头文件

**Objective-C:**
```objective-c
#import <AFNetworking/AFNetworking.h>
```

**Swift:**
```swift
import AFNetworking
```

## 核心组件

### 1. AFHTTPSessionManager

核心管理类，负责创建和管理 HTTP 请求。

```objective-c
AFHTTPSessionManager *manager = [[AFHTTPSessionManager alloc] initWithBaseURL:[NSURL URLWithString:@"https://api.example.com"]];

// 配置请求序列化器
manager.requestSerializer = [AFJSONRequestSerializer serializer];
manager.requestSerializer.timeoutInterval = 30;

// 配置响应序列化器
manager.responseSerializer = [AFJSONResponseSerializer serializer];
manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/json", nil];
```

### 2. AFURLSessionManager

更底层的管理类，提供更细粒度的控制。

```objective-c
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];

NSURL *URL = [NSURL URLWithString:@"https://api.example.com/download"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request progress:^(NSProgress *downloadProgress) {
    dispatch_async(dispatch_get_main_queue(), ^{
        // 更新进度条
        NSLog(@"Progress: %.2f%%", downloadProgress.fractionCompleted * 100);
    });
} destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
    NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
    return [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
} completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
    NSLog(@"File downloaded to: %@", filePath);
}];

[downloadTask resume];
```

### 3. AFNetworkReachabilityManager

网络状态监控。

```objective-c
[[AFNetworkReachabilityManager sharedManager] setReachabilityStatusChangeBlock:^(AFNetworkReachabilityStatus status) {
    switch (status) {
        case AFNetworkReachabilityStatusNotReachable:
            NSLog(@"网络不可用");
            break;
        case AFNetworkReachabilityStatusReachableViaWWAN:
            NSLog(@"使用蜂窝网络");
            break;
        case AFNetworkReachabilityStatusReachableViaWiFi:
            NSLog(@"使用 WiFi");
            break;
        default:
            break;
    }
}];

[[AFNetworkReachabilityManager sharedManager] startMonitoring];
```

## 基础使用

### GET 请求

```objective-c
AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];

NSDictionary *parameters = @{@"page": @1, @"limit": @20};

[manager GET:@"https://api.example.com/posts" 
  parameters:parameters 
     headers:nil 
    progress:nil 
     success:^(NSURLSessionDataTask *task, id responseObject) {
         NSArray *posts = responseObject[@"data"];
         NSLog(@"获取到 %lu 篇文章", (unsigned long)posts.count);
     } 
     failure:^(NSURLSessionDataTask *task, NSError *error) {
         NSLog(@"请求失败: %@", error.localizedDescription);
     }];
```

### POST 请求

```objective-c
NSDictionary *parameters = @{
    @"username": @"john_doe",
    @"email": @"john@example.com",
    @"password": @"secure_password"
};

[manager POST:@"https://api.example.com/users" 
   parameters:parameters 
      headers:nil 
     progress:nil 
      success:^(NSURLSessionDataTask *task, id responseObject) {
          NSLog(@"用户创建成功: %@", responseObject);
      } 
      failure:^(NSURLSessionDataTask *task, NSError *error) {
          NSLog(@"创建失败: %@", error.localizedDescription);
      }];
```

### 上传文件

```objective-c
[manager POST:@"https://api.example.com/upload" 
   parameters:nil 
      headers:nil 
constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
    UIImage *image = [UIImage imageNamed:@"photo"];
    NSData *imageData = UIImageJPEGRepresentation(image, 0.8);
    
    [formData appendPartWithFileData:imageData 
                                name:@"file" 
                            fileName:@"photo.jpg" 
                            mimeType:@"image/jpeg"];
} 
     progress:^(NSProgress *uploadProgress) {
         NSLog(@"上传进度: %.2f%%", uploadProgress.fractionCompleted * 100);
     } 
      success:^(NSURLSessionDataTask *task, id responseObject) {
          NSLog(@"上传成功: %@", responseObject);
      } 
      failure:^(NSURLSessionDataTask *task, NSError *error) {
          NSLog(@"上传失败: %@", error.localizedDescription);
      }];
```

### 下载文件

```objective-c
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://example.com/file.pdf"]];

NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request 
    progress:^(NSProgress *downloadProgress) {
        NSLog(@"下载进度: %.2f%%", downloadProgress.fractionCompleted * 100);
    } 
    destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
        NSURL *documentsURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory 
                                                                     inDomain:NSUserDomainMask 
                                                            appropriateForURL:nil 
                                                                       create:NO 
                                                                        error:nil];
        return [documentsURL URLByAppendingPathComponent:@"file.pdf"];
    } 
    completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
        if (error) {
            NSLog(@"下载失败: %@", error.localizedDescription);
        } else {
            NSLog(@"文件保存至: %@", filePath);
        }
    }];

[downloadTask resume];
```

## 高级特性

### 1. 自定义请求头

```objective-c
// 全局设置
[manager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
[manager.requestSerializer setValue:@"Bearer token123" forHTTPHeaderField:@"Authorization"];

// 单次请求设置
NSDictionary *headers = @{@"X-Custom-Header": @"CustomValue"};
[manager GET:@"https://api.example.com/data" parameters:nil headers:headers progress:nil success:nil failure:nil];
```

### 2. SSL Pinning（证书绑定）

```objective-c
AFSecurityPolicy *securityPolicy = [AFSecurityPolicy policyWithPinningMode:AFSSLPinningModeCertificate];
securityPolicy.allowInvalidCertificates = NO;
securityPolicy.validatesDomainName = YES;

// 从 bundle 加载证书
NSString *cerPath = [[NSBundle mainBundle] pathForResource:@"server" ofType:@"cer"];
NSData *certData = [NSData dataWithContentsOfFile:cerPath];
securityPolicy.pinnedCertificates = @[certData];

manager.securityPolicy = securityPolicy;
```

### 3. 请求重试机制

```objective-c
@interface RetrySessionManager : AFHTTPSessionManager
@property (nonatomic, assign) NSInteger maxRetryCount;
@end

@implementation RetrySessionManager

- (NSURLSessionDataTask *)GET:(NSString *)URLString
                   parameters:(id)parameters
                      headers:(NSDictionary<NSString *,NSString *> *)headers
                     progress:(void (^)(NSProgress *))downloadProgress
                      success:(void (^)(NSURLSessionDataTask *, id))success
                      failure:(void (^)(NSURLSessionDataTask *, NSError *))failure {
    
    __block NSInteger retryCount = 0;
    
    void (^retryBlock)(NSURLSessionDataTask *, NSError *) = ^(NSURLSessionDataTask *task, NSError *error) {
        if (retryCount < self.maxRetryCount) {
            retryCount++;
            NSLog(@"请求失败，重试第 %ld 次", (long)retryCount);
            
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [self GET:URLString parameters:parameters headers:headers progress:downloadProgress success:success failure:failure];
            });
        } else {
            if (failure) {
                failure(task, error);
            }
        }
    };
    
    return [super GET:URLString parameters:parameters headers:headers progress:downloadProgress success:success failure:retryBlock];
}

@end
```

### 4. 请求缓存策略

```objective-c
// 配置缓存策略
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
configuration.requestCachePolicy = NSURLRequestReturnCacheDataElseLoad;
configuration.URLCache = [[NSURLCache alloc] initWithMemoryCapacity:10 * 1024 * 1024
                                                       diskCapacity:50 * 1024 * 1024
                                                           diskPath:@"my_cache"];

AFHTTPSessionManager *manager = [[AFHTTPSessionManager alloc] initWithSessionConfiguration:configuration];
```

## 最佳实践

### 1. 创建单例网络管理类

```objective-c
// NetworkManager.h
@interface NetworkManager : NSObject

+ (instancetype)sharedManager;

- (void)requestWithMethod:(NSString *)method
                      url:(NSString *)url
               parameters:(NSDictionary *)parameters
                  success:(void(^)(id responseObject))success
                  failure:(void(^)(NSError *error))failure;

@end

// NetworkManager.m
@implementation NetworkManager

+ (instancetype)sharedManager {
    static NetworkManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.manager = [[AFHTTPSessionManager alloc] initWithBaseURL:[NSURL URLWithString:@"https://api.example.com"]];
        self.manager.requestSerializer = [AFJSONRequestSerializer serializer];
        self.manager.responseSerializer = [AFJSONResponseSerializer serializer];
        self.manager.requestSerializer.timeoutInterval = 30;
    }
    return self;
}

- (void)requestWithMethod:(NSString *)method
                      url:(NSString *)url
               parameters:(NSDictionary *)parameters
                  success:(void(^)(id responseObject))success
                  failure:(void(^)(NSError *error))failure {
    
    if ([method isEqualToString:@"GET"]) {
        [self.manager GET:url parameters:parameters headers:nil progress:nil 
                  success:^(NSURLSessionDataTask *task, id responseObject) {
                      if (success) success(responseObject);
                  } 
                  failure:^(NSURLSessionDataTask *task, NSError *error) {
                      if (failure) failure(error);
                  }];
    } else if ([method isEqualToString:@"POST"]) {
        [self.manager POST:url parameters:parameters headers:nil progress:nil 
                   success:^(NSURLSessionDataTask *task, id responseObject) {
                       if (success) success(responseObject);
                   } 
                   failure:^(NSURLSessionDataTask *task, NSError *error) {
                       if (failure) failure(error);
                   }];
    }
}

@end
```

### 2. 统一错误处理

```objective-c
- (void)handleError:(NSError *)error {
    NSInteger statusCode = 0;
    if (error.userInfo[AFNetworkingOperationFailingURLResponseErrorKey]) {
        NSHTTPURLResponse *response = error.userInfo[AFNetworkingOperationFailingURLResponseErrorKey];
        statusCode = response.statusCode;
    }
    
    NSString *message = @"请求失败";
    
    switch (statusCode) {
        case 400:
            message = @"请求参数错误";
            break;
        case 401:
            message = @"未授权，请重新登录";
            // 跳转到登录页面
            break;
        case 403:
            message = @"禁止访问";
            break;
        case 404:
            message = @"请求的资源不存在";
            break;
        case 500:
            message = @"服务器内部错误";
            break;
        default:
            if (error.code == NSURLErrorNotConnectedToInternet) {
                message = @"网络连接失败";
            }
            break;
    }
    
    // 显示错误提示
    [self showAlertWithMessage:message];
}
```

### 3. 请求取消管理

```objective-c
@interface ViewController ()
@property (nonatomic, strong) NSMutableArray<NSURLSessionDataTask *> *tasks;
@end

@implementation ViewController

- (void)makeRequest {
    NSURLSessionDataTask *task = [manager GET:@"https://api.example.com/data" 
                                    parameters:nil 
                                       headers:nil 
                                      progress:nil 
                                       success:nil 
                                       failure:nil];
    [self.tasks addObject:task];
}

- (void)cancelAllRequests {
    for (NSURLSessionDataTask *task in self.tasks) {
        [task cancel];
    }
    [self.tasks removeAllObjects];
}

- (void)dealloc {
    [self cancelAllRequests];
}

@end
```

### 4. 图片加载优化（使用 UIImageView+AFNetworking）

```objective-c
#import <AFNetworking/UIImageView+AFNetworking.h>

// 基础用法
[imageView setImageWithURL:[NSURL URLWithString:@"https://example.com/image.jpg"]];

// 带占位图
[imageView setImageWithURL:[NSURL URLWithString:@"https://example.com/image.jpg"] 
          placeholderImage:[UIImage imageNamed:@"placeholder"]];

// 完整控制
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"https://example.com/image.jpg"]];

__weak typeof(self) weakSelf = self;
[imageView setImageWithURLRequest:request 
                 placeholderImage:[UIImage imageNamed:@"placeholder"] 
                          success:^(NSURLRequest *request, NSHTTPURLResponse *response, UIImage *image) {
                              weakSelf.imageView.image = image;
                              [weakSelf.imageView setNeedsLayout];
                          } 
                          failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error) {
                              NSLog(@"图片加载失败: %@", error);
                          }];
```

## 总结

AFNetworking 是一个功能强大且易用的网络库，它简化了 iOS 网络编程的复杂性。通过本文介绍的核心功能和最佳实践，你可以：

- ✅ 快速构建健壮的网络层
- ✅ 处理各种网络请求场景
- ✅ 实现文件上传下载
- ✅ 监控网络状态
- ✅ 保障网络安全

### 相关资源

- [AFNetworking GitHub](https://github.com/AFNetworking/AFNetworking)
- [官方文档](https://afnetworking.com/)
- [NSHipster AFNetworking 指南](https://nshipster.com/afnetworking/)

---

**标签**: iOS, Objective-C, 网络编程, AFNetworking, HTTP

**作者**: NattyChao  
**更新时间**: 2025-11-27
