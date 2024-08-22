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
import SuperAdminAuthGaurd from "../gaurd/SuperAdminAuthGaurd.js";

const SuperAdminRoutes = [
  <Route
    key="SuperDashboard"
    path="/super-admin"
    element={<SuperAdminAuthGaurd element={<SuperDashboard />} />}
  >
    <Route
      key="SuperDash"
      path="super-dashboard"
      element={<SuperAdminAuthGaurd element={<SuperDash />} />}
    ></Route>
    <Route
      key="Management"
      path="company-management"
      element={<SuperAdminAuthGaurd element={<Management />} />}
    ></Route>
    <Route
      key="PlanAndPricing"
      path="plan-and-pricing"
      element={<SuperAdminAuthGaurd element={<PlanAndPricing />} />}
    ></Route>
    <Route
      key="ServiceList"
      path="service-list"
      element={<SuperAdminAuthGaurd element={<ServiceList />} />}
    ></Route>
    <Route
      key="OfflinePayment"
      path="offline-payments"
      element={<SuperAdminAuthGaurd element={<OfflinePayment />} />}
    ></Route>
    <Route
      key="PaymentHistory"
      path="payment-history"
      element={<SuperAdminAuthGaurd element={<PaymentHistory />} />}
    ></Route>
    <Route
      key="LoginLogs"
      path="login-logs"
      element={<SuperAdminAuthGaurd element={<LoginLogs />} />}
    ></Route>
  </Route>,
];

export default SuperAdminRoutes;
