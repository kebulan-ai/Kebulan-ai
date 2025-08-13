import type { AppTemplate } from "../types"

export const ecommerceTemplate: AppTemplate = {
  id: "ecommerce",
  name: "E-commerce Store",
  description: "A modern online store with product catalog and shopping cart",
  features: [
    "Product catalog with search and filtering",
    "Shopping cart functionality",
    "Responsive product grid",
    "Product detail pages",
    "Modern checkout flow",
  ],
  techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Zustand (State Management)", "Lucide Icons"],
  files: [
    {
      name: "app/page.tsx",
      language: "typescript",
      type: "page",
      content: (context) => `import { ProductGrid } from '@/components/product-grid'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <ProductGrid />
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/product-grid.tsx",
      language: "typescript",
      type: "component",
      content: `import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart } from 'lucide-react'
import { products } from '@/data/products'

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  $${product.price}
                </span>
                <Button size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}`,
    },
  ],
}
