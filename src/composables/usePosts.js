import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export function usePosts() {
  const posts = ref([])
  const loading = ref(true)

  // 使用fetch API加载所有文章
  const loadPosts = async () => {
    try {
      loading.value = true
      console.log('Starting to load posts...')
      console.log('Current posts count before loading:', posts.value.length)
      const loadedPosts = []
      
      // 直接定义文章列表
      const postFiles = [
        'afnetworking-guide.md',
        'css-grid-complete-guide.md',
        'frontend-security-best-practices.md',
        'frontend-testing-strategies.md',
        'future-web-dev.md',
        'modern-build-tools-comparison.md',
        'react-hooks-best-practices.md',
        'svelte-vs-react.md',
        'typescript-advanced-tips.md',
        'vue3-composition-api.md',
        'web-performance-optimization.md'
      ]
      
      for (const fileName of postFiles) {
        try {
          const slug = fileName.replace('.md', '')
          console.log(`Loading post: ${fileName}`)
          
          // 使用fetch加载文件内容
          const response = await fetch(`/posts/${fileName}`)
          console.log(`Response status for ${fileName}: ${response.status}`)
          if (!response.ok) {
            console.error(`Failed to load ${fileName}: ${response.statusText}`)
            continue
          }
          
          const content = await response.text()
          console.log(`Successfully loaded ${fileName}, content length: ${content.length}`)
          
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
            console.error(`Error parsing frontmatter for ${fileName}:`, frontmatterError)
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
          console.log(`Successfully processed post: ${title}`)
        } catch (error) {
          console.error(`Error loading ${fileName}:`, error)
        }
      }
      
      console.log(`Loaded ${loadedPosts.length} posts in total`)
      // 按日期降序排序
      posts.value = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      console.log('Posts loaded and sorted successfully')
      console.log(`Posts array now has ${posts.value.length} items`)
      console.log('First post title:', posts.value.length > 0 ? posts.value[0].title : 'No posts')
    } catch (err) {
      console.error('Error loading posts:', err)
    } finally {
      loading.value = false
      console.log('Loading posts completed, loading set to false')
    }
  }

  const getPost = async (slug) => {
    console.log(`Getting post with slug: ${slug}`)
    console.log(`Current posts count: ${posts.value.length}`)
    if (posts.value.length === 0) {
      console.log('No posts loaded, loading posts now...')
      await loadPosts()
      console.log(`Posts loaded, new count: ${posts.value.length}`)
    }
    const post = posts.value.find(p => p.slug === slug)
    console.log(`Found post: ${post ? post.title : 'Not found'}`)
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