import React, { useState, useEffect } from "react"

export interface EditableCellProps {
value: string
onChange: (val: string) => void
placeholder?: string
className?: string
maxLength?: number
disabled?: boolean
}

const EditableCell: React.FC<EditableCellProps> = ({
value,
onChange,
placeholder = "",
className = "",
maxLength = 30,
disabled = false,
}) => {
const [inputValue, setInputValue] = useState(value)

useEffect(() => {
setInputValue(value)
}, [value])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
let val = e.target.value
if (val.length > maxLength) val = val.slice(0, maxLength)
setInputValue(val)
onChange(val)
}

return (
<div className="w-full pt-[5px] pb-[5px]">
<input
type="text"
value={inputValue}
onChange={handleChange}
placeholder={placeholder}
disabled={disabled}
className={`
w-[100%] h-[39px] px-2 py-1 rounded-lg border border-[#A0B3C9]
text-[12px] md:text-[13px] font-sans text-left outline-none
${disabled ? "bg-[#f3f3f3] cursor-not-allowed" : "bg-white"}
appearance-none
${className}
`}
/>
</div>
)
}

export default EditableCell