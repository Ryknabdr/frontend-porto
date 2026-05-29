import { useEffect, useState } from "react";
import axios from "axios";
import CertificateCard from "../components/CertificateCard";

const API = "https://backend-porto-production-f413.up.railway.app/api";
export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get(`${API}/certificates`)
      .then((res) => setCertificates(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="section page">
      <div className="section-title">
        <p>My Certificates</p>
        <h2>Sertifikat Saya</h2>
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
  );
}