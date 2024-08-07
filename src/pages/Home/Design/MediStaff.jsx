import React, { useState, useEffect } from "react";
import "./MediStaff.css";

import { getSection3 } from "../../../Admin/Services/FrontendServices";
import $ from "jquery";
function MediStaff() {
  useEffect(() => {
    const toggleHover = (element) => {
      $(element).toggleClass("hover");
    };

    $(".block-02, .block-05, .big-horizontal, .big-vertical").hover(
      function () {
        toggleHover(this);
      },
      function () {
        toggleHover(this);
      }
    );
    const isInViewport = (elem) => {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    // ------------------ Adding active class on click--------------------------
    $(".block-01, .block-03, .block-04 ").on("click", function () {
      $(this).toggleClass("active");
      $(this).find(".casse-tete-home").toggleClass("turn45");
      $(this).find(".subtitles, .values-paragraph ").toggleClass("active");
      // console.log("clicked");
    });
    //  ------------------ Adding active class on click-------------------------- F
    $(window).on("scroll", function () {
      const blocks = $(".block-01, .block-03, .block-04");

      blocks.each(function () {
        const $this = $(this);
        const isInView = isInViewport(this);

        if (isInView) {
          $this.removeClass("anim-01");
        } else {
          $this.addClass("anim-01");
        }
      });
    });

    //
    $(".block-01, .block-03, .block-04")
      .on("mouseenter", function () {
        $(this).css("z-index", "20");
      })
      .on("mouseleave", function () {
        $(this).css("z-index", "10");
      });
    return () => {
      $(window).off("scroll");
      $(
        ".block-02, .block-05, .big-horizontal, .big-vertical, #myname, .submit-form, .block-01, .block-03, .block-04"
      ).off();
    };
  }, []);
  const [loading, setLoading] = useState(true);
  const [header1, setheader1] = useState("");
  const [header2, setheader2] = useState("");
  const [Box2Header1, setBox2Header1] = useState("");
  const [Box2Content1, setBox2Content1] = useState("");
  const [Box3Image, setBox3Image] = useState("");
  const [Box4Header1, setBox4Header1] = useState("");
  const [Box4Content1, setBox4Content1] = useState("");
  const [Box5Header1, setBox5Header1] = useState("");
  const [Box5Content1, setBox5Content1] = useState("");
  const [Box6Image, setBox6Image] = useState("");
  const [Box7Image, setBox7Image] = useState("");
  const [Box8Image, setBox8Image] = useState("");
  const [box2BackgroundColor, setBox2BackgroundColor] = useState("");
  const [box4BackgroundColor, setBox4BackgroundColor] = useState("");
  const [box5BackgroundColor, setBox5BackgroundColor] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSection3();
        console.log("section3 data>>", data);
        setheader1(data[0].header_1);
        setheader2(data[0].header_2);
        setBox2Header1(data[1].header_1);
        setBox2Content1(data[1].box_content);
        setBox3Image(data[2].box_img_url);
        setBox4Header1(data[3].header_1);
        setBox4Content1(data[3].box_content);
        setBox5Header1(data[4].header_1);
        setBox5Content1(data[4].box_content);
        setBox6Image(data[5].box_img_url);
        setBox7Image(data[6].box_img_url);
        setBox8Image(data[7].box_img_url);
        setBox2BackgroundColor(data[1].bg_col);
        setBox4BackgroundColor(data[3].bg_col);
        setBox5BackgroundColor(data[4].bg_col);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="staff-section">
      <div className="medi-heading">
        <p>
          {header1}
          <br />
          <span>{header2}</span>
        </p>
      </div>
      <div className="section">
        <div className="blocks-container">
          <div className="blocks-line">
            <div
              className="blocks block-01"
              style={{ zindex: "10", backgroundColor: box2BackgroundColor }}
            >
              <div className="blocks-title">
                {/* THE HEADLINE */}
                {Box2Header1}
                <br />
              </div>
              <div className="plus-container casse-tete-home">
                <img
                  src="https://img.icons8.com/ios/50/plus--v1.png"
                  loading="lazy"
                  alt="plus--v1"
                  className="plus bigger"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <div className="subtitles values-paragraph padding-left">
                {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Provident, incidunt. Totam, obcaecati tempore! Placeat velit
                autem quibusdam rem harum fugiat necessitatibus inventore magnam
                blanditiis, libero maxime consectetur ab reiciendis ex? */}
                {Box2Content1}
              </div>
              <div className="anim-trigger-block"></div>
            </div>

            <div className="blocks block-02">
              <div className="collection-list-wrapper-4 w-dyn-list">
                <div role="list" className="collection-list-3 w-dyn-items">
                  <div role="listitem" className="collection-item-2 w-dyn-item">
                    <img
                      src={Box3Image}
                      loading="lazy"
                      alt=""
                      sizes="(max-width: 767px) 100vw, 307.515625px"
                      className="image-7"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="blocks block-03"
              style={{ zindex: "10", backgroundColor: box4BackgroundColor }}
            >
              <div className="blocks-title">
                {/* THE HEADLINE */}
                {Box4Header1}
                <br />
              </div>

              <div className="subtitles values-paragraph padding-right">
                <p>
                  {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores a praesentium eius enim adipisci, voluptatum eveniet
                  laboriosam cum voluptates quibusdam. Ipsum consectetur dolor,
                  quae magni delectus inventore et consequuntur accusamus? */}
                  {Box4Content1}
                </p>
              </div>

              <div className="plus-container casse-tete-home align-right">
                <img
                  src="https://img.icons8.com/ios/50/plus--v1.png"
                  loading="lazy"
                  alt="plus--v1"
                  className="plus bigger"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            </div>
          </div>
          <div className="blocks-line second">
            <div className="div-block-2">
              <div className="div-block-3">
                <div
                  className="blocks block-04"
                  style={{ zindex: "10", backgroundColor: box5BackgroundColor }}
                >
                  <div className="blocks-title">
                    {/* THE HEADLINE */}
                    {Box5Header1}
                    <br />
                  </div>
                  <div className="subtitles values-paragraph padding-left">
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero recusandae sapiente aut hic quos obcaecati et corporis
                    quo. Mollitia ex quod obcaecati, eos sapiente minima optio
                    quas repellat omnis tempore! */}
                    {Box5Content1}
                  </div>
                  <div className="plus-container casse-tete-home">
                    <img
                      src="https://img.icons8.com/ios/50/plus--v1.png"
                      loading="lazy"
                      alt="plus--v1"
                      className="plus bigger"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                </div>
                <div className="blocks block-05">
                  <div className="collection-list-wrapper-4 w-dyn-list">
                    <div role="list" className="collection-list-3 w-dyn-items">
                      <div
                        role="listitem"
                        className="collection-item-2 w-dyn-item"
                      >
                        <img
                          src={Box6Image}
                          loading="lazy"
                          alt=""
                          sizes="(max-width: 767px) 100vw, 307.515625px"
                          className="image-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-block-3 second">
                <div className="blocks big-horizontal">
                  <div className="collection-list-wrapper-4 w-dyn-list">
                    <div role="list" className="collection-list-3 w-dyn-items">
                      <div
                        role="listitem"
                        className="collection-item-2 w-dyn-item"
                      >
                        <img
                          src={Box7Image}
                          loading="lazy"
                          alt=""
                          sizes="(max-width: 767px) 100vw, 615.03125px"
                          className="image-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-block-4">
              <div className="blocks big-vertical">
                <div className="collection-list-wrapper-4 w-dyn-list">
                  <div role="list" className="collection-list-3 w-dyn-items">
                    <div
                      role="listitem"
                      className="collection-item-2 w-dyn-item"
                    >
                      <img
                        src={Box8Image}
                        loading="lazy"
                        alt=""
                        sizes="(max-width: 767px) 100vw, 307.515625px"
                        className="image-7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blocks-container mobile">
          <div className="blocks-line">
            <div
              className="blocks block-01"
              style={{ backgroundColor: box2BackgroundColor }}
            >
              <div className="blocks-title">
                {/* THE HEADLINE */}
                {Box2Header1}
                <br />
              </div>
              <div className="plus-container casse-tete-home">
                <img
                  src="https://img.icons8.com/ios/50/plus--v1.png"
                  loading="lazy"
                  alt="plus--v1"
                  className="plus bigger"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <div className="subtitles values-paragraph padding-left">
                {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Explicabo sit tenetur illo quod tempore! Voluptatem animi harum,
                facere fuga dolorem quas, facilis tempore et similique officiis
                dolor at eligendi dolores! */}
                {Box2Content1}
              </div>
            </div>
            <div className="blocks block-02">
              <div className="collection-list-wrapper-4 w-dyn-list">
                <div role="list" className="collection-list-3 w-dyn-items">
                  <div role="listitem" className="collection-item-2 w-dyn-item">
                    <img
                      src={Box3Image}
                      loading="lazy"
                      alt=""
                      sizes="(max-width: 767px) 211.1875px, 100vw"
                      className="image-7"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blocks-line second">
            <div className="div-block-2">
              <div className="div-block-3">
                <div
                  className="blocks block-04"
                  style={{ background: box4BackgroundColor }}
                >
                  <div className="blocks-title">
                    {/* THE HEADLINE */}
                    {Box4Header1}
                    <br />
                  </div>
                  <div className="subtitles values-paragraph padding-left">
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae corporis quis cupiditate aspernatur minima autem fuga
                    quod distinctio, ipsum omnis esse aliquam ad officiis nobis
                    commodi quae rerum error minus! */}
                    {Box4Content1}
                  </div>
                  <div className="plus-container casse-tete-home">
                    <img
                      src="https://img.icons8.com/ios/50/plus--v1.png"
                      loading="lazy"
                      alt="plus--v1"
                      className="plus bigger"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                </div>
                <div className="blocks block-05">
                  <div className="collection-list-wrapper-4 w-dyn-list">
                    <div role="list" className="collection-list-3 w-dyn-items">
                      <div
                        role="listitem"
                        className="collection-item-2 w-dyn-item"
                      >
                        <img
                          src={Box6Image}
                          loading="lazy"
                          alt=""
                          sizes="(max-width: 767px) 211.1875px, 100vw"
                          className="image-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-block-3 second">
                <div className="blocks big-horizontal">
                  <div className="collection-list-wrapper-4 w-dyn-list">
                    <div role="list" className="collection-list-3 w-dyn-items">
                      <div
                        role="listitem"
                        className="collection-item-2 w-dyn-item"
                      >
                        <img
                          src={Box7Image}
                          loading="lazy"
                          alt=""
                          sizes="(max-width: 767px) 211.1875px, 100vw"
                          className="image-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-block-4">
              <div className="blocks big-vertical">
                <div className="collection-list-wrapper-4 w-dyn-list">
                  <div role="list" className="collection-list-3 w-dyn-items">
                    <div
                      role="listitem"
                      className="collection-item-2 w-dyn-item"
                    >
                      <img
                        src={Box8Image}
                        loading="lazy"
                        alt=""
                        sizes="(max-width: 767px) 211.1875px, 100vw"
                        className="image-7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="blocks block-03"
              style={{ background: box5BackgroundColor }}
            >
              <div className="blocks-title">
                {/* THE HEADLINE */}
                {Box5Header1}
                <br />
              </div>
              <div className="plus-container casse-tete-home align-right">
                <img
                  src="https://img.icons8.com/ios/50/plus--v1.png"
                  loading="lazy"
                  alt="plus--v1"
                  className="plus bigger"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <div className="subtitles values-paragraph padding-right">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis, ea. Quod adipisci consectetur atque rem deserunt,
                nulla pariatur eveniet tempore non minima laborum a dolores est,
                sint cumque nemo dolorem. */}
                {Box5Content1}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediStaff;
