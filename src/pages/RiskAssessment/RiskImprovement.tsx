import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import StepBar from "@/components/common/StepBar"
import DataTable, { Column } from "@/components/common/DataTable"
import Button from "@/components/common/Button"
import EditableTextArea from "@/components/common/EditableTextArea"
import EditableCell from "@/components/common/EditableCell"
import PageTitle from "@/components/common/PageTitle"
import RiskAssessmentSubmitModal from "./RiskAssessmentSubmitModal"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { Upload, ChevronDown, ChevronRight, ChevronLeft, Save, Printer, FileText, Trash2 } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type RiskDataRow = {
id: number
work: string
hazard: string
beforePhoto: string | null
frequency: number
intensity: number
afterPhoto: string | null
countermeasure: string
reductionPlan: string
evaluator: string
evaluationDate: Date
improvementStep: "완료" | "진행중" | "착수전"
plannedDate: Date
completedDate: Date
}

const ROW_HEIGHT = 84

const baseCellStyle: React.CSSProperties = {
backgroundColor: "#F3F3F3",
color: "#888888",
padding: "0 8px",
height: ROW_HEIGHT,
lineHeight: `${ROW_HEIGHT}px`,
userSelect: "none",
display: "flex",
alignItems: "center",
}

const selectStyle: React.CSSProperties = {
lineHeight: `${ROW_HEIGHT}px`,
appearance: "none",
WebkitAppearance: "none",
MozAppearance: "none",
backgroundColor: "transparent",
border: "none",
outline: "none",
fontSize: 15,
cursor: "pointer",
paddingRight: 30,
width: "100%",
}

const chevronDownStyle: React.CSSProperties = {
position: "absolute",
right: 10,
pointerEvents: "none",
color: "#888",
}

const calcRisk = (freq: number, inten: number) => freq * inten
const getRiskColor = (val: number) => {
if (val <= 3) return "#1EED1E"
if (val <= 6) return "#FFE13E"
return "#FF3939"
}

const RiskImprovement: React.FC = () => {
const navigate = useNavigate()
const [currentStep, setCurrentStep] = useState(2)
const [showSubmitModal, setShowSubmitModal] = useState(false)
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
reductionPlan: "",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
improvementStep: "완료",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "이안전",
evaluationDate: new Date("2025-06-23"),
improvementStep: "완료",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "최갑득",
evaluationDate: new Date("2025-06-23"),
improvementStep: "완료",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
improvementStep: "완료",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
improvementStep: "완료",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "최갑득",
evaluationDate: new Date("2025-06-23"),
improvementStep: "진행중",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
improvementStep: "진행중",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
improvementStep: "착수전",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "최갑득",
evaluationDate: new Date("2025-06-23"),
improvementStep: "착수전",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
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
reductionPlan: "",
evaluator: "홍길동",
evaluationDate: new Date("2025-06-23"),
improvementStep: "착수전",
plannedDate: new Date("2025-06-23"),
completedDate: new Date("2025-06-23"),
},
])


const beforeFileInputRefs = useRef<(HTMLInputElement | null)[]>([])
const afterFileInputRefs = useRef<(HTMLInputElement | null)[]>([])

const handleFileClick = (type: "before" | "after", idx: number) => {
if (type === "before") beforeFileInputRefs.current[idx]?.click()
else afterFileInputRefs.current[idx]?.click()
}

const handleFileChange = (
e: React.ChangeEvent<HTMLInputElement>,
rowIdx: number,
type: "before" | "after"
) => {
const file = e.target.files?.[0]
if (!file) return
const fileUrl = URL.createObjectURL(file)
setData(prev =>
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

const updateDataField = <K extends keyof RiskDataRow>(id: number, key: K, value: RiskDataRow[K]) => {
setData(prev => prev.map(r => (r.id === id ? { ...r, [key]: value } : r)))
}

const onDelete = () => {
if (checked.length === 0) return alert("삭제할 항목을 선택하세요")
if (!window.confirm("정말 삭제하시겠습니까?")) return
setData(prev => prev.filter(r => !checked.includes(r.id)))
setChecked([])
}

const columns: Column<RiskDataRow>[] = [
{
key: "work",
label: "공정(작업)",
minWidth: 100,
renderCell: row => <div style={{ ...baseCellStyle, justifyContent: "center" }}>{row.work}</div>,
},
{
key: "hazard",
label: "위험요인",
minWidth: 300,
renderCell: row => <div style={baseCellStyle}>{row.hazard}</div>,
},
{
key: "reductionPlan",
label: "감소대책",
minWidth: 300,
renderCell: row => (
<div style={{ width: "100%" }}>
<EditableTextArea
value={row.reductionPlan}
onChange={val => updateDataField(row.id, "reductionPlan", val)}
placeholder="감소대책 입력"
maxLength={60}
rows={3}
disabled={false}
/>
</div>
),
},
{
key: "plannedDate",
label: "개선예정일",
minWidth: 100,
maxWidth: 100,
renderCell: row => {
const date = row.plannedDate instanceof Date ? row.plannedDate : new Date(row.plannedDate)
return (
<div style={{ width: 110, display: "flex", justifyContent: "center", alignItems: "center" }} className="h-12">
<DatePicker
selected={date}
onChange={d => d && updateDataField(row.id, "plannedDate", d)}
dateFormat="yyyy-MM-dd"
className="w-full text-sm p-1 text-center"
wrapperClassName="w-full"
popperPlacement="top"
/>
</div>
)
},
},
{
key: "completedDate",
label: "개선완료일",
minWidth: 100,
maxWidth: 100,
renderCell: row => {
const date = row.completedDate instanceof Date ? row.completedDate : new Date(row.completedDate)
return (
<div style={{ width: 110, display: "flex", justifyContent: "center", alignItems: "center" }} className="h-12">
<DatePicker
selected={date}
onChange={d => d && updateDataField(row.id, "completedDate", d)}
dateFormat="yyyy-MM-dd"
className="w-full text-sm p-1 text-center"
wrapperClassName="w-full"
popperPlacement="top"
/>
</div>
)
},
},
{
key: "evaluator",
label: "평가담당자",
minWidth: 60,
maxWidth: 60,
renderCell: row => (
<div style={{ whiteSpace: "nowrap", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
<EditableCell
value={row.evaluator}
onChange={val => updateDataField(row.id, "evaluator", val)}
placeholder="조치 담당자 입력"
maxLength={5}
disabled={false}
/>
</div>
),
},

{
key: "frequency",
label: "빈도",
minWidth: 40,
renderCell: row => (
<div style={{ position: "relative" }}>
<select
value={row.frequency}
onChange={e => updateDataField(row.id, "frequency", Number(e.target.value))}
style={{ ...selectStyle, marginLeft: 3, marginRight: 3 }}
className="w-full h-full text-center"
>
<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
</select>
<ChevronDown
size={16}
style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }}
/>
</div>
),
},
{
key: "intensity",
label: "강도",
minWidth: 40,
renderCell: row => (
<div style={{ position: "relative" }}>
<select
value={row.intensity}
onChange={e => updateDataField(row.id, "intensity", Number(e.target.value))}
style={{ ...selectStyle, marginLeft: 3, marginRight: 3 }}
className="w-full h-full text-center"
>
<option value={1}>1</option>
<option value={2}>2</option>
<option value={3}>3</option>
</select>
<ChevronDown
size={16}
style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }}
/>
</div>
),
},
{
key: "riskLevel",
label: "위험성",
minWidth: 40,
renderCell: row => {
const val = calcRisk(row.frequency, row.intensity)
const bg = getRiskColor(val)
return (
<div
style={{
backgroundColor: bg,
fontWeight: "bold",
width: "100%",
height: "100%",
display: "flex",
justifyContent: "center",
alignItems: "center",
userSelect: "none",
lineHeight: `${ROW_HEIGHT}px`,
borderRadius: 0,
}}
>
{val}
</div>
)
},
},
{
key: "afterPhoto",
label: "개선후 사진",
minWidth: 60,
renderCell: (_v, idx) => (
<>
<input
type="file"
accept="image/*"
style={{ display: "none" }}
ref={el => { afterFileInputRefs.current[idx] = el }}
onChange={e => handleFileChange(e, idx, "after")}
/>
<button
type="button"
className="flex items-center justify-center w-6 h-6 m-auto bg-transparent cursor-pointer"
onClick={() => handleFileClick("after", idx)}
>
<Upload size={19} className="text-gray-600" />
</button>
</>
),
},
]

const openSubmitModal = () => setShowSubmitModal(true)
const closeSubmitModal = () => setShowSubmitModal(false)
const onPrint = () => window.print()

const handleExcelDownload = () => {
const worksheet = XLSX.utils.json_to_sheet(
data.map(({ id, work, hazard, frequency, intensity, countermeasure, reductionPlan, evaluator, evaluationDate, improvementStep, plannedDate, completedDate }) => ({
번호: id,
단위작업: work,
위험요인: hazard,
빈도: frequency,
강도: intensity,
위험성: frequency * intensity,
위험성_감소대책: reductionPlan,
평가담당자: evaluator,
평가일자: evaluationDate instanceof Date ? evaluationDate.toISOString().slice(0, 10) : evaluationDate,
이행단계: improvementStep,
개선예정일: plannedDate instanceof Date ? plannedDate.toISOString().slice(0, 10) : plannedDate,
개선완료일: completedDate instanceof Date ? completedDate.toISOString().slice(0, 10) : completedDate,
}))
)
const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(workbook, worksheet, "위험성개선관리")
const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
saveAs(blob, "위험성개선관리.xlsx")
}

return (
<section className="mypage-content w-full flex flex-col h-full">
<StepBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
<div className="flex items-center justify-between mb-1">
<PageTitle>실행 및 개선관리</PageTitle>
<div className="flex gap-1">
<Button variant="action" onClick={() => alert("임시저장 완료")} className="flex items-center gap-1">
<Save size={16} />
임시저장하기
</Button>
<Button variant="action" onClick={onPrint} className="flex items-center gap-1">
<Printer size={16} />
인쇄
</Button>
<Button variant="action" onClick={handleExcelDownload} className="flex items-center gap-1">
<FileText size={16} />
엑셀다운로드
</Button>
<Button variant="action" onClick={onDelete} className="flex items-center gap-1">
<Trash2 size={16} />
삭제
</Button>
</div>
</div>
<div className="mt-3 flex-1 overflow-auto">
<DataTable<RiskDataRow> columns={columns} data={data} onCheckedChange={setChecked} />
<div className="mt-1 flex justify-start">
<Button variant="rowAdd" onClick={() => alert("새 항목 추가")}>
+ 새항목 추가
</Button>
</div>
</div>
<div className="mt-9 flex justify-between">
<Button variant="step" onClick={() => navigate("/risk-assessment/assessment")}>
<ChevronLeft size={18} className="mr-2" /> 이전으로
</Button>
<Button variant="step" icon={<ChevronRight size={18} />} onClick={openSubmitModal}>
위험성평가 완료
</Button>
</div>
<RiskAssessmentSubmitModal visible={showSubmitModal} onClose={closeSubmitModal} />
</section>
)
}

export default RiskImprovement