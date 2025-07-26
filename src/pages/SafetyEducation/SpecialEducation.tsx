import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/common/Button"
import QRCode from "qrcode"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import TabMenu from "@/components/common/TabMenu"
import PageTitle from "@/components/common/PageTitle"
import { CirclePlus, QrCode, Printer, Trash2, Download } from "lucide-react"
import SpecialEducationRegister from "@/pages/SafetyEducation/SpecialEducationRegister"

const TAB_LABELS = ["정기교육", "특별교육"]
const TAB_PATHS = ["/safety-education", "/specialeducation"]

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: 50 },
{ key: "eduName", label: "교육명", minWidth: 160 },
{ key: "date", label: "교육일자", minWidth: 120 },
{ key: "type", label: "구분", minWidth: 96 },
{ key: "target", label: "대상", minWidth: 120 },
{ key: "place", label: "장소", minWidth: 120 },
{ key: "trainer", label: "강사", minWidth: 96 },
{
key: "eduMaterial",
label: "교육자료",
minWidth: 80,
renderCell: () => (
<span
className="flex justify-center items-center cursor-pointer"
role="button"
tabIndex={0}
aria-label="교육자료 다운로드"
>
<Download size={19} strokeWidth={2} />
</span>
),
},
{
key: "proof",
label: "첨부파일",
minWidth: 80,
renderCell: () => (
<span
className="flex justify-center items-center cursor-pointer"
role="button"
tabIndex={0}
aria-label="첨부파일 다운로드"
>
<Download size={19} strokeWidth={2} />
</span>
),
},
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
id: 1,
eduName: "특별 안전보건교육",
date: "2025-07-01",
type: "특별교육",
target: "신규 입사자",
place: "교육실 A",
trainer: "김민수",
},
{
id: 2,
eduName: "특별 화학물질 안전교육",
date: "2025-07-15",
type: "특별교육",
target: "생산팀 직원",
place: "회의실 3층",
trainer: "이소영",
},
{
id: 3,
eduName: "특별 기계 안전교육",
date: "2025-08-05",
type: "특별교육",
target: "기계팀 전원",
place: "교육센터 1층",
trainer: "박준형",
},
]

export default function SpecialEducation() {
const navigate = useNavigate()
const location = useLocation()

const [data, setData] = useState<DataRow[]>(initialData)
const [checked, setChecked] = useState<(number | string)[]>([])

const [startDate, setStartDate] = useState("2025-06-16")
const [endDate, setEndDate] = useState("2025-12-16")

const [educationTarget, setEducationTarget] = useState("")
const [educationMethod, setEducationMethod] = useState("")

const [isModalOpen, setIsModalOpen] = useState(false)

const currentTabIdx = Math.max(0, TAB_PATHS.indexOf(location.pathname))
const handleTabClick = (idx: number) => {
if (location.pathname !== TAB_PATHS[idx]) navigate(TAB_PATHS[idx])
}

const handleSave = (newItem: Partial<DataRow>) => {
setData((prev) => [{ id: prev.length + 1, ...newItem }, ...prev])
setIsModalOpen(false)
}

const handleGenerateQR = async () => {
if (checked.length === 0) {
alert("QR 생성할 항목을 선택하세요")
return
}
for (const id of checked) {
const row = data.find((d) => d.id === id)
if (!row) continue

const qrText =
`교육명: ${row.eduName}\n` +
`교육일자: ${row.date}\n` +
`구분: ${row.type}\n` +
`대상: ${row.target}\n` +
`장소: ${row.place}\n` +
`강사: ${row.trainer}`

try {
const dataUrl = await QRCode.toDataURL(qrText, { width: 300 })
const link = document.createElement("a")
link.href = dataUrl
link.download = `QR_${id}.png`
document.body.appendChild(link)
link.click()
document.body.removeChild(link)
} catch {
alert("QR 생성 실패")
}
}
}

const handlePrint = () => window.print()

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

return (
<section className="education-content w-full bg-white">
<PageTitle>특별교육</PageTitle>
<TabMenu tabs={TAB_LABELS} activeIndex={currentTabIdx} onTabClick={handleTabClick} className="mb-6" />

<div className="mb-3">
<FilterBar
startDate={startDate}
endDate={endDate}
onStartDate={setStartDate}
onEndDate={setEndDate}
educationTarget={educationTarget}
onEducationTargetChange={setEducationTarget}
educationMethod={educationMethod}
onEducationMethodChange={setEducationMethod}
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
<Button variant="action" onClick={handleGenerateQR} className="flex items-center gap-1">
<QrCode size={16} />
QR 생성
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
<DataTable columns={columns} data={data} onCheckedChange={setChecked} />
</div>

{isModalOpen && (
<SpecialEducationRegister isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
)}
</section>
)
}
