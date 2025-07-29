import React from "react"

type Banner = { id: number; title: string; desc: string }
type DashboardBannerProps = { index: number }

const banners: Banner[] = [
{ id: 1, title: "중대재해 관련 문의", desc: "재일 노무법인과 함께 안전 상담 받기" },
{ id: 2, title: "안전교육 필수 이수", desc: "중대재해 예방을 위한 교육 프로그램" },
{ id: 3, title: "전문가 현장 지원 서비스", desc: "전문가가 직접 진행하는 위험 점검" },
{ id: 4, title: "법률 대응 지원", desc: "중대재해처벌법 관련 법률 자문" },
{ id: 5, title: "협력사 교육 강화", desc: "수급업체와 함께하는 안전 교육" },
]

const DashboardBanner: React.FC<DashboardBannerProps> = ({ index }) => {
return (
<section className="w-full h-24 sm:h-28 rounded-lg relative text-white p-4 sm:p-6 flex items-center border border-[#cccccc]" aria-label="Banner" style={{ background: "linear-gradient(135deg, #333333 20%, #5A5F63 80%)" }}>
<div className="flex flex-col justify-center space-y-1 w-full">
<h4 className="font-medium text-xs sm:text-base text-left">{banners[index].title}</h4>
<p className="font-medium text-[10px] sm:text-xs text-left">{banners[index].desc}</p>
<nav className="flex space-x-2 mt-2" aria-label="Banner indicators">
{banners.map((_, idx) => (
<span key={idx} className="rounded-full w-2 h-2 transition-colors duration-300" style={{ backgroundColor: index === idx ? "white" : "rgba(255, 255, 255, 0.4)" }} />
))}
</nav>
</div>
</section>
)
}

export default DashboardBanner