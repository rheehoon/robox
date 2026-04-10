'use client'
import { useState } from 'react'

const LOGO = ({ title }: { title: string }) => (
  <div className="flex items-center">
    <span style={{fontSize:22,fontWeight:500,letterSpacing:-1,color:'#fff',lineHeight:1}}>{title}</span>
    <div style={{width:28,height:28,position:'relative',marginLeft:6,overflow:'visible',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg width="34" height="34" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible'}}>
        <rect x="3" y="3" width="32" height="32" rx="7" fill="#0f172a"/>
        <line x1="-2" y1="-2" x2="40" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="-2" x2="-2" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
)

import { CartItem } from '@/app/page'

interface Props {
  onNavigate: (screen: string) => void
  onAddToCart: (item: CartItem) => void
  product?: any
}

export default function DetailPage({ onNavigate, onAddToCart, product }: Props) {
  const [wished, setWished] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart({
      id: product?.id || 1,
      emoji: '🤖',
      name: product?.model_name || 'FANUC M-20iB / 30F',
      sub: product?.detail_category || '용접·접합 · 경기 화성시',
      price: product?.sale_price?.toLocaleString() || '28,000,000'
    })
    setCartAdded(true)
    setTimeout(() => setCartAdded(false), 2000)
  }

  const specs = [
    { label:'제조회사', value:'FANUC' },
    { label:'모델번호', value:'M-20iB/30F' },
    { label:'구입일자', value:'2019년 3월' },
    { label:'사용 기간', value:'62개월' },
    { label:'보증서', value:'있음' },
    { label:'거래 방식', value:'직거래' },
  ]

  return (
    <div>
      {/* 상단 바 */}
      <div style={{background:'#00D4A1',padding:'14px 18px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>onNavigate('home')} style={{background:'none',border:'none',cursor:'pointer',padding:0}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 5l-7 6 7 6" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <LOGO title="상품상세" />
        </div>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="6" cy="11" r="1.5" fill="#0f172a"/>
          <circle cx="11" cy="11" r="1.5" fill="#0f172a"/>
          <circle cx="16" cy="11" r="1.5" fill="#0f172a"/>
        </svg>
      </div>

      {/* 상품 이미지 */}
      <div style={{height:200,background:'#e2e8f0',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
       {product?.image_url ? (
          <img src={product.image_url} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        ) : (
          <span style={{fontSize:72}}>🤖</span>
        )}
        <div style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)',display:'flex',gap:5}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{width: i===0 ? 18 : 6,height:6,borderRadius: i===0 ? 3 : '50%',background: i===0 ? '#fff' : 'rgba(255,255,255,0.5)'}}/>
          ))}
        </div>
      </div>

      {/* 배지 */}
      <div style={{display:'flex',gap:6,padding:'12px 16px 0'}}>
        <span style={{fontSize:11,padding:'3px 8px',borderRadius:6,fontWeight:500,background:'#dbeafe',color:'#1e40af'}}>용접·접합</span>
        <span style={{fontSize:11,padding:'3px 8px',borderRadius:6,fontWeight:500,background:'#0f172a',color:'#00d4a1'}}>양호 B</span>
        <span style={{fontSize:11,padding:'3px 8px',borderRadius:6,fontWeight:500,background:'#d1fae5',color:'#065f46'}}>검수완료</span>
      </div>

      {/* 제목 */}
      <div style={{fontSize:18,fontWeight:500,color:'#0f172a',padding:'8px 16px 2px'}}>{product?.model_name || 'FANUC M-20iB / 30F'}</div>
      <div style={{fontSize:12,color:'#94a3b8',padding:'0 16px 12px'}}>{product?.trade_region || '경기도 화성시'} · {product?.created_at ? new Date(product.created_at).toLocaleDateString() : '2시간 전 등록'}</div>

      <div style={{height:'0.5px',background:'#e2e8f0',margin:'0 16px'}}/>

      {/* 가격 */}
      <div style={{padding:'14px 16px'}}>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}>
          <div>
            <div style={{fontSize:11,color:'#94a3b8',marginBottom:2}}>판매희망가</div>
            <div style={{display:'flex',alignItems:'baseline',gap:4}}>
              <span style={{fontSize:22,fontWeight:500,color:'#0f172a'}}>{product?.sale_price?.toLocaleString() || '28,000,000'}</span>
              <span style={{fontSize:13,color:'#64748b'}}>원</span>
            </div>
          </div>
          <span style={{marginLeft:'auto',fontSize:11,padding:'3px 8px',borderRadius:6,background:'#f0fdf9',color:'#00a37a',fontWeight:500}}>협의 가능</span>
        </div>
        <div style={{fontSize:12,color:'#94a3b8'}}>
          구입가 <span style={{color:'#475569',fontWeight:500}}>45,000,000원</span>
          {' · '}할인율 <span style={{color:'#00a37a',fontWeight:500}}>38%</span>
        </div>
      </div>

      <div style={{height:'0.5px',background:'#e2e8f0',margin:'0 16px'}}/>

      {/* 스펙 */}
      <div style={{padding:'14px 16px'}}>
        <div style={{fontSize:12,fontWeight:500,color:'#64748b',marginBottom:8}}>제품 스펙</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {specs.map(s=>(
            <div key={s.label} style={{background:'#fff',borderRadius:10,border:'0.5px solid #e2e8f0',padding:'9px 12px'}}>
              <div style={{fontSize:10,color:'#94a3b8',marginBottom:2}}>{s.label}</div>
              <div style={{fontSize:12,fontWeight:500,color:'#0f172a'}}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{height:'0.5px',background:'#e2e8f0',margin:'0 16px'}}/>

      {/* 판매자 */}
      <div style={{padding:'14px 16px'}}>
        <div style={{fontSize:12,fontWeight:500,color:'#64748b',marginBottom:10}}>판매자 정보</div>
        <div style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:14}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:38,height:38,borderRadius:'50%',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center',color:'#00d4a1',fontSize:13,fontWeight:500,flexShrink:0}}>KM</div>
            <div>
              <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>김민준</div>
              <div style={{fontSize:11,color:'#94a3b8'}}>거래 12회 · 응답률 98%</div>
            </div>
            <span style={{marginLeft:'auto',fontSize:10,padding:'3px 8px',borderRadius:6,background:'#fef3c7',color:'#92400e',fontWeight:500}}>인증 판매자</span>
          </div>
        </div>
      </div>

      <div style={{height:'0.5px',background:'#e2e8f0',margin:'0 16px'}}/>

      {/* 상세 설명 */}
      <div style={{padding:'14px 16px 100px'}}>
        <div style={{fontSize:12,fontWeight:500,color:'#64748b',marginBottom:8}}>상세 설명</div>
        <div style={{fontSize:13,color:'#475569',lineHeight:1.7}}>
          2019년 3월 구입, 자동차 부품 용접 라인에서 사용. 정기점검 완료, 수리 이력 없음. 제어기·케이블 일체 포함. 설치 및 시운전 지원 가능합니다.
        </div>
      </div>

      {/* 하단 구매 버튼 */}
      <div style={{position:'fixed',bottom:60,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'#fff',borderTop:'0.5px solid #e2e8f0',padding:'12px 16px',display:'flex',gap:10,alignItems:'center',zIndex:40}}>
        <button
          onClick={()=>setWished(!wished)}
          style={{width:48,height:48,borderRadius:12,border:`0.5px solid ${wished ? '#fecdd3' : '#e2e8f0'}`,background: wished ? '#fff1f2' : '#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 18l-8-8a5 5 0 0 1 8-6 5 5 0 0 1 8 6z"
              fill={wished ? '#f43f5e' : 'none'}
              stroke={wished ? '#f43f5e' : '#94a3b8'}
              strokeWidth="1.5"/>
          </svg>
        </button>
        <button
          onClick={handleAddToCart}
          style={{width:46,height:46,borderRadius:12,border:`0.5px solid ${cartAdded ? '#a7f3d0' : '#e2e8f0'}`,background: cartAdded ? '#f0fdf9' : '#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,transition:'all 0.2s'}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M19 16H7l-2-12H3" stroke={cartAdded ? '#00a37a' : '#0f172a'} strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="9" cy="18.5" r="1" fill={cartAdded ? '#00a37a' : '#0f172a'}/>
            <circle cx="16" cy="18.5" r="1" fill={cartAdded ? '#00a37a' : '#0f172a'}/>
            <path d="M6.5 5h13l-1.5 8H8z" fill={cartAdded ? '#00a37a' : '#0f172a'}/>
          </svg>
        </button>
        <button style={{flex:1,background:'#00d4a1',color:'#0f172a',border:'none',borderRadius:12,padding:14,fontSize:14,fontWeight:500,cursor:'pointer'}}>
          💬 채팅으로 구매하기
        </button>
      </div>
    </div>
  )
}