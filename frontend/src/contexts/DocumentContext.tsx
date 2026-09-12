import { createContext, useContext, useState, type ReactNode } from 'react'

export interface DocTab {
  id: string
  title: string
  modified: string
  unsaved?: boolean
}

interface DocumentContextType {
  tabs: DocTab[]
  activeTabId: string
  viewMode: 'visual' | 'markdown'
  drawerOpen: boolean
  importOpen: boolean
  exportOpen: boolean
  setActiveTabId: (id: string) => void
  closeTab: (id: string) => void
  addTab: () => void
  toggleViewMode: () => void
  setDrawerOpen: (v: boolean) => void
  setImportOpen: (v: boolean) => void
  setExportOpen: (v: boolean) => void
}

const DocumentContext = createContext<DocumentContextType | null>(null)

const INITIAL_TABS: DocTab[] = [
  { id: 't1', title: '产品需求文档 v2.3', modified: '2026-09-12 14:30', unsaved: true },
  { id: 't2', title: 'API 接口设计说明', modified: '2026-09-11 09:15' },
  { id: 't3', title: '设计规范 · 组件库', modified: '2026-09-10 16:45' },
  { id: 't4', title: '部署运维手册', modified: '2026-09-09 11:20' },
]

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<DocTab[]>(INITIAL_TABS)
  const [activeTabId, setActiveTabId] = useState('t1')
  const [viewMode, setViewMode] = useState<'visual' | 'markdown'>('visual')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  const closeTab = (id: string) => {
    const rest = tabs.filter((t) => t.id !== id)
    setTabs(rest)
    if (activeTabId === id && rest.length > 0) {
      setActiveTabId(rest[rest.length - 1].id)
    }
  }

  const addTab = () => {
    const id = `t${Date.now()}`
    const n = tabs.length + 1
    setTabs([...tabs, { id, title: `新建文档 ${n}`, modified: new Date().toISOString().slice(0, 16).replace('T', ' '), unsaved: true }])
    setActiveTabId(id)
  }

  const toggleViewMode = () => setViewMode((v) => (v === 'visual' ? 'markdown' : 'visual'))

  return (
    <DocumentContext.Provider
      value={{
        tabs, activeTabId, viewMode, drawerOpen, importOpen, exportOpen,
        setActiveTabId, closeTab, addTab, toggleViewMode,
        setDrawerOpen, setImportOpen, setExportOpen,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocument() {
  const ctx = useContext(DocumentContext)
  if (!ctx) throw new Error('useDocument must be within DocumentProvider')
  return ctx
}
