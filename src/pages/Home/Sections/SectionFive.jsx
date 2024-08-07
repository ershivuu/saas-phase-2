import React, { useEffect, useState } from "react";
import { getSection5Data } from "../../../Admin/Services/FrontendServices";

function SectionFive() {
  const [loading, setLoading] = useState(true);
  const [section5Data, setSection5Data] = useState({
    header_1: "",
    header_2: "",
    box_content: "",
    box_img_url: "",
    box_no: "",
  });
  const fetchsection5Data = async () => {
    try {
      const response = await getSection5Data(section5Data);

      setSection5Data(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchsection5Data();
  }, []);

  if (loading) {
    return (
      <div className="loading-message">
        {/* <p>Please wait while we are loading your section...</p> */}
      </div>
    );
  }

  return (
    <>
      <div className="purpose">
        <div className="purpose-headings">
          <p>{section5Data[0].header_1}</p>
          <p>{section5Data[0].box_content}</p>
        </div>
        <div className="purpose-data">
          <div
            className="purpose-quotes"
            style={{ background: section5Data[1].bg_col }}
          >
            <p>{section5Data[1].box_content}</p>
          </div>
          <div className="big-img remove-bg">
            <img alt="" src={section5Data[2].box_img_url} />
          </div>
          <div className="women remove-bg">
            <img alt="" src={section5Data[3].box_img_url} />
          </div>
          <div
            className="purpose-quotes"
            style={{ background: section5Data[4].bg_col }}
          >
            <p>{section5Data[4].box_content}</p>
          </div>
          <div className="women remove-bg">
            <img alt="" src={section5Data[5].box_img_url} />
          </div>
          <div
            className="purpose-quotes"
            style={{ background: section5Data[6].bg_col }}
          >
            <p>{section5Data[6].box_content}</p>
          </div>
          <div className="big-img remove-bg">
            <img alt="" src={section5Data[7].box_img_url} />
          </div>
          <div className="women remove-bg">
            <img alt="" src={section5Data[8].box_img_url} />
          </div>
          <div className="women remove-bg">
            <img alt="" src={section5Data[9].box_img_url} />
          </div>
          <div
            className="purpose-quotes quote-small"
            style={{ background: section5Data[10].bg_col }}
          >
            <p>{section5Data[10].box_content}</p>
          </div>
          <div className="women remove-bg">
            <img alt="" src={section5Data[11].box_img_url} />
          </div>
          <div className="big-img remove-bg">
            <img alt="" src={section5Data[12].box_img_url} />
          </div>
          <div
            className="purpose-quotes"
            style={{ background: section5Data[13].bg_col }}
          >
            <p>{section5Data[13].box_content}</p>
          </div>
          <div className="big-img remove-bg">
            <img alt="" src={section5Data[14].box_img_url} />
          </div>
          <div
            className="purpose-quotes quote-small"
            style={{ background: section5Data[15].bg_col }}
          >
            <p>{section5Data[15].box_content}</p>
          </div>
          <div className="women remove-bg">
            <img alt="" src={section5Data[16].box_img_url} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionFive;
