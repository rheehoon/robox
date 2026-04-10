'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AuthPage from '@/components/AuthPage'
import HomePage from '@/components/HomePage'
import CategoryPage from '@/components/CategoryPage'
import RegisterPage from '@/components/RegisterPage'
import DetailPage from '@/components/DetailPage'
import MyPage from '@/components/MyPage'
import WishPage from '@/components/WishPage'
import CartPage from '@/components/CartPage'
import BottomTab from '@/components/BottomTab'

export interface CartItem {
  id: number
  emoji: string
  name: string
  sub: string
  price: string
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  if (loading) {
    return (
      <main style={{minHeight:'100vh',background:'#00D4A1',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
          <svg width="60" height="60" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible'}}>
            <rect x="3" y="3" width="32" height="32" rx="7" fill="#0f172a"/>
            <line x1="-2" y1="-2" x2="40" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
            <line x1="40" y1="-2" x2="-2" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
          </svg>
          <div style={{fontSize:24,fontWeight:500,color:'#fff',letterSpacing:-1}}>RoboX</div>
          <div style={{fontSize:13,color:'#065f46'}}>로딩 중...</div>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main style={{minHeight:'100vh',background:'#f8fafc'}}>
        <div style={{maxWidth:430,margin:'0 auto'}}>
          <AuthPage onSuccess={() => setUser(supabase.auth.getUser())} />
        </div>
      </main>
    )
  }

  const renderScreen = () => {
    switch(screen) {
      case 'home': return <HomePage onNavigate={setScreen} cartCount={cart.length} />
      case 'cat': return <CategoryPage onNavigate={setScreen} />
      case 'reg': return <RegisterPage onNavigate={setScreen} />
      case 'detail': return <DetailPage onNavigate={setScreen} onAddToCart={addToCart} />
      case 'wish': return <WishPage onNavigate={setScreen} />
      case 'cart': return <CartPage onNavigate={setScreen} cart={cart} onRemove={removeFromCart} />
      case 'my': return <MyPage onNavigate={setScreen} user={user} onLogout={async()=>{await supabase.auth.signOut();setUser(null)}} />
      default: return <HomePage onNavigate={setScreen} cartCount={cart.length} />
    }
  }

  return (
    <main style={{minHeight:'100vh',background:'#e2e8f0'}}>
      <div style={{maxWidth:430,margin:'0 auto',position:'relative',minHeight:'100vh',background:'#f8fafc'}}>
        <div style={{paddingBottom:70}}>
          {renderScreen()}
        </div>
        <BottomTab current={screen} onNavigate={setScreen} />
      </div>
    </main>
  )
}