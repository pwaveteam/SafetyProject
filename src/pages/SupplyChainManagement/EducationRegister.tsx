import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

export default function EducationRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({ completionDate: "", courseName: "", status: "", proof: "", photo: "", note: "" })

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}

const fields: Field[] = [
{ label: "이수일", name: "completionDate", type: "date", placeholder: "이수일 선택" },
{ label: "교육과정명", name: "courseName", type: "text", placeholder: "교육과정명 입력" },
{ label: "이수상태", name: "status", type: "select", options: [{ value: "완료", label: "완료" }, { value: "미이수", label: "미이수" }] },
{ label: "증빙자료", name: "proof", type: "fileUpload", placeholder: "첨부파일명 입력" },
{ label: "사진첨부", name: "photo", type: "fileUpload", placeholder: "첨부파일명 입력" },
{ label: "비고", name: "note", type: "textarea", placeholder: "비고 입력" }
]

const handleSubmit = () => { onSave(formData) }
if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold tracking-wide mb-4">근로자 교육 등록</h2>
<FormScreen fields={fields} values={formData} onChange={handleChange} onClose={onClose} onSave={handleSubmit} isModal={true} />
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={handleSubmit}>저장하기</Button>
</div>
</div>
</div>
)
}