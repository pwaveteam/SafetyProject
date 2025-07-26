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
rows = 3,
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

const containerStyle: React.CSSProperties = {
width: "100%",
paddingTop: 5,
}

const textareaStyle: React.CSSProperties = {
width: "96%",
height: rows * 24,
padding: "8px",
fontFamily: "inherit",
borderRadius: 8,
border: "1px solid #A0B3C9",
fontSize: "0.875rem",
outline: "none",
boxSizing: "border-box",
backgroundColor: disabled ? "#f3f3f3" : "white",
cursor: disabled ? "not-allowed" : "auto",
resize: "vertical",
textAlign: "left",
}

return (
<div style={containerStyle}>
<textarea
value={textValue}
onChange={handleChange}
placeholder={placeholder}
style={textareaStyle}
className={className}
disabled={disabled}
rows={1}
/>
</div>
)
}

export default EditableTextArea