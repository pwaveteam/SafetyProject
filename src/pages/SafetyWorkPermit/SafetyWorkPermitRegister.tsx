import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"
import RadioGroup from "@/components/common/RadioGroup"

type Props = { isOpen: boolean; onClose: () => void; onSave: (data: any) => void }

export default function SafetyWorkPermitRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({ workType: "", workContent: "", hazardFactors: "", hazardLevel: "높음", safetyPlan: "", workLocation: "", startDate: "", endDate: "", workerCount: "", attachment: null as File | null, note: "" })

const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
const { name, value, type, files } = e.target as HTMLInputElement
if (name === "workerCount" && value !== "" && !/^\d+$/.test(value)) return
if (type === "file") {
setFormData(prev => ({ ...prev, attachment: files?.[0] || null }))
} else {
setFormData(prev => ({ ...prev, [name]: value }))
}
}

const workTypeOptions = [
{ value: "", label: "선택" },
{ value: "정기점검", label: "정기점검" },
{ value: "수리", label: "수리" },
{ value: "신규설치", label: "신규설치" },
{ value: "해체", label: "해체" },
]

const fields: Field[] = [
{ label: "작업유형", name: "workType", type: "select", options: workTypeOptions, placeholder: "작업유형 선택" },
{ label: "작업내용", name: "workContent", type: "textarea", placeholder: "작업내용 입력" },
{ label: "잠재 위험요소", name: "hazardFactors", type: "text", placeholder: "잠재 위험요소 입력" },
{ label: "위험수준", name: "hazardLevel", type: "custom", customRender: (<RadioGroup name="hazardLevel" value={formData.hazardLevel} options={[{ value: "높음", label: "높음" },{ value: "중간", label: "중간" },{ value: "낮음", label: "낮음" }]} onChange={handleChange} />) },
{ label: "안전조치 계획", name: "safetyPlan", type: "textarea", placeholder: "작업내용 입력" },
{ label: "작업장소", name: "workLocation", type: "text", placeholder: "작업장소 입력" },
{ label: "작업기간", name: "workPeriod", type: "daterange" },
{ label: "작업시간", name: "workTime", type: "timeRange" },
{ label: "작업인원", name: "workerCount", type: "quantity", placeholder: "인원수 입력" },
{ label: "비고", name: "note", type: "textarea", placeholder: "비고 입력" },
{ label: "첨부파일", name: "fileUpload", type: "fileUpload" },
]

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold tracking-wide mb-3">안전작업허가서 등록</h2>
<FormScreen
fields={fields}
values={{ ...formData, attachment: formData.attachment?.name || "" }}
onChange={handleChange}
onClose={onClose}
onSave={() => onSave(formData)}
isModal={true}
/>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={() => onSave(formData)}>저장하기</Button>
</div>
</div>
</div>
)
}