import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./DetectionResult.css";
import landscapeImage from "./images/landscape.jpg";

// =============================================
// IMPORT SEMUA GAMBAR PENYAKIT
// Sesuaikan path ini dengan struktur folder Anda
// =============================================

// Rice__bacterial_leaf_blight
import blight1 from "./images/Rice__bacterial_leaf_blight/aug_0_4.jpg";
import blight2 from "./images/Rice__bacterial_leaf_blight/aug_0_14.jpg";
import blight3 from "./images/Rice__bacterial_leaf_blight/aug_0_36.jpg";
import blight4 from "./images/Rice__bacterial_leaf_blight/aug_0_59.jpg";
import blight5 from "./images/Rice__bacterial_leaf_blight/aug_0_63.jpg";

// Rice__brown_spot
import brownspot1 from "./images/Rice__brown_spot/aug_0_17.jpg";
import brownspot2 from "./images/Rice__brown_spot/aug_0_25.jpg";
import brownspot3 from "./images/Rice__brown_spot/aug_0_44.jpg";
import brownspot4 from "./images/Rice__brown_spot/aug_0_99.jpg";
import brownspot5 from "./images/Rice__brown_spot/aug_0_122.jpg";

// Rice__healthy
import healthy1 from "./images/Rice__healthy/aug_0_332.jpg";
import healthy2 from "./images/Rice__healthy/aug_0_228.jpg";
import healthy3 from "./images/Rice__healthy/aug_0_153.jpg";
import healthy4 from "./images/Rice__healthy/aug_0_101.jpg";
import healthy5 from "./images/Rice__healthy/20231006_163746.jpg";

// Rice__hispa
import hispa1 from "./images/Rice__hispa/IMG_20190419_144414.jpg";
import hispa2 from "./images/Rice__hispa/IMG_20190419_161427.jpg";
import hispa3 from "./images/Rice__hispa/IMG_20190419_165817.jpg";
import hispa4 from "./images/Rice__hispa/IMG_20190420_194654.jpg";
import hispa5 from "./images/Rice__hispa/IMG_20190420_200338.jpg";

// Rice__leaf_blast
import leafblast1 from "./images/Rice__leaf_blast/aug_0_342.jpg";
import leafblast2 from "./images/Rice__leaf_blast/aug_0_244.jpg";
import leafblast3 from "./images/Rice__leaf_blast/aug_0_190.jpg";
import leafblast4 from "./images/Rice__leaf_blast/aug_0_124.jpg";
import leafblast5 from "./images/Rice__leaf_blast/aug_0_101.jpg";

// Rice__leaf_scald
import leafscald1 from "./images/Rice__leaf_scald/aug_0_192.jpg";
import leafscald2 from "./images/Rice__leaf_scald/aug_0_190.jpg";
import leafscald3 from "./images/Rice__leaf_scald/aug_0_162.jpg";
import leafscald4 from "./images/Rice__leaf_scald/aug_0_92.jpg";
import leafscald5 from "./images/Rice__leaf_scald/aug_0_85.jpg";

// Rice__neck_blast
import neckblast1 from "./images/Rice__neck_blast/IMG20201109181309_00.jpg";
import neckblast2 from "./images/Rice__neck_blast/IMG20201109181334_00.jpg";
import neckblast3 from "./images/Rice__neck_blast/IMG20201109181551_00.jpg";
import neckblast4 from "./images/Rice__neck_blast/IMG20201109181602_00.jpg";
import neckblast5 from "./images/Rice__neck_blast/IMG20201109181612_00.jpg";

// Sheath Blight
import sheathblight1 from "./images/Sheath Blight/aug_0_2.jpg";
import sheathblight2 from "./images/Sheath Blight/aug_0_24.jpg";
import sheathblight3 from "./images/Sheath Blight/aug_0_64.jpg";
import sheathblight4 from "./images/Sheath Blight/aug_0_131.jpg";
import sheathblight5 from "./images/Sheath Blight/aug_0_189.jpg";

// =============================================
// DATABASE PENYAKIT
// =============================================
const DISEASE_DATABASE = {
  Rice__bacterial_leaf_blight: {
    images: [blight1, blight2, blight3, blight4, blight5],
    explanation:
      "Bacterial Leaf Blight (BLB) is a serious rice disease caused by the bacterium Xanthomonas oryzae pv. oryzae. It attacks the vascular system of the leaves, disrupting the transportation of water and nutrients throughout the plant.",
    cause:
      "Caused by the bacterium Xanthomonas oryzae pv. oryzae, which spreads through contaminated irrigation water, rain splashes, wind, and unsterilized farming equipment. Wounds on the plant caused by insects or cultivation activities serve as the primary entry points for the bacteria.",
    characteristic:
      "Early symptoms appear as yellowish-green leaf margins that gradually expand into dry, grayish-white lesions. In the morning, milky droplets of bacterial exudate are often visible at the tips or edges of infected leaves. Infected leaves dry out progressively from tip to base.",
    impact:
      "Can cause yield losses of 20–30% under moderate attack, and up to 70% under severe conditions. Infections during the flowering stage are particularly critical, as they can cause widespread empty grain (empty grain failure).",
    solution:
      "Use BLB-resistant rice varieties such as IR64 or Ciherang. Apply bactericides containing copper hydroxide or streptomycin sulfate. Manage irrigation to prevent waterlogging and avoid excessive nitrogen fertilization.",
  },
  Rice__brown_spot: {
    images: [brownspot1, brownspot2, brownspot3, brownspot4, brownspot5],
    explanation:
      "Brown Spot is a fungal disease commonly found in suboptimal rice fields, particularly in soils with low nutrient content. It can affect the leaves, sheaths, and even the rice grains.",
    cause:
      "Caused by the fungus Bipolaris oryzae (synonym: Helminthosporium oryzae). It thrives rapidly in soils deficient in essential nutrients, especially potassium (K) and silica (Si), combined with high humidity and temperatures between 25–30°C.",
    characteristic:
      "Lesions are oval or circular, measuring 0.5–1 cm, with a grayish-white center and reddish-brown to dark brown margins. These spots are scattered evenly across the leaf surface, giving a distinctive 'sesame seed' appearance.",
    impact:
      "Reduces the functional leaf area for photosynthesis, thereby lowering starch accumulation in the grains. Under severe attack, it can cause yield losses of 30–50%. Infections on panicles can result in empty grains and discoloration of the rice.",
    solution:
      "Apply balanced fertilization, especially adding potassium (K) and silica (Si) to strengthen cell walls. Use fungicides containing Mancozeb, Iprodione, or Propiconazole. Ensure seeds come from healthy, pathogen-free sources.",
  },
  Rice__healthy: {
    images: [healthy1, healthy2, healthy3, healthy4, healthy5],
    explanation:
      "Your rice plant is in healthy condition and shows no symptoms of any disease. Maintain this condition through good and sustainable crop management practices.",
    cause:
      "No disease detected. The plant is growing under optimal conditions with balanced nutrition and a favorable environment.",
    characteristic:
      "Leaves are uniformly green and fresh, stems are upright and sturdy, with no spots, abnormal discoloration, or necrosis symptoms. Growth is uniform and consistent with the plant's developmental stage.",
    impact:
      "A healthy plant has the potential to deliver maximum yield. Continue routine care to maintain optimal conditions through the harvest period.",
    solution:
      "Continue balanced fertilization on schedule (N, P, K). Maintain good water management and conduct weekly routine monitoring for early detection of potential pest or disease attacks.",
  },
  Rice__hispa: {
    images: [hispa1, hispa2, hispa3, hispa4, hispa5],
    explanation:
      "Rice Hispa is leaf damage caused by the insect pest Dicladispa armigera. The attack is unique as it occurs both from within the leaf tissue (larvae) and from the outer leaf surface (adult insects).",
    cause:
      "Caused by the insect Dicladispa armigera. Larvae mine through the mesophyll tissue inside the leaf, while adult insects scrape the upper leaf surface. Populations increase during the rainy season at temperatures of 20–30°C.",
    characteristic:
      "Larval symptoms: transparent white tunnels running parallel to the leaf veins. Adult insect symptoms: elongated white or yellowish scratches on the upper leaf surface. Under heavy attack, the entire leaf appears white and dry, as if scorched.",
    impact:
      "Damage to the flag leaf is particularly harmful, as this leaf contributes 40–50% of the photosynthates for grain filling. Severe attacks can cause yield losses of 10–30% depending on the stage of infestation.",
    solution:
      "Apply systemic insecticides containing Chlorpyrifos, Imidacloprid, or Fipronil. Collect and destroy affected leaf parts. Install light traps to reduce adult insect populations. Utilize natural enemies such as egg parasitoids.",
  },
  Rice__leaf_blast: {
    images: [leafblast1, leafblast2, leafblast3, leafblast4, leafblast5],
    explanation:
      "Leaf Blast is one of the most destructive rice diseases in the world, caused by the fungus Magnaporthe oryzae. It can attack all above-ground parts of the rice plant.",
    cause:
      "Caused by Magnaporthe oryzae (asexual stage: Pyricularia oryzae). Spores spread via wind and thrive under temperatures of 24–28°C, humidity above 90%, and monoculture cropping systems using susceptible varieties.",
    characteristic:
      "Typical lesions are diamond or eye-shaped with a gray or white center and reddish-brown edges. Lesions can enlarge and merge, causing partial or complete leaf death. Under humid conditions, the lesion surface appears fuzzy due to fungal sporulation.",
    impact:
      "Can cause total yield losses of up to 100% under epidemic conditions. Attacks during the vegetative stage cause tiller death ('deadheart'), while attacks during the reproductive stage result in empty panicles and unfilled grains.",
    solution:
      "Apply preventive systemic fungicides such as Tricyclazole, Isoprothiolane, or Azoxystrobin. Plant blast-resistant varieties. Avoid excessive nitrogen fertilization. Manage irrigation using an intermittent (alternate wetting and drying) system and avoid planting in high-dew areas.",
  },
  Rice__leaf_scald: {
    images: [leafscald1, leafscald2, leafscald3, leafscald4, leafscald5],
    explanation:
      "Leaf Scald is a fungal disease that attacks the upper leaves of rice plants, generally during the reproductive stage. It is often mistaken for drought stress symptoms.",
    cause:
      "Caused by the fungus Microdochium oryzae (synonym: Helminthosporium sigmoideum var. irregulare). It develops under humid conditions with temperatures of 28–32°C. It spreads through water splashes and undecomposed residues of infected plants.",
    characteristic:
      "Initial lesions appear as light brown spots elongating downward from the leaf tip, forming a 'zonal' pattern with alternating light and dark zones. Lesion edges are irregular and dark brown. Infected tissue dries out and turns grayish.",
    impact:
      "Reduces the photosynthetic capacity of the upper leaves, which play a critical role in grain filling. Under severe attack, yield can decrease by 15–25% due to incomplete grain filling and an increased number of empty grains.",
    solution:
      "Use copper-based fungicides or Propiconazole. Adjust fertilizer balance by reducing nitrogen and increasing potassium. Practice crop rotation and destroy rice straw residues from the previous season.",
  },
  Rice__neck_blast: {
    images: [neckblast1, neckblast2, neckblast3, neckblast4, neckblast5],
    explanation:
      "Neck Blast is the most destructive phase of blast disease, also caused by Magnaporthe oryzae, but targeting the panicle neck (base) and the upper internodes. The attack occurs during the reproductive stage.",
    cause:
      "Identical to Leaf Blast, caused by Magnaporthe oryzae. Infection occurs when the panicle is newly emerged (heading stage). Humid weather, continuous rainfall, and cool night temperatures strongly favor the development of this disease.",
    characteristic:
      "Dark brown to black lesions appear at the panicle base (node) or at the panicle neck. Infected internodes weaken and break. Affected panicles appear upright but contain empty, grayish grains (empty spikelets).",
    impact:
      "This is the most critical phase of the disease and can cause total harvest loss (100%) because all panicles fail to fill grains. A severely affected clump can rapidly spread spores to neighboring clumps.",
    solution:
      "Apply preventive systemic fungicides (Tricyclazole or Tebuconazole) starting 5–7 days before panicle emergence until 2 weeks after heading. Use blast-resistant varieties. Avoid simultaneous planting of susceptible varieties across large areas to break the epidemic cycle.",
  },
  Rice__sheath_blight: {
    images: [sheathblight1, sheathblight2, sheathblight3, sheathblight4, sheathblight5],
    explanation:
      "Sheath Blight is a highly common and destructive fungal disease in intensive rice cultivation. It attacks the lower leaf sheaths and progressively moves upward toward the upper parts of the plant.",
    cause:
      "Caused by the soil-borne fungus Rhizoctonia solani AG-1 IA. This fungus forms sclerotia that persist in irrigation water and soil for many years. It thrives rapidly in dense planting conditions, high humidity, and excessive nitrogen fertilization.",
    characteristic:
      "Oval or irregular lesions, initially grayish-green to white with brown margins, appear on sheaths near the water surface. Lesions can spread to the leaves and upper plant parts. Under humid conditions, white fungal mycelium and brown sclerotia are visible on the lesion surface.",
    impact:
      "Attacks the critical sheath area responsible for nutrient transport to the panicle. Can cause yield losses of 10–40%. Infections reaching the flag leaf and panicle severely reduce grain quality and quantity, and increase the percentage of broken rice during milling.",
    solution:
      "Apply fungicides containing Validamycin, Hexaconazole, or Propiconazole as soon as early symptoms are detected. Use wider planting spacing (25x25 cm or the Jajar Legowo system) to improve air circulation. Reduce nitrogen dosage and periodically drain the field.",
  },
};

// =============================================
// KOMPONEN UTAMA
// =============================================
function DetectionResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const detectionData = location.state?.detectionData || {
    mainDisease: "Rice__leaf_blast",
    confidence: 60,
    uploadedImage: null,
    breakdown: [
      { name: "Rice__leaf_blast", value: 60, color: "#013328" },
      { name: "Rice__sheath_blight", value: 30, color: "#8fa886" },
      { name: "Rice__healthy", value: 10, color: "#dbe4cd" },
    ],
  };

  const handleBack = () => {
    navigate("/detection");
  };

  // Format nama penyakit: "Rice__leaf_blast" → "Leaf Blast"
  const formatDiseaseName = (name) => {
    if (!name) return "";
    return name
      .replace(/^Rice__/i, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Ambil data penyakit dari database, fallback ke default jika tidak ditemukan
  const getDiseaseData = (diseaseName) => {
    // Coba cocokkan key yang ada (case-insensitive, flexible)
    const normalizedInput = diseaseName?.toLowerCase().replace(/ /g, "_");
    const matchedKey = Object.keys(DISEASE_DATABASE).find(
      (key) => key.toLowerCase() === normalizedInput ||
               key.toLowerCase().replace("rice__", "") === normalizedInput
    );
    return matchedKey
      ? DISEASE_DATABASE[matchedKey]
      : {
          images: [],
          explanation: "Data penjelasan untuk penyakit ini belum tersedia. Segera konsultasikan dengan penyuluh pertanian setempat.",
          cause: "Data belum tersedia.",
          characteristic: "Data belum tersedia.",
          impact: "Data belum tersedia.",
          solution: "Segera konsultasikan dengan penyuluh pertanian setempat untuk penanganan lebih lanjut.",
        };
  };

  // Label di dalam pie chart
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, value, index,
  }) => {
    if (value < 8) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const item = formattedBreakdown[index];
    const shortName = item?.formattedName?.split(" ")[0] || "";

    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="white">
        <tspan x={x} dy="-0.6em" fontSize="13px" fontWeight="bold" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}>
          {shortName}
        </tspan>
        <tspan x={x} dy="1.3em" fontSize="13px" fontWeight="bold">
          {`${value}%`}
        </tspan>
      </text>
    );
  };

  const formattedBreakdown = detectionData.breakdown
    .map((item) => ({ ...item, formattedName: formatDiseaseName(item.name) }))
    .filter((item) => item.value > 0);

  const formattedMainDisease = formatDiseaseName(detectionData.mainDisease);
  const diseaseData = getDiseaseData(detectionData.mainDisease);

  return (
    <div className="result-wrapper">
      <img src={landscapeImage} alt="background" className="result-background-img" />

      <div className="result-main-container">
        <div className="result-card-outer">
          <div className="result-card-inner">
            {/* Back */}
            <div className="back-link" onClick={handleBack}>Back</div>

            {/* ── TOP: Chart + Info ── */}
            <div className="top-content">
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedBreakdown}
                      cx="50%" cy="50%"
                      innerRadius={0}
                      outerRadius={110}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      stroke="#333" strokeWidth={2}
                    >
                      {formattedBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="info-wrapper">
                <div className="main-stat-row">
                  <span className="percentage-huge">{detectionData.confidence}%</span>
                  <div className="disease-title-col">
                    <span className="indicated-label">Your rice is indicated by</span>
                    <span className="disease-name">{formattedMainDisease}</span>
                  </div>
                </div>
                <div className="breakdown-list">
                  {formattedBreakdown.slice(1).map((item, index) => (
                    <div key={index} className="breakdown-text-row">
                      {item.value}%{" "}
                      {item.formattedName.toLowerCase() === "healthy"
                        ? "Healthy"
                        : `Indicated by ${item.formattedName}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── UPLOADED IMAGE ── */}
            {detectionData.uploadedImage && (
              <div className="uploaded-image-section">
                <p className="section-label">Analyzed Image</p>
                <img src={detectionData.uploadedImage} alt="Analyzed Rice Leaf" />
              </div>
            )}

            {/* ── DIVIDER ── */}
            <div className="section-divider" />

            {/* ── PICTURE WITH ANOTHER DISEASES ── */}
            {diseaseData.images && diseaseData.images.length > 0 && (
              <div className="reference-images-section">
                <p className="section-label">Picture with another diseases</p>
                <div className="reference-images-grid">
                  {diseaseData.images.map((img, idx) => (
                    <div key={idx} className="reference-image-card">
                      <img src={img} alt={`${formattedMainDisease} reference ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SECTION DIVIDER ── */}
            <div className="section-divider" />

            {/* ── DISEASE INFO SECTIONS ── */}
            <div className="disease-info-sections">
              <DiseaseInfoBlock
                title="Diseases Explanation"
                icon="📋"
                text={diseaseData.explanation}
              />
              <DiseaseInfoBlock
                title="Diseases Cause"
                icon="🔬"
                text={diseaseData.cause}
              />
              <DiseaseInfoBlock
                title="Diseases Characteristic"
                icon="🔍"
                text={diseaseData.characteristic}
              />
              <DiseaseInfoBlock
                title="Disease Impact"
                icon="⚠️"
                text={diseaseData.impact}
              />
              <DiseaseInfoBlock
                title="Disease Solution"
                icon="💊"
                text={diseaseData.solution}
                isLast
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-komponen blok info penyakit ──
function DiseaseInfoBlock({ title, icon, text, isLast }) {
  return (
    <div className={`disease-info-block ${isLast ? "is-last" : ""}`}>
      <div className="disease-info-header">
        <span className="disease-info-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default DetectionResult;