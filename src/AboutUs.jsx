import React from "react";
import { useNavigate } from "react-router-dom"; // ← tambah ini
import "./AboutUs.css";
import landscapeImage from "./images/landscape.jpg";
import geraldImg from "./images/gerald.jpg";
import rizkiImg from "./images/rizki.jpg";
import syechranImg from "./images/syechran.jpg";

function AboutUs() {
  const navigate = useNavigate(); // ← tambah ini

  return (
    <div className="about-wrapper">
      <img src={landscapeImage} alt="background" className="about-bg" />

      <div className="about-main-container">
        <div className="about-card">

          {/* Tombol Back — pojok kiri atas */}
          <span className="about-back" onClick={() => navigate(-1)}>Back</span>

          <h1 className="about-title">About Us</h1>

          <div className="profiles-container">
            <div className="profile-item">
              <div className="profile-img-wrapper">
                <img src={geraldImg} alt="Gerald Jordan Karim" className="profile-img" />
              </div>
              <p className="profile-name">Gerald Jordan Karim</p>
              <p className="profile-id">2802436553</p>
            </div>

            <div className="profile-item">
              <div className="profile-img-wrapper">
                <img src={rizkiImg} alt="Muhammad Rizki Pratama" className="profile-img" />
              </div>
              <p className="profile-name">Muhammad Rizki Pratama</p>
              <p className="profile-id">2802451075</p>
            </div>

            <div className="profile-item">
              <div className="profile-img-wrapper">
                <img src={syechranImg} alt="Syechran Aqilla Fajarputra" className="profile-img" />
              </div>
              <p className="profile-name">Syechran Aqilla Fajarputra</p>
              <p className="profile-id">2802504270</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;