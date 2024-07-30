import React, { useState, useEffect } from "react";
import "./EditResearchForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import candidatesApiService from "../../../candidateService";
import plusicon from "../../../../assets/logos/plus.png";
import minusicon from "../../../../assets/logos/minus.png";
import Notification from "../../../../Notification/Notification";
function EditResearchForm() {
  // const [researches, setResearches] = useState({ candidate_research_works: [{}] });
  // const [journal_publications, setjournal_publications] = useState([{}]);

  // const [conference_publications, setconference_publications] = useState([{}]);
  // const [patents, setPatents] = useState([{}]);
  // const [copyrights, setCopyrights] = useState([{}]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    candidate_research_works: [],
    candidate_journal_publications: [],
    candidate_conference_publications: [],
    candidate_patents: [],
    candidate_copyrights: [],
  });
  const [researchField, setResearchField] = useState({});
  const [journalPublicationField, setJournalPublicationField] = useState({});
  const [conferancePublicationField, setConferancePublicationField] = useState(
    {}
  );
  const [patentField, setPatentField] = useState({});
  const [copyrightField, setCopyrightField] = useState({});
  // const [updateField, setUpdateField] = useState({});

  // const fetchData = async () => {
  //   try {
  //     let accessToken = sessionStorage.getItem("Token");
  //     accessToken = JSON.parse(accessToken);
  //      console.log("accessToken", accessToken.token);
  //     setLoading(true);
  //     const fetchedData = await candidatesApiService.getCandidateById(
  //       accessToken.token
  //     );
  //     console.log("response", fetchedData);
  //     setData(fetchedData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // console.log("use-state");
    fetchData();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (loading) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [loading]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedData = await candidatesApiService.getCandidateResearchWork();
      // console.log("response", fetchedData);
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("use-state")
    fetchData();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (loading) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [loading]);

  const handleAddResearches = () => {
    setData((prevData) => ({
      ...prevData,
      candidate_research_works: [
        ...prevData.candidate_research_works,
        {
          orcid: "",
          scopusid: "",
          researchid: "",
        },
      ],
    }));
  };

  const handleRemoveResearches = (index) => {
    setData((prevData) => ({
      ...prevData,
      candidate_research_works: prevData.candidate_research_works.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleAddPublication = () => {
    setData((prevData) => ({
      ...prevData,
      candidate_journal_publications: [
        ...prevData.candidate_journal_publications,
        {
          journal_publication_year: "",
          journal_publication_title: "",
          journal_publication_author: "",
          journal_publication_index: "",
          journal_publication_name: "",
          journal_publication_issn: "",
          journal_publication_volume: "",
          journal_publication_issue: "",
        },
      ],
    }));
  };

  const handleRemoveJournalPublication = (index) => {
    setData((prevData) => ({
      ...prevData,
      candidate_journal_publications:
        prevData.candidate_journal_publications.filter((_, i) => i !== index),
    }));
  };

  const handleAddConferences = () => {
    setData((prevData) => ({
      ...prevData,
      candidate_conference_publications: [
        ...prevData.candidate_conference_publications,
        {
          conference_publication_year: "",
          conference_publication_title: "",
          conference_publication_author: "",
          conference_publication_index: "",
          conference_publication_name: "",
          conference_publication_issn: "",
          conference_publication_volume: "",
          conference_publication_issue: "",
        },
      ],
    }));
  };

  const handleRemoveConferencePublication = (index) => {
    setData((prevData) => ({
      ...prevData,
      candidate_conference_publications:
        prevData.candidate_conference_publications.filter(
          (_, i) => i !== index
        ),
    }));
  };
  const handleAddPatents = () => {
    setData((prevData) => ({
      ...prevData,
      candidate_patents: [
        ...prevData.candidate_patents,
        {
          patent_applicationid: "",
          patent_application_title: "",
          patent_application_year: "",
          patent_granted_by: "",
          patent_incountry: "",
        },
      ],
    }));
  };

  const handleRemovePatent = (index) => {
    setData((prevData) => ({
      ...prevData,
      candidate_patents: prevData.candidate_patents.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const handleAddCopyrights = () => {
    setData((prevData) => ({
      ...prevData,
      candidate_copyrights: [
        ...prevData.candidate_copyrights,
        {
          copyright_applicationid: "",
          copyright_title: "",
          copyright_year: "",
          copyright_granted_by: "",
          copyright_incountry: "",
        },
      ],
    }));
  };

  const handleRemoveCopyright = (index) => {
    setData((prevData) => ({
      ...prevData,
      candidate_copyrights: prevData.candidate_copyrights.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const handleResearchChange = (index, field, value) => {
    const updatedResearches = [...data.candidate_research_works];
    const ReasearchesId = updatedResearches[index].id;
    updatedResearches[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      candidate_research_works: updatedResearches,
    }));
    // console.log("handleField", field, value, researchField);
    setResearchField((prev) => ({
      ...prev,
      [field]: value.toString(),
      research_id: ReasearchesId,
    }));
  };

  const handleJournalPublicationChange = (index, field, value) => {
    const updatedJournalPublications = [...data.candidate_journal_publications];
    const JournalId = updatedJournalPublications[index].id;
    updatedJournalPublications[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      candidate_journal_publications: updatedJournalPublications,
    }));
    // console.log("handleField", field, value, journalPublicationField);
    setJournalPublicationField((prev) => ({
      ...prev,
      [field]: value.toString(),
      journal_publication_id: JournalId,
    }));
  };
  const handleConferencePublicationChange = (index, field, value) => {
    const updatedconferencePublications = [
      ...data.candidate_conference_publications,
    ];
    const conferenceId = updatedconferencePublications[index].id;
    updatedconferencePublications[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      candidate_conference_publications: updatedconferencePublications,
    }));
    // console.log("handleField", field, value, conferancePublicationField);
    setConferancePublicationField((prev) => ({
      ...prev,
      [field]: value.toString(),
      id: conferenceId,
    }));
  };
  const handlePatentsChange = (index, field, value) => {
    const updatedPatents = [...data.candidate_patents];
    const patentsId = updatedPatents[index].id;
    updatedPatents[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      candidate_patents: updatedPatents,
    }));
    // console.log("handleField", field, value, patentField);
    setPatentField((prev) => ({
      ...prev,
      [field]: value.toString(),
      patent_id: patentsId,
    }));
  };
  const handleCopyrightsChange = (index, field, value) => {
    const updatedCopyrights = [...data.candidate_copyrights];
    const copyrightsId = updatedCopyrights[index].id;
    updatedCopyrights[index][field] = value;
    setData((prevData) => ({
      ...prevData,
      candidate_copyrights: updatedCopyrights,
    }));
    // console.log("handleField", field, value, copyrightField);
    setCopyrightField((prev) => ({
      ...prev,
      [field]: value.toString(),
      copyright_id: copyrightsId,
    }));
  };
  const hasChanges = (field) => {
    // Implement your logic to check whether the field is defined and has changes
    return field && Object.keys(field).length > 0;
  };
  const handleSaveChanges = async () => {
    try {
      let changesMade = false;
      // console.log(researchField);
      if (researchField && hasChanges(researchField)) {
        await candidatesApiService.updateCandidateResearches({
          researches: [researchField],
        });
        showNotification("Research field updated successfully", "success");
        changesMade = true;
      }

      if (journalPublicationField && hasChanges(journalPublicationField)) {
        await candidatesApiService.updateCandidateJournalPublications({
          journals_publications: [journalPublicationField],
        });
        showNotification(
          "Journal publication field updated successfully",
          "success"
        );
        changesMade = true;
      }

      if (
        conferancePublicationField &&
        hasChanges(conferancePublicationField)
      ) {
        await candidatesApiService.updateCandidateConferancePublications({
          conference_publications: [conferancePublicationField],
        });
        showNotification(
          "Conference publication field updated successfully",
          "success"
        );
        changesMade = true;
      }

      if (patentField && hasChanges(patentField)) {
        await candidatesApiService.updateCandidatePatent({
          patents: [patentField],
        });
        showNotification("Patent field updated successfully", "success");
        changesMade = true;
      }

      if (copyrightField && hasChanges(copyrightField)) {
        await candidatesApiService.updateCandidateCopyright({
          copyrights: [copyrightField],
        });
        showNotification("Copyright field updated successfully", "success");
        changesMade = true;
      }
      if (changesMade) {
        setResearchField({});
        setJournalPublicationField({});
        setConferancePublicationField({});
        setPatentField({});
        setCopyrightField({});
        fetchData();
      } else {
        showNotification("No changes were made", "warning");
      }
    } catch (error) {
      console.error("Error saving changes:", error.message);
      showNotification("Error saving changes: " + error.message, "error");
    }
  };

  // const handleNotificationClose = () => {
  //   setNotificationOpen(false);
  // };

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <form id="myForm" onSubmit={handleSaveChanges}>
        <div
          className="container"
          style={{ marginTop: "90px", }}
        >
          <div>
            <div>
              <h5 className="UD-heading">
                Research Work &nbsp;{" "}
                <FontAwesomeIcon className="edit-pen-icon" icon={faPen} />
              </h5>

              <p className="UD-subheading">
                Please fill your information so we can get in touch with you.
              </p>
            </div>

            {data &&
              data.candidate_research_works &&
              data.candidate_research_works.map((researches, index) => (
                <div key={index}>
                  {index > 0 && <hr style={{ margin: "24px 0" }} />}
                  <div className="row">
                    <div>
                      {data.candidate_research_works.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveResearches(index)}
                          className="minus-buttons"
                        >
                          <img
                            src={minusicon}
                            alt="Remove candidate_research_works"
                          />
                        </button>
                      )}
                      {index === data.candidate_research_works.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddResearches}
                          className="plus-buttons"
                        >
                          <img
                            src={plusicon}
                            alt="Add candidate_research_works"
                          />
                        </button>
                      )}
                    </div>
                    <div className="col-md-4">
                      {/* ORCID Id*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span> ORCID Id
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="orcid"
                          id=""
                          value={researches.orcid || ""}
                          onChange={(e) =>
                            handleResearchChange(index, "orcid", e.target.value)
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Scopus Id */}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Scopus Id
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="scopusid"
                          id=""
                          value={researches.scopusid || ""}
                          onChange={(e) =>
                            handleResearchChange(
                              index,
                              "scopusid",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Research Id*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Research Id
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="researchid"
                          id=""
                          value={researches.researchid || ""}
                          onChange={(e) =>
                            handleResearchChange(
                              index,
                              "researchid",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Journal Publication */}

            <div>
              <p className="HS-heading">Journal Publication </p>
            </div>

            {data?.candidate_journal_publications?.map(
              (journal_publications, index) => (
                <div key={index}>
                  {index > 0 && <hr style={{ margin: "24px 0" }} />}
                  <div className="row">
                    <div>
                      {data?.candidate_journal_publications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveJournalPublication(index)}
                          className="minus-buttons"
                        >
                          <img
                            src={minusicon}
                            alt="Remove Journal Publication"
                          />
                        </button>
                      )}
                      {index ===
                        data?.candidate_journal_publications.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddPublication}
                          className="plus-buttons"
                        >
                          <img src={plusicon} alt="Add Journal Publication" />
                        </button>
                      )}
                    </div>

                    <div className="col-md-4">
                      {/* Year*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Year
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_year"
                          id=""
                          value={
                            journal_publications.journal_publication_year || ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_year",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Title */}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Title
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_title"
                          id=""
                          value={
                            journal_publications.journal_publication_title || ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_title",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Author Role/ Inventor*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Author Role/ Inventor
                        </label>

                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_author"
                          id=""
                          value={
                            journal_publications.journal_publication_author ||
                            ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_author",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      {/* Indexing*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Indexing
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_index"
                          id=""
                          value={
                            journal_publications.journal_publication_index || ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_index",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Journal Name */}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Journal Name
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_name"
                          id=""
                          value={
                            journal_publications.journal_publication_name || ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_name",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* ISSN*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>ISSN
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_issn"
                          id=""
                          value={
                            journal_publications.journal_publication_issn || ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_issn",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      {/* Volume*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Volume
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_volume"
                          id=""
                          value={
                            journal_publications.journal_publication_volume ||
                            ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_volume",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Issue*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Issue
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="journal_publication_issue"
                          id=""
                          value={
                            journal_publications.journal_publication_issue || ""
                          }
                          onChange={(e) =>
                            handleJournalPublicationChange(
                              index,
                              "journal_publication_issue",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Conference Publication */}

            <div>
              <p className="HS-heading">
                Conference Publication{" "}
                {/* <button
                        type="button"
                        onClick={handleAddConferences}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add candidate_conference_publications" />
                      </button> */}
              </p>
            </div>

            {data?.candidate_conference_publications?.map(
              (conference_publications, index) => (
                <div key={index}>
                  {index > 0 && <hr style={{ margin: "24px 0" }} />}
                  <div className="row">
                    <div>
                      {data?.candidate_conference_publications.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveConferencePublication(index)
                          }
                          className="minus-buttons"
                        >
                          <img
                            src={minusicon}
                            alt="Remove Conference Publication"
                          />
                        </button>
                      )}
                      {index ===
                        data?.candidate_conference_publications.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddConferences}
                          className="plus-buttons"
                        >
                          <img
                            src={plusicon}
                            alt="Add Conference Publication"
                          />
                        </button>
                      )}
                    </div>
                    <div className="col-md-4">
                      {/* Year*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Year
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_year"
                          id=""
                          value={
                            conference_publications.conference_publication_year ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_year",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Title */}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Title
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_title"
                          id=""
                          value={
                            conference_publications.conference_publication_title ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_title",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Author Role/ Inventor*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Author Role/ Inventor
                        </label>

                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_author"
                          id=""
                          value={
                            conference_publications.conference_publication_author ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_author",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      {/* Indexing*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Indexing
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_index"
                          id=""
                          value={
                            conference_publications.conference_publication_index ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_index",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Journal Name */}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Journal Name
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_name"
                          id=""
                          value={
                            conference_publications.conference_publication_name ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_name",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* ISSN*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>ISSN
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_issn"
                          id=""
                          value={
                            conference_publications.conference_publication_issn ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_issn",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      {/* Volume*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Volume
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_volume"
                          id=""
                          value={
                            conference_publications.conference_publication_volume ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_volume",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-4">
                      {/* Issue*/}
                      <div className="UD-form-section">
                        <label className="UD-SetLabel-Name">
                          <span></span>Issue
                        </label>
                        <input
                          className="UD-set-input"
                          type="text"
                          placeholder=" "
                          name="conference_publication_issue"
                          id=""
                          value={
                            conference_publications.conference_publication_issue ||
                            ""
                          }
                          onChange={(e) =>
                            handleConferencePublicationChange(
                              index,
                              "conference_publication_issue",
                              e.target.value
                            )
                          }
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Patent*/}

            <div>
              <p className="HS-heading">Patent </p>
            </div>

            {data?.candidate_patents?.map((patents, index) => (
              <div key={index}>
                {index > 0 && <hr style={{ margin: "24px 0" }} />}
                <div className="row">
                  <div>
                    {data?.candidate_patents.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePatent(index)}
                        className="minus-buttons"
                      >
                        <img src={minusicon} alt="Remove Patent" />
                      </button>
                    )}
                    {index === data?.candidate_patents.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddPatents}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add Patent" />
                      </button>
                    )}
                  </div>
                  <div className="col-md-4">
                    {/* Application ID*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Application ID
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="patent_applicationid"
                        id=""
                        value={patents.patent_applicationid || ""}
                        onChange={(e) =>
                          handlePatentsChange(
                            index,
                            "patent_applicationid",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Title */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Title
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="patent_application_title"
                        id=""
                        value={patents.patent_application_title || ""}
                        onChange={(e) =>
                          handlePatentsChange(
                            index,
                            "patent_application_title",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/*Year*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Year
                      </label>

                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="patent_application_year"
                        id=""
                        value={patents.patent_application_year || ""}
                        onChange={(e) =>
                          handlePatentsChange(
                            index,
                            "patent_application_year",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    {/* Published/Granted*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Published/Granted
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="patent_granted_by"
                        id=""
                        value={patents.patent_granted_by || ""}
                        onChange={(e) =>
                          handlePatentsChange(
                            index,
                            "patent_granted_by",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Country*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Country
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="patent_incountry"
                        id=""
                        value={patents.patent_incountry || ""}
                        onChange={(e) =>
                          handlePatentsChange(
                            index,
                            "patent_incountry",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Copyright*/}

            <div>
              <p className="HS-heading">Copyright </p>
            </div>

            {data?.candidate_copyrights?.map((copyrights, index) => (
              <div key={index}>
                {index > 0 && <hr style={{ margin: "24px 0" }} />}
                <div className="row">
                  <div>
                    {data?.candidate_copyrights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCopyright(index)}
                        className="minus-buttons"
                      >
                        <img src={minusicon} alt="Remove Copyright" />
                      </button>
                    )}
                    {index === data?.candidate_copyrights.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddCopyrights}
                        className="plus-buttons"
                      >
                        <img src={plusicon} alt="Add Copyright" />
                      </button>
                    )}
                  </div>
                  <div className="col-md-4">
                    {/* Application ID*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Application ID
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="copyright_applicationid"
                        id=""
                        value={copyrights.copyright_applicationid || ""}
                        onChange={(e) =>
                          handleCopyrightsChange(
                            index,
                            "copyright_applicationid",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Title */}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Title
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="copyright_title"
                        id=""
                        value={copyrights.copyright_title || ""}
                        onChange={(e) =>
                          handleCopyrightsChange(
                            index,
                            "copyright_title",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/*Year*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Year
                      </label>

                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="copyright_year"
                        id=""
                        value={copyrights.copyright_year || ""}
                        onChange={(e) =>
                          handleCopyrightsChange(
                            index,
                            "copyright_year",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    {/* Published/Granted*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Published/Granted
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="copyright_granted_by"
                        id=""
                        value={copyrights.copyright_granted_by || ""}
                        onChange={(e) =>
                          handleCopyrightsChange(
                            index,
                            "copyright_granted_by",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {/* Country*/}
                    <div className="UD-form-section">
                      <label className="UD-SetLabel-Name">
                        <span></span>Country
                      </label>
                      <input
                        className="UD-set-input"
                        type="text"
                        placeholder=" "
                        name="copyright_incountry"
                        id=""
                        value={copyrights.copyright_incountry || ""}
                        onChange={(e) =>
                          handleCopyrightsChange(
                            index,
                            "copyright_incountry",
                            e.target.value
                          )
                        }
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="edit-save-btn">
              <button
                className="savebtn"
                type="button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default EditResearchForm;
