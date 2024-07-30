// import React, { useEffect } from "react";
// function FormValidation({  formData,  }) {
//   // Add your validation logic here
//   const isFormValid = () => {
//     // Validate each field
//     const isTitleValid = formData.title_first_name !== "";
//     const isFirstNameValid = formData.first_name !== "";
//     const isDOBValid = formData.dob !== "";
//     const isGenderValid = formData.gender !== "";
//     const isEmailValid = validateEmail(formData.email);
//     const isPhoneNumberValid = validatePhoneNumber(formData.contact_1);
//     const isCountryValid = formData.country !== "";
//     const isCityValid = formData.city !== "";
//     const isJobCategoryValid = formData.job_category_master_id !== "";
//     const isPostValid = formData.applied_post_masters_id !== "";
//     const isSubPostValid = formData.applied_subpost_master_id !== "";
//     const isSubjectValid = formData.subjects_master_id !== "";

//     // Return true if all fields are valid, false otherwise
//     return (
//       isTitleValid &&
//       isFirstNameValid &&
//       isDOBValid &&
//       isGenderValid &&
//       isEmailValid &&
//       isPhoneNumberValid &&
//       isCountryValid &&
//       isCityValid &&
//       isJobCategoryValid &&
//       isPostValid &&
//       isSubPostValid &&
//       isSubjectValid
//     );
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     // Simple phone number validation (10 digits)
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phoneNumber);
//   };


//   useEffect(() => {
//     isFormValid(isFormValid());
//   }, [formData, isFormValid]);

//   return (
//     <div>
//       {/* Display error message or perform actions based on form validity */}
//       {!isFormValid() && (
//         <p style={{ color: "red" }}>Please fill in all required fields.</p>
//       )}
//     </div>
//   );
// }

// export default FormValidation;