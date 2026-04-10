'use client'

interface Props {
  current: string
  onNavigate: (screen: string) => void
}

export default function BottomTab({ current, onNavigate }: Props) {
  const tabs = [
    { id: 'home', label: '홈', icon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path d="M3 9l7-7 7 7v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
          fill={on ? '#ffffff' : 'none'}
          stroke={on ? '#ffffff' : '#065f46'}
          strokeWidth="1.5"/>
      </svg>
    )},
    { id: 'cat', label: '카테고리', icon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" fill={on?'#fff':'none'} stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1" fill={on?'#fff':'none'} stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1" fill={on?'#fff':'none'} stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1" fill={on?'#fff':'none'} stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
      </svg>
    )},
    { id: 'reg', label: '등록', icon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
        <line x1="10" y1="7" x2="10" y2="13" stroke={on?'#fff':'#065f46'} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="10" x2="13" y2="10" stroke={on?'#fff':'#065f46'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'wish', label: '관심', icon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path d="M10 17l-7-7a4 4 0 0 1 7-3.5A4 4 0 0 1 17 10z"
          fill={on?'#fff':'none'}
          stroke={on?'#fff':'#065f46'}
          strokeWidth="1.5"/>
      </svg>
    )},
    { id: 'my', label: '마이', icon: (on: boolean) => (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" fill={on?'#fff':'none'} stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
        <path d="M4 17v-1a6 6 0 0 1 12 0v1" stroke={on?'#fff':'#065f46'} strokeWidth="1.5"/>
      </svg>
    )},
  ]

  return (
    <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,zIndex:50,background:'#00D4A1'}}>
      <div style={{display:'flex',paddingBottom:8,paddingTop:6}}>
        {tabs.map(tab => {
          const on = current === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,paddingTop:6,paddingBottom:4,fontSize:10,border:'none',background:'transparent',cursor:'pointer',color: on ? '#ffffff' : '#065f46',fontWeight: on ? 500 : 400}}>
              {tab.icon(on)}
              {tab.label}
              {on && <div style={{width:4,height:4,borderRadius:'50%',background:'#ffffff'}}/>}
            </button>
          )
        })}
      </div>
    </div>
  )
}