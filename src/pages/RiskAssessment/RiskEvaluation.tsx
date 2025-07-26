// 공종 및 위험요인 선택
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import StepBar from "@/components/common/StepBar"
import DataTable, { Column } from "@/components/common/DataTable"
import Button from "@/components/common/Button"
import EditableTextArea from "@/components/common/EditableTextArea"
import PageTitle from "@/components/common/PageTitle"
import PreEvaluationChecklist from "@/components/common/PreEvaluationChecklist"
import PreMethodForm from "@/components/common/PreMethodForm"
import { ChevronRight, Trash2, RefreshCcw } from "lucide-react"

interface EditableRow {
id: number
process: React.ReactNode
description: React.ReactNode
equipment: React.ReactNode
}

const columns: Column<EditableRow>[] = [
{ key: "process", label: "공정(작업)", minWidth: 120 },
{ key: "description", label: "공정(작업) 설명", minWidth: 360 },
{ key: "equipment", label: "설비/유해인자", minWidth: 190 },
]

const initialData: EditableRow[] = [
{
id: 1,
process: "철근절단",
description: "절단기를 사용해 철근을 절단하는 과정",
equipment: "절단기 · 절단날 · 보호장갑",
},
{
id: 2,
process: "아크용접",
description: "아크 용접 장비로 강재 부재를 용접하는 작업",
equipment: "용접기 · 전극봉 · 용접보호면",
},
{
id: 3,
process: "전기설비설치",
description: "전선 포설 및 패널 설치를 진행하는 작업",
equipment: "전선 · 전동드릴 · 안전대",
},
{
id: 4,
process: "기계조립",
description: "기계 부품을 조립해 완성품을 만드는 과정",
equipment: "전동드라이버 · 볼트 · 너트",
},
{
id: 5,
process: "크레인운반",
description: "중량물을 크레인으로 이동·적재하는 작업",
equipment: "크레인 · 와이어로프 · 후크",
},
{
id: 6,
process: "도장작업",
description: "분무기를 이용해 구조물 표면에 페인트 도장",
equipment: "스프레이건 · 페인트 · 보호마스크",
},
{
id: 7,
process: "샌드블라스팅",
description: "압축 공기를 이용해 표면에 부착물 제거",
equipment: "블라스트건 · 연마재 · 방진복",
},
{
id: 8,
process: "콘크리트타설",
description: "믹서트럭에서 콘크리트를 거푸집에 타설하는 작업",
equipment: "믹서트럭 · 레미콘펌프 · 거푸집",
},
{
id: 9,
process: "비계설치",
description: "작업자 이동 및 접근을 위한 비계 설치",
equipment: "비계파이프 · 클램프 · 안전난간",
},
{
id: 10,
process: "배관용접",
description: "스틸 파이프를 용접해 배관 시스템 완성",
equipment: "가스용접기 · 용접봉 · 방열장갑",
},
]

export default function RiskEvaluation() {
const navigate = useNavigate()
const [checkedRows, setCheckedRows] = useState<(number | string)[]>([])
const [currentStep] = useState(0)
const [data, setData] = useState<EditableRow[]>(initialData)

const [values, setValues] = useState({
riskAssessmentName: "",
evaluationType: "최초평가",
evaluationMethod: "빈도·강도법",
scale: "3x3",
regulationFile: "",
})

const handleFormChange = (
e: React.ChangeEvent<
HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>
) => {
const { name, value } = e.target
setValues(prev => ({ ...prev, [name]: value }))
}

const handleCellChange = (
id: number,
key: keyof Omit<EditableRow, "id">,
val: string
) => {
setData(prev =>
prev.map(row =>
row.id === id ? { ...row, [key]: val } : row
)
)
}

const dataWithEditableCells = data.map(row => ({
...row,
process: (
<EditableTextArea
value={String(row.process)}
onChange={val => handleCellChange(row.id, "process", val)}
placeholder="공정(작업) 입력"
/>
),
description: (
<EditableTextArea
value={String(row.description)}
onChange={val => handleCellChange(row.id, "description", val)}
placeholder="공정(작업) 설명 입력"
/>
),
equipment: (
<EditableTextArea
value={String(row.equipment)}
onChange={val => handleCellChange(row.id, "equipment", val)}
placeholder="설비/유해인자 입력"
/>
),
}))

const addRow = () => {
const nextId = data.length
? Math.max(...data.map(r => r.id)) + 1
: 1
setData(prev => [
...prev,
{
id: nextId,
process: "",
description: "",
equipment: "",
},
])
}

const handleDelete = () => {
if (!checkedRows.length) {
alert("삭제할 항목을 선택하세요")
return
}
if (window.confirm("정말 삭제하시겠습니까?")) {
setData(prev =>
prev.filter(row => !checkedRows.includes(row.id))
)
setCheckedRows([])
}
}

return (
<section className="mypage-content w-full">
<StepBar currentStep={currentStep} />

<div className="flex gap-6 w-full">
<div className="flex-[6] border rounded-2xl p-5 overflow-auto w-full min-w-0 flex flex-col">
<div className="flex items-center justify-between mb-1">
<PageTitle>공종 및 위험요인 선택</PageTitle>
<div className="flex gap-1">
<Button
  variant="action"
  onClick={() => alert("다른업종 불러오기")}
  className="flex items-center gap-1"
>
  <RefreshCcw size={16} />
  다른업종 불러오기
</Button>
<Button
  variant="action"
  onClick={handleDelete}
  className="flex items-center gap-1"
>
  <Trash2 size={16} />
  삭제
</Button>
</div>
</div>

<DataTable<EditableRow>
columns={columns}
data={dataWithEditableCells}
onCheckedChange={setCheckedRows}
selectable
/>

<div className="mt-1 flex justify-start">
<Button variant="rowAdd" onClick={addRow}>
+ 새항목 추가
</Button>
</div>
</div>

<div className="flex-[4] flex flex-col gap-1 w-full min-w-0 relative border rounded-2xl p-5">
<PreEvaluationChecklist />

<div className="w-full overflow-x-hidden">
<PreMethodForm values={values} onChange={handleFormChange} />
</div>

<div className="flex justify-end mt-4">
<Button
variant="step"
icon={<ChevronRight size={18} />}
onClick={() =>
  navigate("/risk-assessment/assessment")
}
>
위험성평가 시작
</Button>
</div>
</div>
</div>
</section>
)
}