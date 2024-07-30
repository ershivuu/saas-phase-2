// apiService.js
import axios from "axios";

import { CANDIDATE_BASE_URL } from "../config/config";

const apiService = {
  // -------------------
  getJobCategories: async (signal) => {
    try {
      return await axios.get(`${CANDIDATE_BASE_URL}/jobCategory`, { signal });
    } catch (error) {
      console.error("Error Fetching getJobCategories", error);
    }
  },

  getSubjectMaster: async (signal) => {
    try {
      return await axios.get(`${CANDIDATE_BASE_URL}/subjectMaster`, { signal });
    } catch (error) {
      console.error("Error Fetching getSubjectMaster", error);
    }
  },

  getCountries: async (signal) => {
    try {
      return await axios.get("https://countriesnow.space/api/v0.1/countries", {
        signal,
      });
    } catch (error) {
      console.error("Error Fetching getCountries", error);
    }
  },

  getCandidates: async () => {
    try {
      return await axios.post(`${CANDIDATE_BASE_URL}/candidates`);
    } catch (error) {
      console.error("Error Fetching getCandidates", error);
    }
  },

  getExamTypes: async (signal) => {
    try {
      return await axios.get(`${CANDIDATE_BASE_URL}/examTypeMaster`, {
        signal,
      });
    } catch (error) {
      console.error("Error Fetching getExamTypes", error);
    }
  },

  generateOTP: async (otpData) => {
    try {
      return await axios.post(`${CANDIDATE_BASE_URL}/otp/generateOTP`, otpData);
    } catch (error) {
      console.error("Error Fetching generateOTP", error);
    }
  },
  verifyContactOTP: async (verificationData) => {
    try {
      return await axios.post(
        `${CANDIDATE_BASE_URL}/otp/verifyCandidateContactOTP`,
        verificationData
      );
    } catch (error) {
      console.error("Error Fetching verifyContactOTP", error);
    }
  },
  verifyEmailOTP: async (emaildataOTP) => {
    try {
      return await axios.post(
        `${CANDIDATE_BASE_URL}/otp/verifyCandidateEmailOTP`,
        emaildataOTP
      );
    } catch (error) {
      console.error("Error Fetching verifyEmailOTP", error);
    }
  },
  submitCandidateData: async (formData) => {
    try {
      return await axios.post(
        `${CANDIDATE_BASE_URL}/candidates/drop_cv`,
        formData
      );
    } catch (error) {
      console.error("Error Fetching submitCandidateData", error);
    }
  },
  submitApplyNowData: async (formData) => {
    try {
      return await axios.post(
        `${CANDIDATE_BASE_URL}/candidates/apply_now`,
        formData
      );
    } catch (error) {
      console.error("Error Fetching submitApplyNowData", error);
    }
  },
  getAppliedPosts: async () => {
    try {
      return await axios.get(`${CANDIDATE_BASE_URL}/appliedPost`);
    } catch (error) {
      console.error("Error Fetching getAppliedPosts", error);
    }
  },
  getDepartments: async () => {
    try {
      return await axios.get(`${CANDIDATE_BASE_URL}/departmentMaster`);
    } catch (error) {
      console.error("Error Fetching getDepartments", error);
    }
  },
 
};

export default apiService;

