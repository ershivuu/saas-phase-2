import React, { useState, useEffect } from "react";
import { getAdminProfile } from "../Services/AdminServices";
import profilePhoto from "../../assets/images/superadmin.png";
import "./AdminLanding.css";

function AdminLanding() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminData, setAdminData] = useState({
    company_name: "Admin",
    email: "",
    contact: "",
    subdomain: "",
    start_date: null,
    end_date: null,
    reg_date: "",
    subscription_plan: {
      plan_name: "",
      plan_details: "",
      price: "",
      duration: "",
    },
  });
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminProfile();
        setAdminData(data);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const endDate = adminData.end_date ? new Date(adminData.end_date) : null;

      if (!endDate || endDate <= now) {
        setRemainingTime("00:00:00:00");
        return;
      }

      const diff = endDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(
        `${days.toString().padStart(2, "0")}d:${hours
          .toString()
          .padStart(2, "0")}h:${minutes.toString().padStart(2, "0")}m:${seconds
          .toString()
          .padStart(2, "0")}s`
      );
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [adminData.end_date, currentTime]);

  const formatDate = (date) => {
    if (!date) return "NULL";

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month}, ${year}`;
  };

  const formatTime = (date) => {
    if (!date) return "NULL";

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <>
      <div className="registered-companies">
        <div className="welcome-card">
          <div className="profile-detail">
            <div className="profile-photo">
              <img src={profilePhoto} alt="Profile" />
            </div>
            <div className="profile-name">
              <p>Welcome Admin</p>
              <p style={{ textTransform: "capitalize" }}>
                {adminData.company_name.split(" ")[0]}
              </p>
            </div>
          </div>
          <div className="login-time">
            <div className="date">
              <p>Date:</p>
              <p>{formatDate(currentTime)}</p>
            </div>
            <div className="time">
              <p>Time:</p>
              <p>{formatTime(currentTime)}</p>
            </div>
          </div>
        </div>
        <div className="total-company">
          <div className="admin-plan-name">
            <p>Plan Details</p>
            <p>
              Name:
              {adminData.subscription_plan.plan_name || " Buy Subscription"}
            </p>
            <p>
              Duration: {adminData.subscription_plan.duration || " NULL"} Days
            </p>
            <p>Price: ₹ {adminData.subscription_plan.price || " NULL"}</p>
            <p>
              Start Date:
              {adminData.start_date
                ? new Date(adminData.start_date).toLocaleDateString()
                : " NULL"}
            </p>
            <p>
              End Date:
              {adminData.end_date
                ? new Date(adminData.end_date).toLocaleDateString()
                : " NULL"}
            </p>
            <p>Time Remaining: {remainingTime || " NULL"}</p>
          </div>
        </div>
        <div className="total-user"></div>
      </div>
    </>
  );
}

export default AdminLanding;
