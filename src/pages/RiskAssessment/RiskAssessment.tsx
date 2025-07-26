// 위험성평가 및 대책수립
import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import StepBar from "@/components/common/StepBar"
import DataTable, { Column } from "@/components/common/DataTable"
import Button from "@/components/common/Button"
import { Upload, ChevronDown, ChevronRight, ChevronLeft, Trash2, RefreshCcw, CirclePlus } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import EditableCell from "@/components/common/EditableCell"
import EditableTextArea from "@/components/common/EditableTextArea"
import PageTitle from "@/components/common/PageTitle"

type RiskDataRow = {
id: number
work: string
hazard: string
beforePhoto: string | null
frequency: number
intensity: number
afterPhoto: string | null
countermeasure: string
evaluator: string
evaluationDate: Date
}

const baseCellStyle: React.CSSProperties = {
backgroundColor: "#F3F3F3",
color: "#888888",
padding: "0 8px",
height: 84,
lineHeight: "50px",
userSelect: "none",
display: "flex",
alignItems: "center",
}

const centeredCellStyle: React.CSSProperties = {
...baseCellStyle,
justifyContent: "center",
}

const leftAlignedCellStyle: React.CSSProperties = {
...baseCellStyle,
justifyContent: "flex-start",
}

const selectStyle: React.CSSProperties = {
appearance: "none",
WebkitAppearance: "none",
MozAppearance: "none",
paddingRight: 30,
backgroundColor: "transparent",
border: "none",
outline: "none",
fontSize: 15,
cursor: "pointer",
width: "100%",
}

export default function RiskAssessment() {
const navigate = useNavigate()
const [currentStep, setCurrentStep] = useState<number>(1)
const [checked, setChecked] = useState<(number | string)[]>([])
const [data, setData] = useState<RiskDataRow[]>([
{
id: 1,
work: "철근절단",
hazard: "날카로운 절단날 접촉",
beforePhoto: null,
frequency: 1,
intensity: 1,
afterPhoto: null,
countermeasure: "절단기 안전커버 설치·절단장갑·보호안경 착용",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
},
{
id: 2,
work: "아크용접",
hazard: "강렬한 빛·유해가스 노출",
beforePhoto: null,
frequency: 2,
intensity: 2,
afterPhoto: null,
countermeasure: "국소배기장치 가동·용접차광면 착용·장갑·보호복 착용",
evaluator: "이안전",
evaluationDate: new Date("2025-06-23"),
},
{
id: 3,
work: "전기설비설치",
hazard: "전기 감전·고소 추락 위험",
beforePhoto: null,
frequency: 3,
intensity: 3,
afterPhoto: null,
countermeasure: "접지상태 점검·절연장갑·안전화 착용·안전표지 설치",
evaluator: "최갑득",
evaluationDate: new Date("2025-06-23"),
},
{
id: 4,
work: "기계조립",
hazard: "부품 끼임·충돌 사고",
beforePhoto: null,
frequency: 2,
intensity: 2,
afterPhoto: null,
countermeasure: "끼임방지 가드 부착·정리정돈·보호구(장갑·안경) 착용",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
},
{
id: 5,
work: "크레인운반",
hazard: "하역 중 낙하물 충격 위험",
beforePhoto: null,
frequency: 1,
intensity: 1,
afterPhoto: null,
countermeasure: "권역별 안전통제·속도제한 표지·하중표시·안전모 착용",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
},
{
id: 6,
work: "기계청소",
hazard: "회전체 접촉·오염물질 노출",
beforePhoto: null,
frequency: 1,
intensity: 1,
afterPhoto: null,
countermeasure: "장비 완전정지 후 청소·보호안경·장갑·마스크 착용·환기",
evaluator: "최갑득",
evaluationDate: new Date("2025-06-23"),
},
{
id: 7,
work: "배관수리",
hazard: "밀폐공간 유해가스 축적·낙상 위험",
beforePhoto: null,
frequency: 1,
intensity: 1,
afterPhoto: null,
countermeasure: "잠금·태그아웃 절차 준수·환기 확인·안전화·보호장비 착용",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
},
{
id: 8,
work: "제품포장",
hazard: "반복작업에 따른 근골격계 부담",
beforePhoto: null,
frequency: 1,
intensity: 1,
afterPhoto: null,
countermeasure: "적정 하중 준수·인체공학적 작업대 사용·안전화·장갑 착용",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
},
{
id: 9,
work: "용매취급",
hazard: "화학물질 피부 자극·흡입 노출",
beforePhoto: null,
frequency: 1,
intensity: 1,
afterPhoto: null,
countermeasure: "MSDS 숙지·국소배기·보호장갑·안면보호구·환기장치 가동",
evaluator: "최갑득",
evaluationDate: new Date("2025-06-23"),
},
{
id: 10,
work: "기능시험",
hazard: "고온·고압 장치 접촉",
beforePhoto: null,
frequency: 3,
intensity: 3,
afterPhoto: null,
countermeasure: "장비 안전장치 확인·안전거리 확보·보호안경·장갑 착용",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
},
])

const beforeFileInputRefs = useRef<(HTMLInputElement | null)[]>([])
const afterFileInputRefs = useRef<(HTMLInputElement | null)[]>([])

const calcRisk = (freq: number, inten: number) => freq * inten
const getRiskColor = (val: number) => {
if (val <= 3) return "#1EED1E"   // 낮음
if (val <= 6) return "#FFE13E"   // 보통
return "#FF3939"                 // 높음
}

const handleFileClick = (index: number, type: "before" | "after") => {
if (type === "before") beforeFileInputRefs.current[index]?.click()
else afterFileInputRefs.current[index]?.click()
}

const handleFileChange = (
e: React.ChangeEvent<HTMLInputElement>,
rowIdx: number,
type: "before" | "after"
) => {
const file = e.target.files?.[0]
if (!file) return
const fileUrl = URL.createObjectURL(file)
setData((prev) =>
prev.map((r, idx) =>
idx === rowIdx
? {
...r,
beforePhoto: type === "before" ? fileUrl : r.beforePhoto,
afterPhoto: type === "after" ? fileUrl : r.afterPhoto,
}
: r
)
)
}

const handleChange = <K extends keyof RiskDataRow>(
id: number,
key: K,
value: RiskDataRow[K]
) => {
setData((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)))
}
const onDelete = () => {
if (checked.length === 0) {
alert("삭제할 항목을 선택하세요")
return
}
if (window.confirm("정말 삭제하시겠습니까?")) {
setData((prev) => prev.filter((r) => !checked.includes(r.id)))
setChecked([])
}
}

const columns: Column<RiskDataRow>[] = [
{
key: "index",
label: "번호",
width: 50,
renderCell: (row) => (
<div
style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
height: 84,
color: "#888",
userSelect: "none",
}}
>
{row.id}
</div>
),
},
{
key: "work",
label: "공정(작업)",
minWidth: 130,
renderCell: (row: RiskDataRow) => (
<div
style={{
paddingLeft: 8,
height: 84,
display: "flex",
alignItems: "center",
color: "#aaaaaa",
userSelect: "none",
}}
>
{row.work}
</div>
),
},
{
key: "hazard",
label: "공정(작업)설명",
minWidth: 230,
renderCell: (row: RiskDataRow) => (
<div
style={{
paddingLeft: 8,
height: 84,
display: "flex",
alignItems: "center",
color: "#aaaaaa",
userSelect: "none",
}}
>
{row.hazard}
</div>
),
},
{
key: "countermeasure",
label: "현재 안전보건조치",
minWidth: 430,
renderCell: (row) => (
<div style={{ width: "100%" }}>
<EditableTextArea
value={row.countermeasure}
onChange={(val) => handleChange(row.id, "countermeasure", val)}
placeholder="현재 안전보건조치 입력"
maxLength={60}
rows={3}
disabled={false}
/>
</div>
),
},
{
key: "beforePhoto",
label: "개선전 사진",
minWidth: 100,
renderCell: (_row: RiskDataRow, rowIdx?: number) => (
<>
<input
type="file"
accept="image/*"
style={{ display: "none" }}
ref={(el) => {
if (rowIdx !== undefined) beforeFileInputRefs.current[rowIdx] = el as HTMLInputElement | null
}}
onChange={(e) => {
if (rowIdx !== undefined) handleFileChange(e, rowIdx, "before")
}}
/>
<button
type="button"
className="flex items-center justify-center w-6 h-6 m-auto bg-transparent cursor-pointer"
onClick={() => rowIdx !== undefined && handleFileClick(rowIdx, "before")}
>
<Upload size={19} className="text-gray-600" />
</button>
</>
),
},
{
key: "frequency",
label: "빈도",
minWidth: 40,
renderCell: (row: RiskDataRow) => (
<div style={{ position: "relative" }}>
<select
className="w-full h-full text-center"
style={{
...selectStyle,
paddingRight: 24,
marginLeft: 3,
marginRight: 3,
}}
value={row.frequency}
onChange={(e) => handleChange(row.id, "frequency", Number(e.target.value))}
>
{[1, 2, 3].map((v) => (
<option key={v} value={v}>
{v}
</option>
))}
</select>
<ChevronDown
size={16}
style={{
position: "absolute",
right: 6,
top: "50%",
transform: "translateY(-50%)",
pointerEvents: "none",
color: "#888",
}}
/>
</div>
),
},
{
key: "intensity",
label: "강도",
minWidth: 40,
renderCell: (row: RiskDataRow) => (
<div style={{ position: "relative" }}>
<select
className="w-full h-full text-center"
style={{
...selectStyle,
paddingRight: 24,
marginLeft: 3,
marginRight: 3,
}}
value={row.intensity}
onChange={(e) => handleChange(row.id, "intensity", Number(e.target.value))}
>
{[1, 2, 3].map((v) => (
<option key={v} value={v}>
{v}
</option>
))}
</select>
<ChevronDown
size={16}
style={{
position: "absolute",
right: 6,
top: "50%",
transform: "translateY(-50%)",
pointerEvents: "none",
color: "#888",
}}
/>
</div>
),
},
{
key: "riskLevel",
label: "위험성",
minWidth: 40,
renderCell: (row: RiskDataRow) => {
const riskVal = calcRisk(row.frequency, row.intensity)
const bg = getRiskColor(riskVal)
return (
<div
style={{
backgroundColor: bg,
fontWeight: "bold",
width: "100%",
height: 84,
padding: "0 8px",
display: "flex",
justifyContent: "center",
alignItems: "center",
userSelect: "none",
borderRadius: 0,
}}
>
{riskVal}
</div>
)
},
},
{
key: "afterPhoto",
label: "평가현장 사진",
minWidth: 100,
renderCell: (_row: RiskDataRow, rowIdx?: number) => (
<>
<input
type="file"
accept="image/*"
style={{ display: "none" }}
ref={(el) => {
if (rowIdx !== undefined) afterFileInputRefs.current[rowIdx] = el as HTMLInputElement | null
}}
onChange={(e) => {
if (rowIdx !== undefined) handleFileChange(e, rowIdx, "after")
}}
/>
<button
type="button"
className="flex items-center justify-center w-6 h-6 m-auto bg-transparent cursor-pointer"
onClick={() => rowIdx !== undefined && handleFileClick(rowIdx, "after")}
>
<Upload size={19} className="text-gray-600" />
</button>
</>
),
},
{
key: "evaluationDate",
label: "평가일자",
minWidth: 90,
maxWidth: 90,
renderCell: (row: RiskDataRow) => {
const date =
row.evaluationDate instanceof Date
? row.evaluationDate
: new Date(row.evaluationDate)
return (
<div
style={{
width: 110,
display: "flex",
justifyContent: "center",
alignItems: "center",
}}
className="gap-1 h-12"
>
<DatePicker
selected={date}
onChange={(date: Date | null) => {
if (!date) return
setData((prev) =>
prev.map((r) =>
r.id === row.id ? { ...r, evaluationDate: date } : r
)
)
}}
dateFormat="yyyy-MM-dd"
className="w-full text-sm p-1 text-center"
wrapperClassName="w-full"
popperPlacement="top"
/>
</div>
)
},
},
]
return (
<section className="mypage-content w-full flex flex-col h-full">
<StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
<div className="flex items-center justify-between mb-1">
<PageTitle>위험성평가 및 대책수립</PageTitle>
<div className="flex gap-1">
<Button variant="action" onClick={() => alert("기존목록 불러오기")} className="flex items-center gap-1">
<RefreshCcw size={16} />
기존목록 불러오기
</Button>
<Button variant="action" onClick={() => alert("아차사고 추가")} className="flex items-center gap-1">
<CirclePlus size={16} />
아차사고 추가
</Button>
<Button variant="action" onClick={() => alert("표준모델 요인 추가")} className="flex items-center gap-1">
<CirclePlus size={16} />
표준모델 요인 추가
</Button>
<Button variant="action" onClick={() => alert("기인물 요인 추가")} className="flex items-center gap-1">
<CirclePlus size={16} />
기인물 요인 추가
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

<div className="mt-3 flex-1 overflow-auto">
<DataTable<RiskDataRow> columns={columns} data={data} onCheckedChange={setChecked} />
<div className="mt-1 flex justify-start">
<Button variant="rowAdd" onClick={() => alert("새항목 추가")}>
+ 새항목 추가
</Button>
</div>
</div>

<div className="mt-9 flex justify-between">
<Button variant="step" onClick={() => navigate("/risk-assessment/risk")}>
<ChevronLeft size={18} className="mr-2" />
이전으로
</Button>

<Button variant="step" onClick={() => navigate("/risk-assessment/improvement")}>
저장 후 다음으로
<ChevronRight size={18} className="ml-2" />
</Button>
</div>
</section>
)
}