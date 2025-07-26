// src/components/common/PageTitle.tsx
import React from "react"

interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = "" }) => (
  <h2 className={`text-[1.25rem] sm:text-[1.5rem] font-bold text-[#333639] mb-2 sm:mb-3 ${className}`}>
    {children}
  </h2>
)

export default PageTitle