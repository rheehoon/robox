'use client'
import { useState } from 'react'

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

const sellList = [
  { id:1, emoji:'🦾', name:'FANUC M-20iB / 30F', sub:'용접·접합 · 경기 화성시', price:'28,000,000', state:'판매중', stateColor:'#00a37a', stateBg:'#f0fdf9' },
  { id:2, emoji:'🤖', name:'ABB IRB 4600', sub:'도장·코팅 · 경기 화성시', price:'41,000,000', state:'채팅중', stateColor:'#92400e', stateBg:'#fef3c7' },
  { id:3, emoji:'⚙️', name:'Yaskawa GP12', sub:'조립·체결 · 인천 남동구', price:'18,500,000', state:'거래완료', stateColor:'#64748b', stateBg:'#f1f5f9' },
]

const buyList = [
  { id:1, emoji:'📦', name:'Boston Dynamics HD6', sub:'물류·이송 AGV · 서울 강남', price:'12,500,000', state:'채팅중', stateColor:'#92400e', stateBg:'#fef3c7' },
  { id:2, emoji:'🧹', name:'삼성 Jet Bot AI+', sub:'로봇청소기 · 서울 마포구', price:'650,000', state:'구매완료', stateColor:'#4f46e5', stateBg:'#eef2ff' },
]

const menuItems = [
  { icon:'❤️', label:'관심 목록', sub:'저장한 매물', badge:'7', badgeColor:'#00a37a', badgeBg:'#f0fdf9' },
  { icon:'⭐', label:'받은 후기', sub:'거래 평가', badge:'★ 4.9', badgeColor:'#d97706', badgeBg:'#fef3c7' },
  { icon:'💬', label:'채팅', sub:'진행중인 대화', badge:'2', badgeColor:'#e11d48', badgeBg:'#fff1f2' },
]

const settingItems = [
  { icon:'⚙️', label:'알림 설정', sub:'푸시·이메일 알림' },
  { icon:'📄', label:'이용약관 · 개인정보', sub:'' },
  { icon:'ℹ️', label:'고객센터 · 신고', sub:'' },
]

interface Props {
  onNavigate: (screen: string) => void
  user: any
  onLogout: () => void
}

export default function MyPage({ onNavigate, user, onLogout }: Props) {
  const [tradeTab, setTradeTab] = useState<'sell'|'buy'>('sell')
  const list = tradeTab === 'sell' ? sellList : buyList

  return (
    <div>
      <div style={{background:'#00D4A1',padding:'14px 18px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <LOGO title="마이페이지" />
        <div style={{display:'flex',gap:14}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2a6 6 0 0 1 6 6c0 3.5 1.5 5 1.5 5h-15S5 11.5 5 8a6 6 0 0 1 6-6zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" fill="#0f172a"/>
          </svg>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="3" stroke="#0f172a" strokeWidth="1.5"/>
            <path d="M11 2v2M11 18v2M2 11h2M18 11h2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div style={{background:'#f8fafc'}}>

        {/* 프로필 카드 */}
        <div style={{margin:'14px 16px 0',background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:16}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
            <div style={{width:52,height:52,borderRadius:'50%',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center',color:'#00d4a1',fontSize:18,fontWeight:500,flexShrink:0}}>KM</div>
            <div>
              <div style={{fontSize:16,fontWeight:500,color:'#0f172a',marginBottom:3}}>김민준</div>
              <div style={{fontSize:12,color:'#94a3b8'}}>{user?.email}</div>
            </div>
            <button style={{marginLeft:'auto',fontSize:12,padding:'6px 12px',borderRadius:8,border:'0.5px solid #e2e8f0',background:'#f8fafc',color:'#64748b',cursor:'pointer'}}>프로필 수정</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:'#e2e8f0',borderRadius:10,overflow:'hidden'}}>
            {[{num:'12',label:'판매완료'},{num:'5',label:'구매완료'},{num:'98%',label:'응답률'}].map(s=>(
              <div key={s.label} style={{background:'#fff',padding:10,textAlign:'center'}}>
                <div style={{fontSize:17,fontWeight:500,color:'#0f172a',marginBottom:2}}>{s.num}</div>
                <div style={{fontSize:10,color:'#94a3b8'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 거래 내역 */}
        <div style={{fontSize:12,fontWeight:500,color:'#94a3b8',padding:'14px 16px 8px',letterSpacing:'0.04em',textTransform:'uppercase'}}>거래 내역</div>
        <div style={{padding:'0 16px',marginBottom:10}}>
          <div style={{display:'flex',background:'#e2e8f0',borderRadius:12,padding:3}}>
            {(['sell','buy'] as const).map(t=>(
              <button key={t} onClick={()=>setTradeTab(t)}
                style={{flex:1,padding:8,borderRadius:10,fontSize:13,fontWeight:500,border:'none',cursor:'pointer',
                  background: tradeTab===t ? '#0f172a' : 'transparent',
                  color: tradeTab===t ? '#00d4a1' : '#64748b'}}>
                {t==='sell' ? '판매 내역' : '구매 내역'}
              </button>
            ))}
          </div>
        </div>
        <div style={{padding:'0 16px',marginBottom:10}}>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',overflow:'hidden'}}>
            {list.map((item,i)=>(
              <div key={item.id} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderBottom: i<list.length-1 ? '0.5px solid #f1f5f9' : 'none',cursor:'pointer'}}>
                <div style={{width:44,height:44,borderRadius:10,background:'#f0fdf9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{item.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,color:'#0f172a',marginBottom:2}}>{item.name}</div>
                  <div style={{fontSize:11,color:'#94a3b8'}}>{item.sub}</div>
                  <div style={{fontSize:12,fontWeight:500,color:'#0f172a',marginTop:2}}>₩{item.price}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 7px',borderRadius:5,fontWeight:500,flexShrink:0,color:item.stateColor,background:item.stateBg}}>{item.state}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 활동 */}
        <div style={{fontSize:12,fontWeight:500,color:'#94a3b8',padding:'0 16px 8px',letterSpacing:'0.04em',textTransform:'uppercase'}}>활동</div>
        <div style={{padding:'0 16px',marginBottom:10}}>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',overflow:'hidden'}}>
            {menuItems.map((item,i)=>(
              <div key={item.label} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 14px',borderBottom: i<menuItems.length-1 ? '0.5px solid #f1f5f9' : 'none',cursor:'pointer'}}>
                <div style={{width:34,height:34,borderRadius:10,background:'#f0fdf9',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:16}}>{item.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>{item.label}</div>
                  {item.sub && <div style={{fontSize:11,color:'#94a3b8',marginTop:1}}>{item.sub}</div>}
                </div>
                <span style={{marginLeft:'auto',fontSize:10,padding:'2px 8px',borderRadius:6,fontWeight:500,color:item.badgeColor,background:item.badgeBg}}>{item.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 설정 */}
        <div style={{fontSize:12,fontWeight:500,color:'#94a3b8',padding:'0 16px 8px',letterSpacing:'0.04em',textTransform:'uppercase'}}>설정</div>
        <div style={{padding:'0 16px',marginBottom:4}}>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',overflow:'hidden'}}>
            {settingItems.map((item,i)=>(
              <div key={item.label} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 14px',borderBottom: i<settingItems.length-1 ? '0.5px solid #f1f5f9' : 'none',cursor:'pointer'}}>
                <div style={{width:34,height:34,borderRadius:10,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:16}}>{item.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>{item.label}</div>
                  {item.sub && <div style={{fontSize:11,color:'#94a3b8',marginTop:1}}>{item.sub}</div>}
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{marginLeft:'auto'}}>
                  <path d="M5 3l4 4-4 4" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* 로그아웃 */}
        <div style={{padding:'4px 16px 16px'}}>
<button
            onClick={onLogout}
            style={{width:'100%',padding:13,background:'#fff',color:'#e11d48',border:'0.5px solid #fecdd3',borderRadius:14,fontSize:14,fontWeight:500,cursor:'pointer'}}>
            로그아웃
          </button>
        </div>

      </div>
    </div>
  )
}