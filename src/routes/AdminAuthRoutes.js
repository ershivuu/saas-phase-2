import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminLanding from "../Admin/AdminLandingPage/AdminLanding";
import CreatePosts from "../Admin/AdminChild/Posts/CreatePosts";
import CreateCategory from "../Admin/AdminChild/Category/CreateCategory";

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
  </Route>,
];

export default UnAuthRoutes;
