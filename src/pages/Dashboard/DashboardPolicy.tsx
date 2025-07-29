import React, { useEffect, useState } from "react"
import { FileText, Target, X } from "lucide-react"

type Policy = { id: number; title: string; btnText: string; Icon: React.ComponentType<{ size?: number }>; content: string }

const policies: Policy[] = [
{ id: 1, title: "안전보건경영방침", btnText: "안전보건경영방침", Icon: FileText, content: `우리 회사는 전 임직원의 안전과 건강을 최우선으로 하며,<br/>모든 작업장에서 발생할 수 있는 위험요인을 철저히 관리합니다.<br/>법규를 준수하고 지속적인 개선 활동을 통해<br/>안전보건 경영시스템을 운영하고, 사고 예방에 최선을 다합니다.<br/>안전한 작업환경 조성과 함께 직원의 건강 증진을 적극 지원합니다.` },
{ id: 2, title: "안전보건목표", btnText: "안전보건목표", Icon: Target, content: `올해 안전사고 제로(0)를 달성하는 것을 최우선 목표로 삼으며,<br/>정기적인 안전교육과 위험성 평가를 강화합니다.<br/>사고 발생 시 신속한 대응체계를 구축하고,<br/>직원들의 안전의식 향상과 건강관리 지원에 집중합니다.<br/>지속가능한 안전문화 정착을 위해 꾸준한 노력을 기울입니다.` },
]

const DashboardPolicy: React.FC = () => {
const [modalOpen, setModalOpen] = useState(false)
const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
const handleResize = () => setIsMobile(window.innerWidth <= 767)
handleResize()
window.addEventListener("resize", handleResize)
return () => window.removeEventListener("resize", handleResize)
}, [])

const openModal = (policy: Policy) => { setSelectedPolicy(policy); setModalOpen(true) }
const closeModal = () => { setModalOpen(false); setSelectedPolicy(null) }

return (
<>
{isMobile ? (
<div className="flex gap-3">
{policies.map(({ id, title, btnText, Icon, content }) => (
<button key={id} className="flex-1 inline-flex items-center justify-center text-sm font-medium rounded-lg h-[50px] px-4 bg-[#031E36] text-white transition-colors" onClick={() => openModal({ id, title, btnText, Icon, content })} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#000000"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#031E36"} type="button">{btnText}</button>
))}
</div>
) : (
policies.map(({ id, title, btnText, Icon, content }) => (
<article key={id} className="rounded-lg px-4 py-5 flex flex-row items-center justify-between" style={{ backgroundColor: "#F3F5F8", border: "none" }}>
<div className="flex-1 min-w-0">
<h3 className="text-sm sm:text-xl font-bold text-gray-900">{title}</h3>
<button className="mt-2 inline-flex items-center rounded-lg whitespace-nowrap text-xs sm:text-sm transition-colors duration-300" style={{ backgroundColor: "#031E36", color: "#FFFFFF", padding: "0.5rem 1.25rem", lineHeight: 1 }} onClick={() => openModal({ id, title, btnText, Icon, content })} type="button" onMouseEnter={e => e.currentTarget.style.backgroundColor = "#000000"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#031E36"}>{btnText} 확인하기</button>
</div>
<span className="flex items-center justify-center rounded-lg bg-white ml-4 flex-shrink-0" style={{ width: 36, height: 36, color: "#003156" }} aria-hidden="true"><Icon size={19} /></span>
</article>
))
)}

{modalOpen && selectedPolicy && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
<div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] min-h-[500px] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
<button type="button" onClick={closeModal} aria-label="닫기" className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-200 transition-colors"><X size={19} /></button>
<h3 className="text-xl font-bold mb-4 text-gray-900">{selectedPolicy.title}</h3>
<hr className="border-t border-gray-200 mb-6" />
<p className="whitespace-pre-wrap text-left leading-relaxed" style={{ lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: selectedPolicy.content }} />
</div>
</div>
)}
</>
)
}

export default DashboardPolicy