'use client'

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

const wishes = [
  { id:1, emoji:'🦾', name:'FANUC M-20iB / 30F', sub:'용접·접합 · 경기 화성시', price:'28,000,000', bg:'#f0fdf9' },
  { id:2, emoji:'🤖', name:'Boston Dynamics HD6', sub:'물류·이송 AGV · 서울 강남', price:'12,500,000', bg:'#f0fdf9' },
  { id:3, emoji:'🧹', name:'삼성 Jet Bot AI+', sub:'로봇청소기 · 서울 마포구', price:'650,000', bg:'#f8fafc' },
]

interface Props { onNavigate: (screen: string) => void }

export default function WishPage({ onNavigate }: Props) {
  return (
    <div>
      <div style={{background:'#00D4A1',padding:'14px 18px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <LOGO title="관심목록" />
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2a6 6 0 0 1 6 6c0 3.5 1.5 5 1.5 5h-15S5 11.5 5 8a6 6 0 0 1 6-6zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" fill="#0f172a"/>
        </svg>
      </div>

      <div style={{background:'#f8fafc'}}>
        <div style={{padding:'14px 16px 0',fontSize:12,color:'#94a3b8'}}>관심 등록 {wishes.length}건</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,padding:'10px 16px 16px'}}>
          {wishes.map(w=>(
            <div key={w.id}
              onClick={()=>onNavigate('detail')}
              style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:'12px 14px',display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
              <div style={{width:52,height:52,borderRadius:10,background:w.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>
                {w.emoji}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,color:'#0f172a',marginBottom:2}}>{w.name}</div>
                <div style={{fontSize:11,color:'#94a3b8'}}>{w.sub}</div>
                <div style={{fontSize:13,fontWeight:500,color:'#0f172a',marginTop:3}}>₩{w.price}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 17l-7-7a4 4 0 0 1 7-3.5A4 4 0 0 1 17 10z" fill="#f43f5e"/>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}