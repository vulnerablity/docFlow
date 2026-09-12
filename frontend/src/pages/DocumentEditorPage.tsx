import { useState } from 'react'
import AppShell from '../components/AppShell'
import { DocumentProvider, useDocument, type DocTab } from '../contexts/DocumentContext'

// ─── Shared primitives ────────────────────────────────────────────────────

function Annotation({ text }: { text: string }) {
  return (
    <span className="text-[9px] font-mono text-[#bbb] border border-dashed border-[#e0e0e0] px-1.5 py-0.5 inline-block">
      {text}
    </span>
  )
}

// ─── Tab Bar ─────────────────────────────────────────────────────────────

function TabBar({ compact, showHamburger }: { compact?: boolean; showHamburger?: boolean }) {
  const { tabs, activeTabId, setActiveTabId, closeTab, addTab, setDrawerOpen } = useDocument()

  return (
    <div className="flex items-end border-b border-[#d1d1d1] bg-[#f5f5f5] shrink-0 overflow-hidden">
      {showHamburger && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-3 py-2 text-sm text-[#666] hover:bg-[#e8e8e8] border-r border-[#d1d1d1] shrink-0 self-stretch flex items-center"
          title="目录"
        >
          ≡
        </button>
      )}
      {/* Tabs scroll area */}
      <div className="flex items-end overflow-x-auto flex-1" style={{ scrollbarWidth: 'none' }}>
        {tabs.map((tab) => {
          const active = tab.id === activeTabId
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-1.5 border-t border-l border-r shrink-0 cursor-pointer select-none transition-colors ${
                compact ? 'px-2 py-1' : 'px-3 py-1.5'
              } ${
                active
                  ? 'bg-white border-[#d1d1d1] border-b-white text-[#1a1a1a] font-medium relative -mb-px'
                  : 'bg-[#ececec] border-[#d1d1d1] text-[#888] hover:bg-[#e4e4e4]'
              }`}
            >
              {tab.unsaved && (
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-[#888]' : 'bg-[#bbb]'}`} />
              )}
              <span className={`${compact ? 'text-[10px] max-w-[80px]' : 'text-xs max-w-[140px]'} truncate`}>
                {tab.title}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); closeTab(tab.id) }}
                className="text-[#bbb] hover:text-[#666] shrink-0 leading-none text-[10px]"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
      {/* New tab */}
      <button
        onClick={addTab}
        className="px-2.5 py-1.5 text-[#888] hover:text-[#1a1a1a] hover:bg-[#e8e8e8] shrink-0 text-sm border-l border-[#d1d1d1] self-stretch flex items-center"
        title="新建文档"
      >
        +
      </button>
    </div>
  )
}

// ─── Toolbar ─────────────────────────────────────────────────────────────

function Toolbar({ collapsed }: { collapsed?: boolean }) {
  const { viewMode, toggleViewMode, setImportOpen, setExportOpen } = useDocument()
  const [moreOpen, setMoreOpen] = useState(false)
  const [fontOpen, setFontOpen] = useState(false)

  const primary = [
    { label: '新建', icon: '＋', onClick: () => {} },
    { label: '保存', icon: '↓', onClick: () => {} },
  ]
  const secondary = [
    { label: '导入', icon: '↑', onClick: () => setImportOpen(true) },
    { label: '导出', icon: '↗', onClick: () => setExportOpen(true) },
  ]

  const BtnBase = 'flex items-center gap-1 px-2.5 py-1 text-xs border border-[#d1d1d1] bg-white hover:bg-[#f0f0f0] cursor-pointer whitespace-nowrap transition-colors'
  const BtnPrimary = 'flex items-center gap-1 px-2.5 py-1 text-xs bg-[#1a1a1a] text-white hover:bg-[#333] cursor-pointer whitespace-nowrap transition-colors'

  return (
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#d1d1d1] bg-white shrink-0 relative">
      {/* Primary actions */}
      {primary.map((b) => (
        <button key={b.label} onClick={b.onClick} className={BtnBase}>
          <span className="text-[#888]">{b.icon}</span> {b.label}
        </button>
      ))}

      <div className="w-px h-4 bg-[#e0e0e0] mx-0.5" />

      {/* Secondary (hidden when collapsed) */}
      {!collapsed ? (
        <>
          {secondary.map((b) => (
            <button key={b.label} onClick={b.onClick} className={BtnBase}>
              <span className="text-[#888]">{b.icon}</span> {b.label}
            </button>
          ))}
          <div className="w-px h-4 bg-[#e0e0e0] mx-0.5" />

          {/* View mode toggle */}
          <div className="flex border border-[#d1d1d1] overflow-hidden">
            <button
              onClick={() => viewMode !== 'visual' && toggleViewMode()}
              className={`px-2.5 py-1 text-xs transition-colors ${
                viewMode === 'visual' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#888] hover:bg-[#f0f0f0]'
              }`}
            >
              ⊞ 可视化
            </button>
            <button
              onClick={() => viewMode !== 'markdown' && toggleViewMode()}
              className={`px-2.5 py-1 text-xs border-l border-[#d1d1d1] transition-colors ${
                viewMode === 'markdown' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#888] hover:bg-[#f0f0f0]'
              }`}
            >
              M↓ Markdown
            </button>
          </div>

          <div className="w-px h-4 bg-[#e0e0e0] mx-0.5" />

          {/* Font picker */}
          <div className="relative">
            <button
              onClick={() => setFontOpen((v) => !v)}
              className={BtnBase}
            >
              字体 A ▾
            </button>
            {fontOpen && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-[#d1d1d1] shadow-sm z-20">
                {['正文 / Inter', '标题 / 思源黑体', '代码 / JetBrains Mono', '等宽 / Courier'].map((f) => (
                  <button key={f} onClick={() => setFontOpen(false)} className="w-full text-left px-3 py-1.5 text-xs text-[#1a1a1a] hover:bg-[#f5f5f5]">
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Collapsed: show "更多" menu */
        <div className="relative">
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className={BtnBase}
          >
            更多 ▾
          </button>
          {moreOpen && (
            <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-[#d1d1d1] shadow-sm z-20">
              {[...secondary, { label: '字体设置', icon: 'A', onClick: () => {} }, { label: '切换视图', icon: '⊞', onClick: toggleViewMode }].map((b) => (
                <button key={b.label} onClick={() => { b.onClick(); setMoreOpen(false) }} className="w-full text-left px-3 py-1.5 text-xs text-[#1a1a1a] hover:bg-[#f5f5f5] flex items-center gap-2">
                  <span className="text-[#aaa]">{b.icon}</span> {b.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Current mode badge */}
      <span className="text-[9px] font-mono text-[#bbb] hidden xl:block">
        {viewMode === 'visual' ? '⊞ 可视化块编辑' : 'M↓ Markdown 源码'}
      </span>
    </div>
  )
}

// ─── File Tree ────────────────────────────────────────────────────────────

const TREE = [
  {
    name: '产品研发', open: true, children: [
      { name: '需求文档', open: true, children: [
        { name: '产品需求文档 v2.3', active: true },
        { name: '用户故事地图' },
      ] },
      { name: '设计资源', open: false, children: [] },
    ],
  },
  {
    name: '技术文档', open: false, children: [
      { name: 'API 接口说明' },
      { name: '部署运维手册' },
    ],
  },
  { name: '管理文档', open: false, children: [] },
]

interface TreeNode {
  name: string
  open?: boolean
  active?: boolean
  children?: TreeNode[]
}

function TreeNodeRow({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(node.open ?? false)
  const isFolder = node.children !== undefined
  return (
    <div>
      <div
        onClick={() => isFolder && setOpen((v) => !v)}
        className={`flex items-center gap-1 px-2 py-1 text-xs cursor-pointer select-none transition-colors ${
          node.active
            ? 'bg-[#1a1a1a] text-white'
            : 'text-[#444] hover:bg-[#ececec]'
        }`}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        {isFolder ? (
          <span className="text-[#aaa] text-[10px] w-3 shrink-0">{open ? '▾' : '▸'}</span>
        ) : (
          <span className="text-[#ccc] text-[10px] w-3 shrink-0">·</span>
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {isFolder && open && node.children?.map((child, i) => (
        <TreeNodeRow key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

function FileTree() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8f8f8] border-r border-[#d1d1d1]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#e8e8e8] shrink-0">
        <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest">目录树</span>
        <button className="text-[10px] text-[#bbb] hover:text-[#666]">＋</button>
      </div>
      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-1">
        {TREE.map((node, i) => (
          <TreeNodeRow key={i} node={node} />
        ))}
      </div>
      {/* Drag handle annotation */}
      <div className="px-3 py-1.5 border-t border-[#e8e8e8]">
        <span className="text-[9px] font-mono text-[#ccc]">← 拖拽分割线调整宽度</span>
      </div>
    </div>
  )
}

// ─── Block Editor ─────────────────────────────────────────────────────────

function BlockEditorVisual() {
  return (
    <div className="max-w-[680px] mx-auto px-8 py-6 flex flex-col gap-4">
      {/* H1 block */}
      <div className="group relative">
        <div className="absolute -left-5 top-1 text-[9px] font-mono text-[#d8d8d8] opacity-0 group-hover:opacity-100 select-none">H1</div>
        <h1 className="text-2xl font-semibold text-[#1a1a1a] border-b border-transparent hover:border-[#e0e0e0] pb-1 cursor-text outline-none"
          contentEditable suppressContentEditableWarning>
          产品需求文档 v2.3
        </h1>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-[#bbb]">
        <span>作者：张伟</span>
        <span>·</span>
        <span>最后修改：2026-09-12 14:30</span>
        <span>·</span>
        <span>版本：v2.3</span>
      </div>

      {/* Paragraph block */}
      <div className="group relative">
        <div className="absolute -left-5 top-1 text-[9px] font-mono text-[#d8d8d8] opacity-0 group-hover:opacity-100 select-none">¶</div>
        <p className="text-sm text-[#444] leading-7 cursor-text" contentEditable suppressContentEditableWarning>
          本文档定义 DocFlow 企业版 v2.3 的核心功能需求，面向产品、设计、研发和测试团队。内容涵盖功能模块描述、用户故事、验收标准及技术约束。
        </p>
      </div>

      {/* Section heading */}
      <h2 className="text-base font-semibold text-[#1a1a1a] mt-2 border-b border-[#e8e8e8] pb-2 cursor-text"
        contentEditable suppressContentEditableWarning>
        1. 功能需求清单
      </h2>

      {/* List block */}
      <div className="group relative">
        <div className="absolute -left-5 top-1 text-[9px] font-mono text-[#d8d8d8] opacity-0 group-hover:opacity-100 select-none">UL</div>
        <ul className="flex flex-col gap-1.5">
          {[
            '文档编辑器：支持可视化与 Markdown 双模式，块级编辑',
            '账号体系：登录、注册、个人中心、权限管理',
            '文件管理：目录树、多标签、导入导出（.md / .docx / .pdf）',
            '协同功能：实时多人编辑、评论、版本历史',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#444]">
              <span className="text-[#bbb] shrink-0 mt-0.5">·</span>
              <span contentEditable suppressContentEditableWarning>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Table block */}
      <div className="group relative">
        <div className="absolute -left-5 top-2 text-[9px] font-mono text-[#d8d8d8] opacity-0 group-hover:opacity-100 select-none">TB</div>
        <div className="border border-[#d1d1d1] overflow-hidden text-xs">
          <div className="grid grid-cols-4 bg-[#f5f5f5] border-b border-[#d1d1d1]">
            {['模块', '优先级', '负责人', '状态'].map((h) => (
              <div key={h} className="px-3 py-2 font-medium text-[#1a1a1a] border-r last:border-r-0 border-[#d1d1d1]">{h}</div>
            ))}
          </div>
          {[
            ['文档编辑器', 'P0', '张伟 / 前端', '开发中'],
            ['账号体系', 'P0', '李明 / 后端', '已完成'],
            ['文件管理', 'P1', '王芳 / 前端', '设计中'],
            ['协同功能', 'P2', '赵强 / 全栈', '规划中'],
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 border-b last:border-b-0 border-[#e8e8e8] hover:bg-[#f8f8f8]">
              {row.map((cell, j) => (
                <div key={j} className="px-3 py-1.5 text-[#444] border-r last:border-r-0 border-[#e8e8e8]">{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Image placeholder block */}
      <div className="group relative">
        <div className="absolute -left-5 top-2 text-[9px] font-mono text-[#d8d8d8] opacity-0 group-hover:opacity-100 select-none">IMG</div>
        <div className="border border-dashed border-[#d1d1d1] bg-[#f8f8f8] h-28 flex flex-col items-center justify-center gap-1">
          <span className="text-[#ccc] text-lg">⊡</span>
          <span className="text-[10px] font-mono text-[#ccc]">图片块 · 点击上传或拖拽</span>
        </div>
      </div>
    </div>
  )
}

function BlockEditorMarkdown() {
  const MD = `# 产品需求文档 v2.3

> 作者：张伟 · 最后修改：2026-09-12 14:30 · 版本：v2.3

本文档定义 DocFlow 企业版 v2.3 的核心功能需求，面向产品、
设计、研发和测试团队。

## 1. 功能需求清单

- 文档编辑器：支持可视化与 Markdown 双模式，块级编辑
- 账号体系：登录、注册、个人中心、权限管理
- 文件管理：目录树、多标签、导入导出
- 协同功能：实时多人编辑、评论、版本历史

## 2. 功能模块详情

| 模块     | 优先级 | 负责人        | 状态   |
|----------|--------|---------------|--------|
| 文档编辑 | P0     | 张伟 / 前端   | 开发中 |
| 账号体系 | P0     | 李明 / 后端   | 已完成 |
| 文件管理 | P1     | 王芳 / 前端   | 设计中 |
| 协同功能 | P2     | 赵强 / 全栈   | 规划中 |

## 3. 非功能需求

- 首屏加载 < 2s
- 支持 Chrome / Firefox / Safari 最新两个版本
- 数据实时同步延迟 < 500ms
`

  return (
    <div className="flex-1 overflow-hidden relative">
      <textarea
        className="w-full h-full resize-none p-6 text-xs font-mono text-[#444] leading-6 bg-white focus:outline-none"
        defaultValue={MD}
      />
      <div className="absolute top-2 right-3">
        <span className="text-[9px] font-mono text-[#ddd]">Markdown 源码视图</span>
      </div>
    </div>
  )
}

function BlockEditor() {
  const { viewMode } = useDocument()
  return (
    <div className="flex-1 bg-white overflow-y-auto flex flex-col">
      {viewMode === 'visual' ? <BlockEditorVisual /> : <BlockEditorMarkdown />}
    </div>
  )
}

// ─── Modals ───────────────────────────────────────────────────────────────

function ImportModal() {
  const { setImportOpen } = useDocument()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={() => setImportOpen(false)} />
      <div className="relative w-96 bg-white border border-[#d1d1d1] shadow-lg">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e8e8e8]">
          <h2 className="text-sm font-semibold text-[#1a1a1a]">导入文件</h2>
          <button onClick={() => setImportOpen(false)} className="text-[#aaa] hover:text-[#666] text-sm">✕</button>
        </div>
        <div className="px-5 py-5 flex flex-col gap-4">
          {/* Drop zone */}
          <div className="border-2 border-dashed border-[#d1d1d1] bg-[#f8f8f8] h-28 flex flex-col items-center justify-center gap-2 hover:border-[#1a1a1a] transition-colors cursor-pointer">
            <span className="text-2xl text-[#ccc]">↑</span>
            <span className="text-xs text-[#888]">拖拽文件到此处，或点击选择</span>
            <span className="text-[10px] font-mono text-[#bbb]">.md · .docx · .txt · .html</span>
          </div>
          {/* Format options */}
          <div>
            <div className="text-[10px] font-mono text-[#aaa] uppercase tracking-widest mb-2">支持格式</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { fmt: 'Markdown (.md)', desc: '标准 Markdown 语法' },
                { fmt: 'Word (.docx)', desc: '微软 Office 文档' },
                { fmt: 'Plain Text (.txt)', desc: '纯文本文件' },
                { fmt: 'HTML (.html)', desc: '网页源码' },
              ].map((f) => (
                <label key={f.fmt} className="flex items-start gap-2 p-2 border border-[#e8e8e8] hover:bg-[#f5f5f5] cursor-pointer">
                  <input type="radio" name="importFormat" className="mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-[#1a1a1a] font-medium">{f.fmt}</div>
                    <div className="text-[10px] text-[#aaa]">{f.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-[#e8e8e8] bg-[#f8f8f8]">
          <button onClick={() => setImportOpen(false)} className="px-4 py-1.5 text-xs border border-[#d1d1d1] bg-white hover:bg-[#f0f0f0]">
            取消
          </button>
          <button className="px-4 py-1.5 text-xs bg-[#1a1a1a] text-white hover:bg-[#333]">
            确认导入
          </button>
        </div>
      </div>
    </div>
  )
}

function ExportModal() {
  const { setExportOpen, tabs, activeTabId } = useDocument()
  const activeTab = tabs.find((t) => t.id === activeTabId)
  const [selected, setSelected] = useState('Markdown')
  const formats = [
    { name: 'Markdown', ext: '.md', desc: '保留原始语法，可跨平台' },
    { name: 'PDF', ext: '.pdf', desc: '适合打印和分享' },
    { name: 'HTML', ext: '.html', desc: '网页格式，保留样式' },
    { name: 'Word', ext: '.docx', desc: '微软 Office 格式' },
  ]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={() => setExportOpen(false)} />
      <div className="relative w-96 bg-white border border-[#d1d1d1] shadow-lg">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e8e8e8]">
          <h2 className="text-sm font-semibold text-[#1a1a1a]">导出文档</h2>
          <button onClick={() => setExportOpen(false)} className="text-[#aaa] hover:text-[#666] text-sm">✕</button>
        </div>
        <div className="px-5 py-5 flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-mono text-[#aaa] uppercase tracking-widest mb-1.5">文件名</label>
            <input
              defaultValue={activeTab?.title ?? '未命名文档'}
              className="w-full px-3 py-2 text-sm border border-[#d1d1d1] focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#aaa] uppercase tracking-widest mb-2">导出格式</div>
            <div className="flex flex-col gap-1">
              {formats.map((f) => (
                <label
                  key={f.name}
                  onClick={() => setSelected(f.name)}
                  className={`flex items-center gap-3 p-2.5 border cursor-pointer transition-colors ${
                    selected === f.name
                      ? 'border-[#1a1a1a] bg-[#f8f8f8]'
                      : 'border-[#e8e8e8] hover:bg-[#f5f5f5]'
                  }`}
                >
                  <input type="radio" name="fmt" checked={selected === f.name} onChange={() => setSelected(f.name)} className="shrink-0" />
                  <div className="flex-1">
                    <span className="text-xs font-medium text-[#1a1a1a]">{f.name}</span>
                    <span className="text-[10px] font-mono text-[#aaa] ml-1">{f.ext}</span>
                  </div>
                  <span className="text-[10px] text-[#bbb]">{f.desc}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-[#e8e8e8] bg-[#f8f8f8]">
          <button onClick={() => setExportOpen(false)} className="px-4 py-1.5 text-xs border border-[#d1d1d1] bg-white hover:bg-[#f0f0f0]">
            取消
          </button>
          <button className="px-4 py-1.5 text-xs bg-[#1a1a1a] text-white hover:bg-[#333]">
            ↗ 导出 {selected}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Drawer (medium screen) ───────────────────────────────────────────────

function Drawer() {
  const { drawerOpen, setDrawerOpen } = useDocument()
  if (!drawerOpen) return null
  return (
    <>
      <div
        className="absolute inset-0 bg-black/40 z-10"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="absolute top-0 left-0 bottom-0 w-52 bg-white border-r border-[#d1d1d1] z-20 flex flex-col">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#e8e8e8] shrink-0">
          <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest">目录树</span>
          <button onClick={() => setDrawerOpen(false)} className="text-[#aaa] hover:text-[#666] text-xs">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {TREE.map((node, i) => <TreeNodeRow key={i} node={node} />)}
        </div>
        <div className="px-3 py-2 border-t border-[#e8e8e8]">
          <span className="text-[9px] font-mono text-[#ccc]">抽屉浮层 · 点击空白关闭</span>
        </div>
      </div>
    </>
  )
}

// ─── Three frame canvases ────────────────────────────────────────────────

function FrameLarge() {
  return (
    <div className="flex flex-col" style={{ width: 820, height: 490, flexShrink: 0 }}>
      <TabBar />
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div style={{ width: 200 }} className="shrink-0">
          <FileTree />
        </div>
        {/* Drag handle */}
        <div
          className="w-1 bg-[#e8e8e8] hover:bg-[#aaa] cursor-col-resize shrink-0 transition-colors relative group"
          title="拖拽调整宽度（原型示意）"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#ccc] group-hover:bg-[#888] rounded" />
        </div>
        {/* Editor */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <BlockEditor />
        </div>
      </div>
    </div>
  )
}

function FrameMedium() {
  return (
    <div className="flex flex-col relative" style={{ width: 620, height: 460, flexShrink: 0 }}>
      <TabBar showHamburger />
      <Toolbar />
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <Drawer />
        <BlockEditor />
      </div>
    </div>
  )
}

function FrameSmall() {
  return (
    <div className="flex flex-col" style={{ width: 460, height: 415, flexShrink: 0 }}>
      <TabBar compact />
      <Toolbar collapsed />
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <BlockEditor />
        {/* Warning banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#f0f0f0] border-t border-[#d1d1d1] px-3 py-1.5 flex items-center gap-2">
          <span className="text-[#888] text-xs">⚠</span>
          <span className="text-[10px] font-mono text-[#888]">窗口过小，不支持触屏操作</span>
        </div>
      </div>
    </div>
  )
}

// ─── Frame wrapper ────────────────────────────────────────────────────────

function FrameWrapper({
  title,
  breakpoint,
  note,
  children,
}: {
  title: string
  breakpoint: string
  note: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      {/* Label above */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-[#999] border border-[#3a3a3a] bg-[#2a2a2a] px-2 py-0.5">{title}</span>
        <span className="text-[10px] font-mono text-[#666]">{breakpoint}</span>
      </div>
      {/* Frame */}
      <div className="border border-[#3a3a3a] bg-white overflow-hidden">
        {children}
      </div>
      {/* Note below */}
      <span className="text-[9px] font-mono text-[#555] max-w-xs leading-4">{note}</span>
    </div>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────

function EditorPageInner() {
  const { importOpen, exportOpen } = useDocument()
  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#e0e0e0] bg-white shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#1a1a1a]">文档编辑器</span>
          <span className="text-[10px] font-mono text-[#bbb]">响应式线框原型 · 3个断点演示</span>
        </div>
        <div className="flex items-center gap-2">
          <Annotation text="DocumentEditorPage · /editor" />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto bg-[#252525]" style={{ padding: '36px 48px' }}>
        <div className="flex items-start gap-10 w-max">
          <FrameWrapper
            title="大屏 1920×1080"
            breakpoint="≥ 1280px"
            note="左侧常驻目录树（可拖拽分割线）· 右侧 BlockEditor 内核 · 内容最大阅读宽度居中"
          >
            <FrameLarge />
          </FrameWrapper>

          <FrameWrapper
            title="中屏 1000×700"
            breakpoint="800 ~ 1280px"
            note="汉堡按钮唤起抽屉 · 半透明遮罩 · 点击空白关闭 · 编辑器铺满窗口"
          >
            <FrameMedium />
          </FrameWrapper>

          <FrameWrapper
            title="窄窗口 700×600"
            breakpoint="600 ~ 800px"
            note="工具栏折叠为「更多」下拉 · 保留 Tab 标签 · 底部提示不支持触屏"
          >
            <FrameSmall />
          </FrameWrapper>
        </div>

        {/* Annotation row */}
        <div className="mt-8 flex gap-3 flex-wrap">
          {[
            'BlockEditor 内核 · 可独立剥离为 npm 包',
            'Tab 标签支持横向滚动',
            '分割线 → react-resizable-panels（原型示意）',
            '导入 / 导出：Overlay 弹窗',
            '架构：账号外层 › 文档外壳 › BlockEditor 内核',
          ].map((note) => (
            <span key={note} className="text-[9px] font-mono text-[#555] border border-dashed border-[#3a3a3a] bg-[#2a2a2a] px-2 py-0.5">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Modals */}
      {importOpen && <ImportModal />}
      {exportOpen && <ExportModal />}
    </div>
  )
}

export default function DocumentEditorPage() {
  return (
    <AppShell>
      <DocumentProvider>
        <EditorPageInner />
      </DocumentProvider>
    </AppShell>
  )
}
