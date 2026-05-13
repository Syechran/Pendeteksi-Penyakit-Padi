import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from "recharts"; // Tambahkan LabelList
import "./DetectionResult.css";
import landscapeImage from "./images/landscape.jpg";

function DetectionResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Menangkap data dari FastAPI (via Detection.jsx)
  const detectionData = location.state?.detectionData || {
    mainDisease: "Rice__leaf_scald",
    confidence: 60,
    uploadedImage: null,
    breakdown: [
      { name: "Rice__leaf_scald", value: 60, color: "#013328" },
      { name: "Rice__sheath_blight", value: 30, color: "#8fa886" },
      { name: "Rice__healthy", value: 10, color: "#dbe4cd" },
    ],
  };

  const handleBack = () => {
    navigate("/detection");
  };

  // --- FUNGSI BARU UNTUK MEMFORMAT NAMA ---
  // Membersihkan "Rice__" dan underscores (_)
  const formatDiseaseName = (name) => {
    if (!name) return "";
    return name
      .replace("Rice__", "") // Menghapus Rice__
      .replace(/_/g, " ") // Mengganti underscores (_) dengan spasi
      .split(" ") // Memisahkan menjadi kata-kata
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi kata pertama
      .join(" "); // Menggabungkan kembali
  };
  // ----------------------------------------

  // Logika untuk menampilkan solusi berdasarkan penyakit yang diformat
  const getDiseaseManagementText = (diseaseName) => {
    const formattedName = formatDiseaseName(diseaseName).toLowerCase();
    switch (formattedName) {
      case "leaf scald":
        return "Gunakan fungisida berbahan aktif tembaga jika serangan parah, dan atur pemupukan berimbang, terutama kurangi pupuk nitrogen.";
      case "leaf blast":
        return "Gunakan fungisida sistemik seperti Tricyclazole atau Isoprothiolane. Hindari penggunaan pupuk nitrogen secara berlebihan dan pastikan lahan memiliki sistem drainase yang baik.";
      case "sheath blight":
        return "Terapkan fungisida seperti Validamycin atau Hexaconazole. Jaga jarak tanam agar tidak terlalu rapat untuk memastikan sirkulasi udara yang baik di area pangkal batang padi.";
      case "brown spot":
        return "Penyakit ini sering muncul di tanah yang kekurangan nutrisi. Lakukan pemupukan berimbang, terutama tambahkan kalium (K) dan silika (Si). Gunakan fungisida berbahan aktif Mancozeb jika serangan parah.";
      case "healthy":
        return "Tanaman padi Anda tampak sehat! Lanjutkan perawatan rutin, jaga keseimbangan air, dan lakukan pemupukan berimbang secara berkala.";
      default:
        return "Segera konsultasikan dengan penyuluh pertanian setempat untuk penanganan lebih lanjut yang spesifik terhadap gejala di lahan Anda.";
    }
  };

  // Memformat data breakdown agar rapi
  const formattedBreakdown = detectionData.breakdown
    .map((item) => ({
      ...item,
      formattedName: formatDiseaseName(item.name),
    }))
    .filter((item) => item.value > 0);

  // Memformat nama penyakit utama untuk ditampilkan
  const formattedMainDisease = formatDiseaseName(detectionData.mainDisease);

  // --- FUNGSI BARU UNTUK LABEL DI DALAM PIE CHART ---
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, formattedName }) => {
    const RADIAN = Math.PI / 180;
    // Menghitung titik tengah persis di dalam potongan pie
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Jika potongannya terlalu kecil (misal di bawah 5%), sembunyikan teks agar tidak berantakan menumpuk
    if (value < 5) return null;

    // Pisahkan nama jika terlalu panjang (opsional, mengambil kata pertama saja untuk label jika ruang sempit)
    const shortName = formattedName.split(" ")[0]; 

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }} // Tambahan bayangan agar teks terbaca di warna terang
      >
        {/* Baris pertama: Nama Penyakit */}
        <tspan x={x} dy="-0.6em" fontSize="14px" fontWeight="bold">
          {formattedName}
        </tspan>
        {/* Baris kedua: Presentase */}
        <tspan x={x} dy="1.4em" fontSize="14px" fontWeight="bold">
          {`${value}%`}
        </tspan>
      </text>
    );
  };
  // ---------------------------------------------------

  // Komponen Label untuk menampilkan teks di chart
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, formattedName, color }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12px"
      >
        {`${value}% ${formattedName}`}
      </text>
    );
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
              {/* Left Side - Solid Pie Chart */}
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={0} /* Ubah menjadi 0 agar menjadi Pie padat, bukan Donut */
                      outerRadius={110} /* Diperbesar agar teks muat di dalam */
                      dataKey="value"
                      labelLine={false} /* Hilangkan garis penghubung ke luar */
                      label={renderCustomizedLabel} /* Panggil fungsi label baru */
                      stroke="#333333" /* Tambahkan garis batas gelap seperti di referensi */
                      strokeWidth={2} /* Ketebalan garis batas */
                    >
                      {formattedBreakdown.map((entry, index) => (
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
                    {/* Tampilkan nama penyakit utama yang sudah diformat */}
                    <span className="disease-name">{formattedMainDisease}</span>
                  </div>
                </div>

                <div className="breakdown-list">
                  {/* Gunakan data yang sudah diformat untuk breakdown teks */}
                  {formattedBreakdown.slice(1).map((item, index) => (
                    <div key={index} className="breakdown-text-row">
                      {item.value}% {item.formattedName.toLowerCase() === "healthy" ? "Healthy" : `Indicated by ${item.formattedName}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bagian Menampilkan Gambar yang Diunggah */}
            {detectionData.uploadedImage && (
              <div className="uploaded-image-section">
                <p>Analyzed Image:</p>
                <img 
                  src={detectionData.uploadedImage} 
                  alt="Analyzed Rice Leaf" 
                />
              </div>
            )}

            {/* Disease Management */}
            <div className="disease-management-section">
              <h3>Disease Management</h3>
              <p>
                {getDiseaseManagementText(detectionData.mainDisease)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetectionResult;