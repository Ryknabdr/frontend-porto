import { ArrowRight } from "lucide-react";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text fade-up">
        <p className="badge">Frontend Developer • UI Enthusiast</p>

        <h1>
          Hi, saya <span>Raihan</span> <br />
          membangun website modern dan elegan.
        </h1>

        <p className="hero-desc">
          Portfolio profesional untuk menampilkan project, sertifikat,
          pengalaman, dan skill dengan tampilan premium.
        </p>

        <div className="hero-actions">
          <a href="/projects" className="primary-btn">
            Lihat Project <ArrowRight size={18} />
          </a>
          <a href="/cv.pdf" download className="cv-btn">
  <FaDownload />
  Download CV
</a>
        </div>
      </div>

      <div className="hero-card float">
        <div className="profile-circle">RV</div>
        <h3>Muh Abdul Raihan</h3>
        <p>React • Flask • UI/UX • Web App</p>

        <div className="stats">
          <div>
            <h4>10+</h4>
            <span>Project</span>
          </div>
          <div>
            <h4>8+</h4>
            <span>Sertifikat</span>
          </div>
        </div>
      </div>

      
    </section>
    
  );
}