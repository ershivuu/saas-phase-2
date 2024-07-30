import React, { useEffect, useState } from "react";
import { getSection5Data } from "../../AdminFrontend/FrontendServices";

function TestPages() {
  const [loading, setLoading] = useState(true);
  const [section5Data, setSection5Data] = useState({
    header_1: "",
    header_2: "",
    box_content: "",
    box_img_url: "",
    box_no: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSection5Data(section5Data);
        setSection5Data(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [section5Data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{section5Data[17].box_content}</h1>
    </div>
  );
}

export default TestPages;
