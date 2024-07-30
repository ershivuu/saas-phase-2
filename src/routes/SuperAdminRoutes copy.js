import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminAuthGaurd from "../gaurd/SuperAdminAuthGaurd.js"; // Adjust path as necessary

import SuperDashboard from "../superAdmin/SuperAdminDashboard/SuperDashboard.jsx";
import SuperDash from "../superAdmin/SuperAdminPages/SuperDash/SuperDash.jsx";
import Management from "../superAdmin/SuperAdminPages/CompanyManagement/Management.jsx";
import ServiceList from "../superAdmin/SuperAdminPages/ServiceList/ServiceList.jsx";
import OfflinePayment from "../superAdmin/SuperAdminPages/OfflinePayment/OfflinePayment.jsx";
import PaymentHistory from "../superAdmin/SuperAdminPages/PaymentHistory/PaymentHistory.jsx";
import LoginLogs from "../superAdmin/SuperAdminPages/LoginLogs/LoginLogs.jsx";
import PlanAndPricing from "../superAdmin/SuperAdminPages/Plans/PlanAndPricing.jsx";

const SuperAdminRoutes = () => (
  <Routes>
    <Route
      path="/super-admin"
      element={
        <SuperAdminAuthGaurd>
          <SuperDashboard />
        </SuperAdminAuthGaurd>
      }
    >
      <Route
        path="super-dashboard"
        element={
          <SuperAdminAuthGaurd>
            <SuperDash />
          </SuperAdminAuthGaurd>
        }
      />
      <Route
        path="company-management"
        element={
          <SuperAdminAuthGaurd>
            <Management />
          </SuperAdminAuthGaurd>
        }
      />
      <Route
        path="plan-and-pricing"
        element={
          <SuperAdminAuthGaurd>
            <PlanAndPricing />
          </SuperAdminAuthGaurd>
        }
      />
      <Route
        path="service-list"
        element={
          <SuperAdminAuthGaurd>
            <ServiceList />
          </SuperAdminAuthGaurd>
        }
      />
      <Route
        path="offline-payments"
        element={
          <SuperAdminAuthGaurd>
            <OfflinePayment />
          </SuperAdminAuthGaurd>
        }
      />
      <Route
        path="payment-history"
        element={
          <SuperAdminAuthGaurd>
            <PaymentHistory />
          </SuperAdminAuthGaurd>
        }
      />
      <Route
        path="login-logs"
        element={
          <SuperAdminAuthGaurd>
            <LoginLogs />
          </SuperAdminAuthGaurd>
        }
      />
    </Route>
  </Routes>
);

export default SuperAdminRoutes;
