import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const API = "https://backend-porto-production-f413.up.railway.app/api";
export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API}/projects`).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <section className="section page">
      <div className="section-title">
        <p>My Work</p>
        <h2>Semua Project</h2>
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
  );
}