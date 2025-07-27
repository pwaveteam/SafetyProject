import React from "react"

interface DatePickerProps {
value: string; onChange: (date: string) => void; placeholder?: string
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder }) => {
return (
<input
type="date"
value={value}
onChange={e => onChange(e.target.value)}
placeholder={placeholder}
style={{
border: "1px solid #A0B3C9",
borderRadius: 8,
padding: "6px 10px",
width: "139px",
fontSize: "15px"
}}
/>
)
}

export default DatePicker