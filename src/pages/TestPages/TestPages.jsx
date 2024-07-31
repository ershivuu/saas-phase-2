// TestPages.js
import React from "react";
import "./TestPages.css";
import styled from "styled-components";

const imageUrl =
  "https://images.pexels.com/photos/22638803/pexels-photo-22638803/free-photo-of-en-la-cima-portena.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Your image URL variable

const Card = styled.div`
  cursor: pointer;
  background-size: cover !important;
  overflow: hidden;
  width: 300px;
  height400px;
  background-image: url(${imageUrl});
`;

function TestPages() {
  return (
    <div>
      <div className="hr-corner">
        <div className="hr-corner-sub-container">
          <div className="hr-conrer-heading">
            <p>HUMAN RESOURCE</p>
            <p>INSIGHT INTO HUMAN RESOURCES</p>
          </div>
          <div className="slider-imgs">
            <Card className="card1"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPages;
