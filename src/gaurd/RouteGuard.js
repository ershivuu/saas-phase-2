// src/RouteGuard.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = ({ component: Component, endDate, ...rest }) => {
  const location = useLocation();
  const currentDate = new Date();

  // Check if the current date is past the end date
  if (endDate && currentDate > new Date(endDate)) {
    return (
      <Navigate to="/admin-dashboard/upgrade-plan" state={{ from: location }} />
    );
  }

  return <Component {...rest} />;
};

export default RouteGuard;
