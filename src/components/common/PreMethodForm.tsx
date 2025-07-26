import React from "react"
import FormScreen, { Field } from "@/components/common/FormScreen"

type PreMethodFormProps = {
values: {
riskAssessmentName: string
evaluationType: string
evaluationMethod: string
scale: string
regulationFile: File | null
}
onChange: (
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>
) => void
}

const PreMethodForm: React.FC<PreMethodFormProps> = ({ values, onChange }) => {
const fields: Field[] = [
{
label: "위험성평가명",
name: "riskAssessmentName",
type: "text",
placeholder: "위험성평가명 입력",
},
{
label: "평가유형",
name: "evaluationType",
type: "select",
options: [
{ value: "최초평가", label: "최초평가" },
{ value: "수시평가", label: "수시평가" },
{ value: "정기평가", label: "정기평가" },
],
},
{
label: "평가방법",
name: "evaluationMethod",
type: "select",
options: [
{ value: "빈도·강도법", label: "빈도·강도법" },
{ value: "체크리스트법", label: "체크리스트법" },
{ value: "위험성수준 3단계 판단법", label: "위험성수준 3단계 판단법" },
{ value: "화학물질 평가법", label: "화학물질 평가법" },
],
},
]

if (values.evaluationMethod === "빈도·강도법") {
fields.push({
label: "평가척도",
name: "scale",
type: "radio",
options: [
{ value: "3x3", label: "3×3" },
{ value: "5x4", label: "5×4" },
],
})
}

fields.push({
label: "실시규정",
name: "regulationFile",
type: "fileUpload",
})

return (
<div className="mt-6 w-full">
<h3 className="font-semibold text-lg mb-1">사전평가정보 입력</h3>
<div className="w-full">
<FormScreen
fields={fields}
values={{
...values,
regulationFile: "",
}}
onChange={onChange}
onClose={() => {}}
onSave={() => {}}
/>
</div>
</div>
)
}

export default PreMethodForm