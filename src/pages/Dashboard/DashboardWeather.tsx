import React from "react"

const PRIMARY_COLOR = "#003156"

const DashboardWeather: React.FC = () => {
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() + 1
const date = today.getDate()
const weekDaysKR = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
const day = weekDaysKR[today.getDay()]
const hours = today.getHours()
const minutes = today.getMinutes()
const ampm = hours >= 12 ? "오후" : "오전"
const hour12 = hours % 12 === 0 ? 12 : hours % 12
const minuteStr = minutes.toString().padStart(2, "0")

return (
<section className="w-full h-24 sm:h-28 rounded-lg text-white flex px-4 sm:px-6 py-4 sm:py-5 select-none" aria-label="금일 날씨" style={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 20%, #004080 80%)` }}>
<div className="w-1/2 flex items-center space-x-4">
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M17.5 19a4.5 4.5 0 0 0 0-9h-1.05a7 7 0 1 0-10.7 7" /><circle cx="12" cy="17" r="4" /></svg>
<div className="text-3xl sm:text-5xl font-bold leading-none">21°</div>
</div>
<div className="w-1/2 flex flex-col justify-center text-left space-y-1">
<div className="text-xs sm:text-sm font-normal leading-none">서울</div>
<div className="text-xs sm:text-sm font-normal leading-none">{month}월 {date}일 {day} {ampm} {hour12}:{minuteStr}</div>
<div className="text-[10px] sm:text-xs mt-1 leading-none">체감온도 21°</div>
</div>
</section>
)
}

export default DashboardWeather