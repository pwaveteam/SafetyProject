import React from "react"
import Checkbox from "./Checkbox"

export type Column = {
key: string
label: string
minWidth?: string | number
renderCell?: (row: DataRow, col: Column, rowIdx: number) => React.ReactNode
}

export type DataRow = {
id: number | string
[key: string]: React.ReactNode
}

interface DataTableProps {
columns: Column[]
data: DataRow[]
selectable?: boolean
renderCell?: (row: DataRow, col: Column, rowIdx: number) => React.ReactNode
onCheckedChange?: (checkedIds: (number | string)[]) => void
}

const headerFontStyle: React.CSSProperties = {
fontWeight: 600,
color: "#666666",
whiteSpace: "nowrap",
textOverflow: "ellipsis",
overflow: "hidden",
}

const bodyFontStyle: React.CSSProperties = {
fontWeight: "normal",
color: "#333639",
whiteSpace: "nowrap",
textOverflow: "ellipsis",
overflow: "hidden",
}

const DataTable: React.FC<DataTableProps> = ({
columns,
data,
renderCell,
onCheckedChange,
}) => {
const [checked, setChecked] = React.useState<(number | string)[]>([])

const handleCheckAll = () => {
if (checked.length === data.length) setChecked([])
else setChecked(data.map(row => row.id))
}

const handleCheck = (id: number | string) => {
setChecked(prev =>
prev.includes(id) ? prev.filter(num => num !== id) : [...prev, id]
)
}

React.useEffect(() => {
onCheckedChange?.(checked)
}, [checked, onCheckedChange])

return (
<div className="overflow-x-auto">
<table className="w-full text-center border-collapse min-w-[600px] md:min-w-auto">
<thead>
<tr
className="h-9 md:h-14"
style={{
background: "#F7F8FA",
borderTop: "1.9px solid #161616",
borderBottom: "1px solid #CCCCCC",
}}
>
<th
className="px-3 py-0 align-middle text-[0.8125rem] md:text-base"
style={{
minWidth: 60,
maxWidth: 100,
width: 60,
borderRight: "1px solid #CCCCCC",
background: "#EFEFF3",
...headerFontStyle,
}}
>
<Checkbox
checked={checked.length === data.length && data.length > 0}
onChange={handleCheckAll}
/>
</th>
{columns.map((col, idx) => (
<th
key={col.key}
className="px-3 py-0 align-middle text-[0.8125rem] md:text-base"
style={{
minWidth:
typeof col.minWidth === "number"
? Math.max(col.minWidth, 60)
: col.minWidth || 60,
maxWidth: 300,
borderRight:
idx === columns.length - 1 ? "none" : "1px solid #CCCCCC",
background: "#EFEFF3",
...headerFontStyle,
}}
title={typeof col.label === "string" ? col.label : undefined}
>
{col.label}
</th>
))}
</tr>
</thead>
<tbody>
{data.map((row, rowIdx) => (
<tr
key={row.id}
className="h-9 md:h-14"
style={{ background: "#fff", cursor: "default" }}
onMouseEnter={e => (e.currentTarget.style.background = "#FBFBFB")}
onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
>
<td
className="px-3 py-0 align-middle text-[0.8125rem] md:text-base"
style={{
minWidth: 60,
maxWidth: 100,
width: 60,
borderRight: "1px solid #CCCCCC",
borderBottom: "1px solid #CCCCCC",
...bodyFontStyle,
}}
>
<Checkbox
checked={checked.includes(row.id)}
onChange={() => handleCheck(row.id)}
/>
</td>
{columns.map((col, colIdx) => (
<td
key={col.key}
className="px-3 py-0 align-middle text-[0.8125rem] md:text-base"
style={{
minWidth:
typeof col.minWidth === "number"
? Math.max(col.minWidth, 60)
: col.minWidth || 60,
maxWidth: 300,
width: col.key === "id" ? 60 : undefined,
borderRight:
colIdx === columns.length - 1
? "none"
: "1px solid #CCCCCC",
borderBottom: "1px solid #CCCCCC",
...bodyFontStyle,
}}
title={
typeof row[col.key] === "string"
? (row[col.key] as string)
: undefined
}
>
{col.renderCell
? col.renderCell(row, col, rowIdx)
: renderCell
? renderCell(row, col, rowIdx)
: row[col.key]}
</td>
))}
</tr>
))}
</tbody>
</table>
</div>
)
}

export default DataTable