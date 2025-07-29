import React,{useState,useEffect,useRef} from "react"
import {useNavigate} from "react-router-dom"
import DashboardKPI from "./DashboardKPI"
import DashboardCalendar from "./DashboardCalendar"
import DashboardWeather from "./DashboardWeather"
import DashboardBanner from "./DashboardBanner"
import DashboardPolicy from "./DashboardPolicy"
import DashboardNotice from "./DashboardNotice"

const Dashboard:React.FC=()=>{
const [bannerIndex,setBannerIndex]=useState(0)
const bannerInterval=useRef<NodeJS.Timer|null>(null)
const navigate=useNavigate()

useEffect(()=>{
bannerInterval.current=setInterval(()=>{setBannerIndex(prev=>(prev+1)%5)},1500)
return()=>{if(bannerInterval.current)clearInterval(bannerInterval.current)}
},[])

const handleViewAllClick=(section:string)=>{
if(section==="공지사항")navigate("/notice-board/notice")
else if(section==="안전보이스")navigate("/nearmiss/safevoice")
}

return(
<div className="w-full font-sans space-y-6 px-4 sm:px-5 md:px-6 lg:px-0">
<header className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<DashboardPolicy/>
<DashboardWeather/>
<DashboardBanner index={bannerIndex}/>
</header>
<section className="grid grid-cols-1 lg:grid-cols-[6.5fr_3.5fr] gap-4" style={{minHeight:320}}>
<section className="bg-white rounded-lg border border-[#EFEFF3] p-3 w-full max-w-full overflow-visible" aria-label="달력">
<DashboardCalendar/>
</section>
<section className="bg-white rounded-lg border border-[#EFEFF3] p-3 h-full flex flex-col justify-between overflow-hidden" aria-label="대시보드 통계">
<DashboardKPI/>
</section>
</section>
<section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
<DashboardNotice title="공지사항"/>
<DashboardNotice title="안전보이스"/>
</section>
</div>
)}

export default Dashboard