import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./diseaseinfo.css";
import landscapeImage from "./images/landscape.jpg";
import bacterialBlightImage from "./images/bacterial_blight.jpg";
import brownSpotImage from "./images/brown_spot.jpg";
import hispaImage from "./images/hispa.jpg";
import leafBlastImage from "./images/leaf_blast.jpg";

const diseases = [
  {
    id: "bacterial_blight",
    name: "Bacterial Blight",
    image: bacterialBlightImage,
    description:
      "Bacterial blight disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae. Penyakit ini menyerang daun padi dengan membentuk bercak kuning kecoklatan yang bermula dari tepi daun, kemudian meluas ke dalam helai daun. Pada serangan berat, seluruh daun dapat mengering dan berwarna putih keabu-abuan.",
    prevention:
      "Gunakan varietas padi tahan penyakit, hindari pemupukan nitrogen berlebihan, dan pastikan sistem drainase sawah berjalan baik. Aplikasikan bakterisida berbahan aktif tembaga secara preventif. Musnahkan sisa tanaman yang terinfeksi dan hindari memindahkan bibit dari area yang terserang.",
  },
  {
    id: "brown_spot",
    name: "Brown Spot",
    image: brownSpotImage,
    description:
      "Brown spot disebabkan oleh cendawan Bipolaris oryzae. Gejalanya berupa bercak oval berwarna coklat dengan halo kuning di sekelilingnya, tersebar di seluruh permukaan daun. Penyakit ini sering muncul pada tanaman yang kekurangan nutrisi, terutama kalium dan silika.",
    prevention:
      "Pastikan ketersediaan nutrisi yang cukup dengan pemupukan berimbang, terutama kalium dan silika. Gunakan benih bersertifikat dan bebas penyakit, serta lakukan perendaman benih dengan fungisida sebelum tanam. Atur jarak tanam yang tidak terlalu rapat untuk meningkatkan sirkulasi udara.",
  },
  {
    id: "hispa",
    name: "Hispa",
    image: hispaImage,
    description:
      "Hispa (Dicladispa armigera) adalah serangga hama yang menyerang tanaman padi. Larva hispa membuat terowongan di dalam jaringan daun, sementara imago mengikis permukaan daun bagian atas sehingga tampak seperti garis-garis putih transparan. Serangan berat menyebabkan daun mengering dan tanaman tumbuh kerdil.",
    prevention:
      "Lakukan pengamatan rutin dan kumpulkan serta musnahkan telur, larva, dan imago secara manual. Hindari pemupukan nitrogen berlebihan yang dapat meningkatkan populasi hispa. Gunakan insektisida saat populasi hama mencapai ambang ekonomi, dan manfaatkan musuh alami seperti parasitoid dan predator.",
  },
  {
    id: "leaf_blast",
    name: "Leaf Blast",
    image: leafBlastImage,
    description:
      "Leaf blast disebabkan oleh cendawan Magnaporthe oryzae. Gejalanya berupa bercak berbentuk berlian berwarna abu-abu dengan tepi berwarna coklat kemerahan. Bercak ini dapat meluas dengan cepat dan menyatu, menyebabkan daun mengering sepenuhnya.",
    prevention:
      "Gunakan varietas padi tahan blast dan hindari pemupukan nitrogen berlebihan. Atur waktu tanam agar terhindar dari kelembapan tinggi dan suhu rendah. Aplikasikan fungisida berbahan aktif tricyclazole atau isoprothiolane secara preventif pada fase anakan dan pembungaan.",
  },
];

function DiseaseInfo() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

const handleNavigate = (dir) => {
  if (animating) return;
  const next = (currentIndex + dir + diseases.length) % diseases.length;
  setAnimating(true);
  setTimeout(() => {
    setCurrentIndex(next);
    setAnimating(false);
  }, 300);
};

  const current = diseases[currentIndex];

  return (
    <div className="disease-info-wrapper">
      <img src={landscapeImage} alt="background" className="disease-info-bg" />

      <div className="disease-info-main">
        <div className="disease-info-card">

          {/* Gambar Kiri */}
          <div className="card-image-section">
            <img
              src={current.image}
              alt={current.name}
              className={`disease-img ${animating ? "img-fade-out" : "img-fade-in"}`}
            />
          </div>

          {/* Konten Kanan */}
          <div className="card-text-section">
            <div className="top-nav">
              <span className="back-link" onClick={() => navigate(-1)}>
                Back
              </span>
            </div>

            <div className={`content-body ${animating ? "fade-out" : "fade-in"}`}>
              <h1 className="disease-title">{current.name}</h1>
              <p className="disease-paragraph">{current.description}</p>

              <h2 className="disease-subtitle">How to prevent it</h2>
              <p className="disease-paragraph">{current.prevention}</p>
            </div>

            <div className="bottom-nav">
<span className="nav-link" onClick={() => handleNavigate(-1)}>
  Previous
</span>
              <span className="disease-counter">
                {currentIndex + 1} / {diseases.length}
              </span>
<span className="nav-link" onClick={() => handleNavigate(1)}>
  Next
</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DiseaseInfo;