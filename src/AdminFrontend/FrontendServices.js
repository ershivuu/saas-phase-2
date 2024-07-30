import axios from "axios";
import { FRONTEND_URL } from "../config/config";

// const baseURL = "http://localhost:5000";
const baseURL = FRONTEND_URL;

// Fetching banner info
export const getBannerInfo = async () => {
  try {
    const response = await axios.get(`${baseURL}/getBannerInfo`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
export const getHeaderInfo = async () => {
  try {
    const response = await axios.get(`${baseURL}/getHeaderInfo`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

// Fetching data from getSection1 API
export const getSection1Data = async () => {
  try {
    const response = await axios.get(`${baseURL}/getSection1`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getSection2Data = async () => {
  try {
    const response = await axios.get(`${baseURL}/getSection2`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

//updating ribbon data

export const updateRibbon = async (ribbonData) => {
  try {
    const response = await axios.put(`${baseURL}/updateRibbon`, ribbonData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

//updating header logo

export const updateHeaderLogo = async (imageData) => {
  try {
    const response = await axios.put(`${baseURL}/updateHeaderLogo`, imageData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

//updating banner image

export const updateBannerImage = async (imageData) => {
  try {
    const response = await axios.put(
      `${baseURL}/updateBannerImage`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

// Updating banner content
export const updateBannerContent = async (bannerData) => {
  try {
    const response = await axios.put(
      `${baseURL}/updateBannerContent`,
      bannerData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

// Fetching data from updateSection1 API
export const updateSection1Data = async (sectionData) => {
  try {
    const response = await axios.put(`${baseURL}/updateSection1`, sectionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

// Fetching data from updateSection2 API
export const updateSection2Data = async (sectionData) => {
  try {
    const response = await axios.put(`${baseURL}/updateSection2`, sectionData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const updateSection3 = async (formData, box_no) => {
  try {
    const response = await axios.put(
      `${baseURL}/updateSection3/${box_no}`, // Ensure 'boxNo' is defined
      formData
    );
    return response.data; // Return the response data
  } catch (error) {
    throw new Error("Error updating data:", error);
  }
};

export const updateSection4 = async (formData, box_no) => {
  try {
    const response = await axios.put(
      `${baseURL}/updateSection4/${box_no}`,
      formData
    );
    return response.data; // Return the response data
  } catch (error) {
    throw new Error("Error updating data:", error);
  }
};
export const updateSection5 = async (formData, box_no) => {
  try {
    const response = await axios.put(
      `${baseURL}/updateSection5/${box_no}`,
      formData
    );
    return response.data; // Return the response data
  } catch (error) {
    throw new Error("Error updating data:", error);
  }
};

export const getSection3 = async () => {
  try {
    const response = await axios.get(`${baseURL}/getALLsection3`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
export const updateFooter = async (data) => {
  try {
    const response = await axios.put(`${baseURL}/updateSection6/1`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating data:", error);
  }
};

export const getSection4Data = async () => {
  try {
    const response = await axios.get(`${baseURL}/getALLSection4/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
export const getSection5Data = async () => {
  try {
    const response = await axios.get(`${baseURL}/getALLsection5/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

// Add FAQ
export const addFaq = async (faqData) => {
  try {
    const response = await axios.post(`${baseURL}/faqs`, faqData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data || "Error adding FAQ");
  }
};

// Update FAQ
export const updateFaq = async (Id, faqData) => {
  try {
    const response = await axios.put(`${baseURL}/faqs/${Id}`, faqData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error updating FAQ");
  }
};
//Delete FAQ
export const delteFaq = async (Id, faqData) => {
  try {
    const response = await axios.delete(`${baseURL}/faqs/${Id}`, faqData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error updating FAQ");
  }
};

// Fetch FAQ data
export const getFaqs = async () => {
  try {
    const response = await axios.get(`${baseURL}/faqs`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error fetching FAQs");
  }
};

export const getFooter = async () => {
  try {
    const response = await axios.get(`${baseURL}/getALLsection6`);
    console.log("Fetched Footer Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

// Updating contact data
export const updateContact = async (contactData) => {
  try {
    const response = await axios.put(`${baseURL}/updateContact/1`, contactData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error updating contact data");
  }
};

export const getContactUs = async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllContacts`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error fetching FAQs");
  }
};
export const getInterviewInfo = async () => {
  try {
    const response = await axios.get(`${baseURL}/getAllInterviewInfo`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error fetching FAQs");
  }
};

export const updateInterview = async (InterviewData) => {
  try {
    const response = await axios.put(
      `${baseURL}/updateInterviewInfo`,
      InterviewData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Error updating contact data");
  }
};
