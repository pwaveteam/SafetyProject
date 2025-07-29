import React from "react"

type GroupedData = {
  course: string
  target: string
  hour: string
}

type Props = {
  grouped: Record<string, { target: string; hour: string }[]>
}

export default function GroupedTable({ grouped }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[700px]">
        <thead>
          <tr className="h-[33px] bg-[#F7F8FA] border-t-[1.9px] border-b border-[#CCCCCC]">
            <th className="px-3 py-0 text-xs md:text-sm font-semibold text-gray-600 text-center bg-[#EFEFF3] border-l-0">교육과정</th>
            <th className="px-3 py-0 text-xs md:text-sm font-semibold text-gray-600 text-center bg-[#EFEFF3]">교육대상</th>
            <th className="px-3 py-0 text-xs md:text-sm font-semibold text-gray-600 text-center bg-[#EFEFF3] border-r-0">교육시간</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([course, rows]) =>
            rows.map((row, idx) => (
              <tr key={course + idx} className="h-[33px] hover:bg-[#FBFBFB]">
                {idx === 0 && (
                  <td rowSpan={rows.length} className="px-3 py-0 align-middle text-xs md:text-sm font-medium text-center border-t border-b border-gray-300 border-l-0 bg-[#EFEFF3] text-gray-700 whitespace-nowrap">
                    {course}
                  </td>
                )}
                <td className="px-3 py-0 align-middle text-xs md:text-sm font-medium text-center border-t border-b border-gray-300 text-gray-800 whitespace-nowrap">
                  {row.target}
                </td>
                <td className="px-3 py-0 align-middle text-xs md:text-sm font-medium text-center border-t border-b border-gray-300 border-r-0 text-gray-800 whitespace-nowrap">
                  {row.hour}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
