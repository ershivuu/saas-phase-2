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
export const createPost = async (category_id, post_name) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/posts/createPost`,
      { category_id, post_name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
};
export const updatePost = async (postId, category_id, post_name) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/posts/updatePost/${postId}`,
      { category_id, post_name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error.message);
    throw error;
  }
};
export const deletePost = async (postId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/posts/deletePost/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting post:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getSubPosts = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/subposts/getAllSubPosts`,
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
export const createSubPost = async (postId, subPostName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/subposts/createSubPost`,
      { post_id: postId, subpost_name: subPostName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating sub post:", error.message);
    throw error;
  }
};
export const deleteSubPost = async (subPostId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/subposts/deleteSubPost/${subPostId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting sub post:", error.message);
    throw error;
  }
};
export const updateSubPost = async (subPostId, postId, subPostName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/subposts/updateSubPost/${subPostId}`,
      { post_id: postId, subpost_name: subPostName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating sub post:", error.message);
    throw error;
  }
};
export const getDepartment = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/departments/getAllDepartments`,
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
export const createDepartment = async (departmentName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/departments/createDepartment`,
      { depart_name: departmentName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error.message);
    throw error;
  }
};
export const updateDepartment = async (id, departmentName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/departments/updateDepartment/${id}`,
      { depart_name: departmentName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error.message);
    throw error;
  }
};
export const deleteDepartment = async (id) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    await axios.delete(
      `${NEW_ADMIN_BASE_URL}/departments/deleteDepartment/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error deleting department:", error.message);
    throw error;
  }
};
export const getSubjects = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/subjects/getAllSubjects`,
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
export const createSubject = async (subjectName, departmentId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/subjects/createSubject`,
      {
        subject_name: subjectName,
        department_id: departmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating subject:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updateSubject = async (id, subjectName, departmentId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/subjects/updateSubject/${id}`,
      {
        subject_name: subjectName,
        department_id: departmentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating subject:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteSubject = async (id) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/subjects/deleteSubject/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting subject:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getExamType = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/exam-types/getAllExamTypes`,
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
export const createExamType = async (examTypeName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/exam-types/createExamType`,
      { exam_type_name: examTypeName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating exam type:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteExamType = async (id) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/exam-types/deleteExamType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting exam type:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updateExamType = async (id, name) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/exam-types/updateExamType/${id}`,
      { exam_type_name: name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating exam type:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getDegree = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/degrees/getAllDegrees`,
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
export const createDegree = async (degreeName, examTypeId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/degrees/createDegree`,
      {
        degree_name: degreeName,
        exam_type_id: examTypeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating degree:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updateDegree = async (degreeId, degreeName, examTypeId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/degrees/updateDegree/${degreeId}`,
      {
        degree_name: degreeName,
        exam_type_id: examTypeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating degree:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteDegree = async (degreeId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/degrees/deleteDegree/${degreeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting degree:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getAllApplicants = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/applicants/getAllApplicants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching applicants:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getJobOpenings = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/getAllMasterJobOpenings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching applicants:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const createJobOpening = async (jobData) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/createMasterJobOpenings`,
      jobData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating job opening:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getCombineCategories = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/category/getAll-category-post-subpost`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
