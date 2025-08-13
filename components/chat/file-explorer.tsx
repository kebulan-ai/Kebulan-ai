"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Folder, ChevronRight, ChevronDown } from "lucide-react"

interface GeneratedFile {
  name: string
  content: string
  language: string
}

interface FileExplorerProps {
  files: GeneratedFile[]
  onFileSelect?: (fileName: string) => void
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["components"]))
  const [selectedFile, setSelectedFile] = useState<string>("")

  // Group files by directory
  const fileTree = files.reduce((tree, file) => {
    const parts = file.name.split("/")
    let current = tree

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // It's a file
        if (!current.files) current.files = []
        current.files.push(file)
      } else {
        // It's a directory
        if (!current.directories) current.directories = {}
        if (!current.directories[part]) {
          current.directories[part] = {}
        }
        current = current.directories[part]
      }
    })

    return tree
  }, {} as any)

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpandedFolders(newExpanded)
  }

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName)
    onFileSelect?.(fileName)
  }

  const renderTree = (node: any, path = "", level = 0) => {
    const items = []

    // Render directories
    if (node.directories) {
      Object.entries(node.directories).forEach(([name, subNode]) => {
        const fullPath = path ? `${path}/${name}` : name
        const isExpanded = expandedFolders.has(fullPath)

        items.push(
          <div key={fullPath}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start h-8 px-2"
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
              <Folder className="w-4 h-4 mr-2" />
              <span className="text-sm">{name}</span>
            </Button>
            {isExpanded && renderTree(subNode, fullPath, level + 1)}
          </div>,
        )
      })
    }

    // Render files
    if (node.files) {
      node.files.forEach((file: GeneratedFile) => {
        items.push(
          <Button
            key={file.name}
            variant="ghost"
            size="sm"
            className={`w-full justify-start h-8 px-2 ${selectedFile === file.name ? "bg-accent" : ""}`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => handleFileClick(file.name)}
          >
            <FileText className="w-4 h-4 mr-2" />
            <span className="text-sm">{file.name.split("/").pop()}</span>
          </Button>,
        )
      })
    }

    return items
  }

  if (files.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No files generated yet</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm">Project Files</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">{renderTree(fileTree)}</div>
      </ScrollArea>
    </div>
  )
}
