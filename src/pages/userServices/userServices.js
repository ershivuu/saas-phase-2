import axios from "axios";
import { NEW_ADMIN_BASE_URL } from "../../config/config";

const getUniqueSlug = () => {
  let slug = localStorage.getItem("userSlug");
  return slug;
};

export const getJobOpenings = async () => {
  const uniqueSlug = getUniqueSlug();
  if (!uniqueSlug) {
    throw new Error("No verified user found");
  }
  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/getJobOpeningsWithActiveStatus`,
      {
        params: { uniqueSlug },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
