'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const LOGO = () => (
  <div className="flex items-center">
    <span style={{fontSize:24,fontWeight:500,letterSpacing:-1,color:'#fff',lineHeight:1}}>Robo</span>
    <div style={{width:30,height:30,position:'relative',marginLeft:6,flexShrink:0,overflow:'visible',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg width="38" height="38" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible'}}>
        <rect x="3" y="3" width="32" height="32" rx="7" fill="#0f172a"/>
        <line x1="-2" y1="-2" x2="40" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="-2" x2="-2" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
)

const products = [
  { id:1, emoji:'🦾', name:'FANUC M-20iB', sub:'용접·조립', price:'28,000,000', year:'2019년식', safe:true, bg:'#f0fdf9' },
  { id:2, emoji:'🤖', name:'Boston HD6', sub:'물류 이송 AGV', price:'12,500,000', year:'2022년식', safe:false, bg:'#f0fdf9' },
  { id:3, emoji:'⚙️', name:'ABB IRB 4600', sub:'도장·코팅', price:'41,000,000', year:'2018년식', safe:true, bg:'#f0fdf9' },
]

const lifeProducts = [
  { id:4, emoji:'🧹', name:'삼성 Jet Bot AI+', sub:'로봇청소기', price:'650,000', year:'2023년식', bg:'#f8fafc' },
  { id:5, emoji:'🍳', name:'Moley Kitchen', sub:'조리 로봇', price:'3,200,000', year:'2021년식', bg:'#f8fafc' },
]

const categories = [
  { id:'mfg', label:'제조업', bg:'#0f172a', icon:(
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="8" width="18" height="12" rx="2" stroke="#00d4a1" strokeWidth="1.5"/>
      <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="#00d4a1" strokeWidth="1.5"/>
      <circle cx="12" cy="14" r="2" fill="#00d4a1"/>
    </svg>
  )},
  { id:'svc', label:'서비스업', bg:'#0f172a', icon:(
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="12" cy="8" r="3" stroke="#00d4a1" strokeWidth="1.5"/>
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" stroke="#00d4a1" strokeWidth="1.5"/>
    </svg>
  )},
  { id:'home', label:'가정용', bg:'#f1f5f9', icon:(
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#64748b" strokeWidth="1.5"/>
    </svg>
  )},
  { id:'clean', label:'청소·관리', bg:'#f1f5f9', icon:(
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#64748b" strokeWidth="1.5"/>
      <path d="M12 7v5l3 3" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
  { id:'wear', label:'웨어러블', bg:'#f1f5f9', icon:(
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
]

interface Props { 
  onNavigate: (screen: string) => void
  cartCount: number
}
export default function HomePage({ onNavigate, cartCount }: Props) {
  const supabase = createClient()
  const [dbProducts, setDbProducts] = useState<any[]>([])

  useEffect(()=>{
    supabase
      .from('robots')
      .select('*')
      .eq('status','판매중')
      .order('created_at',{ascending:false})
      .limit(10)
      .then(({data})=>{ if(data) setDbProducts(data) })
  },[])

  const displayProducts = dbProducts.length > 0 ? dbProducts : products

  return (
    <div>
      {/* 상단 바 */}
      <div style={{background:'#00D4A1'}}>
        <div style={{padding:'14px 18px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <LOGO />
          <div style={{display:'flex',gap:14}}>
            <button onClick={()=>alert('알림 기능 준비 중입니다.')}
              style={{background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2a6 6 0 0 1 6 6c0 3.5 1.5 5 1.5 5h-15S5 11.5 5 8a6 6 0 0 1 6-6zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" fill="#0f172a"/>
              </svg>
            </button>
            <button onClick={()=>onNavigate('cart')}
              style={{background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center',position:'relative'}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M19 16H7l-2-12H3" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="9" cy="18.5" r="1" fill="#0f172a"/>
                <circle cx="16" cy="18.5" r="1" fill="#0f172a"/>
                <path d="M6.5 5h13l-1.5 8H8z" fill="#0f172a"/>
              </svg>
              {cartCount > 0 && (
                <div style={{position:'absolute',top:-6,right:-6,width:16,height:16,borderRadius:'50%',background:'#e11d48',color:'#fff',fontSize:9,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {cartCount}
                </div>
              )}
            </button>
          </div>
        </div>
        <div style={{padding:'12px 16px 16px'}}>
          <div style={{background:'#fff',borderRadius:12,padding:'10px 14px',display:'flex',alignItems:'center',gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
              <circle cx="7" cy="7" r="5" stroke="#94a3b8" strokeWidth="1.5"/>
              <line x1="11" y1="11" x2="14" y2="14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{fontSize:13,color:'#94a3b8'}}>로봇명, 제조사, 모델번호 검색</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div style={{background:'#f8fafc',paddingTop:14}}>
        {/* 배너 */}
        <div style={{margin:'0 16px',background:'#0f172a',borderRadius:16,padding:'18px 16px',position:'relative',overflow:'hidden'}}>
          <div style={{fontSize:16,fontWeight:500,color:'#fff',marginBottom:4}}>산업용 로봇 특가 매물</div>
          <div style={{fontSize:12,color:'#64748b'}}>이번 주 신규 등록 230건</div>
          <div style={{position:'absolute',right:16,top:'50%',transform:'translateY(-50%)',width:48,height:48,background:'#00d4a1',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',overflow:'visible'}}>
            <svg width="28" height="28" viewBox="0 0 28 28" overflow="visible" style={{overflow:'visible'}}>
              <rect x="0" y="0" width="28" height="28" rx="7" fill="#00d4a1"/>
              <line x1="-4" y1="-4" x2="32" y2="32" stroke="#0f172a" strokeWidth="5" strokeLinecap="round"/>
              <line x1="32" y1="-4" x2="-4" y2="32" stroke="#0f172a" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* 공지 */}
        <div style={{margin:'12px 16px 0',background:'#f0fdf9',borderRadius:12,padding:'10px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',border:'0.5px solid #a7f3d0'}}>
          <span style={{fontSize:12,color:'#065f46'}}>AI 시세 추정 서비스 오픈</span>
          <span style={{fontSize:10,padding:'3px 8px',borderRadius:6,background:'#00d4a1',color:'#0f172a',fontWeight:500}}>NEW</span>
        </div>

        {/* 카테고리 */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 16px',marginTop:16,marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>카테고리</span>
          <span style={{fontSize:12,color:'#00a37a',cursor:'pointer'}} onClick={()=>onNavigate('cat')}>전체보기 →</span>
        </div>
        <div style={{display:'flex',gap:10,padding:'0 16px',overflowX:'auto',marginBottom:4,paddingBottom:4}}>
          {categories.map(cat=>(
            <div key={cat.id} style={{minWidth:64,textAlign:'center',cursor:'pointer'}} onClick={()=>onNavigate('cat')}>
              <div style={{width:50,height:50,borderRadius:14,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px'}}>
                {cat.icon}
              </div>
              <div style={{fontSize:11,color:'#64748b',whiteSpace:'nowrap'}}>{cat.label}</div>
            </div>
          ))}
        </div>

        {/* 최근 매물 */}
<div style={{display:'flex',gap:10,padding:'0 16px',overflowX:'auto',paddingBottom:4}}>
          {displayProducts.map((p,i)=>(
            <div key={p.id} style={{minWidth:148,background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',overflow:'hidden',flexShrink:0,cursor:'pointer'}} onClick={()=>onNavigate('detail')}>
              <div style={{height:90,background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>{p.emoji}</div>
              <div style={{padding:'8px 10px 10px'}}>
                <div style={{fontSize:12,fontWeight:500,color:'#0f172a',marginBottom:2}}>{p.model_name || p.name}</div>
                <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>{p.detail_category || p.sub}</div>
                <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>₩{p.sale_price ? p.sale_price.toLocaleString() : p.price}</div>
                <div style={{display:'flex',gap:4,marginTop:4,flexWrap:'wrap'}}>
                  <span style={{fontSize:10,padding:'2px 6px',borderRadius:5,fontWeight:500,background:'#fef3c7',color:'#92400e'}}>{p.condition || p.year}</span>
                  {(p.status==='판매중') && <span style={{fontSize:10,padding:'2px 6px',borderRadius:5,fontWeight:500,background:'#d1fae5',color:'#065f46'}}>판매중</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 생활용 로봇 */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 16px',marginTop:16,marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>생활용 로봇 인기</span>
          <span style={{fontSize:12,color:'#00a37a',cursor:'pointer'}}>더보기 →</span>
        </div>
        <div style={{display:'flex',gap:10,padding:'0 16px',overflowX:'auto',paddingBottom:16}}>
          {lifeProducts.map(p=>(
            <div key={p.id} style={{minWidth:148,background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',overflow:'hidden',flexShrink:0,cursor:'pointer'}} onClick={()=>onNavigate('detail')}>
              <div style={{height:90,background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36}}>{p.emoji}</div>
              <div style={{padding:'8px 10px 10px'}}>
                <div style={{fontSize:12,fontWeight:500,color:'#0f172a',marginBottom:2}}>{p.name}</div>
                <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>{p.sub}</div>
                <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>₩{p.price}</div>
                <div style={{display:'flex',gap:4,marginTop:4}}>
                  <span style={{fontSize:10,padding:'2px 6px',borderRadius:5,fontWeight:500,background:'#d1fae5',color:'#065f46'}}>{p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}