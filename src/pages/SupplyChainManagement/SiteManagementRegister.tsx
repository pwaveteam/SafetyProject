// src/pages/SupplyChainManagement/SiteManagementRegister.tsx
import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

export default function SiteManagementRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
inspectionDate: "",
inspectionType: "",
inspectionName: "",
inspectionPlace: "",
inspectionResult: "",
note: "",
inspector: "",
fileAttach: "",
})

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}

const fields: Field[] = [
{ label: "점검일", name: "inspectionDate", type: "date", placeholder: "점검일 선택" },
{
label: "점검종류",
name: "inspectionType",
type: "select",
options: [
{ value: "합동점검", label: "합동점검" },
{ value: "일반점검", label: "일반점검" },
{ value: "특별점검", label: "특별점검" },
{ value: "기타", label: "기타" },
],
},
{ label: "점검명(계획명)", name: "inspectionName", type: "text", placeholder: "점검명 입력" },
{
label: "점검결과",
name: "inspectionResult",
type: "select",
options: [
{ value: "이상없음", label: "이상없음" },
{ value: "주의", label: "주의" },
{ value: "위험", label: "위험" },
],
},
{ label: "비고", name: "note", type: "textarea", placeholder: "비고 입력" },
{ label: "점검자", name: "inspector", type: "text", placeholder: "점검자 입력" },
{ label: "점검지 업로드", name: "inspectionPlace", type: "fileUpload", placeholder: "점검지 입력" },
{ label: "파일첨부", name: "fileAttach", type: "fileUpload", placeholder: "첨부파일명 입력" },
]

const handleSubmit = () => {
onSave(formData)
}

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold tracking-wide mb-4">안전보건점검 등록</h2>
<FormScreen
fields={fields}
values={formData}
onChange={handleChange}
onClose={onClose}
onSave={handleSubmit}
isModal={true}
/>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={handleSubmit}>저장하기</Button>
</div>
</div>
</div>
)
}