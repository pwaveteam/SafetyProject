import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/common/Button"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import TabMenu from "@/components/common/TabMenu"
import PageTitle from "@/components/common/PageTitle"
import SafeVoiceRegisterModal from "@/pages/NearMiss/SafeVoiceRegister"
import Badge from "@/components/common/Badge"
import { CirclePlus, Printer, Trash2 } from "lucide-react"

const TAB_LABELS = ["아차사고", "안전보이스"]
const TAB_PATHS = ["/nearmiss", "/nearmiss/safevoice"]

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: "50px" },
{ key: "content", label: "내용", minWidth: "240px" },
{ key: "registrant", label: "등록인", minWidth: "60px" },
{ key: "date", label: "등록일", minWidth: "100px" },
{ key: "status", label: "조치여부", minWidth: "60px" },
{ key: "reason", label: "미조치 사유", minWidth: "300px" }
]

const initialData: DataRow[] = [
{ id: 3, content: "기계실 바닥이 미끄러워 미끄럼 방지 매트 설치가 필요", registrant: "김근로", date: "2025-06-01", status: "조치", reason: "외부 승인 대기 중" },
{ id: 2, content: "출입구에 비상 연락처 QR 코드를 부착해 비상 시 신속한 대응 지원 바람", registrant: "익명", date: "2025-06-01", status: "조치", reason: "외부 승인 대기 중" },
{ id: 1, content: "고소 작업 안전난간 간격이 넓어 추가 난간 또는 보조 안전로프 설치 요청", registrant: "익명", date: "2025-06-01", status: "미조치", reason: "추가 조사 검토 필요" }
]

function StatusToggle({ row, onChange }: { row: DataRow; onChange: (id: string | number, value: string) => void }) {
const handleClick = (value: string) => { if (row.status === value) return; onChange(row.id, value) }
const isSelected = (value: string) => row.status === value
return (
<div className="inline-flex select-none" role="group" aria-label="조치여부 선택">
<button type="button" onClick={() => handleClick("조치")} className={`mr-1 px-1 py-1 rounded font-semibold cursor-pointer ${isSelected("조치") ? "text-green-600" : "text-gray-300"}`} aria-pressed={isSelected("조치")}>
<Badge color="green" className={isSelected("조치") ? "" : "opacity-30"}>조치</Badge>
</button>
<button type="button" onClick={() => handleClick("미조치")} className={`px-1 py-1 rounded font-semibold cursor-pointer ${isSelected("미조치") ? "text-orange-500" : "text-gray-300"}`} aria-pressed={isSelected("미조치")}>
<Badge color="orange" className={isSelected("미조치") ? "" : "opacity-30"}>미조치</Badge>
</button>
</div>
)
}

function ActionButtons({ totalCount, onRegister, onPrint, onDelete }: { totalCount: number; onRegister: () => void; onPrint: () => void; onDelete: () => void }) {
return (
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {totalCount}건</span>
<div className="flex gap-1">
<Button variant="action" onClick={onRegister} className="flex items-center gap-1"><CirclePlus size={16} />신규등록</Button>
<Button variant="action" onClick={onPrint} className="flex items-center gap-1"><Printer size={16} />인쇄</Button>
<Button variant="action" onClick={onDelete} className="flex items-center gap-1"><Trash2 size={16} />삭제</Button>
</div>
</div>
)
}

export default function SafeVoice() {
const [checkedIds, setCheckedIds] = React.useState<(string | number)[]>([])
const [isModalOpen, setIsModalOpen] = React.useState(false)
const [startDate, setStartDate] = React.useState("2025-06-16")
const [endDate, setEndDate] = React.useState("2025-12-16")
const [searchText, setSearchText] = React.useState("")
const [data, setData] = React.useState<DataRow[]>(initialData)

const navigate = useNavigate()
const location = useLocation()
const currentTabIdx = TAB_PATHS.indexOf(location.pathname)

const handleTabClick = (idx: number) => {
const path = TAB_PATHS[idx]
if (location.pathname !== path) navigate(path)
}

const handleStatusChange = (id: string | number, value: string) => {
setData(prev => prev.map(row => (row.id === id ? { ...row, status: value } : row)))
}

const handleReasonChange = (id: string | number, value: string) => {
setData(prev => prev.map(row => (row.id === id ? { ...row, reason: value } : row)))
}

const renderCell = (row: DataRow, col: Column) => {
if (col.key === "status") return <StatusToggle row={row} onChange={handleStatusChange} />
if (col.key === "reason") return (
<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
<input type="text" value={row.reason || ""} onChange={(e) => handleReasonChange(row.id, e.target.value)} placeholder="미조치 사유 입력" disabled={row.status === "조치"} style={{ width: "96%", padding: "8px 8px", borderRadius: 8, border: "1px solid #A0B3C9", fontSize: "0.875rem", backgroundColor: row.status === "조치" ? "#f3f3f3" : "white", cursor: row.status === "조치" ? "not-allowed" : "auto" }} />
</div>
)
return row[col.key]
}

const handleSave = (newData: Omit<DataRow, "id">) => {
setData(prev => [{ id: prev.length + 1, ...newData }, ...prev])
setIsModalOpen(false)
}

const handleRegister = () => setIsModalOpen(true)
const handlePrint = () => window.print()
const handleDelete = () => {
if (checkedIds.length === 0) { alert("삭제할 항목을 선택하세요"); return }
if (window.confirm("정말 삭제하시겠습니까?")) {
setData(prev => prev.filter(row => !checkedIds.includes(row.id)))
setCheckedIds([])
}
}

return (
<section className="nearmiss-content w-full bg-white">
<PageTitle>안전보이스</PageTitle>
<TabMenu tabs={TAB_LABELS} activeIndex={currentTabIdx} onTabClick={handleTabClick} className="mb-6" />
<div className="mb-3">
<FilterBar startDate={startDate} endDate={endDate} onStartDate={setStartDate} onEndDate={setEndDate} searchText={searchText} onSearchText={setSearchText} onSearch={() => {}} />
</div>
<ActionButtons totalCount={data.length} onRegister={handleRegister} onPrint={handlePrint} onDelete={handleDelete} />
<div className="overflow-x-auto bg-white">
<DataTable columns={columns} data={data} renderCell={renderCell} onCheckedChange={setCheckedIds} />
</div>
<div className="flex justify-end mt-5">
<Button variant="primary">저장하기</Button>
</div>
{isModalOpen && <SafeVoiceRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
</section>
)
}