import React, { useState, useEffect } from "react";
import profilePhoto from "../../assets/images/superadmin.png";

function AdminLanding() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
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
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  };

  return (
    <>
      <div className="registered-companies">
        <div className="welcome-card">
          <div className="profile-detail">
            <div className="profile-photo">
              <img src={profilePhoto} alt="" />
            </div>
            <div className="profile-name">
              <p>Welcome</p>
              <p>Admin</p>
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
        <div className="total-company"></div>
        <div className="total-user"></div>
      </div>
    </>
  );
}

export default AdminLanding;
