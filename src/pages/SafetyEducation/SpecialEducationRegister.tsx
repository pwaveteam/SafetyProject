// src/pages/SafetyEducation/SpecialEducationRegister.tsx
import React, { useState } from "react"
import Button from "@/components/common/Button"
import FormScreen, { Field } from "@/components/common/FormScreen"
import ToggleSwitch from "@/components/common/ToggleSwitch"

type Props = {
isOpen: boolean
onClose: () => void
onSave: (data: any) => void
}

export default function SpecialEducationRegister({ isOpen, onClose, onSave }: Props) {
const [formData, setFormData] = useState({
eduName: "",
startDate: "",
endDate: "",
startHour: "",
startMinute: "",
endHour: "",
endMinute: "",
type: "집체교육",
target: "전근로자",
proof: "",
notify: true,
notifyWhen: "1주일 전",
})

const handleChange = (
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>
) => {
const { name, value, type, checked } = e.target
if (type === "checkbox") {
setFormData(prev => ({ ...prev, [name]: checked }))
} else {
setFormData(prev => ({ ...prev, [name]: value }))
}
}

const NotifyToggle = (
<ToggleSwitch
checked={formData.notify}
onChange={checked => setFormData(prev => ({ ...prev, notify: checked }))}
/>
)

const fields: Field[] = [
{
label: "교육유형",
name: "type",
type: "select",
options: [
{ value: "정기 교육", label: "정기 교육" },
{ value: "채용 시 교육", label: "채용 시 교육" },
],
},
{
label: "교육기간",
name: "educationPeriod",
type: "daterange",
},
{
label: "교육시간",
name: "educationTime",
type: "timeRange",
},
{
label: "교육대상",
name: "target",
type: "select",
options: [
{ value: "전근로자", label: "전근로자" },
{ value: "신입사원", label: "신입사원" },
{ value: "관리자", label: "관리자" },
],
},
{
label: "교육방식",
name: "type",
type: "select",
options: [
{ value: "집체교육", label: "집체교육" },
{ value: "온라인교육", label: "온라인교육" },
],
},

{
label: "증빙자료",
name: "proof",
type: "fileUpload",
},
{
label: "알림 전송여부",
name: "notify",
type: "custom",
customRender: NotifyToggle,
},
{
label: "알림 발송시점",
name: "notifyWhen",
type: "select",
options: [
{ value: "1일 전", label: "1일 전" },
{ value: "3일 전", label: "3일 전" },
{ value: "1주일 전", label: "1주일 전" },
],
disabled: !formData.notify,
},
]

const handleSave = () => {
onSave(formData)
}

if (!isOpen) return null

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div
className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto
transform transition duration-300 ease-in-out scale-100 opacity-100"
>
<h2 className="text-2xl font-semibold tracking-wide mb-3">특별교육 등록</h2>
<FormScreen
fields={fields}
values={formData}
onChange={handleChange}
onClose={onClose}
onSave={handleSave}
isModal={true}
notifyEnabled={formData.notify}
/>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>
닫기
</Button>
<Button variant="primary" onClick={handleSave}>
저장하기
</Button>
</div>
</div>
</div>
)
}