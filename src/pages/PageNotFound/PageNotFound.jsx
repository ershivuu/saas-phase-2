import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";
import question from "../../assets/images/question.png";

function PageNotFound() {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container-404">
        <div className="data-404">
          <p>Something's wrong here...</p>
          <p>
            We can not find the page you are looking for. Please head back to
            Home Page
          </p>
        </div>
        <div>
          <img src={question} alt="" />
        </div>
      </div>
      <div className="back-home-btn">
        <button onClick={handleNavigation}>Home</button>
      </div>
    </>
  );
}

export default PageNotFound;
