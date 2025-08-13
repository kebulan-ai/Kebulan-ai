"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Copy, Download, ExternalLink } from "lucide-react"
import { DeploymentDialog } from "@/components/deployment/deployment-dialog"
import { useProjectStore } from "@/lib/project-management/project-store"

interface GeneratedFile {
  name: string
  content: string
  language: string
}

interface CodePreviewProps {
  files: GeneratedFile[]
  showCode?: boolean
}

export function CodePreview({ files, showCode = false }: CodePreviewProps) {
  const { currentProject } = useProjectStore()
  const [selectedFile, setSelectedFile] = useState(files[0]?.name || "")

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  if (files.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Preview Available</h3>
          <p className="text-muted-foreground">Start a conversation to generate your app and see the preview here.</p>
        </div>
      </div>
    )
  }

  if (showCode) {
    const currentFile = files.find((f) => f.name === selectedFile) || files[0]

    return (
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{currentFile.name}</h3>
              <Badge variant="outline">{currentFile.language}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleCopy(currentFile.content)}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <pre className="p-6 text-sm font-mono bg-muted/30 min-h-full">
            <code>{currentFile.content}</code>
          </pre>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Live Preview</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
            {currentProject && (
              <DeploymentDialog
                project={currentProject}
                trigger={
                  <Button size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Deploy
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white border-l border-r">
        {/* Mock Preview */}
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto p-8 text-center">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Welcome to Your App</h1>
            <button className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-8 py-3 text-lg font-medium text-white hover:bg-cyan-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="border-t p-4 bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Preview is live and interactive</span>
          <div className="flex items-center space-x-4">
            <span>Desktop View</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
