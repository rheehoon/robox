'use client'
import { CartItem } from '@/app/page'

const LOGO = ({ title }: { title: string }) => (
  <div className="flex items-center">
    <span style={{fontSize:24,fontWeight:500,letterSpacing:-1,color:'#fff',lineHeight:1}}>{title}</span>
    <div style={{width:30,height:30,position:'relative',marginLeft:6,overflow:'visible',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg width="38" height="38" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible'}}>
        <rect x="3" y="3" width="32" height="32" rx="7" fill="#0f172a"/>
        <line x1="-2" y1="-2" x2="40" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="-2" x2="-2" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
)

interface Props {
  onNavigate: (screen: string) => void
  cart: CartItem[]
  onRemove: (id: number) => void
}

export default function CartPage({ onNavigate, cart, onRemove }: Props) {
  const total = cart.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/,/g, ''))
    return sum + num
  }, 0)

  return (
    <div>
      <div style={{background:'#00D4A1',padding:'14px 18px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button onClick={()=>onNavigate('home')}
            style={{background:'none',border:'none',cursor:'pointer',padding:0,display:'flex',alignItems:'center'}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 5l-7 6 7 6" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <LOGO title="장바구니" />
        </div>
        <span style={{fontSize:12,color:'#0f172a',fontWeight:500}}>{cart.length}건</span>
      </div>

      <div style={{background:'#f8fafc',minHeight:'80vh'}}>
        {cart.length === 0 ? (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'80px 16px',gap:12}}>
            <div style={{fontSize:48}}>🛒</div>
            <div style={{fontSize:15,fontWeight:500,color:'#0f172a'}}>장바구니가 비어있습니다</div>
            <div style={{fontSize:13,color:'#94a3b8'}}>관심 있는 로봇을 담아보세요</div>
            <button
              onClick={()=>onNavigate('home')}
              style={{marginTop:8,padding:'10px 24px',background:'#00d4a1',color:'#0f172a',border:'none',borderRadius:12,fontSize:14,fontWeight:500,cursor:'pointer'}}>
              매물 둘러보기
            </button>
          </div>
        ) : (
          <>
            <div style={{display:'flex',flexDirection:'column',gap:8,padding:'14px 16px'}}>
              {cart.map(item=>(
                <div key={item.id} onClick={()=>onNavigate('detail')} style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
                  <div style={{width:52,height:52,borderRadius:10,background:'#f0fdf9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>
                    {item.emoji}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500,color:'#0f172a',marginBottom:2}}>{item.name}</div>
                    <div style={{fontSize:11,color:'#94a3b8',marginBottom:3}}>{item.sub}</div>
                    <div style={{fontSize:14,fontWeight:500,color:'#0f172a'}}>₩{item.price}</div>
                  </div>
                  <button
                    onClick={()=>onRemove(item.id)}
                    style={{width:28,height:28,borderRadius:8,border:'0.5px solid #e2e8f0',background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2l10 10M12 2L2 12" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 합계 */}
            <div style={{margin:'0 16px',background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                <span style={{fontSize:13,color:'#64748b'}}>상품 {cart.length}건</span>
                <span style={{fontSize:13,color:'#0f172a',fontWeight:500}}>₩{total.toLocaleString()}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:10,borderTop:'0.5px solid #e2e8f0',marginTop:6}}>
                <span style={{fontSize:14,fontWeight:500,color:'#0f172a'}}>총 합계</span>
                <span style={{fontSize:18,fontWeight:500,color:'#0f172a'}}>₩{total.toLocaleString()}</span>
              </div>
            </div>

            {/* 구매 버튼 */}
            <div style={{padding:16}}>
              <button
                onClick={()=>alert('채팅으로 구매를 진행해주세요!')}
                style={{width:'100%',padding:14,background:'#00d4a1',color:'#0f172a',border:'none',borderRadius:14,fontSize:15,fontWeight:500,cursor:'pointer'}}>
                💬 전체 채팅 구매하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}