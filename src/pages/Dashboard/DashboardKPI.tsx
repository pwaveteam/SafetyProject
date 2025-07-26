import React, { useState } from "react"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend,
ArcElement,
} from "chart.js"
import { Line, Doughnut } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement)

type KPIKey = "approvalPending" | "riskEval" | "upcomingInspections"

const KPI_LABELS: Record<KPIKey, string> = {
approvalPending: "결재 대기",
riskEval: "위험성평가 진행률",
upcomingInspections: "점검 일정",
}

const approvalPendingData = { pending: 7, completed: 15 }
const riskEvalData = { labels: ["진행중", "완료"], data: [40, 60] }
const upcomingInspectionsData = { labels: ["위험기계/기구/설비", "유해/위험물질"], data: [8, 6] }

const lineChartData = {
labels: ["7일 전", "6일 전", "5일 전", "4일 전", "3일 전", "2일 전", "어제"],
datasets: [
{
label: "위험성 평가 진행 건수",
data: [4, 5, 6, 8, 7, 9, 10],
borderColor: "#031E36",
backgroundColor: "rgba(3, 30, 54, 0.3)",
fill: true,
tension: 0.4,
pointRadius: 4,
},
],
}

const DOUGHNUT_SIZE = 280
const KPI_COLOR = "#031E36"

const chartWrapperStyle = {
width: DOUGHNUT_SIZE,
height: DOUGHNUT_SIZE,
display: "flex",
justifyContent: "center",
alignItems: "center",
margin: "0 auto",
}

const DashboardKPI: React.FC = () => {
const [selectedKPI, setSelectedKPI] = useState<KPIKey>("approvalPending")

const getChartContent = () => {
switch (selectedKPI) {
case "approvalPending":
return (
<div style={chartWrapperStyle}>
<Doughnut
data={{
labels: ["결재 대기", "결재 완료"],
datasets: [
{
data: [approvalPendingData.pending, approvalPendingData.completed],
backgroundColor: [KPI_COLOR, "#A6B8C9"],
hoverBackgroundColor: ["#021522", "#8399AF"],
borderWidth: 0,
borderColor: "transparent",
},
],
}}
options={{
plugins: {
legend: {
position: "bottom",
labels: {
color: KPI_COLOR,
font: { weight: "bold", size: 13 },
padding: 20,
boxWidth: 16,
boxHeight: 16,
},
},
tooltip: { enabled: true },
},
maintainAspectRatio: true,
aspectRatio: 1,
cutout: "70%",
}}
/>
</div>
)
case "riskEval":
return (
<>
<Line
data={lineChartData}
options={{
maintainAspectRatio: false,
plugins: {
legend: {
display: true,
labels: {
font: { weight: "bold", size: 13 },
color: KPI_COLOR,
padding: 20,
},
},
tooltip: {
backgroundColor: KPI_COLOR,
titleFont: { weight: "bold" },
bodyFont: { size: 13 },
},
},
scales: {
y: {
beginAtZero: true,
ticks: {
color: KPI_COLOR,
font: { weight: "bold", size: 12 },
maxTicksLimit: 6,
},
grid: { color: "rgba(3, 30, 54, 0.15)" },
border: { display: false },
},
x: {
ticks: {
color: KPI_COLOR,
font: { weight: "bold", size: 12 },
},
grid: { color: "transparent" },
border: { display: false },
},
},
}}
style={{ height: 300 }}
/>
<div className="hidden mt-2 text-center text-sm font-semibold">
전체 진행률: {riskEvalData.data[1]}%
</div>
</>
)
case "upcomingInspections":
return (
<div style={chartWrapperStyle}>
<Doughnut
data={{
labels: upcomingInspectionsData.labels,
datasets: [
{
data: upcomingInspectionsData.data,
backgroundColor: [KPI_COLOR, "#A6B8C9"],
hoverBackgroundColor: ["#021522", "#8399AF"],
borderWidth: 0,
borderColor: "transparent",
},
],
}}
options={{
plugins: {
legend: {
position: "bottom",
labels: {
color: KPI_COLOR,
font: { weight: "bold", size: 13 },
padding: 20,
boxWidth: 16,
boxHeight: 16,
},
},
tooltip: { enabled: true },
},
maintainAspectRatio: true,
aspectRatio: 1,
cutout: "70%",
}}
/>
</div>
)
default:
return null
}
}

const getKPIValue = (key: KPIKey) => (
<span className="ml-3 text-2xl font-extrabold" style={{ color: KPI_COLOR }}>
{key === "approvalPending"
? approvalPendingData.pending
: key === "riskEval"
? riskEvalData.data[1] + "%"
: upcomingInspectionsData.data.reduce((a, b) => a + b, 0)}
</span>
)

const getKPILabel = (key: KPIKey) => (
<span className="mt-1 ml-3 text-xs font-semibold text-[#333639]">
{KPI_LABELS[key]}
</span>
)

return (
<div className="flex flex-col h-full space-y-4">
<div className="grid grid-cols-3 gap-3 mb-1">
{(["approvalPending", "riskEval", "upcomingInspections"] as KPIKey[]).map((key) => (
<div
key={key}
onClick={() => setSelectedKPI(key)}
className="cursor-pointer rounded-[10px] p-5 flex flex-col items-start bg-gradient-to-r from-[#EEF3F9] via-[#F5F7FA] to-[#F1F3FB] transition-opacity duration-300 ease-in-out"
style={{ opacity: key === selectedKPI ? 1 : 0.6 }}
>
{getKPIValue(key)}
{getKPILabel(key)}
</div>
))}
</div>

<div className="bg-white rounded-[15px] p-1 shadow-none h-[300px] border-none">
<h3 className="flex justify-between items-center font-bold mb-5 text-lg sm:text-xl text-gray-900">
{KPI_LABELS[selectedKPI]}
</h3>

{getChartContent()}
</div>

</div>
)
}

export default DashboardKPI