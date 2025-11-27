import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export function usePosts() {
  const posts = ref([])
  const loading = ref(true)

  const loadPosts = async () => {
    const modules = import.meta.glob('../posts/*.md', { as: 'raw' })
    const loadedPosts = []

    for (const path in modules) {
      const content = await modules[path]()
      const { attributes, body } = parseFrontmatter(content)
      const slug = path.split('/').pop().replace('.md', '')
      
      loadedPosts.push({
        slug,
        ...attributes,
        body,
        html: md.render(body)
      })
    }

    posts.value = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    loading.value = false
  }

  const getPost = async (slug) => {
    if (posts.value.length === 0) {
      await loadPosts()
    }
    return posts.value.find(p => p.slug === slug)
  }

  return {
    posts,
    loading,
    loadPosts,
    getPost
  }
}

function parseFrontmatter(content) {
  const pattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(pattern)
  
  if (!match) {
    return {
      attributes: {},
      body: content
    }
  }

  const attributes = {}
  const frontmatter = match[1]
  const body = match[2]

  frontmatter.split('\n').forEach(line => {
    const [key, ...value] = line.split(':')
    if (key && value) {
      attributes[key.trim()] = value.join(':').trim()
    }
  })

  return { attributes, body }
}
