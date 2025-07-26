// components/OrganizationTree.tsx
import React from "react"
import OrgChart from "react-orgchart"

export type OrgNode = {
  id: number | string
  title: string
  name: string
  position: string
  children?: OrgNode[]
}

interface OrganizationTreeProps {
  data: OrgNode | OrgNode[]
}

const NodeComponent: React.FC<{ node: OrgNode }> = ({ node }) => (
  <div
    className="border border-gray-300 bg-white text-center shadow-sm"
    style={{
      width: 190,
      margin: 6,
      boxSizing: "border-box",
    }}
  >
    <div
      className="py-3 border-b border-gray-300 select-none"
      style={{
        width: "100%",
        backgroundColor: "#EFEFF3",
        color: "#666666",
        fontWeight: "700",
        fontSize: "1rem",
        boxSizing: "border-box",
      }}
    >
      {node.title}
    </div>
    <div
      className="mt-2"
      style={{
        fontSize: "1rem",
        color: "#333639",
        fontWeight: "700",
      }}
    >
      {node.name}
    </div>
    <div
      className="mt-1 mb-3"
      style={{
        fontSize: "1rem",
        color: "#333639",
        fontWeight: "400",
        marginTop: "0.25rem",
      }}
    >
      {node.position}
    </div>
  </div>
)

const OrganizationTree: React.FC<OrganizationTreeProps> = ({ data }) => {
  const root = Array.isArray(data) ? data[0] : data
  if (!root) return null

  return (
    <>
      <style>{`
        .orgchart .nodes {
          display: flex !important;
          justify-content: center !important;
        }
        .orgchart .node {
          width: 190px !important;
          margin: 6px auto !important;
        }
      `}</style>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <OrgChart tree={root} NodeComponent={NodeComponent} />
      </div>
    </>
  )
}

export default OrganizationTree
