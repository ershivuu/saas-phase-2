import React, { useEffect } from "react";
import "./ContactUs.css";
import Header from "../../components/Header/Header";
import Footers from "../../components/Footer/Footers";
import phonelogo from "../../assets/logos/phone.png";
import emaillogo from "../../assets/logos/email.png";
import locationlogo from "../../assets/logos/location.png";
import adminApiService from "../adminApiService";
import { useState } from "react";
import { getContactUs } from "../../Admin/Services/FrontendServices";
import Notification from "../../Notification/Notification";
function ContactUs() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [phoneNumber3, setPhoneNumber3] = useState("");
  const [phoneNumber4, setPhoneNumber4] = useState("");
  const [boxColor, setboxColor] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [location, setLocation] = useState("");
  const [mapUrl, setmapUrl] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_1: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_1: "",
    message: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);
  const fetchContactInfo = async () => {
    try {
      const response = await getContactUs();
      console.log("check data>>>>>", response.data[0]);
      setPhoneNumber1(response.data[0].contact_1);
      setPhoneNumber2(response.data[0].contact_2);
      setPhoneNumber3(response.data[0].contact_3);
      setPhoneNumber4(response.data[0].contact_4);
      setEmail1(response.data[0].contact_email_1);
      setEmail2(response.data[0].contact_email_2);
      setLocation(response.data[0].contact_add);
      setmapUrl(response.data[0].map_url);
      setboxColor(response.data[0].box_col);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // var phoneNumber = "073131-11500 , 073131-11501";
  // var email = "info@medicaps.ac.in";
  // var location = "A.B.Road,pigdamber,Rau Indore 453331";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const truncatedValue =
      name === "message" ? value.slice(0, 200) : value.slice(0, 40);

    const errorMessage =
      (name === "message" && value.length > 200) ||
      (name !== "message" && value.length > 40)
        ? `Maximum ${name === "message" ? "200" : "40"} characters allowed.`
        : "";
    setFormData({
      ...formData,
      [name]: truncatedValue,
    });
    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData, "<<<");

    // const newFormErrors = {};
    // Object.keys(formData).forEach((key) => {
    //   if (!formData[key]) {
    //     newFormErrors[key] = "This field is required.";
    //   }
    // });

    // if (Object.keys(newFormErrors).length > 0) {
    //   setFormErrors(newFormErrors);
    //   return;
    // }

    const newFormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newFormErrors[key] = "This field is required.";
      }
    });

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newFormErrors.email = "Please enter a valid email address.";
    }

    // Contact number validation
    if (formData.contact_1.length !== 10) {
      newFormErrors.contact_1 =
        "Please enter a valid  10-digit contact number.";
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      const response = await adminApiService.registerVisitor(formData);
      console.log(response);
      setNotificationMessage("Submit successfully.");
      setNotificationSeverity("success");
      setNotificationOpen(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        contact_1: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setNotificationMessage("Error saving changes.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  return (
    <>
      <Header></Header>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
      <div className="contact-container top-spacing-200">
        <div className="contact-detail" style={{ background: boxColor }}>
          <div>
            <p className="cd-heading">OFFICE</p>
            <p>
              <img alt="" className="contact-logo" src={phonelogo} />
              <a href={`tel:${phoneNumber1}`}>{phoneNumber1}</a>,{" "}
              <a href={`tel:${phoneNumber2}`}>{phoneNumber2}</a>
            </p>
            <p>
              <img alt="" className="contact-logo" src={emaillogo} />
              <a href={`mailto:${email1}`}>{email1}</a>
            </p>
            <p>
              <img alt="" className="contact-logo" src={locationlogo} />{" "}
              {location}
            </p>
          </div>
          <div className="AQ-container">
            <p className="cd-heading">APPLICATION QUERIES</p>
            <p>
              <img alt="" className="contact-logo" src={phonelogo} />
              <a href={`tel:${phoneNumber3}`}>{phoneNumber3}</a>,{" "}
              <a href={`tel:${phoneNumber4}`}>{phoneNumber4}</a>
            </p>
            <p>
              <img alt="" className="contact-logo" src={emaillogo} />
              <a href={`mailto:${email1}`}>{email2}</a>
            </p>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="first_name">First Name</label>
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  // required
                />
                {formErrors.first_name && (
                  <span className="error-message">{formErrors.first_name}</span>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  // required
                />
                {formErrors.last_name && (
                  <span className="error-message">{formErrors.last_name}</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}

                  // required
                />
                {formErrors.email && (
                  <span className="error-message">{formErrors.email}</span>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="contact_1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 012 3456 789"
                  name="contact_1"
                  value={formData.contact_1}
                  onChange={handleInputChange}
                  // required
                />
                {formErrors.contact_1 && (
                  <span className="error-message">{formErrors.contact_1}</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  placeholder="Write a Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  // required
                />
                {formErrors.message && (
                  <span className="error-message">{formErrors.message}</span>
                )}
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="map-to-medi">
        <p>
          <span id="our-address">Find Our Address On Map</span>
        </p>
        <iframe
          src={mapUrl}
          style={{ border: "0" }}
          title="Map to our Institute"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footers></Footers>
    </>
  );
}

export default ContactUs;
