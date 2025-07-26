import React, { useState } from "react"
import Button from "@/components/common/Button"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import PageTitle from "@/components/common/PageTitle"
import FormScreen, { Field } from "@/components/common/FormScreen"
import EditableCell from "@/components/common/EditableCell"
import { Printer, Trash2 } from "lucide-react"

const columns: Column[] = [
{ key: "factory", label: "사업장명", minWidth: "10px" },
{ key: "manager", label: "안전보건관리책임자", minWidth: "80px" },
{ key: "contact", label: "연락처", minWidth: "80px" },
{ key: "address", label: "사업장 소재지", minWidth: "300px" },
]

const initialData: DataRow[] = [
{
id: 1,
factory: "서울제조공장",
manager: "김철수",
contact: "010-1234-5678",
address: "경기도 고양시 일산동구 장항동 112-23",
},
{
id: 2,
factory: "부산물류센터",
manager: "이영희",
contact: "051-987-6543",
address: "부산광역시 해운대구 좌동 789-10",
},
]

const fields: Field[] = [
{ name: "company", label: "회사명", type: "text" },
{ name: "ceo", label: "대표자", type: "text" },
{ name: "address", label: "주소지", type: "text" },
{ name: "phonePrefix", label: "전화번호", type: "phone" },
{
name: "businessType1",
label: "업종",
type: "select",
options: [
{ value: "금속가공제품 제조업", label: "금속가공제품 제조업" },
{ value: "전자제품 제조업", label: "전자제품 제조업" },
],
},
{
name: "businessType2",
label: "업태",
type: "select",
options: [
{ value: "금속제품 도매업", label: "금속제품 도매업" },
{ value: "전자제품 도매업", label: "전자제품 도매업" },
],
},
{ name: "businessNumber", label: "사업자등록번호", type: "text" },
{ name: "signature", label: "서명", type: "signature" },
]

export default function BasicManagement() {
const [formValues, setFormValues] = useState({
company: "주식회사 테스트",
ceo: "박대표",
address: "서울특별시 강남구 도곡동 11-1",
phonePrefix: "010",
phoneMiddle: "1234",
phoneLast: "5678",
businessType1: "금속가공제품 제조업",
businessType2: "금속제품 도매업",
businessNumber: "123-45-67890",
signature: "/images/sample-signature.png",
})

const [data, setData] = useState(initialData)

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
const { name, value } = e.target
setFormValues(prev => ({ ...prev, [name]: value }))
}

const handleSave = () => {
alert("저장 완료")
}

const handleAdd = () => {
const newId = data.length > 0 ? Math.max(...data.map(d => Number(d.id))) + 1 : 1
setData(prev => [...prev, { id: newId, factory: "", manager: "", contact: "", address: "" }])
}

const handlePrint = () => {
window.print()
}

const handleDelete = () => {
alert("삭제 버튼 클릭됨")
}

const renderCell = (row: DataRow, col: Column, rowIdx: number) => {
if (["factory", "manager", "contact", "address"].includes(col.key)) {
return (
<EditableCell
value={row[col.key] as string}
onChange={val => {
const copy = [...data]
copy[rowIdx][col.key] = val
setData(copy)
}}
placeholder={`${col.label} 입력`}
/>
)
}
return row[col.key]
}

return (
<section className="mypage-content w-full">
<div className="flex justify-between items-center mb-4">
<PageTitle>기본사업장관리</PageTitle>
</div>

<FormScreen
fields={fields}
values={formValues}
onChange={handleChange}
onClose={() => {}}
onSave={handleSave}
/>
<div className="flex justify-end mt-3">
<Button variant="primary" onClick={handleSave}>저장하기</Button>
</div>

<div className="flex justify-between items-center mt-8 mb-2">
<div>
<PageTitle>사업장목록</PageTitle>
</div>
<div className="flex gap-2">
<Button variant="action" onClick={handlePrint} className="flex items-center gap-2">
<Printer size={16} />
인쇄
</Button>
<Button variant="action" onClick={handleDelete} className="flex items-center gap-2">
<Trash2 size={16} />
삭제
</Button>
</div>
</div>

<div className="overflow-x-auto">
<DataTable columns={columns} data={data} renderCell={renderCell} />
<div className="mt-3 flex justify-start">
<Button variant="rowAdd" onClick={handleAdd}>+ 사업장추가</Button>
</div>
</div>

<div className="flex justify-end mt-3">
<Button variant="primary" onClick={handleSave}>저장하기</Button>
</div>
</section>
)
}