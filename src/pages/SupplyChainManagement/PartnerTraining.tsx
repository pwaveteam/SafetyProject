// src/pages/SafetyEducation/PartnerTraining.tsx
import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/common/Button"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import TabMenu from "@/components/common/TabMenu"
import PageTitle from "@/components/common/PageTitle"
import Badge from "@/components/common/Badge"
import PartnerTrainingRegister from "./PartnerTrainingRegister"
import { CirclePlus, Trash2 } from "lucide-react"

const TAB_LABELS = [
"수급업체 관리",
"안전보건수준 평가",
"도급안전보건 협의체",
"안전보건 점검",
"안전보건 교육/훈련",
]

const TAB_PATHS = [
"/supply-chain-management/partner-list",
"/supply-chain-management/partner-evaluation",
"/supply-chain-management/contract-document",
"/supply-chain-management/site-management",
"/supply-chain-management/partner-training",
]

type AgreementStatus = "completed" | "pending"

interface PartnerStatus extends DataRow {
id: number
name: string
riskAssessment: AgreementStatus
hazardousMaterial: AgreementStatus
responseManual: AgreementStatus
allSigned: AgreementStatus
updatedAt: string | null
}

function renderStatusBadge(key: keyof PartnerStatus, status: AgreementStatus) {
if (status === "pending") return <Badge color="red">미완료</Badge>

switch (key) {
case "riskAssessment":
return <Badge color="gray">완료</Badge>
case "hazardousMaterial":
return <Badge color="gray">완료</Badge>
case "responseManual":
return <Badge color="gray">완료</Badge>
case "allSigned":
return <Badge color="gray">완료</Badge>
default:
return null
}
}

const initialPartnerStatusData: PartnerStatus[] = [
{
id: 1,
name: "협의체 A",
riskAssessment: "completed",
hazardousMaterial: "completed",
responseManual: "completed",
allSigned: "completed",
updatedAt: "2025-07-22",
},
{
id: 2,
name: "협의체 B",
riskAssessment: "completed",
hazardousMaterial: "pending",
responseManual: "completed",
allSigned: "pending",
updatedAt: "2025-07-20",
},
{
id: 3,
name: "협의체 C",
riskAssessment: "pending",
hazardousMaterial: "pending",
responseManual: "pending",
allSigned: "pending",
updatedAt: null,
},
]

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: 48 },
{ key: "name", label: "도급협의체명", minWidth: 140 },
{
key: "riskAssessment",
label: "위험성평가 확인",
minWidth: 130,
renderCell: (row: DataRow) => {
const partner = row as PartnerStatus
return renderStatusBadge("riskAssessment", partner.riskAssessment)
},
},
{
key: "hazardousMaterial",
label: "유해물질 확인",
minWidth: 140,
renderCell: (row: DataRow) => {
const partner = row as PartnerStatus
return renderStatusBadge("hazardousMaterial", partner.hazardousMaterial)
},
},
{
key: "responseManual",
label: "대응매뉴얼 확인",
minWidth: 140,
renderCell: (row: DataRow) => {
const partner = row as PartnerStatus
return renderStatusBadge("responseManual", partner.responseManual)
},
},
{
key: "allSigned",
label: "통합서명",
minWidth: 120,
renderCell: (row: DataRow) => {
const partner = row as PartnerStatus
return <span className="font-semibold text-blue-600">{renderStatusBadge("allSigned", partner.allSigned)}</span>
},
},
{
key: "updatedAt",
label: "최종 업데이트 일자",
minWidth: 140,
renderCell: (row: DataRow) => {
const partner = row as PartnerStatus
return partner.updatedAt ?? "-"
},
},
{
key: "manage",
label: "관리",
minWidth: 110,
renderCell: (row: DataRow) => {
const partner = row as PartnerStatus
return (
<button
type="button"
className="text-[#999999] cursor-pointer w-[110px] text-center bg-none border-none p-0"
onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
onClick={() => alert(`협의체명: ${partner.name} 상세/편집 열기`)}
>
자세히보기/편집
</button>
)
},
},
]

export default function PartnerTraining() {
const navigate = useNavigate()
const location = useLocation()
const currentTabIdx = Math.max(TAB_PATHS.indexOf(location.pathname), 0)

const [startDate, setStartDate] = React.useState("2025-06-16")
const [endDate, setEndDate] = React.useState("2025-12-16")
const [searchText, setSearchText] = React.useState("")
const [partnerStatusData, setPartnerStatusData] = React.useState<PartnerStatus[]>(initialPartnerStatusData)
const [checkedIds, setCheckedIds] = React.useState<(number | string)[]>([])

const [modalOpen, setModalOpen] = React.useState(false)

const handleSearch = () => {}

const handleTabClick = (idx: number) => {
navigate(TAB_PATHS[idx])
setCheckedIds([])
}

const handleDelete = () => {
if (checkedIds.length === 0) {
alert("삭제할 항목을 선택하세요")
return
}
if (!window.confirm("정말 삭제하시겠습니까?")) return
setPartnerStatusData(prev => prev.filter(row => !checkedIds.includes(row.id)))
setCheckedIds([])
}

const handleOpenModal = () => setModalOpen(true)
const handleCloseModal = () => setModalOpen(false)

const handleSave = (newItem: {
name: string
riskAssessment: boolean
hazardousMaterial: boolean
responseManual: boolean
allSigned: boolean
}) => {
setPartnerStatusData(prev => [
{
id: prev.length + 1,
name: newItem.name,
riskAssessment: newItem.riskAssessment ? "completed" : "pending",
hazardousMaterial: newItem.hazardousMaterial ? "completed" : "pending",
responseManual: newItem.responseManual ? "completed" : "pending",
allSigned: newItem.allSigned ? "completed" : "pending",
updatedAt: new Date().toISOString().slice(0, 10),
},
...prev,
])
}

return (
<section className="w-full bg-white">
<PageTitle>{TAB_LABELS[currentTabIdx]}</PageTitle>
<TabMenu tabs={TAB_LABELS} activeIndex={currentTabIdx} onTabClick={handleTabClick} className="mb-6" />
<div className="mb-3">
<FilterBar
startDate={startDate}
endDate={endDate}
onStartDate={setStartDate}
onEndDate={setEndDate}
searchText={searchText}
onSearchText={setSearchText}
onSearch={handleSearch}
/>
</div>
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {partnerStatusData.length}건</span>
<div className="flex justify-end gap-2">
<Button variant="action" onClick={handleOpenModal} className="flex items-center gap-2">
<CirclePlus size={16} />
신규등록
</Button>
<Button variant="action" onClick={handleDelete} className="flex items-center gap-2">
<Trash2 size={16} />
삭제
</Button>
</div>
</div>
<div className="overflow-x-auto bg-white">
<DataTable columns={columns} data={partnerStatusData} onCheckedChange={setCheckedIds} />
</div>
{modalOpen && (
<PartnerTrainingRegister isOpen={modalOpen} onClose={handleCloseModal} onSave={handleSave} />
)}
</section>
)
}