import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const navLinks = [
    { to: '/', label: '首页' },
    { to: '/editor', label: '文档编辑' },
  ]

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* App header */}
      <header className="h-11 border-b border-[#d1d1d1] bg-white flex items-center px-4 gap-6 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold leading-none">D</span>
          </div>
          <span className="text-sm font-semibold text-[#1a1a1a] tracking-tight">DocFlow</span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1 text-sm transition-colors ${
                  active
                    ? 'bg-[#1a1a1a] text-white'
                    : 'text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0f0]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Annotation */}
        <span className="text-[10px] font-mono text-[#bbb] hidden lg:block">
          AppShell · 账号体系外壳
        </span>

        {/* User avatar + dropdown */}
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-7 h-7 bg-[#1a1a1a] text-white text-xs font-semibold flex items-center justify-center hover:bg-[#333] transition-colors"
            >
              {user.initial}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#d1d1d1] shadow-sm z-50">
                <div className="px-3 py-2.5 border-b border-[#e8e8e8]">
                  <div className="text-sm font-medium text-[#1a1a1a] truncate">{user.name}</div>
                  <div className="text-xs text-[#888] truncate">{user.email}</div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#f5f5f5]"
                >
                  <span className="text-[#888]">⊙</span>
                  个人中心
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#f5f5f5] text-left border-t border-[#e8e8e8]"
                >
                  <span className="text-[#888]">→</span>
                  退出登录
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
