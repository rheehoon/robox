'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

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

const subOptions: Record<string, string[]> = {
  mfg: ['용접·접합','조립·체결','도장·코팅','팔레타이징','물류·이송 AGV','검사·측정'],
  svc: ['서빙·F&B','의료·수술 보조','물류·유통','건설·시설관리'],
  life: ['로봇청소기','조리 로봇','반려동물 케어','웨어러블','교육·학습','홈 보안·순찰'],
}

interface Props { onNavigate: (screen: string) => void }

export default function RegisterPage({ onNavigate }: Props) {
  const supabase = createClient()
  const [catType, setCatType] = useState<'industrial'|'life'>('industrial')
  const [midType, setMidType] = useState<'mfg'|'svc'>('mfg')
  const [condition, setCondition] = useState('최상 A')
  const [negotiable, setNegotiable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    manufacturer:'', modelName:'', modelNumber:'',
    purchaseDate:'', usageMonths:'', purchasePrice:'', salePrice:'',
    phone:'', email:'', installSupport:'판매자 직접 지원',
    tradeMethod:'직거래', tradeRegion:'', description:''
  })

  const subKey = catType === 'life' ? 'life' : midType
  const subs = subOptions[subKey]

  const inp = (field: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(f=>({...f,[field]:e.target.value}))

  const fieldStyle = {width:'100%',border:'0.5px solid #e2e8f0',borderRadius:10,padding:'9px 12px',fontSize:13,color:'#0f172a',background:'#f8fafc',outline:'none',fontFamily:'inherit'}
  const segBtn = (active: boolean) => ({flex:1,padding:'8px 6px',borderRadius:10,border:`0.5px solid ${active?'#0f172a':'#e2e8f0'}`,background:active?'#0f172a':'#f8fafc',fontSize:12,color:active?'#00d4a1':'#64748b',textAlign:'center' as const,cursor:'pointer',fontWeight:active?500:400})
  const condBtn = (active: boolean) => ({flex:1,padding:'8px 4px',borderRadius:10,border:`0.5px solid ${active?'#0f172a':'#e2e8f0'}`,background:active?'#0f172a':'#f8fafc',fontSize:11,color:active?'#00d4a1':'#64748b',textAlign:'center' as const,cursor:'pointer'})

  return (
    <div>
      <div style={{background:'#00D4A1',padding:'14px 18px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <LOGO title="판매등록" />
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2a6 6 0 0 1 6 6c0 3.5 1.5 5 1.5 5h-15S5 11.5 5 8a6 6 0 0 1 6-6zm0 16a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" fill="#0f172a"/>
        </svg>
      </div>

      <div style={{background:'#f8fafc',paddingBottom:20}}>

        {/* 1. 사진 등록 */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{fontSize:11,fontWeight:500,color:'#00a37a',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#00d4a1',color:'#0f172a',fontSize:10,fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>1</span>
            사진 등록
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:14}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
              <div style={{aspectRatio:'1',borderRadius:10,border:'0.5px dashed #00d4a1',background:'#f0fdf9',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:3,cursor:'pointer'}}>
                <div style={{fontSize:20,color:'#00a37a'}}>+</div>
                <div style={{fontSize:9,color:'#00a37a',fontWeight:500}}>대표사진</div>
              </div>
              {[1,2,3].map(i=>(
                <div key={i} style={{aspectRatio:'1',borderRadius:10,border:'0.5px dashed #cbd5e1',background:'#f1f5f9',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:3,cursor:'pointer'}}>
                  <div style={{fontSize:20,color:'#94a3b8'}}>+</div>
                  <div style={{fontSize:9,color:'#94a3b8'}}>추가</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:11,color:'#94a3b8',marginTop:8,textAlign:'center'}}>최대 10장 · 첫 번째 사진이 대표 이미지로 설정됩니다</div>
          </div>
        </div>

        {/* 2. 기본 분류 */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{fontSize:11,fontWeight:500,color:'#00a37a',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#00d4a1',color:'#0f172a',fontSize:10,fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>2</span>
            기본 분류
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:14}}>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>대분류</label>
              <div style={{display:'flex',gap:6}}>
                <button style={segBtn(catType==='industrial')} onClick={()=>setCatType('industrial')}>산업용 로봇</button>
                <button style={segBtn(catType==='life')} onClick={()=>setCatType('life')}>생활용 로봇</button>
              </div>
            </div>
            {catType==='industrial' && (
              <div style={{marginBottom:12}}>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>중분류</label>
                <div style={{display:'flex',gap:6}}>
                  <button style={segBtn(midType==='mfg')} onClick={()=>setMidType('mfg')}>제조업</button>
                  <button style={segBtn(midType==='svc')} onClick={()=>setMidType('svc')}>서비스업</button>
                </div>
              </div>
            )}
            <div>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>소분류</label>
              <select style={fieldStyle}>
                {subs.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* 3. 제품 정보 */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{fontSize:11,fontWeight:500,color:'#00a37a',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#00d4a1',color:'#0f172a',fontSize:10,fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>3</span>
            제품 정보
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:14}}>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>제조회사</label>
              <input style={fieldStyle} placeholder="예: FANUC, ABB, 현대로보틱스" value={form.manufacturer} onChange={inp('manufacturer')}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>제품명</label>
                <input style={fieldStyle} placeholder="예: M-20iB" value={form.modelName} onChange={inp('modelName')}/>
              </div>
              <div>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>모델번호</label>
                <input style={fieldStyle} placeholder="예: 30F" value={form.modelNumber} onChange={inp('modelNumber')}/>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>구입일자</label>
                <input type="date" style={fieldStyle} value={form.purchaseDate} onChange={inp('purchaseDate')}/>
              </div>
              <div>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>사용 기간</label>
                <div style={{display:'flex',alignItems:'center',border:'0.5px solid #e2e8f0',borderRadius:10,background:'#f8fafc',overflow:'hidden'}}>
                  <input type="number" style={{...fieldStyle,border:'none',background:'transparent',flex:1}} placeholder="0" value={form.usageMonths} onChange={inp('usageMonths')}/>
                  <span style={{padding:'9px 12px 9px 4px',fontSize:12,color:'#94a3b8',flexShrink:0}}>개월</span>
                </div>
              </div>
            </div>
            <div style={{marginBottom:0}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>제품 상태</label>
              <div style={{display:'flex',gap:6}}>
                {['최상 A','양호 B','보통 C','부품필요 D'].map(c=>(
                  <button key={c} style={condBtn(condition===c)} onClick={()=>setCondition(c)}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. 가격 정보 */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{fontSize:11,fontWeight:500,color:'#00a37a',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#00d4a1',color:'#0f172a',fontSize:10,fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>4</span>
            가격 정보
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:14}}>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>구입가</label>
              <div style={{display:'flex',alignItems:'center',border:'0.5px solid #e2e8f0',borderRadius:10,background:'#f8fafc',overflow:'hidden'}}>
                <span style={{padding:'9px 4px 9px 12px',fontSize:13,color:'#64748b',flexShrink:0}}>₩</span>
                <input type="number" style={{...fieldStyle,border:'none',background:'transparent',flex:1}} placeholder="0" value={form.purchasePrice} onChange={inp('purchasePrice')}/>
              </div>
            </div>
            <div style={{marginBottom:8}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>판매희망가</label>
              <div style={{display:'flex',alignItems:'center',border:'0.5px solid #e2e8f0',borderRadius:10,background:'#f8fafc',overflow:'hidden'}}>
                <span style={{padding:'9px 4px 9px 12px',fontSize:13,color:'#64748b',flexShrink:0}}>₩</span>
                <input type="number" style={{...fieldStyle,border:'none',background:'transparent',flex:1}} placeholder="0" value={form.salePrice} onChange={inp('salePrice')}/>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',background:'#f8fafc',borderRadius:10,border:'0.5px solid #e2e8f0'}}>
              <span style={{fontSize:13,color:'#0f172a'}}>가격 협의 가능</span>
              <div onClick={()=>setNegotiable(!negotiable)} style={{width:40,height:22,borderRadius:11,background:negotiable?'#00d4a1':'#e2e8f0',position:'relative',cursor:'pointer',flexShrink:0,transition:'background 0.2s'}}>
                <div style={{width:18,height:18,borderRadius:'50%',background:'#fff',position:'absolute',top:2,right:negotiable?2:'auto',left:negotiable?'auto':2,transition:'all 0.2s'}}/>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 판매자 연락처 */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{fontSize:11,fontWeight:500,color:'#00a37a',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#00d4a1',color:'#0f172a',fontSize:10,fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>5</span>
            판매자 연락처
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:14}}>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>전화번호</label>
              <input type="tel" style={fieldStyle} placeholder="010-0000-0000" value={form.phone} onChange={inp('phone')}/>
            </div>
            <div>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>이메일 주소</label>
              <input type="email" style={fieldStyle} placeholder="example@email.com" value={form.email} onChange={inp('email')}/>
            </div>
          </div>
        </div>

        {/* 6. 추가 정보 */}
        <div style={{margin:'14px 16px 0'}}>
          <div style={{fontSize:11,fontWeight:500,color:'#00a37a',marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:20,height:20,borderRadius:'50%',background:'#00d4a1',color:'#0f172a',fontSize:10,fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>6</span>
            추가 정보
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'0.5px solid #e2e8f0',padding:14}}>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>설치·해체 지원</label>
              <select style={fieldStyle} value={form.installSupport} onChange={inp('installSupport')}>
                <option>판매자 직접 지원</option>
                <option>구매자 자체 진행</option>
                <option>협의</option>
              </select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <div>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>거래 방식</label>
                <select style={fieldStyle} value={form.tradeMethod} onChange={inp('tradeMethod')}>
                  <option>직거래</option>
                  <option>택배</option>
                  <option>직거래+택배</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>거래 지역</label>
                <input style={fieldStyle} placeholder="예: 경기 화성시" value={form.tradeRegion} onChange={inp('tradeRegion')}/>
              </div>
            </div>
            <div>
              <label style={{fontSize:11,color:'#64748b',display:'block',marginBottom:5,fontWeight:500}}>상세 설명</label>
              <textarea style={{...fieldStyle,height:64,resize:'none'}} placeholder="사용 환경, 수리 이력, 특이사항 등을 입력해주세요" value={form.description} onChange={inp('description')}/>
            </div>
          </div>
        </div>

        {/* 등록 버튼 */}
        {error && (
          <div style={{margin:'0 16px',background:'#fff1f2',border:'0.5px solid #fecdd3',borderRadius:12,padding:'12px 14px',fontSize:13,color:'#e11d48'}}>
            {error}
          </div>
        )}
        {success && (
          <div style={{margin:'0 16px',background:'#f0fdf9',border:'0.5px solid #a7f3d0',borderRadius:12,padding:'12px 14px',fontSize:13,color:'#065f46'}}>
            ✅ 매물이 등록됐습니다!
          </div>
        )}
        <div style={{padding:16}}>
          <button
            disabled={loading}
            onClick={async()=>{
              setError('')
              if(!form.manufacturer||!form.modelName||!form.salePrice){
                setError('제조회사, 제품명, 판매희망가는 필수입니다.')
                return
              }
              setLoading(true)
              const { data: { user } } = await supabase.auth.getUser()
              if(!user){ setError('로그인이 필요합니다.'); setLoading(false); return }
              const { error } = await supabase.from('robots').insert({
                user_id: user.id,
                category: catType==='industrial' ? '산업용' : '생활용',
                sub_category: catType==='industrial' ? (midType==='mfg'?'제조업':'서비스업') : '생활용',
                detail_category: document.querySelector('#r-sub') ? (document.querySelector('#r-sub') as HTMLSelectElement).value : '',
                manufacturer: form.manufacturer,
                model_name: form.modelName,
                model_number: form.modelNumber,
                purchase_date: form.purchaseDate || null,
                usage_months: form.usageMonths ? parseInt(form.usageMonths) : null,
                condition: condition,
                purchase_price: form.purchasePrice ? parseInt(form.purchasePrice) : null,
                sale_price: parseInt(form.salePrice),
                negotiable: negotiable,
                install_support: form.installSupport,
                trade_method: form.tradeMethod,
                trade_region: form.tradeRegion,
                description: form.description,
                status: '판매중'
              })
              if(error){ setError('등록 중 오류가 발생했습니다: '+error.message) }
              else { setSuccess(true); setTimeout(()=>onNavigate('home'),2000) }
              setLoading(false)
            }}
            style={{width:'100%',padding:14,background: loading?'#94a3b8':'#00d4a1',color:'#0f172a',border:'none',borderRadius:14,fontSize:15,fontWeight:500,cursor: loading?'not-allowed':'pointer'}}>
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>

      </div>
    </div>
  )
}