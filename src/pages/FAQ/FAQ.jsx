import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footers from "../../components/Footer/Footers";
import Accordion from "react-bootstrap/Accordion";
import "./FAQ.css";
import mark from "../../assets/logos/mark.png";
import axios from "axios";
import { getFaqs } from "../../Admin/Services/FrontendServices";
function FAQ() {
  const [activeKey, setActiveKey] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error.message);
      }
    };

    fetchFaqs();
  }, []);

  const handleAccordionToggle = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };
  // const sections = [
  //   {
  //     summary:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Blanditiis, velit.",
  //     detail:
  //       " Lorem ipsum dolor sit amet consectetur adipisicing elit.Explicabo eligendi voluptatum consequuntur consequatur quia?Quaerat, debitis, ducimus suscipit ipsum at illum, expedita iurepariatur harum ipsam fugit. Fugit, soluta ipsum.",
  //   }
  // ];

  return (
    <>
      <Header></Header>
      <div className="faq-section top-spacing">
        <div className="illustrations"></div>

        <div className="faq-body">
          <Accordion activeKey={activeKey} onSelect={handleAccordionToggle}>
            {faqs.map((item, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>{item.box_heading}</Accordion.Header>
                <Accordion.Body>
                  <p>{item.box_content}</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
      {/* <div className="water-marks">
        <div className="marks-left">
          <img alt="" src={mark} style={{ rotate: "35deg" }} />
          <img alt="" src={mark} style={{ rotate: "-35deg" }} />
          <img alt="" src={mark} style={{ rotate: "180deg" }} />
          <img alt="" src={mark} style={{ rotate: "128deg" }} />
        </div>
        <div className="marks-right">
          <img alt="" src={mark} style={{ rotate: "-35deg" }} />
          <img alt="" src={mark} style={{ rotate: "35deg" }} />
          <img alt="" src={mark} style={{ rotate: "180deg" }} />
          <img alt="" src={mark} style={{ rotate: "-48deg" }} />
        </div>
      </div> */}

      <Footers></Footers>
    </>
  );
}

export default FAQ;
