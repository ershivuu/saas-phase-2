import axios from "axios";
import Notification from "../Notification/Notification";
import { ADMIN_BASE_URL } from "../config/config";

const adminApiService = {
  getJobCategories: async () => {
    try {
      return await axios.get(`${ADMIN_BASE_URL}/jobCategory`, {});
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  AddCategory: async (data) => {
    try {
      const response = await axios.post(`${ADMIN_BASE_URL}/jobCategory`, data, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  DeleteCategory: async (categoryId) => {
    try {
      const response = await axios.delete(
        `${ADMIN_BASE_URL}/jobCategory/${categoryId}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  updateCategory: async (updateID, data) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/jobCategory/${updateID}`,
        data,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getExam: async () => {
    try {
      return await axios.get(`${ADMIN_BASE_URL}/examTypeMaster`);
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getDegreeTypeMaster: async () => {
    try {
      return await axios.get(`${ADMIN_BASE_URL}/degreeTypeMaster`);
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getDegreeById: async (id) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/degreeTypeMaster/${id}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addDegreeType: async (selectedExamId, newDegree) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/degreeTypeMaster`,
        {
          exam_types_master_id: selectedExamId,
          degree_name: newDegree,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateDegree: async (payload) => {
    try {

      await axios.put(`${ADMIN_BASE_URL}/degreeTypeMaster`, payload, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
    } catch (error) {
      throw new Error("Error updating degree:", error);
    }
  },
  addDepartment: async (newDepartmentName) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/departmentMaster`,
        { dept_name: newDepartmentName },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error adding department:", error);
    }
  },
  deleteDepartment: async (id) => {
    try {
      await axios.delete(`${ADMIN_BASE_URL}/departmentMaster/${id}`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
    } catch (error) {
      throw new Error("Error deleting department:", error);
    }
  },
  updateDepartment: async (newDepartmentName, editingDepartmentId) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/departmentMaster`,
        {
          dept_name: newDepartmentName,
          department_id: editingDepartmentId,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error updating department:", error);
    }
  },
  getDepartments: async () => {
    try {
      return axios.get(`${ADMIN_BASE_URL}/departmentMaster`);
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  addExamType: async (newExamType) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/examTypeMaster`,
        {
          exam_name: newExamType,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error adding exam type:", error);
    }
  },
  updateExamType: async (selectedExam) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/examTypeMaster`,
        {
          examtypes_id: selectedExam.id,
          exam_name: selectedExam.exam_name,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error updating exam type:", error);
    }
  },
  getJobCategory: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/jobCategory`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching job categories:", error);
    }
  },
  getPosts: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/appliedPost`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching posts:", error);
    }
  },
  addPost: async (newCategory, selectedCategoryId) => {
    try {
      await axios.post(
        `${ADMIN_BASE_URL}/appliedPost`,
        {
          post_name: newCategory,
          job_category_master_id: selectedCategoryId,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
    } catch (error) {
      throw new Error("Error adding post:", error);
    }
  },
  deletePost: async (categoryId) => {
    try {
      const response = await axios.delete(
        `${ADMIN_BASE_URL}/appliedPost/${categoryId}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response; // Change to return the whole response
    } catch (error) {
      throw new Error("Error deleting post:", error); // Remove the comma after "post"
    }
  },
  fetchSubjects: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/subjectMaster`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching subjects:", error);
    }
  },
  updatePost: async (selectedPost) => {
    try {
      const updatedData = {
        appliedpost_id: selectedPost.id,
        job_category_master_id: selectedPost.job_category_master.id,
        post_name: selectedPost.post_name,
      };

      await axios.put(`${ADMIN_BASE_URL}/appliedPost`, updatedData, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
    } catch (error) {
      throw new Error("Update failed:", error);
    }
  },
  addSubject: async (newSubject, newSubjectType, newSubjectDescription) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/subjectMaster`,
        {
          subject_name: newSubject,
          subject_type: newSubjectType,
          description: newSubjectDescription,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error adding subject:", error);
    }
  },
  updateSubject: async (
    newSubject,
    editingSubject,
    newSubjectType,
    newSubjectDescription
  ) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/subjectMaster`,
        {
          subject_name: newSubject,
          subjects_id: editingSubject.id,
          subject_type: newSubjectType,
          description: newSubjectDescription,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error updating subject:", error);
    }
  },
  deleteSubject: async (id) => {
    try {
      await axios.delete(`${ADMIN_BASE_URL}/subjectMaster/${id}`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
    } catch (error) {
      throw new Error("Error deleting subject:", error);
    }
  },
  fetchAppliedSubPosts: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/appliedSubPost`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching applied sub posts:", error);
    }
  },
  getJobProfile: async () => {
    // return axios.get(`${ADMIN_BASE_URL}/jobProfileMaster`);
    try {
      return await axios.get(`${ADMIN_BASE_URL}/jobProfileMaster`);
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  postJobProfile: async (formValues) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/jobProfileMaster`,
        formValues,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      Notification({
        open: true,
        handleClose: () => { }, // Define handleClose function if needed
        alertMessage: `Error posting job profile: ${error.message}`,
        alertSeverity: "error",
      });
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getJobProfileById: async (profileId) => {
    // return axios.get(`${ADMIN_BASE_URL}/jobProfileMaster/${profileId}`);
    try {
      return await axios.get(`${ADMIN_BASE_URL}/jobProfileMaster/${profileId}`);
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  deleteJobProfileById: async (profileID) => {
    try {
      await axios.delete(`${ADMIN_BASE_URL}/jobProfileMaster/${profileID}`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
    } catch (error) {
      throw new Error("Error deleting subpost:", error);
    }
    // return axios.delete(`${ADMIN_BASE_URL}/jobProfileMaster/${profileID}`);
  },
  updateJobProfile: async (profileID) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/jobProfileMaster`,
        profileID,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  addApplied: async (requestData) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/candidateAppliedPost/addApplied`,
        requestData,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addSubPost: async (selectedPostId, newPost) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/appliedSubPost`,
        {
          applied_post_masters_id: Number(selectedPostId), // Convert to number
          subpost_name: newPost,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error adding sub post:", error);
    }
  },
  deleteSubPost: async (subPostId) => {
    try {
      await axios.delete(`${ADMIN_BASE_URL}/appliedSubPost/${subPostId}`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
    } catch (error) {
      throw new Error("Error deleting subpost:", error);
    }
  },
  updateSubPost: async (selectedPost, updatePost) => {
    try {
      await axios.put(
        `${ADMIN_BASE_URL}/appliedSubPost`,
        {
          appliedSubPost_id: selectedPost.id,
          applied_post_masters_id: selectedPost.applied_post_master.id,
          subpost_name: updatePost,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
    } catch (error) {
      throw new Error("Error updating subpost:", error);
    }
  },
  renderCandidateResume: async (candidateId) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/candidates/renderCandidateResume?candidate_id=${candidateId}`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAdminList: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/admin/getAdmin`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getRoleList: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/adminRole/getRole`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getRightsList: async () => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/adminRights/getRights`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  createRole: async (data) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/adminRole/createRole`,
        data,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  createRights: async (data) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/adminRights/createRights`,
        data,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  updateRights: async (data) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/adminRights/updateRights`,
        data,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  deleteAdminRoleById: async (roleID) => {
    try {
      return await axios.delete(
        `${ADMIN_BASE_URL}/adminRole/removeRoleById/${roleID}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  deleteRightsById: async (rightsID) => {
    try {
      return await axios.delete(
        `${ADMIN_BASE_URL}/adminRights/removeRights/${rightsID}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  deleteAdminById: async (adminID) => {
    try {
      try {
        return await axios.get(`${ADMIN_BASE_URL}/degreeTypeMaster`);
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  updateRoleById: async (data) => {
    try {
      return await axios.put(
        `${ADMIN_BASE_URL}/adminRole/updateRoleById`,
        data,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  updateAdminBySuperAdmin: async (updateData) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/admin/updateAdminBySuperAdmin`,
        updateData,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  getCandidatesById: async (listID, signal) => {
    try {
      return await axios.get(
        `${ADMIN_BASE_URL}/admin/getCandidatesById/${listID}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
          signal,
        }
      );
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  fetchData: async (
    currentPage,
    itemsPerPage,
    selectedCategory,
    selectedPost
  ) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/candidateAppliedPost/getCandidatesAppliedPostSorted?page=${currentPage}&limit=${itemsPerPage}&category=${selectedCategory}&appliedPost=${selectedPost}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  downloadExcel: async (selectedCategory, selectedPost) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/candidateAppliedPost/getCandidatesAppliedPostExcel?category=${selectedCategory}&appliedPost=${selectedPost}`,
        {
          responseType: 'blob',
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getAllInterview: async (currentPage, itemsPerPage ) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/jobProfileMaster/getJobProfilePaginatedNSorted?limit=${itemsPerPage}&page=${currentPage}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getMasterviewAllInterview: async (currentPage,itemsPerPage,categoryValue,departValue,PostValue) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/jobProfileMaster/getJobProfilePaginatedNSorted?limit=${itemsPerPage}&page=${currentPage}&category_name=${categoryValue}&dept_name=${departValue}&post_name=${PostValue}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  changeJobProfileIsActive: async (jobProfileId, isActive) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/jobProfileMaster/changeJobProfileIsActive`,
        {
          jobprofile_id: jobProfileId,
          is_active: isActive,
        },
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      // console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response.data);
      throw error;
    }
  },

  getVisitor: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/visitor/getVisitor`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  registerVisitor: async (formData) => {
    try {
      const response = await axios.post(
        `${ADMIN_BASE_URL}/visitor/registerVisitor`,
        formData,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },
  updateVisitor: async (updateField) => {
    try {
      const response = await axios.put(
        `${ADMIN_BASE_URL}/visitor/updateVisitor`,
        updateField,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );

      console.log("Save Changes Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error saving changes:", error.message);
      throw error;
    }
  },
  removeVisitor: async (payloadData) => {
    try {
      const response = await axios.delete(
        `${ADMIN_BASE_URL}/visitor/removeVisitor`,
        {
          headers: {
            "access-token": getAccessToken()
          },
          data: payloadData
        }
      );
      console.log("Save Changes Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error saving changes:", error.message);
      throw error;
    }
  },


  getAllCounts: async () => {
    try {
      const response = await axios.get(`${ADMIN_BASE_URL}/reports/getCountReport`, {
        headers: {
          "access-token": getAccessToken(),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  },


  getJobProfileByCnD: async (departmentName) => {
    try {
      const response = await axios.get(
        `${ADMIN_BASE_URL}/jobProfileMaster/getJobProfileByCnD?dept_name=${departmentName}`,
        {
          headers: {
            "access-token": getAccessToken(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

};

function getAccessToken() {
  const accessToken = sessionStorage.getItem("Token");
  return accessToken ? JSON.parse(accessToken).token : null;
}
export default adminApiService;
