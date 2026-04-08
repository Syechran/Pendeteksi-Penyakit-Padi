import React from 'react';
import './App.css';

// Sesuaikan nama file gambar ini dengan yang ada di folder /src/images kamu
import logoIcon from './images/logo.png'; 
import riceCloseup from './images/rice-closeup.jpg'; 
import aboutImage from './images/about-us.jpg'; 
import landscapeImage from './images/landscape.jpg'; 

function App() {
  return (
    <div className="app-wrapper">
      <img src={landscapeImage} alt="background" className="background-img" />
      <div className="main-container">
        
        {/* Header */}
        <header className="header">
          <img src={logoIcon} alt="Padi Logo" className="logo-img" />
          <span className="logo-text">Padi</span>
        </header>

        {/* Main Content Layout */}
        <div className="content-layout">
          
          {/* Baris Atas */}
          <div className="top-row">
            <div className="title-section">
              <h1 className="title-light">Inovasi Ketahanan Pangan Nasional</h1>
              <h1 className="title-bold">Sistem Cerdas Deteksi Penyakit Padi</h1>
            </div>
            
            <div className="about-wrapper">
              <div className="about-card">
                <img src={aboutImage} alt="About Us" className="bg-cover" />
                <span className="about-label">About Us</span>
                <button className="arrow-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Baris Bawah */}
          <div className="bottom-row">
            {/* Kolom Kiri */}
            <div className="column-left">
              <div className="feature-card">
              <div className="feature-img-wrapper">
                <img src={riceCloseup} alt="Padi" />
              </div>
              <div className="feature-info">
                <p>Memanfaatkan model Deep Learning untuk mengklasifikasikan kesehatan daun padi dengan akurasi tinggi.</p>
                <div className="upload-action">
                  <span>Unggah Foto</span>
                  <div className="icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary">Explore More</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="column-right">
            <div className="dedication-card">
              <img src={landscapeImage} alt="Landscape" className="bg-cover" />
              <div className="dedication-box">
                <p>Dedikasi kami dalam memberdayakan petani modern sejalan dengan misi kami untuk melindungi setiap bulir padi melalui teknologi deteksi penyakit yang cerdas.</p>
              </div>
              <button className="arrow-btn bottom-right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
          </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;