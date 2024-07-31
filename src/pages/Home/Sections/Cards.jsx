import React, { useState, useEffect } from "react";

import logo1 from "../../../assets/logos/academic.png";
import logo2 from "../../../assets/logos/research.png";
import logo3 from "../../../assets/logos/administration.png";
import { getSection1Data } from "../../../AdminFrontend/FrontendServices";
import { useNavigate } from "react-router-dom";

function Cards() {
  const [section1Data, setSection1Data] = useState({
    id: "",
    heading_L1: "",
    heading_L2: "",
    heading_L3: "",
  });

  const navigate = useNavigate();

  const fetchSection1Data = async () => {
    try {
      const data = await getSection1Data();
      setSection1Data(data);
    } catch (error) {
      console.error("Error fetching Section 1 data:", error);
    }
  };

  useEffect(() => {
    fetchSection1Data();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/current-opening?category=${category}`);
  };

  return (
    <div>
      <div className="subs">
        <p>{section1Data.heading_L1}</p>
        <p>{section1Data.heading_L2}</p>
        <p>{section1Data.heading_L3}</p>
      </div>

      <div className="cards">
        <div className="card" onClick={() => handleCategoryClick("")}>
          <img alt="" src={logo1} />
          <p>ACADEMICS</p>
          <a href="#" target="_top">
            View Vacancies
          </a>
        </div>
        <div className="card" onClick={() => handleCategoryClick("UAS")}>
          <img alt="" src={logo2} />
          <p>UAS</p>
          <a href="#" target="_top">
            View Vacancies
          </a>
        </div>
        <div className="card" onClick={() => handleCategoryClick("Research")}>
          <img alt="" src={logo2} />
          <p>RESEARCH</p>
          <a href="#" target="_top">
            View Vacancies
          </a>
        </div>
        <div
          className="card"
          onClick={() => handleCategoryClick("Administrative")}
        >
          <img alt="" src={logo3} />
          <p>ADMINISTRATION</p>
          <a href="#" target="_top">
            View Vacancies
          </a>
        </div>
        <div className="card" onClick={() => handleCategoryClick("Technical")}>
          <img alt="" src={logo3} />
          <p>TECHNICAL</p>
          <a href="#" target="_top">
            View Vacancies
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cards;
