// src/components/common/PreEvaluationChecklist.tsx
import React, { useState } from "react"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import Checkbox from "@/components/common/Checkbox"
import Button from "@/components/common/Button"

const PreEvaluationChecklist: React.FC = () => {
const items = [
{
no: 1,
content: [
"다음 항목이 포함된 위험성평가 실시 규정 작성",
"평가의 목적 및 방법",
"평가담당자 및 책임자의 역할",
"평가기준 및 절차",
"근로자에 대한 참여·공유방법 및 유의사항",
"결과의 기록·보존",
],
},
{
no: 2,
content: [
"위험성의 수준과 그 수준을 판단하는 기준",
"허용 가능한 위험성의 수준 (법에서 정한 기준 이상으로 위험성의 수준을 정하여야 함)",
],
},
{
no: 3,
content: [
"안전보건정보 사전 조사",
"기계·기구·설비 사양서 MSDS 유해·위험요인 정보",
"공정흐름과 작업 환경 정보",
"법 제63조 작업 여부와 장소 정보",
"재해사례·통계 정보",
"작업환경측정결과·건강진단 결과",
"그 밖의 참고자료",
],
},
]

const [checked, setChecked] = useState<number[]>([])

const handleCheck = (id: number) => {
setChecked(prev =>
prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
)
}

const columns: Column[] = [
{ key: "no", label: "항목", minWidth: 60 },
{ key: "content", label: "내용", minWidth: 300 },
{
key: "check",
label: "check",
minWidth: 80,
renderCell: row => (
<Checkbox
checked={checked.includes(row.id as number)}
onChange={() => handleCheck(row.id as number)}
/>
),
},
]

const data: DataRow[] = items.map(item => ({
id: item.no,
no: item.no,
content: item.content.map((line, i) => (
<p key={i} className="text-sm text-left pl-1">
{line}
</p>
)),
check: null,
}))

return (
<div className="pre-checklist">
<style>{`
.pre-checklist table th,
.pre-checklist table td {
padding: 0.5rem !important;
}
.pre-checklist table th {
height: 39px !important;
line-height: 39px !important;
background-color: #F3F3F3 !important;
}
.pre-checklist table td:nth-child(2) {
background-color: #F3F3F3 !important;
}
.pre-checklist table th:first-child,
.pre-checklist table td:first-child {
display: none;
}
`}</style>

<h3 className="font-semibold text-lg mb-1">위험성평가 사전 체크리스트</h3>
<DataTable columns={columns} data={data} selectable />

<div className="text-sm text-gray-600 mt-3 leading-relaxed">
상시근로자 5인(건설공사1억 원 미만 포함) 이하 사업장에서는 유해·위험요인 파악 역량과 자원이 부족할 수 있어 사전조합 체크리스트 상황에 맞게 활용 가능
</div>

<div className="flex gap-2 mt-3">
<Button variant="docs">안전보건정보 조사표 내려받기</Button>
<Button variant="docs">위험성평가 실시 규정 예시 내려받기</Button>
</div>
</div>
)
}

export default PreEvaluationChecklist