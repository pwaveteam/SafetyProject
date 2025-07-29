"use client"
import React, { useState, useEffect } from "react"
import { X } from "lucide-react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"
import ToggleSwitch from "@/components/common/ToggleSwitch"
import GroupedTable from "@/components/common/GroupedTable"

type Props = { isOpen: boolean; onClose: () => void; onSave: (data: any) => void }

export default function RegularEducationRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({ course: "", targetGroup: "", eduName: "", startDate: "", endDate: "", startHour: "", startMinute: "", endHour: "", endMinute: "", educationMethod: "", trainer: "", eduMaterial: "", fileUpload: "", note: "", notify: true, notifyWhen: "1주일 전" })
const [showGuide, setShowGuide] = useState(false)

useEffect(() => { if (showGuide) { const modal = document.getElementById("guide-modal"); modal?.scrollIntoView({ behavior: "smooth", block: "start" }) } }, [showGuide])

const courseOptions = ["정기교육", "채용 시 교육", "작업내용 변경 시 교육", "특별교육", "직무교육"]
const targetOptionsMap: Record<string, { value: string, label: string }[]> = {
"정기교육": [{ value: "사무직 종사 근로자", label: "사무직 종사 근로자" }, { value: "판매업무 종사 근로자", label: "판매업무 종사 근로자" }, { value: "기타 근로자", label: "기타 근로자" }],
"채용 시 교육": [{ value: "일용근로자", label: "일용근로자" }, { value: "계약 1주 이하", label: "계약 1주 이하" }, { value: "1개월 이하 기간제근로자", label: "1개월 이하 기간제근로자" }],
"작업내용 변경 시 교육": [{ value: "일용근로자", label: "일용근로자" }, { value: "계약 1주 이하", label: "계약 1주 이하" }],
"특별교육": [{ value: "유해위험작업 종사자", label: "유해위험작업 종사자" }, { value: "타워크레인 신호 근로자", label: "타워크레인 신호 근로자" }],
"직무교육": [{ value: "안전보건관리자", label: "안전보건관리자" }, { value: "안전보건관리책임자", label: "안전보건관리책임자" }, { value: "관리감독자", label: "관리감독자" }]
}

const courseHourMap: Record<string, Record<string, string>> = {
"정기교육": { "사무직 종사 근로자": "매반기 6시간 이상", "판매업무 종사 근로자": "매반기 6시간 이상", "기타 근로자": "매반기 12시간 이상" },
"채용 시 교육": { "일용근로자": "1시간 이상", "계약 1주 이하": "4시간 이상", "1개월 이하 기간제근로자": "8시간 이상" },
"작업내용 변경 시 교육": { "일용근로자": "1시간 이상", "계약 1주 이하": "2시간 이상" },
"특별교육": { "유해위험작업 종사자": "2시간 이상", "타워크레인 신호 근로자": "8시간 이상", "그 외 근로자": "16시간 이상" }
}

const guideData = [
{ course: "정기교육", target: "사무직 종사 근로자", hour: "매반기 6시간 이상" },
{ course: "정기교육", target: "판매업무 직접 종사 근로자", hour: "매반기 6시간 이상" },
{ course: "정기교육", target: "그 외 근로자", hour: "매반기 12시간 이상" },
{ course: "채용 시 교육", target: "일용근로자·계약 1주 이하", hour: "1시간 이상" },
{ course: "채용 시 교육", target: "계약 1주 초과~1개월 이하", hour: "4시간 이상" },
{ course: "채용 시 교육", target: "그 외 근로자", hour: "8시간 이상" },
{ course: "작업내용 변경 시 교육", target: "일용근로자·계약 1주 이하", hour: "1시간 이상" },
{ course: "작업내용 변경 시 교육", target: "그 외 근로자", hour: "2시간 이상" },
{ course: "특별교육", target: "39개 유해·위험 작업 종사 근로자 중 일용·계약 1주 이하(타워크레인 제외)", hour: "2시간 이상" },
{ course: "특별교육", target: "타워크레인 신호작업 근로자", hour: "8시간 이상" },
{ course: "특별교육", target: "그 외 근로자", hour: "16시간 이상" }
]

const grouped = guideData.reduce((acc, cur) => { if (!acc[cur.course]) acc[cur.course] = []; acc[cur.course].push({ target: cur.target, hour: cur.hour }); return acc }, {} as Record<string, { target: string; hour: string }[]>)

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value })) }
const NotifyToggle = <ToggleSwitch checked={formData.notify} onChange={checked => setFormData(prev => ({ ...prev, notify: checked }))} />
const hourText = formData.course && formData.targetGroup && courseHourMap[formData.course]?.[formData.targetGroup]
const RequiredHourField = <div className="text-xs md:text-sm text-gray-600 font-medium">{hourText ? `필수 교육시간: ${hourText}` : ""}</div>

const fields: Field[] = [
{ label: "교육과정", name: "course", type: "select", options: courseOptions.map(v => ({ value: v, label: v })) },
{ label: "교육대상", name: "targetGroup", type: "select", options: targetOptionsMap[formData.course] || [] },
{ label: "교육시간", name: "requiredHour", type: "custom", customRender: RequiredHourField, required: false },
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
