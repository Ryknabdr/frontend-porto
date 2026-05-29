import { useEffect, useState } from "react";
import axios from "axios";
import { FolderKanban, Award } from "lucide-react";

const API = "https://backend-porto-production-f413.up.railway.app/api";

export default function AdminDashboard() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);

  useEffect(() => {
    axios.get(`${API}/projects`).then((res) => setTotalProjects(res.data.length));
    axios.get(`${API}/certificates`).then((res) => setTotalCertificates(res.data.length));
  }, []);

  return (
    <div className="admin-content">
      <div className="admin-page-title">
        <p>Overview</p>
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-icon">
            <FolderKanban size={28} />
          </div>
          <div>
            <p>Total Project</p>
            <h2>{totalProjects}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">
            <Award size={28} />
          </div>
          <div>
            <p>Total Sertifikat</p>
            <h2>{totalCertificates}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}