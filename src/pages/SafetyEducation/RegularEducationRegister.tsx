"use client"
import React, { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"
import ToggleSwitch from "@/components/common/ToggleSwitch"
import GroupedTable from "@/components/common/GroupedTable"

type Props = { isOpen: boolean; onClose: () => void; onSave: (data: any) => void }

export default function RegularEducationRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
category: "",
course: "",
targetGroup: "",
eduName: "",
startDate: "",
endDate: "",
startHour: "",
startMinute: "",
endHour: "",
endMinute: "",
educationMethod: "",
trainer: "",
eduMaterial: "",
fileUpload: "",
note: "",
notify: true,
notifyWhen: "1주일 전"
})
const [showGuide, setShowGuide] = useState(false)

useEffect(() => {
if (showGuide) {
const modal = document.getElementById("guide-modal")
modal?.scrollIntoView({ behavior: "smooth", block: "start" })
}
}, [showGuide])

const categoryOptions = ["근로자 교육", "관리자 교육", "기타 교육"]

const categoryCourseMap: Record<string, string[]> = {
"근로자 교육": [
"정기교육 (사무직 종사 근로자)",
"정기교육 (판매업무 직접 종사 근로자)",
"정기교육 (그 외 근로자)",
"채용 시 교육 (일용근로자·계약 1주 이하 기간제근로자)",
"채용 시 교육 (계약 1주 초과~1개월 이하 기간제근로자)",
"채용 시 교육 (그 외 근로자)",
"작업내용 변경 시 교육 (일용근로자·계약 1주 이하 기간제근로자)",
"작업내용 변경 시 교육 (그 외 근로자)",
"특별교육 (39개 유해·위험 작업 수행 근로자 중 일용·계약 1주 이하, 타워크레인 제외)",
"특별교육 (타워크레인 신호작업 근로자)",
"특별교육 (그 외 근로자)",
],
"관리자 교육": [
"정기교육 (관리감독자)",
"채용 시 교육 (관리감독자)",
"작업내용 변경 시 교육 (관리감독자)",
"특별교육 (관리감독자)",
"신규교육 (안전보건관리책임자)",
"보수교육 (안전보건관리책임자)",
"신규교육 (안전보건관리자)",
"보수교육 (안전보건관리자)",
"보수교육 (안전관리자)"
],
"기타 교육": ["최초 노무제공 시 교육 (특수형태근로종사자)"]
}

const courseHourMap: Record<string, string> = {
"정기교육 (사무직 종사 근로자)": "매반기 6시간 이상",
"정기교육 (판매업무 직접 종사 근로자)": "매반기 6시간 이상",
"정기교육 (그 외 근로자)": "매반기 12시간 이상",
"채용 시 교육 (일용근로자·계약 1주 이하 기간제근로자)": "1시간 이상",
"채용 시 교육 (계약 1주 초과~1개월 이하 기간제근로자)": "4시간 이상",
"채용 시 교육 (그 외 근로자)": "8시간 이상",
"작업내용 변경 시 교육 (일용근로자·계약 1주 이하 기간제근로자)": "1시간 이상",
"작업내용 변경 시 교육 (그 외 근로자)": "2시간 이상",
"특별교육 (39개 유해·위험 작업 수행 근로자 중 일용·계약 1주 이하, 타워크레인 제외)": "2시간 이상",
"특별교육 (타워크레인 신호작업 근로자)": "8시간 이상",
"특별교육 (그 외 근로자)": "16시간 이상",
"건설업 기초안전보건교육 (건설업 일용근로자)": "8시간 이상",
"정기교육 (관리감독자)": "연간 16시간 이상",
"채용 시 교육 (관리감독자)": "8시간 이상",
"작업내용 변경 시 교육 (관리감독자)": "2시간 이상",
"특별교육 (관리감독자)": "16시간 이상",
"신규교육 (안전보건관리책임자)": "6시간 이상",
"보수교육 (안전보건관리책임자)": "6시간 이상",
"신규교육 (안전보건관리자)": "34시간 이상",
"보수교육 (안전보건관리자)": "24시간 이상",
"보수교육 (안전관리자)": "8시간 이상",
"최초 노무제공 시 교육 (특수형태근로종사자)": "2시간 이상 (단기작업 1시간 이상)"
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
const { name, value, type, checked } = e.target
setFormData(prev => ({
...prev,
[name]: type === "checkbox" ? checked : value,
...(name === "category" ? { course: "", targetGroup: "" } : {})
}))
}

const NotifyToggle = (
<ToggleSwitch
checked={formData.notify}
onChange={checked => setFormData(prev => ({ ...prev, notify: checked }))}
/>
)

const hourText = formData.course && courseHourMap[formData.course]

const fields: Field[] = [
{ label: "교육대상 분류", name: "category", type: "select", options: categoryOptions.map(v => ({ value: v, label: v })) },
{
label: "교육과정",
name: "course",
type: "custom",
customRender: (
<div className="flex items-center gap-2 w-full">
<div className="relative w-full md:w-[300px]">
<select
name="course"
value={formData.course}
onChange={handleChange}
className="border border-[#AAAAAA] rounded-[8px] px-2 h-[39px] w-full appearance-none bg-white text-[#333639] pr-8 text-sm md:text-[15px] font-medium"
>
<option value="">선택</option>
{(categoryCourseMap[formData.category] || []).map(course => (
<option key={course} value={course}>{course}</option>
))}
</select>
<ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
</div>
{hourText && (
<span className="text-sm md:text-[15px] font-medium text-[#6D808E] whitespace-nowrap">
교육시간: {hourText}
</span>
)}
</div>
)
},
{ label: "교육명", name: "eduName", type: "text" },
{ label: "교육기간", name: "educationPeriod", type: "daterange" },
{ label: "교육시간", name: "educationTime", type: "timeRange" },
{ label: "교육방식", name: "educationMethod", type: "select", options: [{ value: "자체교육", label: "자체교육" }, { value: "온라인교육", label: "온라인교육" }, { value: "집체교육", label: "집체교육" }] },
{ label: "강사", name: "trainer", type: "text", required: false },
{ label: "교육자료", name: "eduMaterial", type: "fileUpload" },
{ label: "첨부파일", name: "fileUpload", type: "fileUpload" },
{ label: "비고", name: "note", type: "textarea" },
{ label: "알림 전송여부", name: "notify", type: "custom", customRender: NotifyToggle },
{ label: "알림 발송시점", name: "notifyWhen", type: "select", options: [{ value: "1일 전", label: "1일 전" }, { value: "3일 전", label: "3일 전" }, { value: "1주일 전", label: "1주일 전" }], disabled: !formData.notify }
]

const handleSave = () => { onSave(formData) }

if (!isOpen) return null

const grouped = Object.entries(courseHourMap).reduce((acc, [course, hour]) => {
const [category] = Object.entries(categoryCourseMap).find(([_, list]) => list.includes(course)) || []
if (!acc[category]) acc[category] = []
acc[category].push({ target: course, hour })
return acc
}, {} as Record<string, { target: string; hour: string }[]>)

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-3">
<h2 className="text-2xl font-semibold tracking-wide">안전보건교육 등록</h2>
<Button variant="docs" onClick={() => setShowGuide(true)}>과정별 교육시간 안내</Button>
</div>
<FormScreen fields={fields} values={formData} onChange={handleChange} onClose={onClose} onSave={handleSave} isModal={true} notifyEnabled={formData.notify} className="w-full" />
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={handleSave}>저장하기</Button>
</div>
{showGuide && (
<>
<div onClick={() => setShowGuide(false)} className="fixed inset-0 bg-black bg-opacity-40 z-40" />
<div id="guide-modal" className="fixed top-[14%] left-1/2 -translate-x-1/2 bg-white p-6 rounded-[16px] w-[860px] max-h-[80vh] overflow-auto shadow-lg z-50">
<button onClick={() => setShowGuide(false)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition-colors"><X size={19} /></button>
<h3 className="text-xl font-bold mb-4 text-gray-900">과정별 교육시간 안내</h3>
<GroupedTable grouped={grouped} />
</div>
</>
)}
</div>
</div>
)
}
