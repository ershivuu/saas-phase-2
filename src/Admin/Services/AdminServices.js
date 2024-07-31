import axios from "axios";
import { NEW_ADMIN_BASE_URL } from "../../config/config";

export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${NEW_ADMIN_BASE_URL}/admin/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const getAdminToken = () => {
  let token = sessionStorage.getItem("Token");
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  console.log("Cleaned Token:", token);
  return token;
};
export const getCategories = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/category/getAllCategories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
export const createCategory = async (categoryName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/category/createCategory`,
      { category_name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteCategory = async (categoryId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    await axios.delete(
      `${NEW_ADMIN_BASE_URL}/category/deleteCategory/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updateCategory = async (categoryId, categoryName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/category/updateCategory/${categoryId}`,
      { category_name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getPosts = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/posts/getAllPosts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
