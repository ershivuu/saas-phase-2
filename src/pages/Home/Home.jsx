import React, { useEffect, useState, Suspense } from "react";

import "./Home.css";
import { Link } from "react-router-dom";
import {
  getBannerInfo,
  getSection5Data,
} from "../../Admin/Services/FrontendServices";
import { verifySlug, getUniqueSlug } from "../../slugs/getSlug";
import Cards from "./Sections/Cards";
import SectionTwo from "./Sections/SectionTwo";
import SectionFour from "./Sections/SectionFour";
const MediStaff = React.lazy(() => import("./Design/MediStaff"));
const SectionFive = React.lazy(() => import("./Sections/SectionFive"));
const Header = React.lazy(() => import("../../components/Header/Header"));
const Footers = React.lazy(() => import("../../components/Footer/Footers"));

function Home() {
  const slug = getUniqueSlug();
  useEffect(() => {
    verifySlug();
  }, []);

  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState({
    BannerContentText: "",
    BannerHeaderText: "",
    BannerButtonText: "",
  });
  const [bannerImg, setBannerImg] = useState({
    imageUrl: "",
  });

  const [section5Data, setSection5Data] = useState({
    header_1: "",
    header_2: "",
    box_content: "",
    box_img_url: "",
    box_no: "",
  });

  const fetchBannerInfo = async () => {
    try {
      const data = await getBannerInfo();

      setBannerData(data.bannerContent);

      setBannerImg(data);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

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
    fetchBannerInfo();
    fetchsection5Data();
  }, []);

  if (loading) {
    return (
      <div className="loading-message">
        {/* <p>Please wait loading a website...</p> */}
      </div>
    );
  }

  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
      </div>
      <div
        className="home-page top-spacing"
        style={{
          backgroundImage: ` radial-gradient(
      98.61% 311.66% at 1.39% 60.37%,
      #040404 0.1%,
      rgba(4, 4, 4, 0.6) 43.85%,
      rgba(255, 255, 255, 0) 100%,
      rgba(255, 255, 255, 0) 100%
    ),url(${bannerImg.imageUrl})`,
        }}
      >
        <div className="medi-home-heading">
          <p id="uni-name">{bannerData.BannerHeaderText}</p>
          <p>{bannerData.BannerContentText}</p>
          <button type="button" id="join-medi-btn">
            <Link to={`/${slug}/openings`}>{bannerData.BannerButtonText}</Link>
          </button>
        </div>
      </div>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Cards />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionTwo />
        </Suspense>
      </div>
      <div className="staff-section">
        <div className="staff-design">
          <Suspense fallback={<div>Loading...</div>}>
            <MediStaff />
          </Suspense>
        </div>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionFour />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <SectionFive />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Footers />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
