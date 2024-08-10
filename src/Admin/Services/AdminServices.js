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
export const createSubPost = async (postId, categoryId, subPostName) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${NEW_ADMIN_BASE_URL}/subposts/createSubPost`,
      { post_id: postId, category_id: categoryId, subpost_name: subPostName },
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
export const updateSubPost = async (
  subPostId,
  postId,
  categoryId,
  subPostName
) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/subposts/updateSubPost/${subPostId}`,
      { post_id: postId, category_id: categoryId, subpost_name: subPostName },
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

export const getInterviewSchedule = async () => {
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
    return response.data.jobOpenings;
  } catch (error) {
    console.error(
      "Error fetching job openings:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateInterviewSchedule = async (id, data) => {
  const token = getAdminToken(); // Retrieve the token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.patch(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/updateMasterInterviewSchedule/${id}`,
      data, // Data should include all updated fields, including publish_to_schedule_interview
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating interview schedule:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateJobOpening = async (id, data) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/updateMasterJobOpenings/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating job opening:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updateJobProfile = async (id, updatedData) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.patch(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/updateJobProfiles/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating job profile:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteJobOpening = async (jobOpeningId) => {
  const token = getAdminToken(); // Retrieve the authentication token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    // Make the DELETE request to the API
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/deleteMasterJobOpenings/${jobOpeningId}`, // Adjust the endpoint path as needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error(
      "Error deleting job opening:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propagate the error to be handled by the caller
  }
};
export const deleteApplicant = async (applicantId) => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    await axios.delete(
      `${NEW_ADMIN_BASE_URL}/applicants/deleteApplicant/${applicantId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(
      "Error deleting applicant:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const getAdminProfile = async () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(`${NEW_ADMIN_BASE_URL}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching admin data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const registerAdmin = async (email, password, contact, company_name) => {
  try {
    const response = await axios.post(`${NEW_ADMIN_BASE_URL}/admin/register`, {
      email,
      password,
      contact,
      company_name,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllVisitors = async () => {
  const token = getAdminToken(); // Retrieve the token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/visitors/getAllVisitors`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Optional, depending on API requirements
        },
      }
    );
    return response.data.data; // Adjust according to your API response structure
  } catch (error) {
    console.error(
      "Error fetching visitors:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error for handling in the calling code
  }
};
export const deleteVisitor = async (id) => {
  const token = getAdminToken(); // Retrieve the token
  try {
    const response = await axios.delete(
      `${NEW_ADMIN_BASE_URL}/visitors/deleteVisitors/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Optional, depending on API requirements
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting visitor:", error);
    throw error; // Propagate the error
  }
};
export const getFilteredJobOpenings = async (filters, page, limit) => {
  const token = getAdminToken();
  try {
    const response = await axios.get(
      `${NEW_ADMIN_BASE_URL}/jobOpenings/getFilteredMasterJobOpenings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          ...filters,
          page,
          limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
