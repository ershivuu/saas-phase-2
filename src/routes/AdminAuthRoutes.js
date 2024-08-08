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
const UnAuthRoutes = [
  <Route
    key="AdminDashboard"
    path="/admin-dashboard"
    element={<AdminDashboard />}
  >
    <Route
      key="AdminLanding"
      path="admin-page"
      element={<AdminLanding />}
    ></Route>
    <Route
      key="CreatePosts"
      path="admin-posts"
      element={<CreatePosts />}
    ></Route>
    <Route
      key="CreateCategory"
      path="admin-category"
      element={<CreateCategory />}
    ></Route>
    <Route key="SubPost" path="admin-subpost" element={<SubPost />}></Route>
    <Route
      key="SubPost"
      path="admin-department"
      element={<CreateDepartment />}
    ></Route>
    <Route
      key="CreateSubjects"
      path="admin-subject"
      element={<CreateSubjects />}
    ></Route>
    <Route
      key="CreateExamType"
      path="admin-examtype"
      element={<CreateExamType />}
    ></Route>
    <Route
      key="CreateDegree"
      path="admin-degree"
      element={<CreateDegree />}
    ></Route>
    <Route
      key="CreateCurrentOpening"
      path="admin-current-opening"
      element={<CreateCurrentOpening />}
    ></Route>
    <Route
      key="CreateInterviewSchedules"
      path="admin-interview-schedules"
      element={<CreateInterviewSchedules />}
    ></Route>
    <Route
      key="CreateAppliedCandidates"
      path="admin-applied-candidates"
      element={<CreateAppliedCandidates />}
    ></Route>
    <Route
      key="CreateVisitors"
      path="admin-visitors"
      element={<CreateVisitors />}
    ></Route>
    <Route key="CreateJd" path="admin-jd" element={<CreateJd />}></Route>
    <Route key="EditHeader" path="edit-header" element={<EditHeader />}></Route>
    <Route key="EditFooter" path="edit-footer" element={<EditFooter />}></Route>
    <Route
      key="EditContact"
      path="edit-contact"
      element={<EditContact />}
    ></Route>
    <Route
      key="EditInterviewSchedule"
      path="edit-interviews"
      element={<EditInterviewSchedule />}
    ></Route>
    <Route key="FaqSection" path="edit-faq" element={<FaqSection />}></Route>
    <Route key="EditHome" path="edit-home" element={<EditHome />}></Route>
    <Route key="Section1" path="edit-section-1" element={<Section1 />}></Route>
    <Route key="Section2" path="edit-section-2" element={<Section2 />}></Route>
    <Route key="Section3" path="edit-section-3" element={<Section3 />}></Route>
    <Route key="Section4" path="edit-section-4" element={<Section4 />}></Route>
    <Route key="Section5" path="edit-section-5" element={<Section5 />}></Route>
    <Route
      key="UpgradePlan"
      path="upgrade-plan"
      element={<UpgradePlan />}
    ></Route>
  </Route>,
];

export default UnAuthRoutes;
