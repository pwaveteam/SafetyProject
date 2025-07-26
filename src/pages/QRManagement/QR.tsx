import React from "react"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import PageTitle from "@/components/common/PageTitle"
import { DownloadIcon } from "lucide-react"
import sampleQR from "@/assets/QRImages/sample-qr.jpg"
import ToggleSwitch from "@/components/common/ToggleSwitch"

const columns: Column[] = [
{ key: "qrName", label: "QR항목", minWidth: "200px" },
{ key: "link", label: "간편 연결", minWidth: "300px" },
{ key: "qrCode", label: "QR코드", minWidth: "80px" },
{ key: "imgDownload", label: "이미지 저장", minWidth: "80px" },
{ key: "useStatus", label: "사용여부", minWidth: "80px" }
]

export default function QRManagement() {
const items = [
{ id: 1, qrName: "근로자 앱 설치 QR", link: "안드로이드/iOS 다운로드 링크" },
{ id: 2, qrName: "관리자 페이지 접속 QR", link: "관리자용 웹페이지 링크" },
{ id: 3, qrName: "종사자 의견청취 QR", link: "설문/건의 등 의견 수렴 폼 링크" },
{ id: 4, qrName: "관리자 사용 가이드 QR", link: "관리자용 사용 설명서" },
{ id: 5, qrName: "근로자 앱 사용 가이드 QR", link: "근로자용 사용법 안내" }
]

const [toggleStates, setToggleStates] = React.useState<{[key:number]:boolean}>({
1:true,2:true,3:true,4:true,5:true
})

const handleToggleChange = (id:number, checked:boolean) => {
setToggleStates(prev => ({...prev,[id]:checked}))
}

const handleDownload = (id:number) => {
alert(`다운로드 시작: QR ${id}`)
}

const data: DataRow[] = items.map(({id, qrName, link}) => ({
id,
qrName,
link: <span className="text-[#999999]">{link}</span>,
qrCode: (
<img
src={sampleQR}
alt={qrName}
className="object-contain mx-auto"
style={{ width: "64px", height: "64px" }}
/>
),
imgDownload: (
<span className="flex justify-center items-center">
<DownloadIcon
size={20}
aria-label="QR 이미지 다운로드"
role="button"
tabIndex={0}
className="cursor-pointer"
onClick={()=>handleDownload(id)}
onKeyDown={e=>{ if(e.key==="Enter"||e.key===" ") handleDownload(id) }}
/>
</span>
),
useStatus: (
<ToggleSwitch
checked={toggleStates[id]}
onChange={checked=>handleToggleChange(id,checked)}
/>
)
}))

return (
<section className="qr-management-content w-full bg-white">
<PageTitle>QR관리</PageTitle>
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {data.length}건</span>
</div>
<div className="overflow-x-auto bg-white mt-4">
<style>{`
.qr-management-content table tbody tr > td {
height: 80px;
}
`}</style>
<DataTable columns={columns} data={data} onCheckedChange={() => {}} />
</div>
</section>
)
}