import React from "react";
import { Route } from "react-router-dom";

import SuperDashboard from "../superAdmin/SuperAdminDashboard/SuperDashboard.jsx";
import SuperDash from "../superAdmin/SuperAdminPages/SuperDash/SuperDash.jsx";
import Management from "../superAdmin/SuperAdminPages/CompanyManagement/Management.jsx";
import ServiceList from "../superAdmin/SuperAdminPages/ServiceList/ServiceList.jsx";
import OfflinePayment from "../superAdmin/SuperAdminPages/OfflinePayment/OfflinePayment.jsx";
import PaymentHistory from "../superAdmin/SuperAdminPages/PaymentHistory/PaymentHistory.jsx";
import LoginLogs from "../superAdmin/SuperAdminPages/LoginLogs/LoginLogs.jsx";
import PlanAndPricing from "../superAdmin/SuperAdminPages/Plans/PlanAndPricing.jsx";

const SuperAdminRoutes = [
  <Route key="SuperDashboard" path="/super-admin" element={<SuperDashboard />}>
    <Route
      key="SuperDash"
      path="super-dashboard"
      element={<SuperDash />}
    ></Route>
    <Route
      key="Management"
      path="company-management"
      element={<Management />}
    ></Route>
    <Route
      key="PlanAndPricing"
      path="plan-and-pricing"
      element={<PlanAndPricing />}
    ></Route>
    <Route
      key="ServiceList"
      path="service-list"
      element={<ServiceList />}
    ></Route>
    <Route
      key="OfflinePayment"
      path="offline-payments"
      element={<OfflinePayment />}
    ></Route>
    <Route
      key="PaymentHistory"
      path="payment-history"
      element={<PaymentHistory />}
    ></Route>
    <Route key="LoginLogs" path="login-logs" element={<LoginLogs />}></Route>
  </Route>,
];

export default SuperAdminRoutes;
