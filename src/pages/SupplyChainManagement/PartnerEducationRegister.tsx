import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

export default function ContractDocumentRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
contractDate: "",
meetingPlace: "",
contact: "",
note: "",
contractFile: "",
})

const handleFormChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}

const handleSubmit = () => {
onSave(formData)
}

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[900px] max-w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
<h2 className="text-2xl font-semibold mb-4">회의록 등록</h2>

<FormScreen
fields={[
{ label: "회의일시", name: "contractDate", type: "singleDatetime", placeholder: "회의일시 선택", required: true },
{ label: "회의장소", name: "meetingPlace", type: "text", placeholder: "회의장소 입력", required: true },
{ label: "참석자(도급인)", name: "attendeeClient", type: "text", placeholder: "도급인 참석자 입력", required: false },
{ label: "참석자(수급인)", name: "attendeeSubcontractor", type: "text", placeholder: "수급인 참석자 입력", required: false },
{ label: "회의내용", name: "note", type: "textarea", placeholder: "회의내용 입력", required: true },
{ label: "회의록", name: "contractFile", type: "fileUpload", placeholder: "파일명 입력", required: true },
{ label: "첨부파일", name: "fileUpload", type: "fileUpload" },
]}
values={formData}
onChange={handleFormChange}
onClose={onClose}
onSave={handleSubmit}
isModal={false}
/>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={handleSubmit}>저장하기</Button>
</div>
</div>
</div>
)
}