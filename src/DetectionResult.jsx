import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./DetectionResult.css";
import landscapeImage from "./images/landscape.jpg";

function DetectionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Data dummy (sementara sebelum disambungkan ke logika AI)
  const detectionData = location.state?.detectionData || {
    mainDisease: "Leaf Blast",
    confidence: 60,
    breakdown: [
      { name: "Leaf Blast", value: 60, color: "#013328" },     // Hijau tua
      { name: "Sheath Blight", value: 30, color: "#8fa886" },  // Hijau sedang
      { name: "Healthy", value: 10, color: "#dbe4cd" },        // Hijau sangat terang/krem
    ],
  };

  const handleBack = () => {
    navigate("/detection");
  };

  return (
    <div className="result-wrapper">
      <img
        src={landscapeImage}
        alt="background"
        className="result-background-img"
      />
      
      <div className="result-main-container">

        {/* Outer Solid White Card */}
        <div className="result-card-outer">
          {/* Inner Dashed Card */}
          <div className="result-card-inner">
            <div className="back-link" onClick={handleBack}>
              Back
            </div>

            <div className="top-content">
              {/* Left Side - Donut Chart */}
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={detectionData.breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50} /* Membuat lubang di tengah agar menjadi Donut Chart */
                      outerRadius={80}
                      paddingAngle={4} /* Jarak garis pemisah antar warna */
                      dataKey="value"
                      stroke="none"
                    >
                      {/* Mapping warna sesuai dengan data array */}
                      {detectionData.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Right Side - Info */}
              <div className="info-wrapper">
                <div className="main-stat-row">
                  <span className="percentage-huge">
                    {detectionData.confidence}%
                  </span>
                  <div className="disease-title-col">
                    <span className="indicated-label">Your rice is indicated by</span>
                    <span className="disease-name">{detectionData.mainDisease}</span>
                  </div>
                </div>

                <div className="breakdown-list">
                  {detectionData.breakdown.slice(1).map((item, index) => (
                    <div key={index} className="breakdown-text-row">
                      {item.value}% {item.name === "Healthy" ? "Healthy" : `Indicated by ${item.name}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disease Management */}
            <div className="disease-management-section">
              <h3>Disease Management</h3>
              <p>
                Lorem ipsum dolor sit amet. Et assumenda vitae qui rerum enim qui tempore distinctio qui quasi facilis. Nam voluptatibus officiis ut quia quae et reiciendis libero vel neque fugit eos voluptatem ipsa est repudiandae rerum. A galisum recusandae et reiciendis sequi sed sapiente corrupti sed numquam internos ab sapiente omnis a illum facilis in dolores voluptatibus. Eum reprehenderit vero eum reiciendis consectetur ut minima cupiditate in doloribus perspiciatis aut nulla harum quo velit veritatis.
                <br />
                Ut quae tempora et laudantium accusamus ea tenetur alias ea fugiat consequatur qui illum veniam et dolores internos? Id consequatur delectus nam libero consequatur ex velit galisum ea incidunt minus et provident voluptatibus ad deleniti dolorem est atque fugiat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetectionResult;