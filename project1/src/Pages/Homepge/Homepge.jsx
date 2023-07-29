import React, { useState, useEffect } from "react";
import coverPhoto from "./diasauto_cover1.png";
import "./HomepageStyle.css";
import OfferCard from "../../components/OfferCard";
import MapContainer from "./MapContainer";

export default function Homepge() {
  return (
    <>
      <div style={{ marginTop: "10vh" }} className="cover-photo">
        <img src={coverPhoto} alt="Cover Photo" />
      </div>
      <div className="header">
        {/* Services */}
        <section id="section1">
          <p className="Heading">SERVICES</p>

          <div className="service-cards">
            <div class="card">
              <p class="card-title">Accident Repairs</p>
              <p class="small-desc">
                At Dias Auto Engineers, we understand how stressful accidents
                can be. Our skilled technicians specialize in accident repairs,
                ensuring that your vehicle is restored to its pre-accident
                condition. From minor dents to major collision repairs, we
                employ advanced techniques and top-quality materials to deliver
                exceptional results and get you back on the road safely.
              </p>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>

            <div class="card">
              <p class="card-title">Vehicle Diagnosis</p>
              <p class="small-desc">
                Our team of experienced professionals excels in vehicle
                diagnosis. We utilize state-of-the-art diagnostic equipment to
                accurately identify any issues your vehicle may be experiencing.
                Whether it's a mysterious engine problem, a malfunctioning
                electrical system, or any other concern, we provide thorough
                inspections and offer reliable solutions to get your vehicle
                running smoothly again.
              </p>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>

            <div class="card">
              <p class="card-title">Tinkering and Paint Work</p>
              <p class="small-desc">
                Enhance the appearance of your vehicle with our tinkering and
                paint work services. Our skilled craftsmen pay meticulous
                attention to detail, ensuring seamless repairs and flawless
                finishes. From minor touch-ups to complete bodywork and
                painting, we utilize high-quality paints and techniques to give
                your vehicle a fresh, polished look that will make it stand out
                on the road.
              </p>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>

            <div class="card">
              <p class="card-title">Electrical Work</p>
              <p class="small-desc">
                When it comes to electrical issues in your vehicle, Dias Auto
                Engineers has you covered. Our trained technicians are adept at
                diagnosing and repairing various electrical problems, including
                wiring issues, faulty components, and complex electrical system
                malfunctions. Rest assured that we have the expertise and
                resources to get your vehicle's electrical system back in top
                shape.
              </p>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>

            <div class="card">
              <p class="card-title">Modifications</p>
              <p class="small-desc">
                Do you desire to personalize your vehicle or add performance
                enhancements? Our modification services cater to your unique
                preferences. Whether you want to upgrade your exhaust system,
                install new suspension components, enhance your vehicle's
                aesthetics, or make any other modifications, our skilled team
                will work closely with you to bring your vision to life while
                ensuring optimal functionality and performance.
              </p>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>

            <div class="card">
              <p class="card-title">Routine Maintenance</p>
              <p class="small-desc">
                At Dias Auto Engineers, we believe that proactive maintenance is
                key to keeping your vehicle in top condition. Our routine
                maintenance service is designed to help you avoid unexpected
                breakdowns and costly repairs down the road. From oil changes
                and fluid checks to filter replacements and tire rotations, our
                skilled technicians meticulously inspect and service your
                vehicle according to manufacturer recommendations.
              </p>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="middle-header">
        <section id="section2">
          <p className="Heading">OFFERS</p>
          <div className="OfferCard">
            <OfferCard />
          </div>
        </section>
      </div>
      <div className="header">
        <section id="section3">
          <p className="Heading">CONTACT US</p>
          <div className="contact-details">
            <div className="map-container">
              <MapContainer />
            </div>
            <div className="contact">
              <table>
                <tr>
                  <td className="data">Owner :</td>
                  <td>Mr. Dias</td>
                </tr>
                <tr>
                  <td className="data">TEL :</td>
                  <td>+94711713221</td>
                </tr>
                <tr>
                  <td className="data">Address :</td>
                  <td>28/12, 4th lane, Hospital Road, Maharagama, Sri Lanka</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="social-media-buttons">
            <a
              href="https://www.facebook.com/profile.php?id=100093582896983&mibextid=ZbWKwL"
              class="socialContainer containerOne"
            >
              <svg class="socialSvg facebookSvg" viewBox="0 0 16 16">
                <path
                  d="M14.4 0h-12.8c-1.052 0-1.6 0.548-1.6 1.6v12.8c0 1.052 0.548 1.6 1.6 1.6h7.255v-6.196h-2.052v-2.409h2.052v-1.697c0-2.032 1.242-3.134 3.042-3.134 0.868 0 1.618 0.069 1.839 0.1v2.108l-1.257 0.001c-0.989 0-1.183 0.471-1.183 1.159v1.519h2.364l-0.309 2.409h-2.055v6.196c2.114-0.271 3.752-1.115 4.813-2.614 1.062-1.498 1.587-3.427 1.587-5.565v-0.001c0-2.14-0.525-4.068-1.587-5.566-1.061-1.498-2.699-2.342-4.812-2.613v0z"
                  fill="#0073b1"
                />
              </svg>
            </a>

            <a
              href="mailto:diasautoengineers@gmail.com"
              class="socialContainer containerTwo"
            >
              <svg class="socialSvg emailSvg" viewBox="0 0 16 16">
                <path
                  d="M14.4 0h-12.8c-1.052 0-1.6 0.548-1.6 1.6v12.8c0 1.052 0.548 1.6 1.6 1.6h12.8c1.052 0 1.6-0.548 1.6-1.6v-12.8c0-1.052-0.548-1.6-1.6-1.6zM12.8 4.8l-4.8 3.2-4.8-3.2v-1.6l4.8 3.2 4.8-3.2v1.6z"
                  fill="#0073b1"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
