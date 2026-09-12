import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { useAuth } from '../contexts/AuthContext'

const RECENT_DOCS = [
  { id: 1, title: '产品需求文档 v2.3', folder: '产品研发 / 需求文档', modified: '2026-09-12 14:30', size: '48 KB', status: '编辑中' },
  { id: 2, title: 'API 接口设计说明', folder: '技术文档 / 后端', modified: '2026-09-11 09:15', size: '32 KB', status: '已发布' },
  { id: 3, title: '设计规范 · 组件库', folder: '设计资源 / 规范', modified: '2026-09-10 16:45', size: '120 KB', status: '审阅中' },
  { id: 4, title: '部署运维手册', folder: '技术文档 / 运维', modified: '2026-09-09 11:20', size: '76 KB', status: '已发布' },
  { id: 5, title: 'Q3 项目复盘报告', folder: '管理文档 / 复盘', modified: '2026-09-08 17:05', size: '28 KB', status: '草稿' },
  { id: 6, title: '用户调研分析报告', folder: '产品研发 / 用研', modified: '2026-09-07 10:30', size: '94 KB', status: '已发布' },
]

const QUICK_ACTIONS = [
  { icon: '＋', label: '新建文档', desc: '创建空白文档' },
  { icon: '↑', label: '导入文件', desc: '.md / .docx / .txt' },
  { icon: '⊞', label: '新建模板', desc: '从模板开始' },
  { icon: '⊙', label: '共享空间', desc: '团队协作文档' },
]

const STATUS_STYLE: Record<string, string> = {
  '编辑中': 'bg-[#f0f0f0] text-[#666]',
  '已发布': 'bg-[#1a1a1a] text-white',
  '审阅中': 'bg-[#e8e8e8] text-[#555]',
  '草稿': 'bg-white border border-[#d1d1d1] text-[#888]',
}

export default function HomePage() {
  const { user } = useAuth()

  return (
    <AppShell>
      <div className="h-full overflow-y-auto bg-[#f5f5f5]">
        {/* Annotation bar */}
        <div className="border-b border-[#e8e8e8] bg-white px-6 py-1.5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#bbb]">HomePage · 应用首页 · /</span>
          <span className="text-[10px] font-mono text-[#bbb]">已登录：{user?.email}</span>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#1a1a1a]">你好，{user?.name}</h1>
            <p className="text-sm text-[#888] mt-0.5">今天是 2026年9月12日 · {user?.dept}</p>
          </div>

          {/* Quick actions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-mono text-[#888] uppercase tracking-widest">快捷操作</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  to="/editor"
                  className="bg-white border border-[#d1d1d1] px-4 py-4 flex flex-col gap-2 hover:border-[#1a1a1a] transition-colors group cursor-pointer"
                >
                  <span className="text-lg text-[#888] group-hover:text-[#1a1a1a]">{action.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">{action.label}</div>
                    <div className="text-xs text-[#aaa] font-mono">{action.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: '我的文档', value: user?.docsCount.toString() ?? '0' },
              { label: '本月新增', value: '8' },
              { label: '协作文档', value: '23' },
              { label: '待审阅', value: '3' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-[#d1d1d1] px-4 py-3">
                <div className="text-2xl font-semibold text-[#1a1a1a] font-mono">{stat.value}</div>
                <div className="text-xs text-[#888] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent docs table */}
          <div className="bg-white border border-[#d1d1d1]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8]">
              <h2 className="text-sm font-semibold text-[#1a1a1a]">最近文档</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="搜索文档..."
                  className="px-2.5 py-1 text-xs border border-[#d1d1d1] bg-[#f8f8f8] focus:outline-none focus:border-[#1a1a1a] w-40"
                />
                <button className="px-3 py-1 text-xs border border-[#d1d1d1] bg-white hover:bg-[#f5f5f5]">
                  筛选
                </button>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[2fr_1.5fr_1fr_80px_80px] gap-0 border-b border-[#e8e8e8]">
              {['文档标题', '所在目录', '最后修改', '大小', '状态'].map((h) => (
                <div key={h} className="px-4 py-2 text-[10px] font-mono text-[#aaa] uppercase tracking-widest">
                  {h}
                </div>
              ))}
            </div>

            {RECENT_DOCS.map((doc, i) => (
              <Link
                key={doc.id}
                to="/editor"
                className={`grid grid-cols-[2fr_1.5fr_1fr_80px_80px] hover:bg-[#f8f8f8] transition-colors ${
                  i < RECENT_DOCS.length - 1 ? 'border-b border-[#f0f0f0]' : ''
                }`}
              >
                <div className="px-4 py-3">
                  <div className="text-sm text-[#1a1a1a] font-medium hover:underline">{doc.title}</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-xs text-[#888] font-mono">{doc.folder}</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-xs text-[#888] font-mono">{doc.modified}</div>
                </div>
                <div className="px-4 py-3">
                  <div className="text-xs text-[#aaa] font-mono">{doc.size}</div>
                </div>
                <div className="px-4 py-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 ${STATUS_STYLE[doc.status] ?? ''}`}>
                    {doc.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
