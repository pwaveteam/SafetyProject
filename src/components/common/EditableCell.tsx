import React, { useState, useEffect } from "react"

export interface EditableCellProps {
value: string; onChange: (val: string) => void; placeholder?: string; className?: string; maxLength?: number; disabled?: boolean
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

useEffect(() => { setInputValue(value) }, [value])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
let val = e.target.value
if (val.length > maxLength) val = val.slice(0, maxLength)
setInputValue(val)
onChange(val)
}

return (
<div style={{ width: "100%", paddingTop: 5, paddingBottom: 5 }}>
<input
type="text"
value={inputValue}
onChange={handleChange}
placeholder={placeholder}
style={{
width: "96%",
height: 39,
padding: "8px",
fontFamily: "inherit",
borderRadius: 8,
border: "1px solid #A0B3C9",
fontSize: "0.875rem",
outline: "none",
boxSizing: "border-box",
backgroundColor: disabled ? "#f3f3f3" : "white",
cursor: disabled ? "not-allowed" : "auto",
textAlign: "left"
}}
className={className}
disabled={disabled}
/>
</div>
)
}

export default EditableCell