import React from "react"
import Button from "@/components/common/Button"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import { CirclePlus, Printer, Trash2 } from "lucide-react"
import TabMenu from "@/components/common/TabMenu"
import PageTitle from "@/components/common/PageTitle"
import NearMissRegisterModal from "@/pages/NearMiss/NearMissRegister"
import Badge from "@/components/common/Badge"

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: "50px" },
{ key: "place", label: "장소", minWidth: "90px" },
{ key: "danger", label: "유해위험요인", minWidth: "190px" },
{ key: "registrant", label: "등록인", minWidth: "60px" },
{ key: "date", label: "등록일", minWidth: "100px" },
{ key: "result", label: "처리결과", minWidth: "60px" },
{ key: "reason", label: "미처리 사유", minWidth: "300px" },
]

const initialData: DataRow[] = [
{
id: "3",
danger: "지게차충돌",
place: "산업현장",
registrant: "홍길동",
date: "2025-06-01",
result: "채택",
reason: "현장 설비 구조와 맞지 않아 기술적 보완 전에는 적용 불가",
},
{
id: "2",
danger: "감전",
place: "지하1층 전기실",
registrant: "홍길동",
date: "2025-06-01",
result: "채택",
reason: "공정 변경이 필요",
},
{
id: "1",
danger: "추락",
place: "지하3층 전기실",
registrant: "홍길동",
date: "2025-06-01",
result: "미채택",
reason: "우선순위가 높은 개선과제에 비해 효과가 낮아 후순위 지정",
},
]

const TAB_LABELS = ["아차사고", "안전보이스"]
const TAB_PATHS = ["/nearmiss", "/nearmiss/safevoice"]

function ResultToggle({
row,
onChange,
}: {
row: DataRow
onChange: (id: string | number, value: string) => void
}) {
const handleClick = (value: string) => {
if (row.result === value) return
onChange(row.id, value)
}

const isSelected = (value: string) => row.result === value

return (
<div className="inline-flex select-none" role="group" aria-label="처리결과 선택">
<button
type="button"
onClick={() => handleClick("채택")}
className={`mr-1 px-1 py-1 rounded font-semibold cursor-pointer ${
isSelected("채택") ? "text-sky-500" : "text-gray-300"
}`}
aria-pressed={isSelected("채택")}
>
<Badge color="sky" className={isSelected("채택") ? "" : "opacity-30"}>
채택
</Badge>
</button>
<button
type="button"
onClick={() => handleClick("미채택")}
className={`px-1 py-1 rounded font-semibold cursor-pointer ${
isSelected("미채택") ? "text-red-500" : "text-gray-300"
}`}
aria-pressed={isSelected("미채택")}
>
<Badge color="red" className={isSelected("미채택") ? "" : "opacity-30"}>
미채택
</Badge>
</button>
</div>
)
}

type ActionButtonsProps = {
totalCount: number
onRegister: () => void
onPrint: () => void
onDelete: () => void
}

function ActionButtons({ totalCount, onRegister, onPrint, onDelete }: ActionButtonsProps) {
return (
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {totalCount}건</span>
<div className="flex justify-end gap-2">
<Button variant="action" onClick={onRegister} className="flex items-center gap-1">
<CirclePlus size={16} />
신규등록
</Button>
<Button variant="action" onClick={onPrint} className="flex items-center gap-1">
<Printer size={16} />
인쇄
</Button>
<Button variant="action" onClick={onDelete} className="flex items-center gap-1">
<Trash2 size={16} />
삭제
</Button>
</div>
</div>
)
}

export default function NearMiss() {
const [checkedIds, setCheckedIds] = React.useState<(string | number)[]>([])
const [startDate, setStartDate] = React.useState("2025-06-16")
const [endDate, setEndDate] = React.useState("2025-12-16")
const [searchText, setSearchText] = React.useState("")
const [data, setData] = React.useState<DataRow[]>(initialData)
const [modalOpen, setModalOpen] = React.useState(false)

const currentTabIdx = TAB_PATHS.indexOf(window.location.pathname)
const handleTabClick = (idx: number) => {
const path = TAB_PATHS[idx]
if (window.location.pathname !== path) {
window.history.pushState(null, "", path)
window.dispatchEvent(new PopStateEvent("popstate"))
}
}

const handleResultChange = (id: string | number, value: string) => {
setData((prev) => prev.map((row) => (row.id === id ? { ...row, result: value } : row)))
}

const renderCell = (row: DataRow, col: Column) => {
if (col.key === "result") return <ResultToggle row={row} onChange={handleResultChange} />
if (col.key === "reason")
return (
<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
<input
type="text"
value={row.reason || ""}
onChange={(e) => {
const newVal = e.target.value
setData((prev) => prev.map((r) => (r.id === row.id ? { ...r, reason: newVal } : r)))
}}
placeholder="미처리 사유 입력"
disabled={row.result === "채택"}
style={{
width: "96%",
padding: "8px 8px",
borderRadius: 10,
border: "1px solid #A0B3C9",
fontSize: "0.875rem",
backgroundColor: row.result === "채택" ? "#f3f3f3" : "white",
cursor: row.result === "채택" ? "not-allowed" : "auto",
}}
/>
</div>
)
return row[col.key]
}

const handleSave = (newItem: Omit<DataRow, "id">) => {
const newId = (Math.max(...data.map((d) => Number(d.id))) + 1).toString()
setData([...data, { id: newId, ...newItem }])
setModalOpen(false)
}

const handleRegister = () => setModalOpen(true)
const handlePrint = () => window.print()
const handleDelete = () => {
if (checkedIds.length === 0) {
alert("삭제할 항목을 선택하세요")
return
}
if (window.confirm("정말 삭제하시겠습니까?")) {
setData((prev) => prev.filter((row) => !checkedIds.includes(row.id)))
setCheckedIds([])
}
}

return (
<section className="nearmiss-content w-full bg-white">
<PageTitle>아차사고</PageTitle>
<TabMenu tabs={TAB_LABELS} activeIndex={currentTabIdx} onTabClick={handleTabClick} className="mb-6" />

<div className="mb-3">
<FilterBar
startDate={startDate}
endDate={endDate}
onStartDate={setStartDate}
onEndDate={setEndDate}
searchText={searchText}
onSearchText={setSearchText}
onSearch={() => {}}
/>
</div>

<ActionButtons totalCount={data.length} onRegister={handleRegister} onPrint={handlePrint} onDelete={handleDelete} />

<div className="overflow-x-auto bg-white">
<DataTable columns={columns} data={data} renderCell={renderCell} onCheckedChange={setCheckedIds} />
</div>

<div className="flex justify-end mt-5">
<Button variant="primary">저장하기</Button>
</div>

{modalOpen && <NearMissRegisterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />}
</section>
)
}