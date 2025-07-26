// RiskAssessmentSubmitModal.tsx
import React from "react"
import Button from "@/components/common/Button"

type Props = {
visible: boolean
onClose: () => void
}

const RiskAssessmentSubmitModal: React.FC<Props> = ({ visible, onClose }) => {
if (!visible) return null

const handleSave = () => {
alert("저장되었습니다")
onClose()
}

return (
<div
className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20"
onClick={onClose}
>
<div
className="relative bg-white rounded-2xl p-6 w-[500px] shadow-lg"
onClick={(e) => e.stopPropagation()}
>
<p className="mt-6 text-center text-gray-700 text-md mb-6">
평가를 완료하고 저장하시겠습니까?
</p>
<div className="flex justify-center gap-2">
<Button variant="step" onClick={onClose}>
취소
</Button>
<Button variant="step" onClick={handleSave}>
저장하기
</Button>
</div>
</div>
</div>
)
}

export default RiskAssessmentSubmitModal