import React, { useState } from "react"
import Button from "@/components/common/Button"
import FilterBar from "@/components/common/FilterBar"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import PageTitle from "@/components/common/PageTitle"
import NoticeRegister from "./ResponseManualRegister"
import { DownloadIcon, CirclePlus, Printer, Trash2 } from "lucide-react"
import TabMenu from "@/components/common/TabMenu"

const columns: Column[] = [
{ key: "id", label: "번호", minWidth: "50px" },
{ key: "title", label: "제목", minWidth: "300px", align: "left" },
{ key: "author", label: "작성자", minWidth: "120px" },
{ key: "date", label: "작성일", minWidth: "120px" },
{ key: "views", label: "조회수", minWidth: "90px" },
{ key: "attachment", label: "첨부파일", minWidth: "90px" },
{ key: "manage", label: "관리", minWidth: 110, renderCell: (row) => (<button style={{ background: "none", border: "none", padding: 0, color: "#999999", cursor: "pointer", width: 110, textAlign: "center" }} onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")} onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>자세히보기/편집</button>) }
]

const initialData: DataRow[] = [
{ id: 3, title: "(산업안전) 2025년 산업안전보건법령의 요지", author: "김작성", date: "2025-05-30", views: 25, attachment: (<span className="flex justify-center items-center"><DownloadIcon size={19} aria-label="첨부파일 다운로드" role="button" tabIndex={0} className="cursor-pointer" /></span>) },
{ id: 2, title: "(중대재해) 중대산업재해 등 사고 발생 대비·대응 매뉴얼(2025)", author: "김작성", date: "2025-05-30", views: 234, attachment: (<span className="flex justify-center items-center"><DownloadIcon size={19} aria-label="첨부파일 다운로드" role="button" tabIndex={0} className="cursor-pointer" /></span>) },
{ id: 1, title: "(산업안전) 2025년 산업안전보건법령의 요지", author: "김작성", date: "2025-05-30", views: 860, attachment: (<span className="flex justify-center items-center"><DownloadIcon size={19} aria-label="첨부파일 다운로드" role="button" tabIndex={0} className="cursor-pointer" /></span>) }
]

export default function ResponseManual() {
const [data, setData] = useState<DataRow[]>(initialData)
const [searchText, setSearchText] = useState("")
const [startDate, setStartDate] = useState("")
const [endDate, setEndDate] = useState("")
const [checkedIds, setCheckedIds] = useState<(number | string)[]>([])
const [modalOpen, setModalOpen] = useState(false)
const userName = "김작성"

const handleSearch = () => {}
const handlePrint = () => window.print()
const handleDelete = () => {
if (checkedIds.length === 0) { alert("삭제할 항목을 선택하세요"); return }
if (window.confirm("정말 삭제하시겠습니까?")) {
setData(prev => prev.filter(row => !checkedIds.includes(row.id)))
setCheckedIds([])
}
}

const handleSave = (newItem: any) => {
const newId = data.length > 0 ? Math.max(...data.map(d => Number(d.id))) + 1 : 1
const newData: DataRow = {
id: newId,
title: newItem.title,
author: newItem.author,
date: newItem.date,
views: 0,
attachment: newItem.attachment ? (<span className="flex justify-center items-center"><DownloadIcon size={19} aria-label="첨부파일 다운로드" role="button" tabIndex={0} className="cursor-pointer" /></span>) : ""
}
setData(prev => [newData, ...prev])
setModalOpen(false)
}

return (
<section className="response-manual w-full">
<PageTitle>대응매뉴얼</PageTitle>
<TabMenu tabs={["대응매뉴얼 목록"]} activeIndex={0} onTabClick={() => {}} className="mb-6" />
<FilterBar startDate={startDate} endDate={endDate} onStartDate={setStartDate} onEndDate={setEndDate} keyword={searchText} onKeywordChange={setSearchText} onSearch={handleSearch} />
<div className="flex justify-between items-center mb-3">
<span className="text-gray-600 text-sm">총 {data.length}건</span>
<div className="flex justify-end gap-1">
<Button variant="action" onClick={() => setModalOpen(true)} className="flex items-center gap-1"><CirclePlus size={16} />신규등록</Button>
<Button variant="action" onClick={handlePrint} className="flex items-center gap-1"><Printer size={16} />인쇄</Button>
<Button variant="action" onClick={handleDelete} className="flex items-center gap-1"><Trash2 size={16} />삭제</Button>
</div>
</div>
<div className="overflow-x-auto bg-white">
<DataTable columns={columns} data={data} onCheckedChange={setCheckedIds} />
</div>
{modalOpen && (<NoticeRegister isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} userName={userName} />)}
</section>
)
}