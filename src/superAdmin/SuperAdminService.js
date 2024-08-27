import axios from "axios";
import { SUPER_ADMIN_BASE_URL } from "../config/config";

export const loginSuperAdmin = async (email, password) => {
  try {
    const response = await axios.post(
      `${SUPER_ADMIN_BASE_URL}/superadmin/login`,
      { email, password }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
const getAuthToken = () => {
  let token = sessionStorage.getItem("Token");
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  console.log("Cleaned Token:", token);
  return token;
};

export const getCompanyData = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/all-admins`,
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
export const getCompanyCount = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/company-counts`,
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
export const getActivePlan = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/subscriptions/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Make sure this contains the expected data
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error to handle it further up the call stack if needed
  }
};
export const getSubscriptionPlan = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/subscription-plans/getSubscriptions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Make sure this contains the expected data
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error to handle it further up the call stack if needed
  }
};
export const createAdmin = async (formValues) => {
  const token = getAuthToken(); // Function to get the auth token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${SUPER_ADMIN_BASE_URL}/superadmin/create-admin`,
      formValues, // Include form values in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Make sure this contains the expected data
  } catch (error) {
    console.error(
      "Error registering company data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updatePlanStatus = async (planId, status) => {
  const token = getAuthToken(); // Function to get the auth token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.patch(
      `${SUPER_ADMIN_BASE_URL}/subscriptions/update/${planId}`,
      { plan_status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating plan status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updatePlan = async (id, planData) => {
  const token = getAuthToken(); // Function to get the auth token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${SUPER_ADMIN_BASE_URL}/subscription-plans/subscriptions/edit/${id}`,
      planData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating plan:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      `Error updating plan: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
};
export const createPlan = async (planData) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${SUPER_ADMIN_BASE_URL}/subscription-plans/create`,
      planData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating plan:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      `Error creating plan: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
};

export const getLoginLogs = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/login-logs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching login logs:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteCompany = async (adminId) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.delete(
      `${SUPER_ADMIN_BASE_URL}/superadmin/delete-admin/${adminId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting company:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const submitSubscriptionPlan = async (adminId, planId) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${SUPER_ADMIN_BASE_URL}/superadmin/subscription-plan/${adminId}`,
      { subscription_plan: planId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting subscription plan:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getExpiredCompany = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/get-expired-admins`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming the data is directly the list of companies
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const deleteSubscriptionPlan = async (id) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }
  try {
    const response = await axios.delete(
      `${SUPER_ADMIN_BASE_URL}/subscription-plans/deleteSubscriptionPlan/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
