import { ref } from 'vue'

// 壁纸数据
const wallpapersData = [
  {
    id: 1,
    title: '山川日落',
    description: '壮丽的山川日落景色',
    category: '自然',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/mountain-sunset/800/600.jpg',
    url: 'https://picsum.photos/seed/mountain-sunset/3840/2160.jpg'
  },
  {
    id: 2,
    title: '城市夜景',
    description: '繁华都市的璀璨夜景',
    category: '城市',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/city-night/800/600.jpg',
    url: 'https://picsum.photos/seed/city-night/3840/2160.jpg'
  },
  {
    id: 3,
    title: '抽象艺术',
    description: '色彩斑斓的抽象艺术作品',
    category: '抽象',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/abstract-art/800/600.jpg',
    url: 'https://picsum.photos/seed/abstract-art/3840/2160.jpg'
  },
  {
    id: 4,
    title: '科技未来',
    description: '充满未来感的科技场景',
    category: '科技',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/tech-future/800/600.jpg',
    url: 'https://picsum.photos/seed/tech-future/3840/2160.jpg'
  },
  {
    id: 5,
    title: '森林小径',
    description: '宁静的森林小径',
    category: '自然',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/forest-path/800/600.jpg',
    url: 'https://picsum.photos/seed/forest-path/3840/2160.jpg'
  },
  {
    id: 6,
    title: '摩天大楼',
    description: '现代都市的摩天大楼',
    category: '城市',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/skyscrapers/800/600.jpg',
    url: 'https://picsum.photos/seed/skyscrapers/3840/2160.jpg'
  },
  {
    id: 7,
    title: '几何图案',
    description: '精美的几何图案设计',
    category: '抽象',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/geometric-pattern/800/600.jpg',
    url: 'https://picsum.photos/seed/geometric-pattern/3840/2160.jpg'
  },
  {
    id: 8,
    title: '数字代码',
    description: '数字时代的代码艺术',
    category: '科技',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/digital-code/800/600.jpg',
    url: 'https://picsum.photos/seed/digital-code/3840/2160.jpg'
  },
  {
    id: 9,
    title: '油画作品',
    description: '精美的油画艺术作品',
    category: '艺术',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/oil-painting/800/600.jpg',
    url: 'https://picsum.photos/seed/oil-painting/3840/2160.jpg'
  },
  {
    id: 10,
    title: '可爱猫咪',
    description: '萌萌的小猫咪',
    category: '动物',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/cute-cat/800/600.jpg',
    url: 'https://picsum.photos/seed/cute-cat/3840/2160.jpg'
  },
  {
    id: 11,
    title: '海滩日落',
    description: '美丽的海滩日落景色',
    category: '自然',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/beach-sunset/800/600.jpg',
    url: 'https://picsum.photos/seed/beach-sunset/3840/2160.jpg'
  },
  {
    id: 12,
    title: '街头艺术',
    description: '城市街头的涂鸦艺术',
    category: '艺术',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/street-art/800/600.jpg',
    url: 'https://picsum.photos/seed/street-art/3840/2160.jpg'
  },
  {
    id: 13,
    title: '忠诚狗狗',
    description: '忠诚可爱的狗狗',
    category: '动物',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/loyal-dog/800/600.jpg',
    url: 'https://picsum.photos/seed/loyal-dog/3840/2160.jpg'
  },
  {
    id: 14,
    title: '未来城市',
    description: '充满科技感的未来城市',
    category: '科技',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/future-city/800/600.jpg',
    url: 'https://picsum.photos/seed/future-city/3840/2160.jpg'
  },
  {
    id: 15,
    title: '色彩爆炸',
    description: '绚丽的色彩爆炸效果',
    category: '抽象',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/color-explosion/800/600.jpg',
    url: 'https://picsum.photos/seed/color-explosion/3840/2160.jpg'
  },
  {
    id: 16,
    title: '古老街道',
    description: '历史悠久的古老街道',
    category: '城市',
    resolution: '3840×2160',
    format: 'jpg',
    thumbnail: 'https://picsum.photos/seed/ancient-street/800/600.jpg',
    url: 'https://picsum.photos/seed/ancient-street/3840/2160.jpg'
  }
]

export function useWallpapers() {
  const wallpapers = ref([])
  const loading = ref(false)

  // 加载壁纸数据
  const loadWallpapers = async () => {
    loading.value = true
    try {
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      wallpapers.value = wallpapersData
    } catch (error) {
      console.error('加载壁纸数据失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 根据ID获取壁纸
  const getWallpaperById = (id) => {
    return wallpapers.value.find(wallpaper => wallpaper.id === id)
  }

  return {
    wallpapers,
    loading,
    loadWallpapers,
    getWallpaperById
  }
}