import React from 'react'
const CandidateSeminarForm=({index,data,handleRemoveOrganised,minusicon,handleAddOrganised,plusicon, formatDateForInput,
    seminar_organised,handleOrganisedChange})=>{
    return (<>
    {!seminar_organised&&<div key={index}>
        {index > 0 && <hr style={{ margin: "24px 0" }} />}
        <div className="row">
          <div>
            {data?.candidate_seminar_organiseds.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveOrganised(index)}
                className="minus-buttons"
              >
                <img src={minusicon} alt="Remove Organized Seminar" />
              </button>
            )}
            {index ===
              data?.candidate_seminar_organiseds.length - 1 && (
              <button
                type="button"
                onClick={handleAddOrganised}
                className="plus-buttons"
              >
                <img src={plusicon} alt="Add Organized Seminar" />
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
                placeholder="MM/DD/YYYY"
                name="organise_date_from"
                id=""
                value={formatDateForInput(
                  seminar_organised?.organise_date_from
                )}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "organise_date_from",
                    e.target.value
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
                value={formatDateForInput(
                  seminar_organised?.organise_date_to
                )}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "organise_date_to",
                    e.target.value
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
                value={seminar_organised?.name_of_course}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "name_of_course",
                    e.target.value
                  )
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
                value={seminar_organised?.sponsered_by}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "sponsered_by",
                    e.target.value
                  )
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
                value={seminar_organised?.participants_number}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "participants_number",
                    e.target.value
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
                value={seminar_organised?.name_of_institute}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "name_of_institute",
                    e.target.value
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
                value={seminar_organised?.name_of_industry}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "name_of_industry",
                    e.target.value
                  )
                }
              ></input>
            </div>
          </div>
        </div>
      </div>}
    {/* If existing data form */}
    {seminar_organised&&<div key={index}>
        {index > 0 && <hr style={{ margin: "24px 0" }} />}
        <div className="row">
          <div>
            {data?.candidate_seminar_organiseds.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveOrganised(index)}
                className="minus-buttons"
              >
                <img src={minusicon} alt="Remove Organized Seminar" />
              </button>
            )}
            {index ===
              data?.candidate_seminar_organiseds.length - 1 && (
              <button
                type="button"
                onClick={handleAddOrganised}
                className="plus-buttons"
              >
                <img src={plusicon} alt="Add Organized Seminar" />
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
                placeholder="MM/DD/YYYY"
                name="organise_date_from"
                id=""
                value={formatDateForInput(
                  seminar_organised?.organise_date_from
                )}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "organise_date_from",
                    e.target.value
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
                value={formatDateForInput(
                  seminar_organised?.organise_date_to
                )}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "organise_date_to",
                    e.target.value
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
                value={seminar_organised?.name_of_course}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "name_of_course",
                    e.target.value
                  )
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
                value={seminar_organised?.sponsered_by}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "sponsered_by",
                    e.target.value
                  )
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
                value={seminar_organised?.participants_number}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "participants_number",
                    e.target.value
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
                value={seminar_organised?.name_of_institute}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "name_of_institute",
                    e.target.value
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
                value={seminar_organised?.name_of_industry}
                onChange={(e) =>
                  handleOrganisedChange(
                    index,
                    "name_of_industry",
                    e.target.value
                  )
                }
              ></input>
            </div>
          </div>
        </div>
      </div>}
      </>
    )
}

export default CandidateSeminarForm;