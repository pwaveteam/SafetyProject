// src/components/common/InspectionTable.tsx
import React from "react"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import Button from "@/components/common/Button"
import EditableCell from "@/components/common/EditableCell"
import Checkbox from "@/components/common/Checkbox"
import DatePicker from "@/components/common/DatePicker"

export type InspectionItem = {
id: number
corporateGoal: string
detailPlan: string
scheduleFirstHalf: boolean
scheduleSecondHalf: boolean
KPI: string
department: string
achievementRate: string
resultRemark: string
entryDate: string
}

interface InspectionTableProps {
items: InspectionItem[]
onChangeField: (
id: number,
field: keyof InspectionItem,
value: string | boolean
) => void
onAdd: () => void
onSave: () => void
onPrint: () => void
}

const InspectionTable: React.FC<InspectionTableProps> = ({
items,
onChangeField,
onAdd,
onSave,
onPrint,
}) => {
const columns: Column[] = [
{ key: "detailPlan",         label: "목표/세부추진계획", minWidth: 200 },
{ key: "scheduleFirstHalf",  label: "추진일정(상반기)",    minWidth: 60 },
{ key: "scheduleSecondHalf", label: "추진일정(하반기)",    minWidth: 60 },
{ key: "KPI",                label: "성과지표",           minWidth: 190 },
{ key: "department",         label: "담당부서",           minWidth: 100 },
{ key: "achievementRate",    label: "달성률%",            minWidth: 100 },
{ key: "resultRemark",       label: "실적/부진사유",      minWidth: 200 },
{ key: "entryDate",          label: "작성일",            minWidth: 120 },
]

return (
<div className="inspection-table">
<DataTable
columns={columns}
data={items}
renderCell={(row: DataRow, col: Column) => {
const item = row as InspectionItem
if (col.key === "scheduleFirstHalf") {
return (
<Checkbox
checked={item.scheduleFirstHalf}
onChange={() => onChangeField(item.id, "scheduleFirstHalf", !item.scheduleFirstHalf)}
/>
)
}
if (col.key === "scheduleSecondHalf") {
return (
<Checkbox
checked={item.scheduleSecondHalf}
onChange={() => onChangeField(item.id, "scheduleSecondHalf", !item.scheduleSecondHalf)}
/>
)
}
if (col.key === "entryDate") {
return (
<DatePicker
value={item.entryDate}
onChange={date => onChangeField(item.id, "entryDate", date)}
/>
)
}
const key = col.key as keyof InspectionItem
return (
<EditableCell
value={String(item[key])}
onChange={v => onChangeField(item.id, key, v)}
placeholder={col.label}
parentWidth={(col.minWidth as number) * 0.95}
maxLength={100}
/>
)
}}
/>

<div className="mt-3 flex justify-between items-center">
<Button variant="rowAdd" onClick={onAdd}>+ 점검항목추가</Button>
<Button variant="primary" onClick={onSave}>저장하기</Button>
</div>
</div>
)
}

export default InspectionTable
