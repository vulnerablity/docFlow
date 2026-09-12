import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('zhang.wei@company.com')
  const [password, setPassword] = useState('••••••••')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('请填写完整登录信息'); return }
    login(email, password)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center">
      {/* Wireframe annotation */}
      <div className="mb-4 text-center">
        <span className="text-[10px] font-mono text-[#bbb] border border-dashed border-[#d1d1d1] px-2 py-0.5">
          LoginPage · 未登录用户重定向至此 · /login
        </span>
      </div>

      <div className="w-96 bg-white border border-[#d1d1d1]">
        {/* Logo bar */}
        <div className="px-8 pt-7 pb-5 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-semibold text-[#1a1a1a]">DocFlow</span>
          </div>
          <p className="text-[10px] font-mono text-[#aaa]">企业文档协作平台</p>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          <h1 className="text-base font-semibold text-[#1a1a1a] mb-5">登录账号</h1>

          {error && (
            <div className="mb-4 px-3 py-2 bg-[#f8f8f8] border border-[#d1d1d1] text-xs text-[#888] font-mono">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-mono text-[#888] uppercase tracking-widest mb-1.5">
                电子邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#d1d1d1] bg-white focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#888] uppercase tracking-widest mb-1.5">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#d1d1d1] bg-white focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs text-[#666] cursor-pointer select-none">
                <input type="checkbox" className="w-3.5 h-3.5 border border-[#d1d1d1]" />
                保持登录
              </label>
              <button type="button" className="text-xs text-[#888] hover:text-[#1a1a1a]">
                忘记密码？
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
            >
              登录
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#f0f0f0] text-center">
            <span className="text-xs text-[#888]">还没有账号？</span>
            <Link to="/register" className="text-xs text-[#1a1a1a] font-semibold ml-1 hover:underline">
              立即注册 →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] font-mono text-[#ccc]">
          登录成功 → 重定向至 / 首页
        </span>
      </div>
    </div>
  )
}
