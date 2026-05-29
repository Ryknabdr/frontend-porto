import { Award } from "lucide-react";

export default function CertificateCard({ image, title, issuer, year }) {
  return (
    <div className="card cert-card">
      {image ? (
        <img src={image} alt={title} className="project-image" />
      ) : (
        <Award size={34} />
      )}

      <h3>{title}</h3>
      <p>{issuer}</p>
      <span>{year}</span>
    </div>
  );
}