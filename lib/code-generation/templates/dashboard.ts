import type { AppTemplate } from "../types"

export const dashboardTemplate: AppTemplate = {
  name: "Dashboard",
  description: "A comprehensive admin dashboard with analytics and management features",
  files: [
    {
      name: "app/page.tsx",
      content: `import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          
          <StatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <AnalyticsChart />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/dashboard/dashboard-header.tsx",
      content: `import { Bell, Search, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}`,
    },
    {
      name: "components/dashboard/dashboard-sidebar.tsx",
      content: `import { BarChart3, Home, Settings, Users, FileText, ShoppingCart } from 'lucide-react'

const navigation = [
  { name: "Dashboard", icon: Home, current: true },
  { name: "Analytics", icon: BarChart3, current: false },
  { name: "Users", icon: Users, current: false },
  { name: "Orders", icon: ShoppingCart, current: false },
  { name: "Reports", icon: FileText, current: false },
  { name: "Settings", icon: Settings, current: false },
]

export function DashboardSidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 lg:block hidden">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={\`flex items-center px-4 py-2 text-sm font-medium rounded-lg \${
                  item.current
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }\`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}`,
    },
    {
      name: "components/dashboard/stats-cards.tsx",
      content: `import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
    trend: "up"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Orders",
    value: "12,234",
    change: "+19%",
    icon: ShoppingCart,
    trend: "up"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+4.75%",
    icon: TrendingUp,
    trend: "up"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}`,
    },
    {
      name: "components/dashboard/recent-activity.tsx",
      content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    user: "John Doe",
    action: "created a new order",
    time: "2 minutes ago",
    initials: "JD"
  },
  {
    user: "Jane Smith",
    action: "updated user profile",
    time: "5 minutes ago",
    initials: "JS"
  },
  {
    user: "Mike Johnson",
    action: "completed payment",
    time: "10 minutes ago",
    initials: "MJ"
  },
  {
    user: "Sarah Wilson",
    action: "left a review",
    time: "15 minutes ago",
    initials: "SW"
  }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.action}
                </p>
              </div>
              <div className="text-xs text-gray-400">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}`,
    },
    {
      name: "components/dashboard/analytics-chart.tsx",
      content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-400 mb-2">📊</div>
            <p className="text-gray-500">Chart visualization would go here</p>
            <p className="text-sm text-gray-400 mt-1">
              Integrate with your preferred charting library
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}`,
    },
  ],
}
