import { createContext, useContext, useState, type ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  initial: string
  role: string
  dept: string
  joinDate: string
  docsCount: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, _password: string) => {
    const name = email.split('@')[0].replace(/[._]/g, ' ')
    setUser({
      id: 'u-001',
      name: name || '用户',
      email,
      initial: (name[0] || 'U').toUpperCase(),
      role: '高级编辑',
      dept: '产品研发部',
      joinDate: '2024-03-01',
      docsCount: 47,
    })
    return true
  }

  const register = (name: string, email: string, _password: string) => {
    setUser({
      id: 'u-002',
      name,
      email,
      initial: (name[0] || 'U').toUpperCase(),
      role: '普通用户',
      dept: '—',
      joinDate: new Date().toISOString().slice(0, 10),
      docsCount: 0,
    })
    return true
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be within AuthProvider')
  return ctx
}
