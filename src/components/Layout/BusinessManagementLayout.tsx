// 사업장관리
import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import BusinessSidebar from "../Sidebar/BusinessSidebar"
import Breadcrumb from "../common/Breadcrumb"

const BusinessManagementLayout: React.FC = () => {
const [isOpen, setIsOpen] = useState(false)

return (
<div className="flex min-h-screen">
<BusinessSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
<main className="flex-1 flex flex-col bg-[#F8F8F8] box-border overflow-auto" style={{ position: "relative", paddingLeft: "2rem", paddingRight: "2rem", paddingBottom: "0" }}>
<div className="pt-8 px-0 md:px-8 main-layout-content">
<Breadcrumb />
<div className="bg-white rounded-[12px] p-8 box-border flex-1 max-w-[96vw] w-full mx-auto shadow-[0_0_3px_rgba(0,0,0,0.01)] overflow-y-auto" style={{ marginTop: 0 }}>
<Outlet />
</div>
</div>
</main>
<style>{`
@media (max-width: 767px) {
.main-layout-content {
padding-top: calc(2rem + 48px) !important;
}
}`}</style>
</div>
)
}

export default BusinessManagementLayout