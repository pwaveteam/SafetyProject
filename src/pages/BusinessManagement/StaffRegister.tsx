import React,{useState} from "react"
import Button from "@/components/common/Button"
import FormScreen,{Field} from "@/components/common/FormScreen"

type Staff={name:string,safetyPosition:string,department:string,position:string,phone:string,entryDate:string,assignDate:string}

type StaffRegisterModalProps={isOpen:boolean,onClose:()=>void,onSave:(staff:Staff)=>void}

const safetyPositionOptions=[
{value:"해당없음",label:"해당없음"},
{value:"안전보건관리책임자",label:"안전보건관리책임자"},
{value:"안전관리자",label:"안전관리자"},
{value:"보건관리자",label:"보건관리자"},
{value:"관리감독자",label:"관리감독자"},
{value:"경영책임자",label:"경영책임자"},
]

export default function StaffRegisterModal({isOpen,onClose,onSave}:StaffRegisterModalProps){
const [formData,setFormData]=useState<Staff>({
name:"",safetyPosition:"",department:"",position:"",phone:"",entryDate:"",assignDate:"",
})

const fields:Field[]=[
{label:"이름",name:"name",type:"text",placeholder:"이름 입력",required:true},
{label:"안전직위",name:"safetyPosition",type:"select",options:safetyPositionOptions,required:true},
{label:"부서",name:"department",type:"text",placeholder:"부서 입력",required:false},
{label:"직급",name:"position",type:"text",placeholder:"직급 입력",required:false},
{label:"연락처",name:"phone",type:"phone",placeholder:"연락처 입력",required:true},
{label:"입사일",name:"entryDate",type:"date",required:true},
{label:"안전직위 지정일",name:"assignDate",type:"date",required:false},
]

const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
const {name,value}=e.target
setFormData(prev=>({...prev,[name]:value}))
}

if(!isOpen)return null

return(
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white rounded-2xl w-[800px] max-w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto transform transition duration-300 ease-in-out scale-100 opacity-100">
<h2 className="text-2xl font-semibold tracking-wide mb-3">인력 추가</h2>
<FormScreen fields={fields} values={formData} onChange={handleChange} isModal={true}/>
<div className="mt-6 flex justify-center gap-1">
<Button variant="clear" onClick={onClose}>닫기</Button>
<Button variant="primary" onClick={()=>onSave(formData)}>저장하기</Button>
</div>
</div>
</div>
)}