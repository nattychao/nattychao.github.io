import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

// 配置markdown-it，启用HTML标签解析
const md = new MarkdownIt({
  html: true
})

export function usePosts() {
  const posts = ref([])
  const loading = ref(true)

  // 解析Markdown文件的frontmatter（前6行）
  const parseFrontmatter = (content) => {
    let title = ''
    let date = new Date().toISOString().split('T')[0]
    let description = ''
    let tags = []
    
    // 解析frontmatter
    if (content.startsWith('---')) {
      const frontmatterEnd = content.indexOf('---', 3)
      if (frontmatterEnd !== -1) {
        const frontmatter = content.substring(3, frontmatterEnd).trim()
        
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
    
    return { title, date, description, tags }
  }

  // 加载单个文件的前6行（只用于列表页）
  const loadPostHeader = async (fileName) => {
    try {
      const slug = fileName.replace('.md', '')
      const response = await fetch(`/posts/${fileName}`)
      if (!response.ok) {
        return null
      }
      
      // 获取文件内容的前6行
      const reader = response.body.getReader()
      let chunk = ''
      let lines = []
      
      while (lines.length < 6) {
        const { done, value } = await reader.read()
        if (done) break
        
        chunk += new TextDecoder().decode(value)
        lines = chunk.split('\n')
        
        // 如果已经有6行以上，截断到前6行
        if (lines.length >= 6) {
          chunk = lines.slice(0, 6).join('\n')
          break
        }
      }
      
      // 解析frontmatter
      const { title, date, description, tags } = parseFrontmatter(chunk)
      
      return {
        slug,
        title: title || slug,
        date,
        description,
        tags
      }
    } catch (error) {
      console.error('Error loading post header:', error)
      return null
    }
  }

  // 加载完整的文章内容（用于详情页）
  const loadFullPost = async (fileName) => {
    try {
      const slug = fileName.replace('.md', '')
      const response = await fetch(`/posts/${fileName}`)
      if (!response.ok) {
        return null
      }
      
      const content = await response.text()
      
      // 解析frontmatter和内容
      let body = content
      const { title, date, description, tags } = parseFrontmatter(content)
      
      // 获取正文内容
      if (content.startsWith('---')) {
        const frontmatterEnd = content.indexOf('---', 3)
        if (frontmatterEnd !== -1) {
          body = content.substring(frontmatterEnd + 3).trim()
        }
      }
      
      return {
        slug,
        title: title || slug,
        date,
        description,
        tags,
        content: body,
        html: md.render(body),
        readingTime: calculateReadingTime(body)
      }
    } catch (error) {
      console.error('Error loading full post:', error)
      return null
    }
  }

  // 使用fetch API加载所有文章（只加载前6行）
  const loadPosts = async () => {
    try {
      loading.value = true
      const loadedPosts = []
      
      // Fetch the list of posts from the generated JSON file
      const response = await fetch('/posts.json')
      if (!response.ok) {
        throw new Error('Failed to load posts list')
      }
      const postFiles = await response.json()
      
      // 使用Promise.all并行加载所有文章的前6行
      const postPromises = postFiles.map(fileName => loadPostHeader(fileName))
      const postHeaders = await Promise.all(postPromises)
      
      // 过滤掉加载失败的文章
      loadedPosts.push(...postHeaders.filter(post => post !== null))
      
      // 按日期降序排序
      posts.value = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (err) {
      console.error('Error loading posts:', err)
    } finally {
      loading.value = false
    }
  }

  // 获取单个文章的完整内容（用于详情页）
  const getPost = async (slug) => {
    // 先从已加载的文章中查找
    let post = posts.value.find(p => p.slug === slug)
    
    if (post) {
      // 如果文章已加载但没有完整内容，加载完整内容
      if (!post.content) {
        const response = await fetch('/posts.json')
        if (response.ok) {
          const postFiles = await response.json()
          const fileName = postFiles.find(file => file.replace('.md', '') === slug)
          if (fileName) {
            post = await loadFullPost(fileName)
            // 更新posts数组中的文章
            const index = posts.value.findIndex(p => p.slug === slug)
            if (index !== -1) {
              posts.value[index] = post
            }
          }
        }
      }
    } else {
      // 如果文章未加载，先加载posts列表
      if (posts.value.length === 0) {
        await loadPosts()
      }
      
      // 再次查找
      post = posts.value.find(p => p.slug === slug)
      
      // 如果找到但没有完整内容，加载完整内容
      if (post && !post.content) {
        const response = await fetch('/posts.json')
        if (response.ok) {
          const postFiles = await response.json()
          const fileName = postFiles.find(file => file.replace('.md', '') === slug)
          if (fileName) {
            post = await loadFullPost(fileName)
            // 更新posts数组中的文章
            const index = posts.value.findIndex(p => p.slug === slug)
            if (index !== -1) {
              posts.value[index] = post
            }
          }
        }
      }
    }
    
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
