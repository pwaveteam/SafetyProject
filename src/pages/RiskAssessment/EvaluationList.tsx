import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/common/Button"
import YearPicker from "@/components/common/YearPicker"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import PageTitle from "@/components/common/PageTitle"
import Badge from "@/components/common/Badge"
import { DownloadIcon, EyeIcon, PlusCircle, Trash2 } from "lucide-react"

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: 50 },
{ key: "year", label: "년도", minWidth: 80 },
{ key: "title", label: "위험성평가명", minWidth: 180 },
{ key: "type", label: "평가구분", minWidth: 100 },
{ key: "method", label: "평가방법", minWidth: 120 },
{ key: "regulation", label: "실시규정", minWidth: 120 },
{
key: "result",
label: "평가결과",
minWidth: 80,
renderCell: () => (
<button aria-label="평가 결과 다운로드" className="text-gray-600 hover:text-gray-900">
<DownloadIcon size={19} />
</button>
),
},
{ key: "registered", label: "등록일", minWidth: 100 },
{ key: "modified", label: "최종수정일", minWidth: 100 },
{ key: "completed", label: "완료일", minWidth: 100 },
{
key: "status",
label: "진행상태",
minWidth: 100,
renderCell: (row) => (
<Badge color={row.status === "진행" ? "green" : "blue"}>{row.status}</Badge>
),
},
{
key: "view",
label: "보기",
minWidth: 60,
renderCell: (row) => (
<button
aria-label="상세 보기"
className="text-gray-600 hover:text-gray-900"
onClick={() => alert(`ID ${row.id} 항목 상세보기`)}
>
<EyeIcon size={18} />
</button>
),
},
]

const initialData: DataRow[] = [
{
id: 3,
year: 2025,
title: "6월 위험성 평가",
type: "최초평가",
method: "빈도·강도법",
regulation: "산업안전보건법 제37조",
result: "",
registered: "2025-06-23",
modified: "2025-06-23",
completed: "",
status: "진행",
},
{
id: 2,
year: 2025,
title: "지게차 위험성평가",
type: "수시평가",
method: "빈도·강도법",
regulation: "산업안전보건법 제37조",
result: "",
registered: "2025-06-19",
modified: "2025-07-10",
completed: "",
status: "진행",
},
{
id: 1,
year: 2025,
title: "지게차 위험성평가",
type: "정기평가",
method: "체크리스트법",
regulation: "산업안전보건법 제37조",
result: "",
registered: "2025-06-16",
modified: "2025-06-18",
completed: "2025-06-16",
status: "완료",
},
]

export default function EvaluationList() {
const navigate = useNavigate()
const location = useLocation()

const [data, setData] = useState<DataRow[]>(initialData)
const [checked, setChecked] = useState<(number | string)[]>([])

const [year, setYear] = useState(2025)

const handleYearChange = (value: string) => {
setYear(Number(value))
}

const handleReset = () => {
setYear(2025)
}

const handleDelete = () => {
if (checked.length === 0) {
alert("삭제할 항목을 선택하세요")
return
}
if (window.confirm("정말 삭제하시겠습니까?")) {
setData((prev) => prev.filter((row) => !checked.includes(row.id)))
setChecked([])
}
}

const handleNewRegister = () => {
navigate("/risk-assessment/risk")
}

return (
<section className="w-full bg-white">
<PageTitle>위험성평가 목록</PageTitle>
<div className="mb-4">
<YearPicker year={String(year)} onChange={handleYearChange} />
</div>
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {data.length}건</span>
<div className="flex justify-end gap-2">
<Button variant="action" onClick={handleNewRegister} className="flex items-center gap-2">
<PlusCircle size={16} />
위험성평가 등록
</Button>
<Button variant="action" onClick={handleDelete} className="flex items-center gap-2">
<Trash2 size={16} />
삭제
</Button>
</div>
</div>
<div className="overflow-x-auto bg-white">
<DataTable columns={columns} data={data} onCheckedChange={setChecked} />
</div>
</section>
)
}
