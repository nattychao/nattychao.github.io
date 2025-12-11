import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

// 配置markdown-it，启用HTML标签解析
const md = new MarkdownIt({
  html: true
})

export function usePosts() {
  const posts = ref([])
  const loading = ref(true)

  // 使用fetch API加载所有文章
  const loadPosts = async () => {
    try {
      loading.value = true
      const loadedPosts = []
      
      // 直接定义文章列表（这里有问题，使用扫描文件夹的做法最简单，但是发到线上会报错，另一种发方式是在这里列出列表，目前用的json文件）
      // Fetch the list of posts from the generated JSON file
      const response = await fetch('/posts.json')
      if (!response.ok) {
        throw new Error('Failed to load posts list')
      }
      const postFiles = await response.json()
      
      for (const fileName of postFiles) {
        try {
          const slug = fileName.replace('.md', '')
          
          // 使用fetch加载文件内容
          const response = await fetch(`/posts/${fileName}`)
          if (!response.ok) {
            continue
          }
          
          const content = await response.text()
          
          // 简单解析frontmatter
          let title = slug
          let date = new Date().toISOString().split('T')[0]
          let description = ''
          let tags = []
          let body = content
          
          try {
            // 检查是否有frontmatter
            if (content.startsWith('---')) {
              const frontmatterEnd = content.indexOf('---', 3)
              if (frontmatterEnd !== -1) {
                const frontmatter = content.substring(3, frontmatterEnd).trim()
                body = content.substring(frontmatterEnd + 3).trim()
                
                // 解析frontmatter
                const lines = frontmatter.split('\n')
                lines.forEach(line => {
                  const colonIndex = line.indexOf(':')
                  if (colonIndex > 0) {
                    const key = line.substring(0, colonIndex).trim()
                    let value = line.substring(colonIndex + 1).trim()
                    
                    // 处理引号
                    if ((value.startsWith('"') && value.endsWith('"')) || 
                        (value.startsWith("'") && value.endsWith("'"))) {
                      value = value.slice(1, -1)
                    }
                    
                    // 处理数组
                    if (value.startsWith('[') && value.endsWith(']')) {
                      value = value.slice(1, -1).split(',').map(item => {
                        item = item.trim()
                        if ((item.startsWith('"') && item.endsWith('"')) || 
                            (item.startsWith("'") && item.endsWith("'"))) {
                          item = item.slice(1, -1)
                        }
                        return item
                      })
                    }
                    
                    switch(key) {
                      case 'title':
                        title = value
                        break
                      case 'date':
                        date = value
                        break
                      case 'description':
                        description = value
                        break
                      case 'tags':
                        tags = Array.isArray(value) ? value : [value]
                        break
                    }
                  }
                })
              }
            }
          } catch (frontmatterError) {
            // 如果frontmatter解析失败，使用默认值
            body = content
          }
          
          loadedPosts.push({
            slug,
            title,
            date,
            description,
            tags,
            content: body,
            html: md.render(body),
            readingTime: calculateReadingTime(body)
          })
        } catch (error) {
          // 错误处理
        }
      }
      
      // 按日期降序排序
      posts.value = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (err) {
      // 错误处理
    } finally {
      loading.value = false
    }
  }

  const getPost = async (slug) => {
    if (posts.value.length === 0) {
      await loadPosts()
    }
    const post = posts.value.find(p => p.slug === slug)
    return post
  }

  return {
    posts,
    loading,
    loadPosts,
    getPost
  }
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
