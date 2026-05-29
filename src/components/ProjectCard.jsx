import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({ id, image, title, desc, tech }) {
  return (
    <Link to={`/projects/${id}`} className="card luxury-card">
      {image && <img src={image} alt={title} className="project-image" />}

      <div className="card-top">
        <h3>{title}</h3>
        <ExternalLink size={20} />
      </div>

      <p>{desc}</p>

      <div className="tags">
        {tech.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </Link>
  );
}