// import React from "react";
// import "./FrontendHeader.css";
// import medilogo from "../../assets/logos/medi-logo.png";

// import { useNavigate } from "react-router-dom";

// function FrontendHeader({onLogout} ) {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     sessionStorage.removeItem("Token");
//     sessionStorage.removeItem("isLoggedIn");
//     navigate("/FrontEndPanel");
//   };

//   return (
//     <>
//       <div className="admin-header fixed-top">
//         <div>
//           <img className="admin-logo" src={medilogo} alt="" />
//         </div>
//         <div id="logout-btn">
//         <button onClick={onLogout}>Logout</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default FrontendHeader;
