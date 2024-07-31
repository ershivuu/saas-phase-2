import React, { useEffect, useState } from "react";
import "./TestPages.css";
import { getSection4Data } from "../../AdminFrontend/FrontendServices";

function TestPages() {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSection4Data();
        setSliderData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const next = () => {
    setActiveCard((activeCard % sliderData.length) + 1);
  };

  const previous = () => {
    setActiveCard(activeCard === 1 ? sliderData.length : activeCard - 1);
  };

  return (
    <div>
      <div className="hr-corner">
        <div className="hr-conrer-heading">
          <p>HUMAN RESOURCE</p>
          <p>
            INSIGHT INTO HUMAN <br /> RESOURCES
          </p>
        </div>
        <div className="buttons">
          <div>
            <button data-actin="next" onClick={next}>
              &#8592;
            </button>
          </div>
          <div>
            <button data-actin="previous" onClick={previous}>
              &#8594;
            </button>
          </div>
        </div>
        <div className="slider-imgs">
          {sliderData.map((item, index) => (
            <div
              key={index}
              className={`card${index + 1} ${
                index + 1 === activeCard ? "active-card" : ""
              }`}
            >
              <img src={item.image_url} alt="" />
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestPages;
