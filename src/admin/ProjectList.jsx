import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const API = "https://backend-porto-production-f413.up.railway.app/api";
export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const res = await axios.get(`${API}/projects`);
    setProjects(res.data);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const deleteProject = async (id) => {
    const confirmDelete = confirm("Yakin mau hapus project ini?");

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    await axios.delete(`${API}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getProjects();
  };

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <div>
          <p>Content</p>
          <h1>Projects</h1>
        </div>

        <Link to="/raihan-admin/projects/add" className="admin-add-btn">
          <Plus size={18} />
          Tambah Project
        </Link>
      </div>

      <div className="admin-table-card">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Teknologi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="admin-thumb"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </td>

                <td>{item.title}</td>
                <td>{item.description}</td>

                <td>
                  <div className="admin-tags">
                    {(item.tech || []).map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                </td>

                <td>
                  <div className="admin-action-buttons">
                    <Link to={`/raihan-admin/projects/edit/${item._id}`}>
                      <Pencil size={16} />
                    </Link>

                    <button onClick={() => deleteProject(item._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-table">
                  Belum ada project.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}