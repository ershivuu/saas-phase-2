import React from "react";
import { Route } from "react-router-dom";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminLanding from "../Admin/AdminLandingPage/AdminLanding";

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
  </Route>,
];

export default UnAuthRoutes;
