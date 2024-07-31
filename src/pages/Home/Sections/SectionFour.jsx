import React, { useEffect, useState } from "react";
import { getSection4Data } from "../../../AdminFrontend/FrontendServices";

function SectionFour() {
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [cardHeadlines, setCardHeadlines] = useState([]);
  const [activeCard, setActiveCard] = useState(0); // Initialize with card2 as active
  const [cardImages, setCardImages] = useState([]);
  const [Box1Header1, setBox1Header1] = useState("");
  const [Box1Header2, setBox1Header2] = useState("");
  const [section4Data, setsection4Data] = useState({
    header_1: "",
    header_2: "",
    header_3: "",
    box_content: "",
    bg_col: "",
    box_img_url: "",
  });
  const fetchsection4Data = async () => {
    try {
      const data = await getSection4Data(section4Data);
      console.log(">>Card1", data);

      setBox1Header1(data[0].header_1);
      setBox1Header2(data[0].header_2);
      const headlines = [
        data[1].box_content,
        data[2].box_content,
        data[3].box_content,
        data[4].box_content,
      ];

      const images = [
        data[1].box_img_url,
        data[2].box_img_url,
        data[3].box_img_url,
        data[4].box_img_url,
      ];

      setCardHeadlines(headlines);
      setCardImages(images);
      setsection4Data(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchsection4Data();
  }, []);
  const next = () => {
    setActiveCard((activeCard + 1) % 4);
  };

  const previous = () => {
    setActiveCard((activeCard - 1 + 4) % 4);
  };
  useEffect(() => {
    const checkMobileView = () => {
      const mediaQuery = window.matchMedia(
        "(max-width: 767px),(min-device-width: 768px) and (max-device-width: 1024px)and (orientation: landscape),(min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait),(min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape)(min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: portrait)"
      );
      setIsMobileView(mediaQuery.matches);
    };

    checkMobileView();

    const resizeHandler = () => {
      checkMobileView();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler); // Clean up event listener
    };
  }, []);
  if (loading) {
    return (
      <div className="loading-message">
        {/* <p>Please wait while we are loading your website...</p> */}
      </div>
    );
  }
  return (
    <>
      <div
        className="hr-corner"
        style={{
          background: `linear-gradient(180.71deg, rgba(0, 0, 0, 0) 3.39%, #000000 94.22%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${section4Data[0].box_img_url})`,
        }}
      >
        <div className="hr-corner-sub-container">
          <div className="hr-conrer-heading">
            <p>{Box1Header1}</p>

            <p>{Box1Header2}</p>
          </div>
          <div className="buttons">
            <div>
              <button data-action="next" onClick={next}>
                &#8592;
              </button>
            </div>
            <div>
              <button data-action="previous" onClick={previous}>
                &#8594;
              </button>
            </div>
          </div>
          <div className="slider-imgs">
            {isMobileView ? (
              <div
                className={`card${activeCard + 1} active-card`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 36.91%, #000000 100.74%),url(${cardImages[activeCard]})`,
                }}
              >
                <p>{cardHeadlines[activeCard]}</p>
              </div>
            ) : (
              <>
                <div
                  className={`card${(activeCard % 4) + 1}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 36.91%, #000000 100.74%),url(${cardImages[activeCard]})`,
                  }}
                >
                  <p>{cardHeadlines[activeCard]}</p>
                </div>
                <div
                  className={`card${((activeCard + 1) % 4) + 1} active-card`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 36.91%, #000000 100.74%),url(${
                      cardImages[(activeCard + 1) % 4]
                    })`,
                  }}
                >
                  <p>{cardHeadlines[(activeCard + 1) % 4]}</p>
                </div>
                <div
                  className={`card${((activeCard + 2) % 4) + 1}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 36.91%, #000000 100.74%),url(${
                      cardImages[(activeCard + 2) % 4]
                    })`,
                  }}
                >
                  <p>{cardHeadlines[(activeCard + 2) % 4]}</p>
                </div>
                <div
                  className={`card${((activeCard + 3) % 4) + 1}`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 36.91%, #000000 100.74%),url(${
                      cardImages[(activeCard + 3) % 4]
                    })`,
                  }}
                >
                  <p>{cardHeadlines[(activeCard + 3) % 4]}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionFour;
