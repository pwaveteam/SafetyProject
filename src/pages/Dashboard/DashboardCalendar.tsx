import React, { useState } from "react"
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"

type Event = {
id: number
title: string
startDate: string
endDate?: string
}

const events: Event[] = [
{ id: 1, title: "TBM", startDate: "2025-06-29" },
{ id: 2, title: "TBM", startDate: "2025-07-03" },
{ id: 3, title: "위험성평가", startDate: "2025-07-03" },
{ id: 4, title: "TBM", startDate: "2025-07-05" },
{ id: 5, title: "안전교육", startDate: "2025-07-05" },
{ id: 6, title: "TBM", startDate: "2025-07-07" },
{ id: 7, title: "TBM", startDate: "2025-07-09" },
{ id: 8, title: "위험성평가", startDate: "2025-07-09" },
{ id: 9, title: "TBM", startDate: "2025-07-11" },
{ id: 10, title: "TBM", startDate: "2025-07-13" },
{ id: 11, title: "TBM", startDate: "2025-07-17" },
{ id: 12, title: "TBM", startDate: "2025-07-19" },
{ id: 13, title: "정기점검", startDate: "2025-07-19" },
{ id: 14, title: "TBM", startDate: "2025-07-23" },
{ id: 15, title: "TBM", startDate: "2025-07-25" },
{ id: 16, title: "정기점검", startDate: "2025-07-25" },
{ id: 17, title: "위험성평가", startDate: "2025-07-27" },
{ id: 18, title: "특별점검", startDate: "2025-07-27" },
{ id: 19, title: "TBM", startDate: "2025-07-31" },
]

const weekDays = ["일", "월", "화", "수", "목", "금", "토"]
const MAIN_COLOR = "#1C56D3"

const DashboardCalendar = () => {
const [currentDate, setCurrentDate] = useState(new Date())

const getStartDate = (date: Date) => {
const first = new Date(date.getFullYear(), date.getMonth(), 1)
const start = new Date(first)
start.setDate(first.getDate() - first.getDay())
return start
}

const getCalendarDays = () => {
const start = getStartDate(currentDate)
return Array.from({ length: 42 }, (_, i) => {
const date = new Date(start)
date.setDate(start.getDate() + i)
return date
})
}

const getEventsForDate = (date: Date) => {
const dStr = date.toISOString().slice(0, 10)
return events.filter((e) => e.startDate === dStr)
}

const isToday = (date: Date) => {
const today = new Date()
return (
date.getFullYear() === today.getFullYear() &&
date.getMonth() === today.getMonth() &&
date.getDate() === today.getDate()
)
}

const isCurrentMonth = (date: Date) =>
date.getMonth() === currentDate.getMonth()

const prevMonth = () =>
setCurrentDate(
new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
)

const nextMonth = () =>
setCurrentDate(
new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
)

const goToday = () => setCurrentDate(new Date())

return (
<div className="w-full p-4 rounded-[16px] border border-[#E8E8E8]">
<div className="flex items-center justify-between mb-4">
<div className="flex gap-2 items-center">
<button
onClick={prevMonth}
className="w-8 h-8 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100"
>
<ChevronLeft size={18} />
</button>
<button
onClick={nextMonth}
className="w-8 h-8 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100"
>
<ChevronRight size={18} />
</button>
<button
onClick={goToday}
className="text-sm px-3 h-8 rounded-md border border-[#D0D5DD] text-gray-800 hover:bg-gray-50"
>
오늘
</button>
<span className="text-lg font-semibold ml-2">
{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
</span>
</div>

<div className="flex items-center gap-2">
<div className="relative w-[240px]">
<input
type="text"
placeholder="검색어를 입력해주세요"
className="w-full h-9 pl-8 pr-3 rounded-md border border-[#E0E0E0] text-sm placeholder-gray-400 focus:outline-none"
/>
<Search
size={16}
className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
/>
</div>
<button className="w-9 h-9 flex items-center justify-center rounded-md border border-[#E0E0E0]">
<Filter size={16} className="text-gray-600" />
</button>
</div>
</div>

<div className="grid grid-cols-7 mb-3 text-center text-sm font-semibold text-gray-600">
{weekDays.map((d) => (
<div key={d}>{d}</div>
))}
</div>

<div className="grid grid-cols-7 gap-[3px] text-[13px]">
{getCalendarDays().map((date, i) => {
const day = date.getDay()
const events = getEventsForDate(date)
const isCurMonth = isCurrentMonth(date)
const dimmed = !isCurMonth
const today = isToday(date)

const textColor = dimmed
? "text-gray-400"
: "text-[#161616]"

const borderClass = "border border-[#E8E8E8]"
const bgClass = dimmed ? "bg-[#FAFAFA]" : "bg-white"
const ringStyle = today
? "ring-1 ring-[#1C56D3] rounded"
: ""

return (
<div
key={i}
className={`${borderClass} ${bgClass} p-2 h-[90px] overflow-hidden`}
>
<div
className={`w-fit px-[6px] font-semibold ${textColor} text-[13px] ${ringStyle}`}
>
{date.getDate()}
</div>
<div className="mt-[4px] flex flex-col gap-[2px]">
{events.map((ev) => {
let bg = "bg-gray-100"
let text = "text-[#333]"

if (ev.title.includes("TBM")) {
bg = "bg-[#E7F1FF]"
text = "text-[#1C56D3]"
} else if (ev.title.includes("교육")) {
bg = "bg-[#FFF2D9]"
text = "text-[#FF8A00]"
} else if (ev.title.includes("점검")) {
bg = "bg-[#FEE4E2]"
text = "text-[#D92D20]"
} else if (ev.title.includes("위험성")) {
bg = "bg-[#FFF2D9]"
text = "text-[#FF8A00]"
} else {
bg = "bg-gray-200"
text = "text-[#333]"
}

const badgeStyle = `inline-block ${bg} ${text} text-[11px] px-[8px] py-[3px] rounded font-medium w-fit ${dimmed ? "text-gray-400 bg-gray-100" : ""}`

return (
<span key={ev.id} className={badgeStyle}>
{ev.title}
</span>
)
})}
</div>
</div>
)
})}
</div>
</div>
)
}

export default DashboardCalendar