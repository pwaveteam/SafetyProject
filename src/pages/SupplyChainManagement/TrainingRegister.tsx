// src/pages/SupplyChainManagement/TrainingRegister.tsx
import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

export default function TrainingRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
trainingDate: "",
trainingName: "",
participants: "",
result: "",
photo: "",
improvements: ""
})

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}

const fields: Field[] = [
{ label: "훈련일", name: "trainingDate", type: "daterange", placeholder: "훈련일 선택" },
{ label: "훈련명", name: "trainingName", type: "text", placeholder: "훈련명 입력" },
{ label: "참여대상", name: "participants", type: "text", placeholder: "참여대상 입력" },
{
label: "훈련결과",
name: "result",
type: "select",
options: [
{ value: "완료", label: "완료" },
{ value: "미완료", label: "미완료" }
]
},
{ label: "사진첨부", name: "photo", type: "fileUpload", placeholder: "첨부파일명 입력" },
{ label: "개선 및 조치사항", name: "improvements", type: "textarea", placeholder: "개선 및 조치사항 입력" }
]

const handleSubmit = () => {
onSave(formData)
}

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold tracking-wide mb-4">비상대피 및 훈련 등록</h2>
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