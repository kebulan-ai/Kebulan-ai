import type { AppTemplate } from "../types"

export const blogTemplate: AppTemplate = {
  name: "Blog",
  description: "A modern blog with posts, categories, and comments",
  files: [
    {
      name: "app/page.tsx",
      content: `import { BlogHeader } from "@/components/blog/blog-header"
import { BlogPost } from "@/components/blog/blog-post"
import { BlogSidebar } from "@/components/blog/blog-sidebar"

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js and React.",
    content: "Next.js is a powerful React framework that makes building web applications easier...",
    author: "John Doe",
    date: "2024-01-15",
    category: "Technology",
    image: "/nextjs-blog-post.png"
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies in web development.",
    content: "Web development is constantly evolving with new frameworks and tools...",
    author: "Jane Smith",
    date: "2024-01-10",
    category: "Web Development",
    image: "/future-web-development.png"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/blog/blog-header.tsx",
      content: `import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BlogHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Blog</h1>
            <p className="text-gray-600 mt-1">Thoughts, stories and ideas</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts..."
                className="pl-10 w-64"
              />
            </div>
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </header>
  )
}`,
    },
    {
      name: "components/blog/blog-post.tsx",
      content: `import { Calendar, User, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogPostProps {
  post: {
    id: number
    title: string
    excerpt: string
    author: string
    date: string
    category: string
    image: string
  }
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
          <Badge variant="secondary">
            <Tag className="h-3 w-3 mr-1" />
            {post.category}
          </Badge>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
          {post.title}
        </h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
        <button className="text-blue-600 hover:text-blue-800 font-medium mt-4">
          Read more →
        </button>
      </CardContent>
    </Card>
  )
}`,
    },
    {
      name: "components/blog/blog-sidebar.tsx",
      content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BlogSidebar() {
  const categories = ["Technology", "Web Development", "Design", "Programming", "AI"]
  const recentPosts = [
    "Getting Started with Next.js",
    "The Future of Web Development",
    "Building Better UIs",
    "JavaScript Best Practices"
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Welcome to my blog where I share insights about web development, 
            technology trends, and programming best practices.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-gray-100">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={post}>
                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                  {post}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}`,
    },
  ],
}
