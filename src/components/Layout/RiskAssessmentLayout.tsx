import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import RiskSidebar from "../Sidebar/RiskSidebar"
import Breadcrumb from "../common/Breadcrumb"

const styles = {
mainBase: "flex-1 flex flex-col bg-[#F8F8F8] box-border overflow-auto",
contentWrapper: "bg-white rounded-[12px] p-8 box-border flex-1 max-w-[95vw] w-full mx-auto shadow-[0_0_10px_rgba(0,0,0,0.05)] overflow-y-auto",
}

const RiskAssessmentLayout: React.FC = () => {
const [isOpen, setIsOpen] = useState(false)

return (
<div className="flex min-h-screen">
<RiskSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
<main className={styles.mainBase} style={{ position: "relative", paddingLeft: 16, paddingRight: 16, paddingBottom: 0 }}>
<div className="pt-8 px-0 md:px-8 main-layout-content">
<Breadcrumb />
<div className={styles.contentWrapper}>
<Outlet />
</div>
</div>
<style>{`
@media (max-width: 767px) {
.main-layout-content {
padding-top: calc(2rem + 48px) !important;
}
}`}</style>
</main>
</div>
)
}

export default RiskAssessmentLayout