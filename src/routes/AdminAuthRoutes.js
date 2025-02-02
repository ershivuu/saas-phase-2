import React from "react";
import { Route } from "react-router-dom";

import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminLanding from "../Admin/AdminLandingPage/AdminLanding";
import CreatePosts from "../Admin/AdminChild/Posts/CreatePosts";
import CreateCategory from "../Admin/AdminChild/Category/CreateCategory";
import SubPost from "../Admin/AdminChild/SubPost/SubPost";
import CreateDepartment from "../Admin/AdminChild/Department/CreateDepartment";
import CreateSubjects from "../Admin/AdminChild/Subjects/CreateSubjects";
import CreateExamType from "../Admin/AdminChild/ExamType/CreateExamType";
import CreateDegree from "../Admin/AdminChild/Degree/CreateDegree";
import CreateCurrentOpening from "../Admin/AdminChild/CurrentOpenings/CreateCurrentOpening";
import CreateInterviewSchedules from "../Admin/AdminChild/Interviews/CreateInterviewSchedules";
import CreateAppliedCandidates from "../Admin/AdminChild/AppliedCandidates/CreateAppliedCandidates";
import CreateVisitors from "../Admin/AdminChild/Visitors/CreateVisitors";
import CreateJd from "../Admin/AdminChild/JobProfile/CreateJd";
import EditHeader from "../Admin/AdminChild/FrontendPages/EditHeader/EditHeader";
import EditFooter from "../Admin/AdminChild/FrontendPages/EditFooter/EditFooter";
import EditContact from "../Admin/AdminChild/FrontendPages/EditContact/EditContact";
import FaqSection from "../Admin/AdminChild/FrontendPages/FaqSection/FaqSection";
import EditInterviewSchedule from "../Admin/AdminChild/FrontendPages/EditInterviewSchedule/EditInterviewSchedule";
import EditHome from "../Admin/AdminChild/FrontendPages/EditHome/EditHome";
import Section1 from "../Admin/AdminChild/FrontendPages/EditHome/HomeSubPages/Section1";
import Section2 from "../Admin/AdminChild/FrontendPages/EditHome/HomeSubPages/Section2";
import Section3 from "../Admin/AdminChild/FrontendPages/EditHome/HomeSubPages/Section3";
import Section4 from "../Admin/AdminChild/FrontendPages/EditHome/HomeSubPages/Section4";
import Section5 from "../Admin/AdminChild/FrontendPages/EditHome/HomeSubPages/Section5";
import UpgradePlan from "../Admin/UpgradePlan/UpgradePlan";
import AdminAuthGaurd from "../gaurd/AdminAuthGaurd";

const AdminAuthRoutes = [
  <Route
    key="AdminDashboard"
    path="/admin-dashboard"
    element={<AdminAuthGaurd element={<AdminDashboard />} />}
  >
    <Route
      key="AdminLanding"
      path="admin-page"
      element={<AdminAuthGaurd element={<AdminLanding />} />}
    ></Route>
    <Route
      key="CreatePosts"
      path="admin-posts"
      element={<AdminAuthGaurd element={<CreatePosts />} />}
    ></Route>
    <Route
      key="CreateCategory"
      path="admin-category"
      element={<AdminAuthGaurd element={<CreateCategory />} />}
    ></Route>
    <Route
      key="SubPost"
      path="admin-subpost"
      element={<AdminAuthGaurd element={<SubPost />} />}
    ></Route>
    <Route
      key="CreateDepartment"
      path="admin-department"
      element={<AdminAuthGaurd element={<CreateDepartment />} />}
    ></Route>
    <Route
      key="CreateSubjects"
      path="admin-subject"
      element={<AdminAuthGaurd element={<CreateSubjects />} />}
    ></Route>
    <Route
      key="CreateExamType"
      path="admin-examtype"
      element={<AdminAuthGaurd element={<CreateExamType />} />}
    ></Route>
    <Route
      key="CreateDegree"
      path="admin-degree"
      element={<AdminAuthGaurd element={<CreateDegree />} />}
    ></Route>
    <Route
      key="CreateCurrentOpening"
      path="admin-current-opening"
      element={<AdminAuthGaurd element={<CreateCurrentOpening />} />}
    ></Route>
    <Route
      key="CreateInterviewSchedules"
      path="admin-interview-schedules"
      element={<AdminAuthGaurd element={<CreateInterviewSchedules />} />}
    ></Route>
    <Route
      key="CreateAppliedCandidates"
      path="admin-applied-candidates"
      element={<AdminAuthGaurd element={<CreateAppliedCandidates />} />}
    ></Route>
    <Route
      key="CreateVisitors"
      path="admin-visitors"
      element={<AdminAuthGaurd element={<CreateVisitors />} />}
    ></Route>
    <Route
      key="CreateJd"
      path="admin-jd"
      element={<AdminAuthGaurd element={<CreateJd />} />}
    ></Route>
    <Route
      key="EditHeader"
      path="edit-header"
      element={<AdminAuthGaurd element={<EditHeader />} />}
    ></Route>
    <Route
      key="EditFooter"
      path="edit-footer"
      element={<AdminAuthGaurd element={<EditFooter />} />}
    ></Route>
    <Route
      key="EditContact"
      path="edit-contact"
      element={<AdminAuthGaurd element={<EditContact />} />}
    ></Route>
    <Route
      key="EditInterviewSchedule"
      path="edit-interviews"
      element={<AdminAuthGaurd element={<EditInterviewSchedule />} />}
    ></Route>
    <Route
      key="FaqSection"
      path="edit-faq"
      element={<AdminAuthGaurd element={<FaqSection />} />}
    ></Route>
    <Route
      key="EditHome"
      path="edit-home"
      element={<AdminAuthGaurd element={<EditHome />} />}
    ></Route>
    <Route
      key="Section1"
      path="edit-section-1"
      element={<AdminAuthGaurd element={<Section1 />} />}
    ></Route>
    <Route
      key="Section2"
      path="edit-section-2"
      element={<AdminAuthGaurd element={<Section2 />} />}
    ></Route>
    <Route
      key="Section3"
      path="edit-section-3"
      element={<AdminAuthGaurd element={<Section3 />} />}
    ></Route>
    <Route
      key="Section4"
      path="edit-section-4"
      element={<AdminAuthGaurd element={<Section4 />} />}
    ></Route>
    <Route
      key="Section5"
      path="edit-section-5"
      element={<AdminAuthGaurd element={<Section5 />} />}
    ></Route>
    <Route
      key="UpgradePlan"
      path="upgrade-plan"
      element={<AdminAuthGaurd element={<UpgradePlan />} />}
    ></Route>
  </Route>,
];

export default AdminAuthRoutes;
