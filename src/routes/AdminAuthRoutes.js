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
  </Route>,
];

export default UnAuthRoutes;
