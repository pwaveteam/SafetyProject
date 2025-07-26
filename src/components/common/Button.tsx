import React from "react"

const baseButton =
"rounded-[9px] transition-opacity duration-300 ease-in-out flex items-center justify-center select-none whitespace-nowrap text-sm font-medium h-[33px] text-xs md:h-[39px] md:text-sm"

type ButtonVariant =
| "primary"
| "secondary"
| "clear"
| "action"
| "rowAdd"
| "step"
| "delete"
| "docs"
| "minor"
| "circle"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
children?: React.ReactNode
variant?: ButtonVariant
className?: string
icon?: React.ReactNode
onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
children,
variant = "primary",
className = "",
icon,
onClick,
...props
}) => {
let styleClass = ""

switch (variant) {
case "primary":
styleClass =
"bg-[#031E36] text-white border-none px-[30px]"
break
case "clear":
styleClass =
"bg-white text-[#031E36] border border-[#031E36] px-[30px]"
break
case "secondary":
styleClass =
"bg-[#1F5B9E] text-white border-none px-[9px] md:px-[15px]"
break
case "action":
styleClass =
"bg-[#EEF5FF] text-[#1E3C6B] border border-[#ADC0D6] px-[9px] md:px-[15px]"
break
case "rowAdd":
styleClass =
"bg-white text-[#666666] border border-[#888888] px-[9px] md:px-[15px]"
break
case "step":
styleClass =
"bg-[#3B5BA0] text-white border-none px-[9px] md:px-[15px]"
break
case "delete":
styleClass =
"bg-[#EEF5FF] text-[#1E3C6B] border border-[#ADC0D6] px-[9px] md:px-[15px]"
break
case "docs":
styleClass =
"bg-white text-[#1F5B9E] border border-[#1F5B9E] px-[9px] md:px-[15px]"
break
case "minor":
styleClass =
"bg-[#869CAE] text-white border-none px-[9px] md:px-[15px]"
break
case "circle":
styleClass =
"bg-[#F6F6F6] text-[#666666] border border-[#E5E5E5] rounded-full px-[9px] md:px-[15px]"
break
default:
styleClass =
"bg-[#031E36] text-white border-none px-[9px] md:px-[15px]"
}

return (
<button
type={props.type || "button"}
className={`${baseButton} ${styleClass} ${className} gap-1 hover:opacity-80`}
onClick={onClick}
{...props}
>
{children || defaultTextByVariant[variant]}
{icon && <span className="flex items-center">{icon}</span>}
</button>
)
}

const defaultTextByVariant: Record<ButtonVariant, React.ReactNode> = {
primary: null,
secondary: null,
clear: null,
action: null,
rowAdd: "+ 새항목 추가",
step: null,
delete: "삭제",
docs: null,
minor: null,
circle: null,
}

export default Button