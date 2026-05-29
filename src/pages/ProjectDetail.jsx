import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "https://backend-porto-production-f413.up.railway.app/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`${API}/projects`).then((res) => {
      const found = res.data.find((item) => item._id === id);
      setProject(found);
    });
  }, [id]);

  if (!project) {
    return (
      <section className="section page">
        <h2>Project tidak ditemukan</h2>
        <Link to="/projects" className="primary-btn">
          Kembali
        </Link>
      </section>
    );
  }

  return (
    <section className="section page">
      <Link to="/projects" className="admin-secondary-btn">
        ← Kembali
      </Link>

      <div className="project-detail">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-detail-img"
          />
        )}

        <div className="project-detail-content">
          <p className="badge">Project Detail</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>

          <div className="tags">
            {(project.tech || []).map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>

          <div className="detail-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                Github
              </a>
            )}

            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}