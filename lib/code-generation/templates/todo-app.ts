import type { AppTemplate } from "../types"

export const todoAppTemplate: AppTemplate = {
  name: "Todo App",
  description: "A feature-rich todo application with categories, priorities, and filters",
  files: [
    {
      name: "app/page.tsx",
      content: `"use client"

import { useState } from "react"
import { TodoHeader } from "@/components/todo/todo-header"
import { TodoForm } from "@/components/todo/todo-form"
import { TodoList } from "@/components/todo/todo-list"
import { TodoFilters } from "@/components/todo/todo-filters"
import { TodoStats } from "@/components/todo/todo-stats"

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  createdAt: Date
  dueDate?: Date
}

export type FilterType = "all" | "active" | "completed"
export type SortType = "created" | "priority" | "dueDate"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [sortBy, setSortBy] = useState<SortType>("created")
  const [searchTerm, setSearchTerm] = useState("")

  const addTodo = (text: string, priority: Todo["priority"], category: string, dueDate?: Date) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      category,
      createdAt: new Date(),
      dueDate,
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ))
  }

  const filteredTodos = todos
    .filter(todo => {
      if (filter === "active") return !todo.completed
      if (filter === "completed") return todo.completed
      return true
    })
    .filter(todo => 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.getTime() - b.dueDate.getTime()
      }
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <TodoHeader />
        <TodoStats todos={todos} />
        <TodoForm onAdd={addTodo} />
        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/todo/todo-header.tsx",
      content: `export function TodoHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
      <p className="text-gray-600">Stay organized and get things done</p>
    </div>
  )
}`,
    },
    {
      name: "components/todo/todo-form.tsx",
      content: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Plus } from 'lucide-react'
import type { Todo } from "@/app/page"

interface TodoFormProps {
  onAdd: (text: string, priority: Todo["priority"], category: string, dueDate?: Date) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("")
  const [priority, setPriority] = useState<Todo["priority"]>("medium")
  const [category, setCategory] = useState("General")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(
        text.trim(),
        priority,
        category,
        dueDate ? new Date(dueDate) : undefined
      )
      setText("")
      setDueDate("")
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!text.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Todo
            </Button>
          </div>
          
          <div className="flex gap-4">
            <Select value={priority} onValueChange={(value: Todo["priority"]) => setPriority(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}`,
    },
    {
      name: "components/todo/todo-list.tsx",
      content: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2, Check, X, Calendar, Tag } from 'lucide-react'
import type { Todo } from "@/app/page"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      onEdit(editingId, editText.trim())
      setEditingId(null)
      setEditText("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  const getPriorityColor = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
    }
  }

  const isOverdue = (dueDate?: Date) => {
    if (!dueDate) return false
    return new Date() > dueDate
  }

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-gray-400 text-lg">No todos found</div>
          <p className="text-gray-500 mt-2">Add a new todo to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <Card key={todo.id} className={\`transition-all \${todo.completed ? "opacity-60" : ""}\`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
              />
              
              <div className="flex-1">
                {editingId === todo.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit()
                        if (e.key === "Escape") cancelEdit()
                      }}
                      autoFocus
                    />
                    <Button size="sm" onClick={saveEdit}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className={\`\${todo.completed ? "line-through text-gray-500" : "text-gray-900"}\`}>
                      {todo.text}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getPriorityColor(todo.priority)}>
                        {todo.priority}
                      </Badge>
                      <Badge variant="outline">
                        <Tag className="h-3 w-3 mr-1" />
                        {todo.category}
                      </Badge>
                      {todo.dueDate && (
                        <Badge variant={isOverdue(todo.dueDate) ? "destructive" : "outline"}>
                          <Calendar className="h-3 w-3 mr-1" />
                          {todo.dueDate.toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {editingId !== todo.id && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditing(todo)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(todo.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}`,
    },
    {
      name: "components/todo/todo-filters.tsx",
      content: `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from 'lucide-react'
import type { FilterType, SortType } from "@/app/page"

interface TodoFiltersProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  sortBy: SortType
  setSortBy: (sort: SortType) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function TodoFilters({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
}: TodoFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
          
          <Select value={sortBy} onValueChange={(value: SortType) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Created Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}`,
    },
    {
      name: "components/todo/todo-stats.tsx",
      content: `import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react'
import type { Todo } from "@/app/page"

interface TodoStatsProps {
  todos: Todo[]
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length
  const completed = todos.filter(todo => todo.completed).length
  const active = total - completed
  const overdue = todos.filter(todo => 
    todo.dueDate && new Date() > todo.dueDate && !todo.completed
  ).length
  const highPriority = todos.filter(todo => 
    todo.priority === "high" && !todo.completed
  ).length

  const stats = [
    {
      label: "Total",
      value: total,
      icon: Circle,
      color: "text-gray-600"
    },
    {
      label: "Active",
      value: active,
      icon: Clock,
      color: "text-blue-600"
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4 text-center">
            <stat.icon className={\`h-6 w-6 mx-auto mb-2 \${stat.color}\`} />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}`,
    },
  ],
}
