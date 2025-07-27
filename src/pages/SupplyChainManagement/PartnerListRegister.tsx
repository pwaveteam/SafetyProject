import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

const BASE_INPUT_CLASS = "border border-[#AAAAAA] px-2 h-[39px] w-full appearance-none placeholder:font-normal placeholder:text-[#999999] text-[15px] font-medium rounded-lg"

export default function PartnerRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
company: "",
contractStartDate: "",
contractEndDate: "",
managerList: [""],
contact: "",
planFile: null as File | null,
etcFile: null as File | null
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number) => {
const { name, value, type, files } = e.target as HTMLInputElement
if (type === "file") setFormData(prev => ({ ...prev, [name]: files?.[0] || null }))
else if (name === "managerList" && typeof index === "number") {
const newList = [...formData.managerList]
newList[index] = value
setFormData(prev => ({ ...prev, managerList: newList }))
} else setFormData(prev => ({ ...prev, [name]: value }))
}

const addManager = () => {
if (formData.managerList.length >= 8) return
setFormData(prev => ({ ...prev, managerList: [...prev.managerList, ""] }))
}

const removeManager = (index: number) => {
if (formData.managerList.length <= 1) return
setFormData(prev => ({ ...prev, managerList: formData.managerList.filter((_, i) => i !== index) }))
}

const fields: Field[] = [
{ label: "업체명", name: "company", type: "text", placeholder: "업체명 입력" },
{ label: "계약기간", name: "contractPeriod", type: "daterange" },
{ label: "담당자 연락처", name: "contact", type: "phone", placeholder: "연락처 입력" },
{ label: "안전보건계획서", name: "planFile", type: "fileUpload" },
{ label: "기타서류", name: "etcFile", type: "fileUpload" }
]

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold tracking-wide mb-4">수급업체 등록</h2>
<FormScreen fields={fields} values={{ company: formData.company, startDate: formData.contractStartDate, endDate: formData.contractEndDate, contact: formData.contact, planFile: formData.planFile?.name || "", etcFile: formData.etcFile?.name || "" }} onChange={handleChange} onClose={onClose} onSave={() => onSave(formData)} isModal />
<div className="mt-6">
<div className="flex items-center mb-2 gap-2">
<label className="block font-medium">현장관리자 등록</label>
{formData.managerList.length < 8 && (
<button type="button" onClick={addManager} className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 hover:text-sky-800 transition select-none" title="현장관리자 추가" aria-label="현장관리자 추가">
<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
</button>
)}
</div>
<div className="flex flex-wrap gap-3">
{formData.managerList.map((name, idx) => (
<div key={idx} className="relative" style={{ width: 150 }}>
<input type="text" name="managerList" placeholder="현장관리자 입력" value={name} onChange={e => handleChange(e, idx)} className={`${BASE_INPUT_CLASS} pr-9`} />
{formData.managerList.length > 1 && idx > 0 && (
<button type="button" onClick={() => removeManager(idx)} className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition select-none" title="삭제" aria-label={`현장관리자 ${idx + 1} 삭제`}>
<svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
)}
</div>
))}
</div>
</div>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={() => onSave(formData)}>저장하기</Button>
</div>
</div>
</div>
)
}