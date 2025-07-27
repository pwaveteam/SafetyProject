import React,{useState,useRef} from "react"
import FormScreen from "@/components/common/FormScreen"
import Button from "@/components/common/Button"
import PageTitle from "@/components/common/PageTitle"
import TabMenu from "@/components/common/TabMenu"
import YearPicker from "@/components/common/YearPicker"
import {Upload,Download,Printer,Trash2} from "lucide-react"
import {Document,Packer,Paragraph,TextRun} from "docx"
import {saveAs} from "file-saver"

type Field={label:string,name:string,type:"text"|"textarea"|"custom",placeholder?:string,style?:React.CSSProperties,customRender?:React.ReactNode}

const PolicyGoal:React.FC=()=>{
const [values,setValues]=useState<{[key:string]:string}>({
year:"2025",
goalTitle:"현장 위험요인 실시간 식별 및 제거",
content:"스마트 점검 앱을 활용해 일일 현장 점검 시 위험요인을 즉시 등록하고, 24시간 이내에 시정 조치를 완료하도록 하여 재발을 방지하며\n점검 이력과 개선 현황을 월간 리포트로 경영진에 보고합니다",
managerSignature:"",
})

const fileInputRef=useRef<HTMLInputElement|null>(null)

const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
const {name,value}=e.target
setValues(prev=>({...prev,[name]:value}))
}

const handleSave=()=>{alert("저장되었습니다.\n"+JSON.stringify(values,null,2))}

const handlePrint=()=>{window.print()}

const handleDelete=()=>{alert("삭제 버튼 클릭됨")}

const openFileDialog=()=>{fileInputRef.current?.click()}

const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
if(e.target.files&&e.target.files.length>0){
setValues(prev=>({...prev,managerSignature:e.target.files![0].name}))
alert(`파일 선택됨: ${e.target.files[0].name}`)
}
}

const downloadDocx=()=>{
const doc=new Document({
sections:[{children:[
new Paragraph({children:[new TextRun({text:`${values.year} 경영방침 양식`,bold:true,size:32})]}),
new Paragraph({text:""}),
new Paragraph({children:[new TextRun({text:`방침목표명: ${values.goalTitle}`,size:24})]}),
new Paragraph({children:[new TextRun({text:`내용:\n${values.content}`,size:24})]}),
]}]})
Packer.toBlob(doc).then(blob=>{saveAs(blob,"경영방침_양식.docx")})
}

const fields:Field[]=[
{label:"방침목표명",name:"goalTitle",type:"text",placeholder:"방침목표명을 입력하세요"},
{label:"내용",name:"content",type:"textarea",placeholder:"내용을 입력하세요",style:{minHeight:150}},
{label:"양식 내려받기",name:"managerSignature",type:"custom",customRender:(
<>
<Button variant="action" onClick={downloadDocx} style={{minWidth:120}} className="flex items-center gap-1">
<Download size={18}/>경영방침 양식
</Button>
<input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".hwp,.doc,.docx,.pdf"/>
</>
)},
{label:"경영방침 업로드",name:"managerSignature",type:"custom",customRender:(
<>
<Button variant="action" onClick={openFileDialog} style={{minWidth:120}} className="flex items-center gap-1">
<Upload size={18}/>경영방침 업로드
</Button>
<input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".hwp,.doc,.docx,.pdf"/>
</>
)},
]

return(
<section className="mypage-content w-full">
<section>
<PageTitle>경영방침</PageTitle>
<TabMenu tabs={["경영방침 목록"]} activeIndex={0} onTabClick={()=>{}} className="mb-6"/>
<div className="flex justify-between items-center mb-3">
<div>
<YearPicker year={values.year} onChange={year=>setValues(prev=>({...prev,year}))}/>
</div>
<div className="flex justify-end gap-1">
<Button variant="action" onClick={handlePrint} className="flex items-center gap-1">
<Printer size={16}/>인쇄
</Button>
<Button variant="action" onClick={handleDelete} className="flex items-center gap-1">
<Trash2 size={16}/>삭제
</Button>
</div>
</div>
<FormScreen fields={fields} values={values} onChange={handleChange} onClose={()=>{}} onSave={handleSave}/>
<div className="flex justify-end mt-3">
<Button variant="primary" onClick={handleSave}>저장하기</Button>
</div>
</section>
</section>
)}

export default PolicyGoal