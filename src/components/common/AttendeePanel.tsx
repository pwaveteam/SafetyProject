import React, { useState } from "react"
import Button from "@/components/common/Button"
import DataTable, { Column, DataRow } from "@/components/common/DataTable"
import { X, ChevronDown } from "lucide-react"
import LoadListDialogTBM from "./LoadListDialogTBM"
import LoadListDialogGroup from "./LoadListDialogGroup"

interface Attendee {
  name: string
  phone: string
}

interface Item {
  id: string | number
  registrationDate: string
  siteName: string
  tbmName: string
  attendeeCount: number
  attendeeList: string
}

interface DeptGroupItem {
  id: string | number
  departmentName: string
  groupLeader: string
  memberCount: number
  memberList: string
}

interface Props {
  attendees: Attendee[]
  onAdd: (att: Attendee) => void
  onRemove: (idx: number) => void
}

function PhoneInput({
  phonePrefix,
  phoneMiddle,
  phoneLast,
  onChangePrefix,
  onChangeMiddle,
  onChangeLast,
}: {
  phonePrefix: string
  phoneMiddle: string
  phoneLast: string
  onChangePrefix: (value: string) => void
  onChangeMiddle: (value: string) => void
  onChangeLast: (value: string) => void
}) {
  const BORDER_COLOR = "#AAAAAA"
  const COMMON_BORDER = `border border-[${BORDER_COLOR}] rounded-[8px]`
  const COMMON_PLACEHOLDER = "placeholder:font-normal placeholder:text-[#86939A]"
  const COMMON_TEXT = "text-[15px] font-medium"
  const BG_EDITABLE = "bg-white text-[#333639]"

  const BASE_INPUT = `${COMMON_BORDER} px-2 h-[39px] w-full appearance-none ${COMMON_PLACEHOLDER} ${COMMON_TEXT} ${BG_EDITABLE}`

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="basis-1/3 relative">
        <select
          name="phonePrefix"
          value={phonePrefix}
          onChange={e => onChangePrefix(e.target.value)}
          className={`${BASE_INPUT} pr-8`}
        >
          <option value="010">010</option>
          <option value="070">070</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
      </div>
      <span className="text-[15px] text-[#333639]">-</span>
      <input
        type="text"
        name="phoneMiddle"
        value={phoneMiddle}
        onChange={e => onChangeMiddle(e.target.value)}
        maxLength={4}
        className={`${BASE_INPUT} basis-1/3`}
        onKeyDown={e => {
          if (
            !/[0-9]/.test(e.key) &&
            !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key)
          ) {
            e.preventDefault()
          }
        }}
      />
      <span className="text-[15px] text-[#333639]">-</span>
      <input
        type="text"
        name="phoneLast"
        value={phoneLast}
        onChange={e => onChangeLast(e.target.value)}
        maxLength={4}
        className={`${BASE_INPUT} basis-1/3`}
        onKeyDown={e => {
          if (
            !/[0-9]/.test(e.key) &&
            !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key)
          ) {
            e.preventDefault()
          }
        }}
      />
    </div>
  )
}

export default function AttendeePanel({ attendees, onAdd, onRemove }: Props) {
  const BORDER_COLOR = "#AAAAAA"
  const COMMON_BORDER = `border border-[${BORDER_COLOR}] rounded-[8px]`
  const COMMON_PLACEHOLDER = "placeholder:font-normal placeholder:text-[#86939A]"
  const COMMON_TEXT = "text-[15px] font-medium"
  const BG_EDITABLE = "bg-white text-[#333639]"
  const BASE_INPUT = `${COMMON_BORDER} px-2 h-[39px] w-full appearance-none ${COMMON_PLACEHOLDER} ${COMMON_TEXT} ${BG_EDITABLE}`

  const [name, setName] = useState("")
  const [phonePrefix, setPhonePrefix] = useState("010")
  const [phoneMiddle, setPhoneMiddle] = useState("")
  const [phoneLast, setPhoneLast] = useState("")

  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false)
  const [loadItems, setLoadItems] = useState<Item[]>([])

  const [isDeptGroupDialogOpen, setIsDeptGroupDialogOpen] = useState(false)
  const [deptGroupItems, setDeptGroupItems] = useState<DeptGroupItem[]>([
    {
      id: 1,
      departmentName: "안전관리팀",
      groupLeader: "최영희",
      memberCount: 4,
      memberList: "김철수, 박철수, 이영희, 정민수",
    },
    {
      id: 2,
      departmentName: "품질관리팀",
      groupLeader: "박철수",
      memberCount: 5,
      memberList: "최영희, 김민수, 이정희, 강철수, 송민호",
    },
    {
      id: 3,
      departmentName: "공정관리팀",
      groupLeader: "이민호",
      memberCount: 3,
      memberList: "박철수, 김영희, 최민수",
    },
    {
      id: 4,
      departmentName: "설비관리팀",
      groupLeader: "김영희",
      memberCount: 5,
      memberList: "이민호, 정철수, 박민호, 김영희, 최영희",
    },
  ])

  const columns: Column[] = [
    { key: "id", label: "No", minWidth: 50, renderCell: (_, __, idx) => idx + 1 },
    { key: "name", label: "이름", minWidth: 100 },
    { key: "phone", label: "휴대폰", minWidth: 120 },
    {
      key: "action",
      label: "삭제",
      minWidth: 60,
      renderCell: (_, __, idx) => (
        <button onClick={() => onRemove(idx)}>
          <X size={16} />
        </button>
      ),
    },
  ]

  const data: DataRow[] = attendees.map((att, idx) => ({
    id: idx,
    name: att.name,
    phone: att.phone,
  }))

  const handleAdd = () => {
    const fullPhone = `${phonePrefix}-${phoneMiddle}-${phoneLast}`
    if (!name.trim()) {
      alert("이름을 입력해주세요")
      return
    }
    if (!phoneMiddle.trim() || !phoneLast.trim()) {
      alert("전화번호를 정확히 입력해주세요")
      return
    }
    onAdd({ name, phone: fullPhone })
    setName("")
    setPhonePrefix("010")
    setPhoneMiddle("")
    setPhoneLast("")
  }

  const exampleLoadItems: Item[] = [
    {
      id: 1,
      registrationDate: "2025-07-20",
      siteName: "서울시 공사현장 A",
      tbmName: "TBM-01",
      attendeeCount: 6,
      attendeeList: "홍길동, 이안전, 김근로, 최근로, 박안전, 최안전",
    },
    {
      id: 2,
      registrationDate: "2025-07-18",
      siteName: "부산항 재개발 현장",
      tbmName: "TBM-02",
      attendeeCount: 5,
      attendeeList: "홍길동, 김근로, 박안전, 최안전, 최근로",
    },
    {
      id: 3,
      registrationDate: "2025-07-15",
      siteName: "대전 신도시 조성 현장",
      tbmName: "TBM-03",
      attendeeCount: 6,
      attendeeList: "이안전, 김근로, 최근로, 박안전, 최안전, 홍길동",
    },
  ]

  const openLoadDialog = () => {
    setLoadItems(exampleLoadItems)
    setIsLoadDialogOpen(true)
  }

  const openDeptGroupDialog = () => {
    setIsDeptGroupDialogOpen(true)
  }

  const onSelectLoadItem = (selected: string | number | null) => {
    if (selected !== null) {
      alert(`선택된 TBM 내역 ID: ${selected}`)
    }
  }

  const onSelectDeptGroupItem = (selected: string | number | null) => {
    if (selected !== null) {
      alert(`선택된 부서 그룹 ID: ${selected}`)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <section
        className="flex-grow overflow-y-auto mb-8 border border-[#F3F3F3] rounded-[16px] p-3 min-h-[300px]"
      >
        <DataTable columns={columns} data={data} selectable={false} />
        {data.length === 0 && (
          <div className="w-full text-center text-gray-500 mt-10 whitespace-pre-line text-sm leading-relaxed select-none">
            참석자 등록을 하지 않아도 됩니다.
            {"\n"}
            저장 시 생성된 QR코드로 근로자가 모바일 서명을 하면 자동 등록됩니다.
          </div>
        )}
      </section>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[#333639] font-semibold text-lg">참석자 등록하기</h3>
          <div className="flex space-x-2">
            <Button variant="action" onClick={openLoadDialog}>이전 내역 불러오기</Button>
            <Button variant="action" onClick={openDeptGroupDialog}>부서별 불러오기</Button>
          </div>
        </div>

        <section
          className="border border-[#F3F3F3] rounded-[16px] p-4 min-h-[180px]"
        >
          <div className="flex mb-4 gap-3">
            <div className="flex flex-col flex-1 gap-2">
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                className={BASE_INPUT}
                onKeyDown={e => {
                  if (
                    !/[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(e.key) &&
                    !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key)
                  ) {
                    e.preventDefault()
                  }
                }}
                onPaste={e => e.preventDefault()}
              />
              <PhoneInput
                phonePrefix={phonePrefix}
                phoneMiddle={phoneMiddle}
                phoneLast={phoneLast}
                onChangePrefix={setPhonePrefix}
                onChangeMiddle={setPhoneMiddle}
                onChangeLast={setPhoneLast}
              />
            </div>

            <div className="flex flex-col justify-center">
              <Button variant="primary" className="h-full min-h-[88px] px-6" onClick={handleAdd}>
                등록
              </Button>
            </div>
          </div>
        </section>
      </div>

      <LoadListDialogTBM
        isOpen={isLoadDialogOpen}
        items={loadItems}
        onChangeSelected={onSelectLoadItem}
        onClose={() => setIsLoadDialogOpen(false)}
      />

      <LoadListDialogGroup
        isOpen={isDeptGroupDialogOpen}
        items={deptGroupItems}
        onChangeSelected={onSelectDeptGroupItem}
        onClose={() => setIsDeptGroupDialogOpen(false)}
      />
    </div>
  )
}
