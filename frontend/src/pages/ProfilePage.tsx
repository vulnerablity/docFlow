import AppShell from '../components/AppShell'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const ACTIVITY = [
  { date: '2026-09-12', action: '编辑了', doc: '产品需求文档 v2.3' },
  { date: '2026-09-11', action: '新建了', doc: 'API 接口设计说明' },
  { date: '2026-09-10', action: '发布了', doc: '设计规范 · 组件库' },
  { date: '2026-09-09', action: '导入了', doc: '部署运维手册.docx' },
  { date: '2026-09-08', action: '共享了', doc: 'Q3 项目复盘报告' },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <AppShell>
      <div className="h-full overflow-y-auto bg-[#f5f5f5]">
        <div className="border-b border-[#e8e8e8] bg-white px-6 py-1.5">
          <span className="text-[10px] font-mono text-[#bbb]">ProfilePage · 个人中心 · /profile</span>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-6 flex gap-5">
          {/* Left column */}
          <div className="flex flex-col gap-4 w-64 shrink-0">
            {/* Avatar card */}
            <div className="bg-white border border-[#d1d1d1] p-5 flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-[#1a1a1a] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{user.initial}</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-[#1a1a1a]">{user.name}</div>
                <div className="text-xs text-[#888] mt-0.5">{user.role}</div>
                <div className="text-[10px] font-mono text-[#aaa] mt-0.5">{user.dept}</div>
              </div>
              <button className="w-full py-1.5 text-xs border border-[#d1d1d1] hover:bg-[#f5f5f5] text-[#666]">
                修改头像
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white border border-[#d1d1d1]">
              {[
                { label: '我的文档', value: user.docsCount },
                { label: '协作文档', value: 23 },
                { label: '已发布', value: 19 },
              ].map((s, i) => (
                <div key={s.label} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-[#f0f0f0]' : ''}`}>
                  <span className="text-xs text-[#666]">{s.label}</span>
                  <span className="text-sm font-semibold font-mono text-[#1a1a1a]">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Danger zone */}
            <div className="bg-white border border-[#d1d1d1] p-4">
              <div className="text-[10px] font-mono text-[#aaa] uppercase tracking-widest mb-3">账号操作</div>
              <div className="flex flex-col gap-2">
                <button className="w-full py-1.5 text-xs border border-[#d1d1d1] hover:bg-[#f5f5f5] text-[#666]">
                  修改密码
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-1.5 text-xs border border-[#d1d1d1] hover:bg-[#f5f5f5] text-[#888]"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Basic info */}
            <div className="bg-white border border-[#d1d1d1]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8e8]">
                <h2 className="text-sm font-semibold text-[#1a1a1a]">基本信息</h2>
                <button className="text-xs text-[#888] hover:text-[#1a1a1a] border border-[#d1d1d1] px-3 py-1 hover:bg-[#f5f5f5]">
                  编辑
                </button>
              </div>
              <div className="px-5 py-4 grid grid-cols-2 gap-4">
                {[
                  { label: '姓名', value: user.name },
                  { label: '邮箱', value: user.email },
                  { label: '角色', value: user.role },
                  { label: '部门', value: user.dept },
                  { label: '注册日期', value: user.joinDate },
                  { label: '账号 ID', value: user.id },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-[10px] font-mono text-[#aaa] uppercase tracking-widest mb-1">{f.label}</div>
                    <div className="text-sm text-[#1a1a1a]">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white border border-[#d1d1d1]">
              <div className="px-5 py-3 border-b border-[#e8e8e8]">
                <h2 className="text-sm font-semibold text-[#1a1a1a]">偏好设置</h2>
              </div>
              <div className="px-5 py-4 flex flex-col gap-3">
                {[
                  { label: '默认编辑模式', options: ['可视化编辑', 'Markdown 源码'] },
                  { label: '界面语言', options: ['简体中文', 'English'] },
                  { label: '主题', options: ['浅色', '深色', '跟随系统'] },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <span className="text-sm text-[#666]">{pref.label}</span>
                    <select className="text-xs border border-[#d1d1d1] px-2 py-1 bg-white text-[#1a1a1a] focus:outline-none">
                      {pref.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white border border-[#d1d1d1]">
              <div className="px-5 py-3 border-b border-[#e8e8e8]">
                <h2 className="text-sm font-semibold text-[#1a1a1a]">最近操作</h2>
              </div>
              <div className="px-5 py-3 flex flex-col gap-0">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-[#f5f5f5]' : ''}`}>
                    <span className="text-[10px] font-mono text-[#aaa] w-20 shrink-0">{a.date}</span>
                    <span className="text-xs text-[#888]">{a.action}</span>
                    <span className="text-xs text-[#1a1a1a] font-medium">{a.doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
