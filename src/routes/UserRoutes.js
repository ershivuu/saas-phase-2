import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLogin from "../Admin/AdminLogin/AdminLogin";
import SuperLogin from "../superAdmin/SuperLogin/SuperLogin";
const SLUG = "shiv";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/super" element={<SuperLogin />} />
    </Routes>
  );
};

export default UserRoutes;
