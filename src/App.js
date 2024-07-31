import React from "react";
import { BrowserRouter as Main, Routes, Route } from "react-router-dom";
import UnAuthRoutes from "./routes/UnAuthRoutes";
import CandidateAuthRoutes from "./routes/CandidateAuthRoutes";
import AdminAuthRoutes from "./routes/AdminAuthRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";

function App() {
  return (
    <>
      <Main>
        <Routes>
          {UnAuthRoutes}
          {CandidateAuthRoutes}
          {AdminAuthRoutes}
          {SuperAdminRoutes}
        </Routes>
      </Main>
    </>
  );
}

export default App;
