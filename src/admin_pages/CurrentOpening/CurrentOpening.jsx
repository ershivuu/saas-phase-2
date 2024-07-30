import React from "react";
import Header from "../../components/Header/Header";
import Footers from "../../components/Footer/Footers";
import Academictable from "./Academictable";
import NonAcademictable from "./NonAcademictable";
import "./CurrentOpening.css";

function CurrentOpening() {
  // const removeToken = (() => {
 
  // })();
  sessionStorage.removeItem("Token");
  localStorage.removeItem("Token");
  return (
    <>
      <Header></Header>
      <div>
        <div className="cop-heading">
          <p>
            <span>CURRENT OPENING</span>
          </p>
        </div>
        < Academictable />
        < NonAcademictable />
      </div>
      <Footers></Footers>
    </>
  );
}

export default CurrentOpening;
