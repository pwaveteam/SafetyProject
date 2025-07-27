import React,{useState} from "react"
import {ChevronLeft,ChevronRight} from "lucide-react"

type Event={id:number,title:string,startDate:string,endDate?:string,time?:string}

const events:Event[]=[
{id:1,title:"위험성평가 실시",startDate:"2025-07-01"},
{id:2,title:"안전보건교육 진행",startDate:"2025-07-05",endDate:"2025-07-07"},
{id:3,title:"유해/위험물질 점검",startDate:"2025-07-10"},
{id:4,title:"위험기계/기구/설비 점검",startDate:"2025-07-12"},
{id:5,title:"위험성평가 실시",startDate:"2025-07-15"},
{id:6,title:"안전보건교육 진행",startDate:"2025-07-22"},
{id:7,title:"유해/위험물질 점검",startDate:"2025-07-22"},
]

const weekDays=["일","월","화","수","목","금","토"]
const BORDER_COLOR="#E8E8E8"
const MAIN_COLOR="#1C56D3"
const BORDER_WIDTH=1

const DashboardCalendar:React.FC=()=>{
const [currentDate,setCurrentDate]=useState(new Date())

const getCalendarStartDate=(date:Date)=>{const firstDay=new Date(date.getFullYear(),date.getMonth(),1);return new Date(firstDay.getFullYear(),firstDay.getMonth(),firstDay.getDate()-firstDay.getDay())}

const generateCalendarDays=()=>{const start=getCalendarStartDate(currentDate);return Array.from({length:42}).map((_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d})}

const days=generateCalendarDays()

const getEventsForDate=(date:Date)=>{const dateStr=date.toISOString().slice(0,10);return events.filter(e=>e.endDate?e.startDate<=dateStr&&dateStr<=e.endDate:e.startDate===dateStr)}

const isToday=(date:Date)=>{const today=new Date();return date.getDate()===today.getDate()&&date.getMonth()===today.getMonth()&&date.getFullYear()===today.getFullYear()}

const isCurrentMonth=(date:Date)=>date.getMonth()===currentDate.getMonth()

const prevMonth=()=>setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth()-1,1))
const nextMonth=()=>setCurrentDate(new Date(currentDate.getFullYear(),currentDate.getMonth()+1,1))
const getKoreanMonth=(month:number)=>`${month+1}월`
const todayClick=()=>setCurrentDate(new Date())

return(
<div className="flex flex-col h-full w-full max-w-full mx-auto">
<div className="flex justify-center items-center mb-2 gap-4 relative">
<button type="button" onClick={prevMonth} className="p-1 border rounded hover:bg-gray-100 absolute left-0" aria-label="이전 달" style={{borderWidth:BORDER_WIDTH}}><ChevronLeft size={18}/></button>
<div className="text-lg font-semibold select-none flex items-center space-x-4">
<span className="text-2xl font-bold text-gray-900">{currentDate.getFullYear()}년 {getKoreanMonth(currentDate.getMonth())}</span>
<button type="button" onClick={todayClick} className="text-[12px] font-semibold px-3 rounded-full border" style={{color:MAIN_COLOR,borderColor:MAIN_COLOR,backgroundColor:"white",borderWidth:BORDER_WIDTH}} aria-label="오늘로 이동">오늘</button>
</div>
<button type="button" onClick={nextMonth} className="p-1 border rounded hover:bg-gray-100 absolute right-0" aria-label="다음 달" style={{borderWidth:BORDER_WIDTH}}><ChevronRight size={18}/></button>
</div>

<div className="grid grid-cols-7 text-center text-[#161616]" style={{borderTop:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderLeft:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderRight:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderBottom:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderCollapse:"collapse",fontSize:"0.9375rem"}}>
{weekDays.map((day,i)=>(
<div key={day} className="py-1 font-semibold" style={{borderRight:i===6?"none":`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,userSelect:"none"}}>
<span className={`${day==="일"?"text-red-600":""} ${day==="토"?"text-blue-900":""}`}>{day}</span>
</div>
))}
</div>

<div className="grid grid-cols-7" style={{borderLeft:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderRight:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderBottom:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderCollapse:"collapse"}}>
{days.map((day,i)=>{
const singleEvents=getEventsForDate(day).filter(e=>!e.endDate)
const periodEvents=getEventsForDate(day).filter(e=>e.endDate)
const dayOfWeek=day.getDay()
const isTodayFlag=isToday(day)
const isCurMonth=isCurrentMonth(day)
const isLastCol=(i+1)%7===0
return(
<div key={i} className={`h-[66px] flex flex-col p-2 overflow-hidden ${!isCurMonth?"bg-[#F8F8F8] text-gray-400":"bg-white"}`} style={{borderTop:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,borderRight:isLastCol?undefined:`${BORDER_WIDTH}px solid ${BORDER_COLOR}`,boxSizing:"border-box"}} title={[...singleEvents,...periodEvents].map(e=>e.title).join(", ")}>
<div className={`font-bold truncate max-w-full ${!isCurMonth?"text-gray-400":isTodayFlag?"text-blue-600 bg-blue-100 inline-flex items-center justify-center":dayOfWeek===0?"text-red-600":dayOfWeek===6?"text-blue-900":"text-[#161616]"}`} style={{fontSize:"1rem",width:isTodayFlag?30:undefined,height:isTodayFlag?29:undefined,borderRadius:isTodayFlag?"50%":undefined,padding:isTodayFlag?"3px":undefined,minWidth:isTodayFlag?29:undefined,textAlign:isTodayFlag?"center":undefined}}>{day.getDate()}</div>
<div className="flex flex-col gap-[2px] overflow-hidden" style={{lineHeight:"1rem",maxHeight:"3rem"}}>
{singleEvents.slice(0,2).map(event=>(
<div key={event.id} className="leading-tight truncate flex items-center" title={event.title+(event.time?` (${event.time})`:"")} style={{whiteSpace:"nowrap",color:"#333333",fontSize:"11px"}}>
<span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",backgroundColor:event.title.includes("점검")?"#031E36":event.title.includes("교육")?"#3D9EFF":"#FF3300",marginRight:4,flexShrink:0}}/>{event.title}
</div>
))}
{periodEvents.slice(0,2).map(event=>(
<div key={`period-dot-${event.id}-${day.toISOString().slice(0,10)}`} className="leading-tight truncate flex items-center" title={`${event.title} (기간: ${event.startDate} ~ ${event.endDate})`} style={{whiteSpace:"nowrap",color:"#333333",fontSize:"11px"}}>
<span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",backgroundColor:"#3D9EFF",marginRight:4,flexShrink:0}}/>{event.title}
</div>
))}
</div>
</div>
)})}
</div>
</div>
)}

export default DashboardCalendar