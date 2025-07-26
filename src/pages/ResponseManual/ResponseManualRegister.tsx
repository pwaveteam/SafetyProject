// src/pages/ResponseManualRegister.tsx
import React, { useState, useEffect } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"
import Editor from "@/components/common/Editor"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
userName: string
}

export default function ResponseManualRegister({ isOpen, onClose, onSave, userName }: Props) {
const [formData, setFormData] = useState({
title: "",
author: userName || "",
date: "",
content: "",
attachment: "",
})

useEffect(() => {
if (isOpen) {
const today = new Date().toISOString().slice(0, 10)
setFormData(prev => ({ ...prev, author: userName, date: today }))
}
}, [isOpen, userName])

const handleContentChange = (value: string) => {
setFormData(prev => ({ ...prev, content: value }))
}

const fields: Field[] = [
{ label: "제목", name: "title", type: "text", placeholder: "제목 입력" },
{ label: "작성자", name: "author", type: "readonly" },
{ label: "작성일", name: "date", type: "date" },
{
label: "내용",
name: "content",
type: "custom",
customRender: (
<Editor
value={formData.content}
onChange={handleContentChange}
className="min-h-[300px]"
/>
),
},
{ label: "첨부파일", name: "attachment", type: "fileUpload", placeholder: "첨부파일 선택" },
]

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}

const handleSave = () => {
if (!formData.title.trim()) {
alert("제목을 입력하세요")
return
}
if (!formData.content.trim()) {
alert("내용을 입력하세요")
return
}
onSave(formData)
}

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto">
<h2 className="text-2xl font-semibold mb-6">대응매뉴얼 등록</h2>
<FormScreen
fields={fields}
values={formData}
onChange={handleChange}
onClose={onClose}
onSave={handleSave}
isModal={true}
/>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={handleSave}>저장하기</Button>
</div>
</div>
</div>
)
}