import React from "react"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

type NoticeItem = {
id: number
category?: string
title?: string
date?: string
msg?: string
time?: string
}

type DashboardNoticeProps = {
title: string
data?: NoticeItem[]
}

const notices: NoticeItem[] = [
{ id: 1, category: "공지사항", title: "2025년 법 개정 안내 및 대응 계획", date: "2025-07-15" },
{ id: 2, category: "공지사항", title: "안전관리책임자 교육 일정 안내", date: "2025-07-14" },
{ id: 3, category: "중대재해", title: "위험성 평가 절차 변경 사항 공지", date: "2025-07-13" },
{ id: 4, category: "중대재해", title: "사업장 내 안전점검 강화 지침", date: "2025-07-12" },
{ id: 5, category: "자료실", title: "작업환경 개선 지원 사업 관련 배포 자료", date: "2025-07-11" },
{ id: 6, category: "자료실", title: "신속대응팀 구성 및 연락처 안내 자료 배포", date: "2025-07-10" },
{ id: 7, category: "중대재해", title: "출입통제 강화 관련 법적 공지", date: "2025-07-09" },
{ id: 8, category: "중대재해", title: "법적 준수사항 점검 체크리스트 배포", date: "2025-07-08" },
{ id: 9, category: "자료실", title: "안전보건교육 프로그램 변경 안내 배포 자료", date: "2025-07-07" },
{ id: 10, category: "공지사항", title: "현장 CCTV 설치 계획 공지", date: "2025-07-06" },
]

const safetyVoices: NoticeItem[] = [
{ id: 1, msg: "중대재해처벌법 관련 긴급 안전 점검 실시", time: "3분 전" },
{ id: 2, msg: "위험구역 진입 감지, 즉시 조치 요망", time: "10분 전" },
{ id: 3, msg: "안전모 미착용 근로자 발견, 안내 완료", time: "25분 전" },
{ id: 4, msg: "작업장 내 화재경보 오작동 확인, 점검 중", time: "40분 전" },
{ id: 5, msg: "중장비 근접 작업 시 안전 거리 확보 필요", time: "50분 전" },
{ id: 6, msg: "비상구 폐쇄 상태 발견, 즉시 개방 요청", time: "2025-07-14" },
{ id: 7, msg: "안전교육 미이수자 출입 통제 강화 예정", time: "2025-07-13" },
{ id: 8, msg: "산업재해 예방 캠페인 진행 중", time: "2025-07-12" },
{ id: 9, msg: "작업자 쓰러짐 감지, 응급조치 완료", time: "2025-07-11" },
{ id: 10, msg: "안전장비 점검 결과 이상 없음", time: "2025-07-10" },
]

const DashboardNotice: React.FC<DashboardNoticeProps> = ({ title, data }) => {
const navigate = useNavigate()

const handleViewAllClick = () => {
if (title === "공지사항") navigate("/notice-board/notice")
else if (title === "안전보이스") navigate("/nearmiss/safevoice")
}

const noticeData = data || (title === "공지사항" ? notices : title === "안전보이스" ? safetyVoices : [])

return (
<section
className="bg-white rounded-[16px] border border-gray-200 p-6 min-h-[400px] overflow-auto"
aria-label={title}
>
<header className="flex justify-between items-center font-bold mb-5">
<h3 className="text-lg sm:text-xl text-gray-900">{title}</h3>
<button
className="text-gray-500 hover:underline text-xs sm:text-sm font-medium flex items-center gap-1"
aria-label={`${title} 전체보기`}
onClick={handleViewAllClick}
type="button"
>
전체보기 <ChevronRight size={14} />
</button>
</header>
<ul className="divide-y divide-gray-200 text-gray-900 text-xs sm:text-sm font-medium">

{noticeData.slice(0, 10).map(({ id, title, msg, date, time }) => (
<li key={id} className="py-2">
<div>{title ?? msg ?? ""}</div>
<div className="text-[10px] sm:text-xs text-gray-400">{date ?? time ?? ""}</div>
</li>
))}
</ul>
</section>
)
}

export default DashboardNotice