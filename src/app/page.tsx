'use client'

import { useState } from 'react'
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

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const renderScreen = () => {
    switch(screen) {
      case 'home': return <HomePage onNavigate={setScreen} cartCount={cart.length} />
      case 'cat': return <CategoryPage onNavigate={setScreen} />
      case 'reg': return <RegisterPage onNavigate={setScreen} />
      case 'detail': return <DetailPage onNavigate={setScreen} onAddToCart={addToCart} />
      case 'wish': return <WishPage onNavigate={setScreen} />
      case 'cart': return <CartPage onNavigate={setScreen} cart={cart} onRemove={removeFromCart} />
      case 'my': return <MyPage onNavigate={setScreen} />
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