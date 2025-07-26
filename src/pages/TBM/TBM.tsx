import React from "react"
import { useNavigate } from "react-router-dom"
import { CirclePlus, QrCode, Printer, Trash2 } from "lucide-react"
import Button from "@/components/common/Button"
import QRCode from "qrcode"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import PageTitle from "@/components/common/PageTitle"

type ActionButtonsProps = {
totalCount: number
selectedIds: (number | string)[]
onRegister: () => void
onGenerateQR: () => void
onPrint: () => void
onDelete: () => void
}

function ActionButtons({
totalCount,
selectedIds,
onRegister,
onGenerateQR,
onPrint,
onDelete,
}: ActionButtonsProps) {
return (
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {totalCount}건</span>
<div className="flex justify-end gap-2">
<Button
variant="action"
onClick={onRegister}
className="flex items-center gap-1"
>
<CirclePlus size={16} />
신규등록
</Button>
<Button
variant="action"
onClick={onGenerateQR}
className="flex items-center gap-1"
>
<QrCode size={16} />
QR 생성
</Button>
<Button
variant="action"
onClick={onPrint}
className="flex items-center gap-1"
>
<Printer size={16} />
인쇄
</Button>
<Button
variant="action"
onClick={onDelete}
className="flex items-center gap-1"
>
<Trash2 size={16} />
삭제
</Button>
</div>
</div>
)
}

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: "50px" },
{ key: "factory", label: "공정", minWidth: "120px" },
{ key: "tbm", label: "TBM명", minWidth: "160px" },
{ key: "date", label: "실시일", minWidth: "108px" },
{ key: "start", label: "시작시간", minWidth: "104px" },
{ key: "end", label: "종료시간", minWidth: "104px" },
{ key: "duration", label: "실시시간", minWidth: "104px" },
{ key: "target", label: "대상", minWidth: "120px" },
{ key: "participants", label: "참여", minWidth: "120px" },
{ key: "leader", label: "실시자", minWidth: "96px" },
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
factory: "지게차 공정",
tbm: "기계장비 안전사용 교육",
date: "2025-06-01",
start: "15:30",
end: "16:30",
duration: "1시간",
target: "근로자 3명",
participants: "근로자 3명",
leader: "이동현",
},
{
id: 2,
factory: "프레스 공정",
tbm: "프레스 안전작동 교육",
date: "2025-06-01",
start: "10:00",
end: "12:00",
duration: "2시간",
target: "근로자 10명",
participants: "근로자 7명",
leader: "이동현",
},
{
id: 1,
factory: "지게차 공정",
tbm: "신규직원 안전입문 교육",
date: "2025-06-01",
start: "13:30",
end: "15:00",
duration: "1시간 30분",
target: "근로자 6명",
participants: "근로자 6명",
leader: "이동현",
},
]

export default function TBMContent() {
const navigate = useNavigate()
const [startDate, setStartDate] = React.useState<string>("2025-06-16")
const [endDate, setEndDate] = React.useState<string>("2025-12-16")
const [supervisor, setSupervisor] = React.useState<string>("-전체-")
const [data, setData] = React.useState<DataRow[]>(initialData)
const [selectedIds, setSelectedIds] = React.useState<(number | string)[]>([])

const handleRegister = () => navigate("/tbm/register")

const handleGenerateQR = async () => {
if (selectedIds.length === 0) {
alert("QR 생성할 항목을 선택하세요")
return
}
for (const id of selectedIds) {
const row = data.find((d) => d.id === id)
if (!row) continue

const qrText = `TBM명: ${row.tbm}\n실시일: ${row.date}\n실시자: ${row.leader}`

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
if (selectedIds.length === 0) {
alert("삭제할 항목을 선택하세요")
return
}
if (window.confirm("정말 삭제하시겠습니까?")) {
setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)))
setSelectedIds([])
}
}

return (
<section className="tbm-content w-full bg-white">
<PageTitle>TBM</PageTitle>
<FilterBar
startDate={startDate}
endDate={endDate}
onStartDate={setStartDate}
onEndDate={setEndDate}
supervisor={supervisor}
onSupervisor={setSupervisor}
onSearch={() => {}}
/>

<ActionButtons
totalCount={data.length}
selectedIds={selectedIds}
onRegister={handleRegister}
onGenerateQR={handleGenerateQR}
onPrint={handlePrint}
onDelete={handleDelete}
/>

<div className="overflow-x-auto bg-white">
<DataTable columns={columns} data={data} onCheckedChange={setSelectedIds} />
</div>
</section>
)
}
