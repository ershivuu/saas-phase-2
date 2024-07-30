import React from "react";
// import candidatesApiService from "../../../candidateService";
// import apiService from "../../../../Services/ApiServices";

import "./Candidateco.css";
import Academictable from "../../../../admin_pages/CurrentOpening/Academictable";
import NonAcademictable from "../../../../admin_pages/CurrentOpening/NonAcademictable";
function CandidateCurrentopening() {
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [data, setData] = useState({});
  // const fetchCandidateData = async () => {
  //   try {
  //     // setLoading(true);
  //     const fetchedData = await candidatesApiService.getCandidateById();
  //     setData(fetchedData);
  //     // console.log("fetchedData", fetchedData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchCandidateData();
  // }, []);

  return (
    <>
      <div className="current-opening-header"></div>
      <div>
        <Academictable></Academictable>
        <NonAcademictable></NonAcademictable>
      </div>
    </>
  );
}

export default CandidateCurrentopening;
