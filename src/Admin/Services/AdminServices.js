import axios from "axios";
import { ADMIN_BASE_URL } from "../../config/config";

export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${ADMIN_BASE_URL}/admin/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
