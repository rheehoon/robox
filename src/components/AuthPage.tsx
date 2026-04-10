'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const LOGO = () => (
  <div style={{display:'flex',alignItems:'center'}}>
    <span style={{fontSize:24,fontWeight:500,letterSpacing:-1,color:'#fff',lineHeight:1}}>Robo</span>
    <div style={{width:30,height:30,position:'relative',marginLeft:6,overflow:'visible',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg width="38" height="38" viewBox="0 0 38 38" overflow="visible" style={{overflow:'visible'}}>
        <rect x="3" y="3" width="32" height="32" rx="7" fill="#0f172a"/>
        <line x1="-2" y1="-2" x2="40" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
        <line x1="40" y1="-2" x2="-2" y2="40" stroke="#00d4a1" strokeWidth="7" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
)

interface Props { onSuccess: () => void }

export default function AuthPage({ onSuccess }: Props) {
  const [mode, setMode] = useState<'login'|'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleLogin = async () => {
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  const handleSignup = async () => {
    if (!email || !password || !name) { setError('모든 항목을 입력해주세요.'); return }
    if (password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } }
    })
    if (error) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
    } else {
      setMessage('✅ 가입 완료! 이메일을 확인하여 인증을 완료해주세요.')
    }
    setLoading(false)
  }

  const inp = {
    width:'100%',
    border:'0.5px solid #e2e8f0',
    borderRadius:10,
    padding:'12px 14px',
    fontSize:14,
    color:'#0f172a',
    background:'#f8fafc',
    outline:'none',
    fontFamily:'inherit',
    marginBottom:10
  } as React.CSSProperties

  return (
    <div style={{minHeight:'100vh',background:'#f8fafc',display:'flex',flexDirection:'column'}}>

      {/* 상단 바 — 홈화면과 동일 */}
      <div style={{background:'#00D4A1'}}>
        <div style={{padding:'14px 18px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <LOGO />
        </div>
        <div style={{padding:'12px 16px 16px'}}>
          <div style={{fontSize:13,color:'#065f46',fontWeight:500}}>
            {mode==='login' ? '로그인하고 로봇을 거래하세요' : '회원가입하고 시작하세요'}
          </div>
        </div>
      </div>

      {/* 폼 */}
      <div style={{flex:1,padding:'24px 16px'}}>
        <div style={{background:'#fff',borderRadius:20,border:'0.5px solid #e2e8f0',padding:20}}>

          {/* 탭 */}
          <div style={{display:'flex',background:'#f1f5f9',borderRadius:12,padding:3,marginBottom:20}}>
            {(['login','signup'] as const).map(m=>(
              <button key={m} onClick={()=>{setMode(m);setError('');setMessage('')}}
                style={{flex:1,padding:'9px 0',borderRadius:10,fontSize:14,fontWeight:500,border:'none',cursor:'pointer',
                  background: mode===m ? '#0f172a' : 'transparent',
                  color: mode===m ? '#00d4a1' : '#64748b'}}>
                {m==='login' ? '로그인' : '회원가입'}
              </button>
            ))}
          </div>

          {message && (
            <div style={{background:'#f0fdf9',border:'0.5px solid #a7f3d0',borderRadius:10,padding:'12px 14px',marginBottom:16,fontSize:13,color:'#065f46'}}>
              {message}
            </div>
          )}

          {error && (
            <div style={{background:'#fff1f2',border:'0.5px solid #fecdd3',borderRadius:10,padding:'12px 14px',marginBottom:16,fontSize:13,color:'#e11d48'}}>
              {error}
            </div>
          )}

          {mode === 'signup' && (
            <>
              <label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>이름</label>
              <input style={inp} placeholder="홍길동" value={name} onChange={e=>setName(e.target.value)}/>
              <label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>전화번호 (선택)</label>
              <input style={inp} type="tel" placeholder="010-0000-0000" value={phone} onChange={e=>setPhone(e.target.value)}/>
            </>
          )}

          <label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>이메일</label>
          <input style={inp} type="email" placeholder="example@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>

          <label style={{fontSize:12,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>비밀번호</label>
          <input style={{...inp,marginBottom:20}} type="password" placeholder="6자 이상" value={password} onChange={e=>setPassword(e.target.value)}/>

          <button
            onClick={mode==='login' ? handleLogin : handleSignup}
            disabled={loading}
            style={{width:'100%',padding:14,background: loading ? '#94a3b8' : '#00d4a1',color:'#0f172a',border:'none',borderRadius:12,fontSize:15,fontWeight:500,cursor: loading ? 'not-allowed' : 'pointer'}}>
            {loading ? '처리 중...' : mode==='login' ? '로그인' : '회원가입'}
          </button>

          {mode==='login' && (
            <button onClick={()=>{setMode('signup');setError('')}}
              style={{width:'100%',marginTop:12,padding:'10px 0',background:'none',border:'none',fontSize:13,color:'#64748b',cursor:'pointer'}}>
              아직 계정이 없으신가요? <span style={{color:'#00a37a',fontWeight:500}}>회원가입</span>
            </button>
          )}
        </div>

        <div style={{marginTop:16,fontSize:12,color:'#94a3b8',textAlign:'center'}}>
          RoboX · 중고로봇 거래 플랫폼
        </div>
      </div>
    </div>
  )
}