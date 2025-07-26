import React, { useState } from "react"
import Button from "@/components/common/Button"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import PageTitle from "@/components/common/PageTitle"
import SafetyWorkPermitRegister from "./SafetyWorkPermitRegister"
import { DownloadIcon, CirclePlus, Printer, Trash2 } from "lucide-react"
import Badge from "@/components/common/Badge"

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: 48 },
{ key: "workType", label: "작업유형", minWidth: 130 },
{ key: "workerCount", label: "작업 인원", minWidth: 90 },
{ key: "hazardLevel", label: "위험 수준", minWidth: 90 },
{ key: "workPeriod", label: "작업기간", minWidth: 200 },
{ key: "registrationDate", label: "등록일", minWidth: 110 },
{ key: "approvalStatus", label: "승인상태", minWidth: 100 },
{ key: "attachment", label: "첨부", minWidth: 60 },
{
key: "manage",
label: "관리",
minWidth: 110,
renderCell: (row) => (
<button
style={{
background: "none",
border: "none",
padding: 0,
color: "#999999",
cursor: "pointer",
width: 110,
textAlign: "center",
}}
onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
>
자세히보기/편집
</button>
),
},
]

const initialData: DataRow[] = [
{
id: 3,
workType: "용접",
workerCount: "3명",
hazardLevel: "높음",
workPeriod: "2025-06-01 ~ 2025-06-02",
registrationDate: "2025-05-30",
approvalStatus: "미완료",
attachment: (
<span className="flex justify-center items-center">
<DownloadIcon
size={19}
aria-label="첨부파일 다운로드"
role="button"
tabIndex={0}
className="cursor-pointer"
/>
</span>
),
manage: "자세히보기/편집",
},
{
id: 2,
workType: "크레인 운전",
workerCount: "2명",
hazardLevel: "중간",
workPeriod: "2025-06-03 ~ 2025-06-07",
registrationDate: "2025-05-30",
approvalStatus: "완료",
attachment: (
<span className="flex justify-center items-center">
<DownloadIcon
size={19}
aria-label="첨부파일 다운로드"
role="button"
tabIndex={0}
className="cursor-pointer"
/>
</span>
),
manage: "자세히보기/편집",
},
{
id: 1,
workType: "밀폐공간 진입",
workerCount: "6명",
hazardLevel: "높음",
workPeriod: "2025-06-04 ~ 2025-06-05",
registrationDate: "2025-05-30",
approvalStatus: "완료",
attachment: (
<span className="flex justify-center items-center">
<DownloadIcon
size={19}
aria-label="첨부파일 다운로드"
role="button"
tabIndex={0}
className="cursor-pointer"
/>
</span>
),
manage: "자세히보기/편집",
},
]

function ApprovalStatusCell({ status }: { status: string }) {
if (status === "미완료") return <Badge color="red">미완료</Badge>
if (status === "완료") return <Badge color="blue">완료</Badge>
return <span>{status}</span>
}

export default function SafetyWorkPermit() {
const [startDate, setStartDate] = useState("2025-06-16")
const [endDate, setEndDate] = useState("2025-12-16")
const [searchTerm, setSearchTerm] = useState("")
const [data, setData] = useState<DataRow[]>(initialData)
const [checkedIds, setCheckedIds] = useState<(number | string)[]>([])
const [isModalOpen, setIsModalOpen] = useState(false)

const handleSave = (formData: any) => {
setData(prev => [{ id: prev.length + 1, ...formData, manage: "자세히보기/편집" }, ...prev])
setIsModalOpen(false)
}

const handlePrint = () => window.print()

const handleDelete = () => {
if (checkedIds.length === 0) {
alert("삭제할 항목을 선택하세요")
return
}
if (window.confirm("정말 삭제하시겠습니까?")) {
setData(prev => prev.filter(row => !checkedIds.includes(row.id)))
setCheckedIds([])
}
}

const handlePermitFormDownload = () => {
alert("안전작업허가서 양식 다운로드")
}

const renderCell = (row: DataRow, col: Column) => {
if (col.key === "approvalStatus") return <ApprovalStatusCell status={row.approvalStatus as string} />
return row[col.key]
}

return (
<section className="safety-work-permit-content w-full bg-white">
<PageTitle>안전작업허가서</PageTitle>
<div className="mb-4">
<FilterBar
startDate={startDate}
endDate={endDate}
onStartDate={setStartDate}
onEndDate={setEndDate}
keyword={searchTerm}
onKeywordChange={setSearchTerm}
onSearch={() => {}}
/>
</div>
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {data.length}건</span>
<div className="flex justify-end gap-2">
<Button variant="action" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
<CirclePlus size={16} />
신규등록
</Button>
<Button variant="action" onClick={handlePermitFormDownload} className="flex items-center gap-1">
<DownloadIcon size={16} />
안전작업허가서 양식
</Button>
<Button variant="action" onClick={handlePrint} className="flex items-center gap-1">
<Printer size={16} />
인쇄
</Button>
<Button variant="action" onClick={handleDelete} className="flex items-center gap-1">
<Trash2 size={16} />
삭제
</Button>
</div>
</div>
<div className="overflow-x-auto bg-white">
<DataTable
columns={columns}
data={data}
renderCell={renderCell}
onCheckedChange={setCheckedIds}
/>
</div>
{isModalOpen && (
<SafetyWorkPermitRegister
isOpen={isModalOpen}
onClose={() => setIsModalOpen(false)}
onSave={handleSave}
/>
)}
</section>
)
}