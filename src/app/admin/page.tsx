'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const LOGO = () => (
  <div style={{display:'flex',alignItems:'center',gap:8}}>
    <svg width="32" height="32" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible',flexShrink:0}}>
      <rect x="3" y="3" width="32" height="32" rx="7" fill="#00d4a1"/>
      <line x1="-2" y1="-2" x2="40" y2="40" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"/>
      <line x1="40" y1="-2" x2="-2" y2="40" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"/>
    </svg>
    <span style={{fontSize:18,fontWeight:500,color:'#fff'}}>RoboX 운영자 대시보드</span>
  </div>
)

const kpis = [
  { label:'총 매물', value:'1,284', trend:'+12%', up:true },
  { label:'거래 완료', value:'347', trend:'+8%', up:true },
  { label:'신규 회원', value:'92', trend:'+23%', up:true },
  { label:'신고·검수 대기', value:'14', trend:'+3', up:false },
]

const recentTrades = [
  { emoji:'🦾', name:'FANUC M-20iB / 30F', seller:'김민준', buyer:'이정호', price:'28,000,000', status:'완료', statusColor:'#00a37a', statusBg:'#f0fdf9' },
  { emoji:'🧹', name:'삼성 Jet Bot AI+', seller:'최진수', buyer:'박수빈', price:'650,000', status:'채팅중', statusColor:'#92400e', statusBg:'#fef3c7' },
  { emoji:'🤖', name:'Boston Dynamics HD6', seller:'㈜로봇월드', buyer:'대우물류', price:'12,500,000', status:'완료', statusColor:'#00a37a', statusBg:'#f0fdf9' },
  { emoji:'⚙️', name:'ABB IRB 4600', seller:'현대산업로봇', buyer:'협의중', price:'41,000,000', status:'판매중', statusColor:'#1e40af', statusBg:'#dbeafe' },
]

const pendingList = [
  { name:'FANUC CR-35iA', price:'45,000,000', status:'신규', statusColor:'#00a37a', statusBg:'#f0fdf9' },
  { name:'Kawasaki RS080N', price:'22,000,000', status:'신규', statusColor:'#00a37a', statusBg:'#f0fdf9' },
  { name:'ABB YuMi IRB 14000', price:'38,000,000', status:'보류', statusColor:'#92400e', statusBg:'#fef3c7' },
  { name:'Universal UR10e', price:'18,500,000', status:'신고', statusColor:'#e11d48', statusBg:'#fff1f2' },
]

const topSellers = [
  { rank:1, name:'㈜로봇월드', trades:84 },
  { rank:2, name:'현대산업로봇', trades:61 },
  { rank:3, name:'김민준', trades:12 },
  { rank:4, name:'스마트팩토리', trades:9 },
  { rank:5, name:'박자동화', trades:7 },
]

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user
      setUser(u)
      if (u?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setAuthorized(true)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{color:'#00d4a1',fontSize:16}}>로딩 중...</div>
      </div>
    )
  }

  if (!user || !authorized) {
    return (
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
        <svg width="60" height="60" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible'}}>
          <rect x="3" y="3" width="32" height="32" rx="7" fill="#00d4a1"/>
          <line x1="-2" y1="-2" x2="40" y2="40" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"/>
          <line x1="40" y1="-2" x2="-2" y2="40" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"/>
        </svg>
        <div style={{fontSize:18,fontWeight:500,color:'#fff'}}>접근 권한이 없습니다</div>
        <div style={{fontSize:13,color:'#64748b'}}>관리자 계정으로 로그인해주세요</div>
        <button
          onClick={()=>window.location.href='/'}
          style={{marginTop:8,padding:'10px 24px',background:'#00d4a1',color:'#0f172a',border:'none',borderRadius:12,fontSize:14,fontWeight:500,cursor:'pointer'}}>
          홈으로 이동
        </button>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#f1f5f9'}}>

      {/* 상단 바 */}
      <div style={{background:'#0f172a',padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <LOGO />
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:12,color:'#64748b'}}>{user?.email}</span>
          <span style={{fontSize:11,padding:'3px 8px',borderRadius:6,background:'#00d4a1',color:'#0f172a',fontWeight:500}}>Admin</span>
          <button
            onClick={async()=>{await supabase.auth.signOut();window.location.href='/'}}
            style={{fontSize:12,padding:'6px 12px',borderRadius:8,border:'0.5px solid #334155',background:'transparent',color:'#94a3b8',cursor:'pointer'}}>
            로그아웃
          </button>
        </div>
      </div>

      <div style={{padding:20,maxWidth:1200,margin:'0 auto'}}>

        {/* KPI 카드 */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:20}}>
          {kpis.map(k=>(
            <div key={k.label} style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:16}}>
              <div style={{fontSize:12,color:'#64748b',marginBottom:8}}>{k.label}</div>
              <div style={{fontSize:24,fontWeight:500,color:'#0f172a',marginBottom:4}}>{k.value}</div>
              <div style={{fontSize:12,color: k.up ? '#00a37a' : '#e11d48',fontWeight:500}}>
                {k.up ? '↑' : '↑'} {k.trend}
              </div>
            </div>
          ))}
        </div>

        {/* 중간 그리드 */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>

          {/* 검수 대기 */}
          <div style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:16}}>
            <div style={{fontSize:12,fontWeight:500,color:'#64748b',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.04em'}}>검수·승인 대기</div>
            {pendingList.map(p=>(
              <div key={p.name} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'0.5px solid #f1f5f9'}}>
                <div style={{width:32,height:32,borderRadius:8,background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center',color:'#00d4a1',fontSize:11,fontWeight:500,flexShrink:0}}>R</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#94a3b8'}}>₩{p.price}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:5,fontWeight:500,color:p.statusColor,background:p.statusBg,flexShrink:0}}>{p.status}</span>
              </div>
            ))}
          </div>

          {/* 인기 판매자 */}
          <div style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:16}}>
            <div style={{fontSize:12,fontWeight:500,color:'#64748b',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.04em'}}>인기 판매자 TOP 5</div>
            {topSellers.map(s=>(
              <div key={s.name} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'0.5px solid #f1f5f9'}}>
                <span style={{width:20,fontSize:12,fontWeight:500,color:'#94a3b8',flexShrink:0}}>{s.rank}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>{s.name}</div>
                  <div style={{fontSize:11,color:'#94a3b8'}}>거래 {s.trades}회</div>
                </div>
                <span style={{fontSize:12,fontWeight:500,color:'#00a37a'}}>+{s.trades}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 거래 내역 */}
        <div style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:16}}>
          <div style={{fontSize:12,fontWeight:500,color:'#64748b',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.04em'}}>최근 거래 내역</div>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'0.5px solid #e2e8f0'}}>
                {['상품','판매자','구매자','가격','상태'].map(h=>(
                  <th key={h} style={{padding:'8px 12px',textAlign:'left',fontSize:12,color:'#94a3b8',fontWeight:500}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((t,i)=>(
                <tr key={i} style={{borderBottom:'0.5px solid #f1f5f9'}}>
                  <td style={{padding:'10px 12px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:20}}>{t.emoji}</span>
                      <span style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>{t.name}</span>
                    </div>
                  </td>
                  <td style={{padding:'10px 12px',fontSize:13,color:'#475569'}}>{t.seller}</td>
                  <td style={{padding:'10px 12px',fontSize:13,color:'#475569'}}>{t.buyer}</td>
                  <td style={{padding:'10px 12px',fontSize:13,fontWeight:500,color:'#0f172a'}}>₩{t.price}</td>
                  <td style={{padding:'10px 12px'}}>
                    <span style={{fontSize:11,padding:'3px 8px',borderRadius:5,fontWeight:500,color:t.statusColor,background:t.statusBg}}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}