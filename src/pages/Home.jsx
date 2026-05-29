import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import CertificateCard from "../components/CertificateCard";
import EducationTimeline from "../components/EducationTimeline";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const API = "https://backend-porto-production-f413.up.railway.app/api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get(`${API}/projects`).then((res) => {
      setProjects(res.data.slice(0, 3));
    });

    axios.get(`${API}/certificates`).then((res) => {
      setCertificates(res.data.slice(0, 3));
    });
  }, []);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="section-title">
          <p>Tentang Saya</p>
          <h2>About Me</h2>
        </div>

        <div className="about-box">
          <p>
            Saya adalah mahasiswa Teknik Informatika yang memiliki minat pada
            Frontend Development, UI/UX Design, dan Web Development.
          </p>
          <p>
            Saya terbiasa menggunakan React, Flask, Laravel, Flutter, MongoDB,
            dan MySQL untuk membangun aplikasi modern.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>My Skills</p>
          <h2>Tech Stack</h2>
        </div>
        
        <div className="skills-grid">
          <span>React</span>
          <span>Flask</span>
          <span>Laravel</span>
          <span>Flutter</span>
          <span>MongoDB</span>
          <span>MySQL</span>
          <span>Git</span>
          <span>Figma</span>
          <span>Python</span>
          <span>JavaScript</span>
        </div>
      </section>

      <section className="section">
  <div className="section-title">
    <p>Education</p>
    <h2>Education Journey</h2>
  </div>

  <EducationTimeline />
</section>

      <section className="section">
        <div className="section-title">
          <p>Featured Work</p>
          <h2>Project Terbaru</h2>
        </div>

        <div className="grid">
          {projects.map((item) => (
            <ProjectCard
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              desc={item.description}
              tech={item.tech || []}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Achievement</p>
          <h2>Sertifikat Terbaru</h2>
        </div>

        <div className="grid">
          {certificates.map((item) => (
            <CertificateCard
              key={item._id}
              image={item.image}
              title={item.title}
              issuer={item.issuer}
              year={item.year}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p>Contact</p>
          <h2>Hubungi Saya</h2>
        </div>

        <div className="contact-box">
          <a href="mailto:abdurraihan59@gmail.com">
            <FaEnvelope size={28} />
            <span>Email</span>
          </a>

          <a
            href="https://github.com/Ryknabdr"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={28} />
            <span>Github</span>
          </a>

          <a
            href="https://www.linkedin.com/in/muhabdurraihan01/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={28} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://wa.me/6281548245176"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={28} />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>
    </>
  );
}