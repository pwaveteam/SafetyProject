import React, { useState, useEffect } from "react"

export interface EditableTextAreaProps {
value: string
onChange: (val: string) => void
placeholder?: string
className?: string
maxLength?: number
disabled?: boolean
rows?: number
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({
value,
onChange,
placeholder = "",
className = "",
maxLength = 100,
disabled = false,
rows = 1,
}) => {
const [textValue, setTextValue] = useState(value)

useEffect(() => {
setTextValue(value)
}, [value])

const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
let val = e.target.value
if (val.length > maxLength) val = val.slice(0, maxLength)
setTextValue(val)
onChange(val)
}

return (
<div className="w-full pt-[5px]">
<textarea
value={textValue}
onChange={handleChange}
placeholder={placeholder}
disabled={disabled}
rows={rows}
className={`
w-[100%] px-2 py-2 rounded-lg border border-[#A0B3C9]
text-[11px] md:text-[13px] font-sans text-left outline-none resize-y
${disabled ? "bg-[#f3f3f3] cursor-not-allowed" : "bg-white"}
appearance-none
${className}
`}
/>
</div>
)
}

export default EditableTextArea