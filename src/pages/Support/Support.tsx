// src/pages/Support/Support.tsx
import React, { useState } from "react"
import FormScreen, { Field } from "@/components/common/FormScreen"
import PageTitle from "@/components/common/PageTitle"
import Button from "@/components/common/Button"

export default function Support() {
const [values, setValues] = useState({
type: "",
title: "",
content: "",
writer: "최문의",
emailId: "",
emailDomain: "",
emailDomainSelect: ""
})

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
const { name, value } = e.target
if (name === "writer") return // 작성자 입력 차단
setValues(prev => ({ ...prev, [name]: value }))
}

const handleEmailDomainSelect = (domain: string) => {
setValues(prev => ({
...prev,
emailDomain: domain,
emailDomainSelect: domain
}))
}

const handleSubmit = () => {
const email = `${values.emailId}@${values.emailDomain}`
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
alert("유효한 이메일을 입력해주세요")
return
}
console.log({ ...values, replyEmail: email })
alert("제출 완료")
}

const fields: Field[] = [
{
label: "문의유형",
name: "type",
type: "select",
placeholder: "문의유형 선택",
options: [
{ value: "기술문의", label: "기술문의" },
{ value: "서비스문의", label: "서비스문의" },
{ value: "기타문의", label: "기타문의" }
]
},
{ label: "제목", name: "title", type: "text", placeholder: "제목 입력" },
{ label: "내용", name: "content", type: "textarea", placeholder: "내용 입력" },
{ label: "작성자 이름", name: "writer", type: "readonly" },
{
label: "답변 받을 이메일",
name: "email",
type: "email",
placeholder: "이메일 입력"
}
]

return (
<section className="w-full bg-white">
<PageTitle>1:1 지원</PageTitle>
<FormScreen
fields={fields}
values={values}
onChange={handleChange}
onEmailDomainSelect={handleEmailDomainSelect}
onSubmit={handleSubmit}
onClose={() => {}}
onSave={() => {}}
/>

<div className="flex justify-end mt-5">
<Button variant="primary" onClick={handleSubmit}>
제출하기
</Button>
</div>
</section>
)
}