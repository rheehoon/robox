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

const industrialCats = [
  { name:'용접·접합', desc:'아크, 스폿, 레이저', count:47, bg:'#f0fdf9', color:'#00a37a' },
  { name:'조립·체결', desc:'부품 조립, 나사체결', count:38, bg:'#f0fdf9', color:'#00a37a' },
  { name:'도장·코팅', desc:'스프레이, 실링', count:29, bg:'#f0fdf9', color:'#00a37a' },
  { name:'팔레타이징', desc:'적재·하역', count:22, bg:'#f0fdf9', color:'#00a37a' },
  { name:'물류·이송 AGV', desc:'자율주행 이송', count:61, bg:'#f0fdf9', color:'#00a37a' },
  { name:'검사·측정', desc:'비전, 품질검사', count:33, bg:'#f0fdf9', color:'#00a37a' },
]

const serviceCats = [
  { name:'서빙·F&B', desc:'음식점, 카페', count:44, bg:'#eef2ff', color:'#6366f1' },
  { name:'의료·수술', desc:'수술보조, 재활', count:18, bg:'#eef2ff', color:'#6366f1' },
  { name:'물류·유통', desc:'마트, 창고', count:52, bg:'#eef2ff', color:'#6366f1' },
  { name:'건설·시설관리', desc:'청소, 순찰', count:27, bg:'#eef2ff', color:'#6366f1' },
]

const lifeCats = [
  { name:'로봇청소기', desc:'가정용 청소', count:34, bg:'#fef3c7', color:'#d97706' },
  { name:'조리 로봇', desc:'주방 자동화', count:12, bg:'#fef3c7', color:'#d97706' },
  { name:'웨어러블', desc:'재활, 보조기기', count:8, bg:'#fef3c7', color:'#d97706' },
  { name:'교육·학습', desc:'코딩, 교육용', count:19, bg:'#fef3c7', color:'#d97706' },
  { name:'홈 보안·순찰', desc:'실내외 순찰', count:7, bg:'#fef3c7', color:'#d97706' },
  { name:'반려동물 케어', desc:'자동 급식, 놀이', count:5, bg:'#fef3c7', color:'#d97706' },
]

interface Props { onNavigate: (screen: string) => void }

export default function CategoryPage({ onNavigate }: Props) {
  const [tab, setTab] = useState<'industrial'|'life'>('industrial')
  const [midTab, setMidTab] = useState<'mfg'|'svc'>('mfg')

  const cats = tab === 'industrial'
    ? (midTab === 'mfg' ? industrialCats : serviceCats)
    : lifeCats

  return (
    <div>
      <div style={{background:'#00D4A1'}}>
        <div style={{padding:'14px 18px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <LOGO title="카테고리" />
          <div style={{display:'flex',gap:14}}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2a6 6 0 0 1 6 6c0 3.5 1.5 5 1.5 5h-15S5 11.5 5 8a6 6 0 0 1 6-6zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" fill="#0f172a"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{background:'#f8fafc'}}>
        {/* 대분류 탭 */}
        <div style={{padding:'14px 16px 0'}}>
          <div style={{display:'flex',background:'#e2e8f0',borderRadius:12,padding:3}}>
            {(['industrial','life'] as const).map(t=>(
              <button key={t}
                onClick={()=>setTab(t)}
                style={{flex:1,padding:8,borderRadius:10,fontSize:13,fontWeight:500,border:'none',cursor:'pointer',
                  background: tab===t ? '#0f172a' : 'transparent',
                  color: tab===t ? '#00d4a1' : '#64748b'}}>
                {t==='industrial' ? '산업용 로봇' : '생활용 로봇'}
              </button>
            ))}
          </div>
        </div>

        {/* 중분류 탭 (산업용만) */}
        {tab === 'industrial' && (
          <div style={{padding:'10px 16px 0'}}>
            <div style={{display:'flex',background:'#f1f5f9',borderRadius:10,padding:3}}>
              {(['mfg','svc'] as const).map(t=>(
                <button key={t}
                  onClick={()=>setMidTab(t)}
                  style={{flex:1,padding:'6px 8px',borderRadius:8,fontSize:12,fontWeight:500,border:'none',cursor:'pointer',
                    background: midTab===t ? '#0f172a' : 'transparent',
                    color: midTab===t ? '#00d4a1' : '#64748b'}}>
                  {t==='mfg' ? '제조업' : '서비스업'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 카테고리 리스트 */}
        <div style={{display:'flex',flexDirection:'column',gap:8,padding:'14px 16px 16px'}}>
          {cats.map(cat=>(
            <div key={cat.name}
              onClick={()=>onNavigate('detail')}
              style={{background:'#fff',borderRadius:14,border:'0.5px solid #e2e8f0',padding:'12px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:42,height:42,borderRadius:11,background:cat.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:18,color:cat.color,fontWeight:700}}>R</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:'#0f172a'}}>{cat.name}</div>
                <div style={{fontSize:11,color:'#94a3b8',marginTop:1}}>{cat.desc}</div>
              </div>
              <span style={{fontSize:10,padding:'2px 7px',borderRadius:6,background:'#f0fdf9',color:'#00a37a',fontWeight:500,flexShrink:0}}>{cat.count}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0}}>
                <path d="M5 3l4 4-4 4" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}