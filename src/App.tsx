// src/App.tsx
import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "./components/Layout/MainLayout"
import RiskAssessmentLayout from "./components/Layout/RiskAssessmentLayout"
import BusinessManagementLayout from "./components/Layout/BusinessManagementLayout"

import Dashboard from "./pages/Dashboard/Dashboard"
import TBM from "./pages/TBM/TBM"
import TBMRegister from "./pages/TBM/TBMRegister"

import BasicManagement from "./pages/BusinessManagement/BasicManagement"
import PolicyGoal from "./pages/BusinessManagement/PolicyGoal"
import Budget from "./pages/BusinessManagement/Budget"
import Organization from "./pages/BusinessManagement/Organization"

import EvaluationList from "./pages/RiskAssessment/EvaluationList"
import RiskEvaluation from "./pages/RiskAssessment/RiskEvaluation"
import RiskAssessment from "./pages/RiskAssessment/RiskAssessment"
import RiskImprovement from "./pages/RiskAssessment/RiskImprovement"

import NearMiss from "./pages/NearMiss/NearMiss"
import SafeVoice from "./pages/NearMiss/SafeVoice"

import RegularEducation from "./pages/SafetyEducation/RegularEducation"
import SpecialEducation from "./pages/SafetyEducation/SpecialEducation"

import AssetMachine from "./pages/AssetManagement/AssetMachine"
import AssetHazard from "./pages/AssetManagement/AssetHazard"

import PartnerList from "./pages/SupplyChainManagement/PartnerList"
import PartnerEvaluation from "./pages/SupplyChainManagement/PartnerEvaluation"
import ContractDocument from "./pages/SupplyChainManagement/PartnerEducation"
import SiteManagement from "./pages/SupplyChainManagement/SiteManagement"
import PartnerTraining from "./pages/SupplyChainManagement/PartnerTraining"

import SafetyWorkPermit from "./pages/SafetyWorkPermit/SafetyWorkPermit"
import ResponseManual from "./pages/ResponseManual/ResponseManual"
import NoticeList from "./pages/NoticeBoard/NoticeList"
import ResourcesList from "./pages/NoticeBoard/ResourcesList"
import LawBoard from "./pages/NoticeBoard/LawBoard"

import ReceivedApproval from "./pages/ApprovalBox/ReceivedApproval"
import SentApproval from "./pages/ApprovalBox/SentApproval"

import QRManagement from "./pages/QRManagement/QR"
import MyPage from "./pages/MyPage/MyPage"
import Support from "./pages/Support/Support"
import UserGuide from "./pages/UserGuide/UserGuide"

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tbm" element={<TBM />} />
        <Route path="/tbm/register" element={<TBMRegister />} />

        <Route path="/nearmiss" element={<NearMiss />} />
        <Route path="/nearmiss/*" element={<Navigate to="/nearmiss" replace />} />
        <Route path="/nearmiss/safevoice" element={<SafeVoice />} />
        <Route path="/nearmiss/safevoice/*" element={<Navigate to="/nearmiss/safevoice" replace />} />

        <Route path="/safety-education" element={<RegularEducation />} />
        <Route path="/specialeducation" element={<SpecialEducation />} />

        <Route path="/asset-management" element={<Navigate to="/asset-management/machine" replace />} />
        <Route path="/asset-management/machine" element={<AssetMachine />} />
        <Route path="/asset-management/hazard" element={<AssetHazard />} />

        <Route path="/supply-chain-management" element={<Navigate to="/supply-chain-management/partner-list" replace />} />
        <Route path="/supply-chain-management/partner-list" element={<PartnerList />} />
        <Route path="/supply-chain-management/partner-evaluation" element={<PartnerEvaluation />} />
        <Route path="/supply-chain-management/contract-document" element={<ContractDocument />} />
        <Route path="/supply-chain-management/site-management" element={<SiteManagement />} />
        <Route path="/supply-chain-management/partner-training" element={<PartnerTraining />} />

        <Route path="/notice-board" element={<Navigate to="/notice-board/notice" replace />} />
        <Route path="/notice-board/notice" element={<NoticeList />} />
        <Route path="/notice-board/resources" element={<ResourcesList />} />
        <Route path="/notice-board/law" element={<LawBoard />} />

        <Route path="/safety-work-permit" element={<SafetyWorkPermit />} />
        <Route path="/response-manual" element={<ResponseManual />} />

        <Route path="/approval-box" element={<Navigate to="/approval-box/received" replace />} />
        <Route path="/approval-box/received" element={<ReceivedApproval />} />
        <Route path="/approval-box/sent" element={<SentApproval />} />

        <Route path="/qr-management" element={<QRManagement />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/user-guide" element={<UserGuide />} />
      </Route>

      <Route element={<BusinessManagementLayout />}>
        <Route path="/business-management" element={<Navigate to="/business-management/basic" replace />} />
        <Route path="/business-management/basic" element={<BasicManagement />} />
        <Route path="/business-management/policy-goal" element={<PolicyGoal />} />
        <Route path="/business-management/budget" element={<Budget />} />
        <Route path="/business-management/organization" element={<Organization />} />
      </Route>

      <Route element={<RiskAssessmentLayout />}>
        <Route path="/risk-assessment" element={<Navigate to="/risk-assessment/risk" replace />} />
        <Route path="/risk-assessment/list" element={<EvaluationList />} />
        <Route path="/risk-assessment/risk" element={<RiskEvaluation />} />
        <Route path="/risk-assessment/assessment" element={<RiskAssessment />} />
        <Route path="/risk-assessment/improvement" element={<RiskImprovement />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App