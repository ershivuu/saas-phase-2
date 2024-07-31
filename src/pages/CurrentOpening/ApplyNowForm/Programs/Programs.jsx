import React from "react";

import minusicon from "../../../../assets/logos/minus.png";
import plusicon from "../../../../assets/logos/plus.png";

function Programs({ formValues, setFormValues }) {
  // const [courses, setCourses] = useState([{}]);

  // const [formValues, setFormValues] = useState({

  //   seminar_organised: [{
  //     organise_date_from: '',
  //     organise_date_to: '',
  //     name_of_course: '',
  //     sponsered_by: '',
  //     participants_number: '',
  //     name_of_institute: '',
  //     name_of_industry: '',

  //   }],
  //   seminar_attend: [{
  //     attend_date_from: '',
  //     attend_date_to: '',
  //     name_of_course: '',
  //     sponsered_by: '',

  //   }],
  //   other_membership_info: [{
  //     member_of_institute_name: '',
  //     membership_date_from: '',
  //     membership_date_to: '',
  //     position_held: '',
  //     contribution: ''
  //   }],
  //   awards_won:'',
  //   extra_activities:'',
  //   any_other_info:'',
  //   expected_joining_time:''
  // });

  const handleAddseminar_organised = (e) => {
    e.preventDefault();
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        seminar_organised: [
          ...prevData.UserDetails.seminar_organised,
          {
            organise_date_from: "",
            organise_date_to: "",
            name_of_course: "",
            sponsered_by: "",
            participants_number: "",
            name_of_institute: "",
            name_of_industry: "",
          },
        ],
      },
    }));
  };

  const handleRemoveSeminarOrganised = (index) => {
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        seminar_organised: prevData.UserDetails.seminar_organised.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleAddseminar_attend = (e) => {
    e.preventDefault();
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        seminar_attend: [
          ...prevData.UserDetails.seminar_attend,
          {
            attend_date_from: "",
            attend_date_to: "",
            name_of_course: "",
            sponsered_by: "",
          },
        ],
      },
    }));
  };

  const handleRemoveSeminarAttend = (index) => {
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        seminar_attend: prevData.UserDetails.seminar_attend.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };
  const handleAddother_membership_info = (e) => {
    e.preventDefault();
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        other_membership_info: [
          ...prevData.UserDetails.other_membership_info,
          {
            member_of_institute_name: "",
            membership_date_from: "",
            membership_date_to: "",
            position_held: "",
            contribution: "",
          },
        ],
      },
    }));
  };

  const handleRemoveOtherMembershipInfo = (index) => {
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        other_membership_info:
          prevData.UserDetails.other_membership_info.filter(
            (_, i) => i !== index
          ),
      },
    }));
  };

  const handleOrganisedInputChange = (e, index, field) => {
    const newData = [...formValues.seminar_organised];
    newData[index][field] = e.target.value;
    setFormValues((prevData) => ({ ...prevData, seminar_organised: newData }));
  };
  const handleAttendInputChange = (e, index, field) => {
    const newData = [...formValues.seminar_attend];
    newData[index][field] = e.target.value;
    setFormValues((prevData) => ({ ...prevData, seminar_attend: newData }));
  };
  const handleOtherMembershipInputChange = (e, index, field) => {
    const newData = [...formValues.other_membership_info];
    newData[index][field] = e.target.value;
    setFormValues((prevData) => ({
      ...prevData,
      other_membership_info: newData,
    }));
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormValues((prevData) => ({
      UserDetails: {
        ...prevData.UserDetails,
        [field]: value,
      },
    }));
  };

  return (
    <>
      <form method="post">
        <div className="container">
          <div style={{ marginTop: "20px" }}>
            <div>
              <h5 className="UD-heading">
                Seminars/Short Term Courses/Summer Schools/Winter Schools
              </h5>
              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

            {/* Organized*/}

            <div>
              <p className="HS-heading">Organized</p>
            </div>

            {formValues.seminar_organised.map((seminar_organised, index) => (
              <div key={index}>
                {index > 0 && <hr style={{ margin: "24px 0" }} />}
                <div className="row" style={{ marginTop: "4px" }}>
                  <div>
                    {formValues.seminar_organised.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSeminarOrganised(index)}
                        className="minus-buttons"
                      >
                        <img src={minusicon} alt="Remove seminar_organised" />
                      </button>
                    )}
                    {index === formValues.seminar_organised.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddseminar_organised}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add seminar_organised" />
                      </button>
                    )}
                  </div>
                  <div className="col-md-4">
                    {/* Date From*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Date From
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder="MM/DD/YYYY "
                        name="organise_date_from"
                        id=""
                        value={seminar_organised.organise_date_from}
                        onChange={(e) =>
                          handleOrganisedInputChange(
                            e,
                            index,
                            "organise_date_from"
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Date To */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Date To
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder=" MM/DD/YYYY"
                        name="organise_date_to"
                        id=""
                        value={seminar_organised.organise_date_to}
                        onChange={(e) =>
                          handleOrganisedInputChange(
                            e,
                            index,
                            "organise_date_to"
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Name of the Course*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Name of the Course
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="name_of_course"
                        id=""
                        value={seminar_organised.name_of_course}
                        onChange={(e) =>
                          handleOrganisedInputChange(e, index, "name_of_course")
                        }
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    {/* Sponsored By*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Sponsored By
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="sponsered_by"
                        id=""
                        value={seminar_organised.sponsered_by}
                        onChange={(e) =>
                          handleOrganisedInputChange(e, index, "sponsered_by")
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* No. of Participants */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>No. of Participants
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="participants_number"
                        id=""
                        value={seminar_organised.participants_number}
                        onChange={(e) =>
                          handleOrganisedInputChange(
                            e,
                            index,
                            "participants_number"
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* From Institutes*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>From Institutes
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="name_of_institute"
                        id=""
                        value={seminar_organised.name_of_institute}
                        onChange={(e) =>
                          handleOrganisedInputChange(
                            e,
                            index,
                            "name_of_institute"
                          )
                        }
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    {/* From Industry*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>From Industry
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="name_of_industry"
                        id=""
                        value={seminar_organised.name_of_industry}
                        onChange={(e) =>
                          handleOrganisedInputChange(
                            e,
                            index,
                            "name_of_industry"
                          )
                        }
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Attended*/}

            <div>
              <p className="HS-heading">Attended</p>
            </div>

            {formValues.seminar_attend.map((seminar_attend, index) => (
              <div key={index}>
                {index > 0 && <hr style={{ margin: "24px 0" }} />}
                <div className="row" style={{ marginTop: "4px" }}>
                  <div>
                    {formValues.seminar_attend.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSeminarAttend(index)}
                        className="minus-buttons"
                      >
                        <img src={minusicon} alt="Remove seminar_attend" />
                      </button>
                    )}
                    {index === formValues.seminar_attend.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddseminar_attend}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add seminar_attend" />
                      </button>
                    )}
                  </div>
                  <div className="col-md-4">
                    {/* Date From*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Date From
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder="MM/DD/YYYY "
                        name="attend_date_from"
                        id=""
                        value={seminar_attend.attend_date_from}
                        onChange={(e) =>
                          handleAttendInputChange(e, index, "attend_date_from")
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Date To */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Date To
                      </label>
                      <input
                        className="UD-set-input"
                        type="date"
                        placeholder=" MM/DD/YYYY"
                        name="attend_date_to"
                        id=""
                        value={seminar_attend.attend_date_to}
                        onChange={(e) =>
                          handleAttendInputChange(e, index, "attend_date_to")
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Name of the Course*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Name of the Course
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="name_of_course"
                        id=""
                        value={seminar_attend.name_of_course}
                        onChange={(e) =>
                          handleAttendInputChange(e, index, "name_of_course")
                        }
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    {/* Sponsored By Institute/Industry*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Sponsored By Institute/Industry
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="sponsered_by"
                        id=""
                        value={seminar_attend.sponsered_by}
                        onChange={(e) =>
                          handleAttendInputChange(e, index, "sponsered_by")
                        }
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Other Information*/}

            <div>
              <p className="HS-heading">Other Information</p>
            </div>
            {formValues.other_membership_info.map(
              (other_membership_info, index) => (
                <div key={index}>
                  {index > 0 && <hr style={{ margin: "24px 0" }} />}
                  {/* <div className="row" style={{ marginTop: "-30px" }}>
          <div className="col-md-12">
  
            <div className="UD-form-section">
              <label className="UD-SetLabel-Name">
                <span></span>Membership of Professional Bodies
              </label>
              <input
              style={{width:"95%"}}
                className="UD-set-input"
                type="text"
                placeholder=""
                name=""
                id=""
               
              ></input>
            </div>
          </div>


        </div> */}

                  <div className="row" style={{ marginTop: "4px" }}>
                    <div>
                      {formValues.other_membership_info.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOtherMembershipInfo(index)}
                          className="minus-buttons"
                        >
                          <img
                            src={minusicon}
                            alt="Remove other_membership_info"
                          />
                        </button>
                      )}
                      {index ===
                        formValues.other_membership_info.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddother_membership_info}
                          className="plus-buttons"
                        >
                          <img src={plusicon} alt="Add other_membership_info" />
                        </button>
                      )}
                    </div>
                    <div className="col-md-12">
                      {/* Membership of University/Institute/Industry Bodies*/}
                      <div style={{ marginTop: "30px" }}>
                        <label className="UD-SetLabel-Name">
                          <span></span>Membership of
                          University/Institute/Industry Bodies/Professional
                          Bodies
                        </label>
                        <input
                          style={{ width: "99.5%" }}
                          className="UD-set-input"
                          type="text"
                          placeholder=""
                          name="member_of_institute_name"
                          id=""
                          value={other_membership_info.member_of_institute_name}
                          onChange={(e) =>
                            handleOtherMembershipInputChange(
                              e,
                              index,
                              "member_of_institute_name"
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>

                  {/* Attended*/}

                  <div>
                    <p className="HS-heading">Attended</p>
                  </div>

                  <div className="row" style={{ marginTop: "4px" }}>
                    <div className="col-md-4">
                      {/* Date From*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Date From
                        </label>
                        <input
                          className="UD-set-input"
                          type="date"
                          placeholder="MM/DD/YYYY "
                          name="membership_date_from"
                          id=""
                          value={other_membership_info.membership_date_from}
                          onChange={(e) =>
                            handleOtherMembershipInputChange(
                              e,
                              index,
                              "membership_date_from"
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Date To */}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Date To
                        </label>
                        <input
                          className="UD-set-input"
                          type="date"
                          placeholder=" MM/DD/YYYY"
                          name="membership_date_to"
                          id=""
                          value={other_membership_info.membership_date_to}
                          onChange={(e) =>
                            handleOtherMembershipInputChange(
                              e,
                              index,
                              "membership_date_to"
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Position Held*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Position Held
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="position_held"
                          id=""
                          value={other_membership_info.position_held}
                          onChange={(e) =>
                            handleOtherMembershipInputChange(
                              e,
                              index,
                              "position_held"
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      {/* Contribution*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Contribution
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="contribution"
                          id=""
                          value={other_membership_info.contribution}
                          onChange={(e) =>
                            handleOtherMembershipInputChange(
                              e,
                              index,
                              "contribution"
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* --------------------------------------------------------------------------------------- */}

            <div className="row" style={{ marginTop: "-30px" }}>
              <div className="col-md-12">
                {/* Awards/Recognitions Won, If any*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Awards/Recognitions Won, If any
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="awards_won"
                    id=""
                    value={formValues.awards_won}
                    onChange={(e) => handleInputChange(e, "awards_won")}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "-30px" }}>
              <div className="col-md-12">
                {/*Brief Description of Co-curricular and Extra-Curricular Activities*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Brief Description of Co-curricular and
                    Extra-Curricular Activities
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="extra_activities"
                    id=""
                    value={formValues.extra_activities}
                    onChange={(e) => handleInputChange(e, "extra_activities")}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "-30px" }}>
              <div className="col-md-12">
                {/*Any Other Relevant Information You May Like To Furnish Especially About Citation Of Your Research Work*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Any Other Relevant Information You May Like To
                    Furnish Especially About Citation Of Your Research Work
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="any_other_info"
                    id=""
                    value={formValues.any_other_info}
                    onChange={(e) => handleInputChange(e, "any_other_info")}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop: "-30px" }}>
              <div className="col-md-12">
                {/*Period For Joining The Post, If Selected*/}
                <div className="UD-form-section">
                  <label className="UD-SetLabel-Name">
                    <span></span>Period For Joining The Post, If Selected
                  </label>
                  <input
                    style={{ width: "99.5%" }}
                    className="UD-set-input"
                    type="text"
                    placeholder=""
                    name="expected_joining_time"
                    id=""
                    value={formValues.expected_joining_time}
                    onChange={(e) =>
                      handleInputChange(e, "expected_joining_time")
                    }
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Programs;
