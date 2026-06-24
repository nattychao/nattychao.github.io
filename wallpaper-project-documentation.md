# 壁纸列表项目文档

## 1. 数据源 (sources)

### 壁纸源列表
| 名称 | 值 |
|------|-----|
| 全部壁纸源 | "" |
| Infinity风景 | "InfinityLandscape" |
| Infinity动漫 | "Infinity" |
| Bing | "bing" |
| Unsplash | "Unsplash" |
| Life Of Pix | "Life+Of+Pix" |
| MMT | "MMT" |
| Realistic Shots | "Realistic+Shots" |
| Jay Mantri | "Jay+Mantri" |
| Free Nature Stock | "Free+Nature" |
| Skitter Photo | "Skitter+Photo" |
| Startup Stock Photos | "Startup+Stock+Photos" |
| Barn Images | "Barn+Images" |
| Picography | "Picography" |

## 2. 标签 (availableTags)

### 可用标签列表
| 名称 | 值 |
|------|-----|
| 全部 | "" |
| 自然 | "nature" |
| 海洋 | "ocean" |
| 建筑 | "architecture" |
| 动物 | "animals" |
| 旅行 | "travel" |
| 美食 | "food-drink" |
| 动漫 | "anime" |
| 运动 | "athletics" |
| 技术 | "technology" |
| 街头 | "street-photography" |
| Bing每日 | "Bing" |

## 3. API 请求信息

### 请求地址
```
https://api.infinitynewtab.com/v2/get_wallpaper_list
```

### 请求参数
| 参数名 | 默认值 | 说明 |
|--------|--------|------|
| client | "pc" | 客户端类型 |
| source | "" | 壁纸源 |
| page | 0 | 页码（从0开始） |
| color | "" | 颜色筛选 |
| tag | "" | 标签筛选 |
| order | "" | 排序方式 |

### 完整请求示例
```
https://api.infinitynewtab.com/v2/get_wallpaper_list?client=pc&source=Unsplash&page=0&color=&tag=nature&order=
```

## 4. API 响应结构
```javascript
{
  "data": {
    "list": [
      {
        "_id": "壁纸ID",
        "src": {
          "rawSrc": "原始图片地址"
        },
        "source": "壁纸来源",
        "dimensions": "分辨率",
        "colors": ["颜色1", "颜色2"]
      }
    ],
    "count": 总数量,
    "totalPages": 总页数
  }
}
```

## 5. 图片处理
项目使用 wsrv.nl 服务处理图片链接，避免防盗链问题：
- 缩略图：`https://wsrv.nl/?url=${encodeURIComponent(rawSrc)}&w=600`
- 大图：`https://wsrv.nl/?url=${encodeURIComponent(rawSrc)}`

## 6. 实现要点
1. 使用 Vue 3 Composition API
2. 响应式数据管理
3. 分页功能
4. 标签筛选
5. 图片懒加载
6. 图片预览功能（使用 PhotoSwipe）
7. 响应式布局

此文档可作为新建壁纸列表项目的参考，包含了完整的数据源、标签、API 请求信息和实现要点。
