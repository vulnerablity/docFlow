import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) { setError('请填写所有必填字段'); return }
    if (password !== confirm) { setError('两次密码输入不一致'); return }
    register(name, email, password)
    navigate('/')
  }

  const fields = [
    { label: '姓名', type: 'text', value: name, set: setName, placeholder: '张伟' },
    { label: '电子邮箱', type: 'email', value: email, set: setEmail, placeholder: 'zhang.wei@company.com' },
    { label: '设置密码', type: 'password', value: password, set: setPassword, placeholder: '至少8位，含大小写与数字' },
    { label: '确认密码', type: 'password', value: confirm, set: setConfirm, placeholder: '再次输入密码' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center">
      <div className="mb-4 text-center">
        <span className="text-[10px] font-mono text-[#bbb] border border-dashed border-[#d1d1d1] px-2 py-0.5">
          RegisterPage · 新用户注册 · /register
        </span>
      </div>

      <div className="w-96 bg-white border border-[#d1d1d1]">
        <div className="px-8 pt-7 pb-5 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-semibold text-[#1a1a1a]">DocFlow</span>
          </div>
          <p className="text-[10px] font-mono text-[#aaa]">企业文档协作平台</p>
        </div>

        <div className="px-8 py-6">
          <h1 className="text-base font-semibold text-[#1a1a1a] mb-5">创建账号</h1>

          {error && (
            <div className="mb-4 px-3 py-2 bg-[#f8f8f8] border border-[#d1d1d1] text-xs text-[#888] font-mono">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="block text-[10px] font-mono text-[#888] uppercase tracking-widest mb-1.5">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2 text-sm border border-[#d1d1d1] bg-white focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#c8c8c8]"
                />
              </div>
            ))}

            {/* Password requirements */}
            <div className="bg-[#f8f8f8] border border-[#e8e8e8] px-3 py-2">
              <p className="text-[10px] font-mono text-[#aaa] leading-relaxed">
                密码要求：8位以上 · 大小写字母 · 数字 · 特殊符号
              </p>
            </div>

            <label className="flex items-start gap-1.5 text-xs text-[#666] cursor-pointer select-none mt-0.5">
              <input type="checkbox" className="w-3.5 h-3.5 border border-[#d1d1d1] mt-0.5 shrink-0" />
              <span>我已阅读并同意《<span className="underline">用户服务协议</span>》和《<span className="underline">隐私政策</span>》</span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors mt-1"
            >
              注册并登录
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#f0f0f0] text-center">
            <span className="text-xs text-[#888]">已有账号？</span>
            <Link to="/login" className="text-xs text-[#1a1a1a] font-semibold ml-1 hover:underline">
              返回登录 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
