import React, { useState } from "react"
import { List, Edit2, Settings } from "lucide-react"

type StepBarProps = {
currentStep: number
setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const steps = [
{ label: "공종 및 위험요인 선택", icon: List },
{ label: "위험성평가 및 대책수립", icon: Edit2 },
{ label: "실행 및 개선관리", icon: Settings },
]

const StepBar: React.FC<StepBarProps> = ({ currentStep, setCurrentStep }) => {
return (
<div className="flex items-center justify-center bg-white p-4 mb-6" style={{ border: "1px solid #DDDDDD", borderRadius: 13, height: 66 }}>
{steps.map((step, idx) => {
const isActive = idx === currentStep
const IconComponent = step.icon
return (
<React.Fragment key={idx}>
<div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentStep(idx)}>
<div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors duration-300 ${isActive ? "bg-[#FF3300] text-white" : "bg-gray-200 text-gray-400"}`}>
<IconComponent size={20} />
</div>
<div className="flex flex-col">
<span className={`text-xs font-normal ${isActive ? "text-gray-900" : "text-gray-400"}`}>Step {idx + 1}</span>
<span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-400"}`}>{step.label}</span>
</div>
</div>
{idx !== steps.length - 1 && (
<div className="flex items-center px-5">
<div className="w-6 border-t" style={{ borderTopWidth: "1px", borderColor: "#DDDDDD" }} />
</div>
)}
</React.Fragment>
)
})}
</div>
)
}

export default StepBar