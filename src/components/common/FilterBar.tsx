import React from "react"
import Button from "@/components/common/Button"
import { ChevronDown, Search } from "lucide-react"

interface FilterBarProps {
startDate: string; endDate: string; onStartDate: (date: string) => void; onEndDate: (date: string) => void; supervisor?: string; onSupervisor?: (value: string) => void; keyword?: string; onKeywordChange?: (value: string) => void; searchText?: string; onSearchText?: (value: string) => void; educationTarget?: string; onEducationTargetChange?: (value: string) => void; educationMethod?: string; onEducationMethodChange?: (value: string) => void; onSearch: () => void
}

const LABEL_CLASS = "text-sm font-medium text-[#333639] mr-2 whitespace-nowrap"
const INPUT_CLASS = "h-[36px] border border-[#AAAAAA] rounded-[8px] px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#B9D0F6] text-sm font-normal text-[#333639] placeholder:text-[#AAAAAA]"

const FilterBar: React.FC<FilterBarProps> = ({ startDate, endDate, onStartDate, onEndDate, supervisor, onSupervisor, keyword, onKeywordChange, searchText, onSearchText, educationTarget, onEducationTargetChange, educationMethod, onEducationMethodChange, onSearch }) => {
const targetOptions = [{ value: "", label: "-전체-" }, { value: "근로자", label: "근로자" }, { value: "안전관리자", label: "안전관리자" }, { value: "감독자", label: "감독자" }, { value: "관리자", label: "관리자" }]
const methodOptions = [{ value: "", label: "-전체-" }, { value: "집체교육", label: "집체교육" }, { value: "온라인교육", label: "온라인교육" }, { value: "현장교육", label: "현장교육" }, { value: "자체교육", label: "자체교육" }, { value: "외부전문가교육", label: "외부전문가교육" }]

return (
<section className="tbm-filter w-full flex flex-wrap items-center gap-3 px-3 py-3 mb-3 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[10px]">
<div className="flex flex-wrap items-center gap-3 flex-grow min-w-0">
<div className="flex items-center flex-shrink-0 w-full sm:w-auto min-w-[280px]">
<span className={LABEL_CLASS}>기간 선택</span>
<input type="date" className={`${INPUT_CLASS} w-[130px]`} value={startDate} onChange={e => onStartDate(e.target.value)} />
<span className="text-sm font-normal text-[#333639] mx-2 select-none">~</span>
<input type="date" className={`${INPUT_CLASS} w-[130px]`} value={endDate} onChange={e => onEndDate(e.target.value)} />
</div>

{educationTarget !== undefined && educationMethod !== undefined && onEducationTargetChange && onEducationMethodChange ? (
<div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
<div className="relative flex items-center min-w-[160px]">
<span className={LABEL_CLASS}>교육대상</span>
<select className={`${INPUT_CLASS} w-full appearance-none pr-8`} value={educationTarget} onChange={e => onEducationTargetChange(e.target.value)}>
{targetOptions.map(opt => (<option key={opt.value} value={opt.value} className="text-sm font-normal text-[#333639]">{opt.label}</option>))}
</select>
<ChevronDown className="absolute right-2 pointer-events-none text-gray-500" />
</div>
<div className="relative flex items-center min-w-[160px]">
<span className={LABEL_CLASS}>교육방식</span>
<select className={`${INPUT_CLASS} w-full appearance-none pr-8`} value={educationMethod} onChange={e => onEducationMethodChange(e.target.value)}>
{methodOptions.map(opt => (<option key={opt.value} value={opt.value} className="text-sm font-normal text-[#333639]">{opt.label}</option>))}
</select>
<ChevronDown className="absolute right-2 pointer-events-none text-gray-500" />
</div>
</div>
) : (
<>
{educationTarget !== undefined && onEducationTargetChange && (
<div className="relative flex items-center flex-shrink-0 w-full sm:w-auto min-w-[160px]">
<span className={LABEL_CLASS}>교육대상</span>
<select className={`${INPUT_CLASS} w-full sm:w-[160px] appearance-none pr-8`} value={educationTarget} onChange={e => onEducationTargetChange(e.target.value)}>
{targetOptions.map(opt => (<option key={opt.value} value={opt.value} className="text-sm font-normal text-[#333639]">{opt.label}</option>))}
</select>
<ChevronDown className="absolute right-2 pointer-events-none text-gray-500" />
</div>
)}
{educationMethod !== undefined && onEducationMethodChange && (
<div className="relative flex items-center flex-shrink-0 w-full sm:w-auto min-w-[160px]">
<span className={LABEL_CLASS}>교육방식</span>
<select className={`${INPUT_CLASS} w-full sm:w-[160px] appearance-none pr-8`} value={educationMethod} onChange={e => onEducationMethodChange(e.target.value)}>
{methodOptions.map(opt => (<option key={opt.value} value={opt.value} className="text-sm font-normal text-[#333639]">{opt.label}</option>))}
</select>
<ChevronDown className="absolute right-2 pointer-events-none text-gray-500" />
</div>
)}
</>
)}

{supervisor !== undefined && onSupervisor && (
<div className="relative flex items-center flex-shrink-0 w-full sm:w-auto min-w-[160px]">
<span className={LABEL_CLASS}>실시자</span>
<select className={`${INPUT_CLASS} w-full sm:w-[160px] appearance-none pr-8`} value={supervisor} onChange={e => onSupervisor(e.target.value)}>
<option value="" className="text-sm font-normal text-[#333639]">-전체-</option>
<option value="이동현" className="text-sm font-normal text-[#333639]">이동현</option>
</select>
<ChevronDown className="absolute right-2 pointer-events-none text-gray-500" />
</div>
)}

{(keyword !== undefined && onKeywordChange) || (searchText !== undefined && onSearchText) ? (
<div className="relative flex items-center flex-shrink-0 w-full sm:w-auto min-w-[280px]">
<span className={LABEL_CLASS}>검색</span>
<input type="text" className={`${INPUT_CLASS} w-full sm:w-[280px] pr-10`} placeholder="검색어 입력" value={keyword ?? searchText ?? ""} onChange={e => { if (onKeywordChange) onKeywordChange(e.target.value); else if (onSearchText) onSearchText(e.target.value) }} />
<Search className="absolute right-2 pointer-events-none text-gray-500" />
</div>
) : null}
</div>

<div className="w-full sm:w-auto flex justify-end">
<Button variant="secondary" className="flex-shrink-0" onClick={onSearch} style={{ height: 36, minWidth: 80, fontSize: "0.875rem" }}>검색</Button>
</div>
</section>
)}

export default FilterBar