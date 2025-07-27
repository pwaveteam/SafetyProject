import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

const BASE_INPUT_CLASS = "border border-[#AAAAAA] px-2 h-[39px] w-full appearance-none placeholder:font-normal placeholder:text-[#999999] text-[15px] font-medium rounded-lg"

export default function PartnerEvaluationRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
company: "",
evaluationName: "",
evaluationType: "",
evaluationFile: "",
contractPeriod: "",
externalEvaluator: ""
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}

const fields: Field[] = [
{ label: "업체명", name: "company", type: "text", placeholder: "업체명 입력" },
{ label: "평가명", name: "evaluationName", type: "text", placeholder: "평가명 입력" },
{ label: "평가종류", name: "evaluationType", type: "select", options: [{ value: "선정평가", label: "선정평가" }, { value: "재평가", label: "재평가" }, { value: "신규평가", label: "신규평가" }, { value: "기타", label: "기타" }] },
{ label: "평가기간", name: "contractPeriod", type: "daterange", placeholder: "계약기간 입력" },
{ label: "외부 평가업체", name: "externalEvaluator", type: "text", placeholder: "외부 평가업체 입력" },
{ label: "평가지", name: "evaluationFile", type: "fileUpload", placeholder: "파일명 입력" },
{ label: "첨부파일", name: "fileUpload", type: "fileUpload" }
]

const handleSubmit = () => { onSave(formData) }
if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold tracking-wide mb-4">안전보건수준 평가 등록</h2>
<FormScreen fields={fields} values={formData} onChange={handleChange} onClose={onClose} onSave={handleSubmit} isModal />
<div className="flex justify-center gap-1 mt-6">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={handleSubmit}>저장하기</Button>
</div>
</div>
</div>
)
}