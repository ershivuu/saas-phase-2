import React, { useEffect, useState } from "react";
import { getSection2Data } from "../../../Admin/Services/FrontendServices";
import disktype from "../../../assets/logos/bullet.png";

function SectionTwo() {
  const [section2Data, setSection2Data] = useState({
    heading_L1: "",
    heading_L2: "",
    section2_box1: "",
    section2_box2: "",
    section2_box3: "",
    section2_box4: "",
    section2_Image_path: "",
  });
  const fetchSection2Data = async () => {
    try {
      const data = await getSection2Data();
      setSection2Data(data);
    } catch (error) {
      console.error("Error fetching Section 2 data:", error);
    }
  };
  useEffect(() => {
    fetchSection2Data();
  }, []);
  return (
    <>
      <div
        className="perks"
        style={{
          backgroundImage: `radial-gradient(
      186.03% 1135.93% at 5.56% 21.36%,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 81.75%
    ),url(${section2Data.section2_Image_path})`,
        }}
      >
        <div className="perks-heading">
          <p>
            {section2Data.heading_L1} <br />
            <span>{section2Data.heading_L2}</span>
          </p>
        </div>
        <div className="perks-list">
          <ul>
            <li>
              <img alt="" src={disktype} id="disktype" />
              {section2Data.section2_box1}
            </li>
            <li className="side-left ">
              <img alt="" src={disktype} id="disktype" />
              {section2Data.section2_box2}
            </li>
            <li>
              <img alt="" src={disktype} id="disktype" />
              {section2Data.section2_box3}
            </li>
            <li className="side-left">
              <img alt="" src={disktype} id="disktype" />
              {section2Data.section2_box4}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SectionTwo;
