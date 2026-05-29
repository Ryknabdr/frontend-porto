import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const API = "https://backend-porto-production-f413.up.railway.app/api";
export default function CertificateList() {
  const [certificates, setCertificates] = useState([]);

  const getCertificates = async () => {
    const res = await axios.get(`${API}/certificates`);
    setCertificates(res.data);
  };

  useEffect(() => {
    getCertificates();
  }, []);

  const deleteCertificate = async (id) => {
    const confirmDelete = confirm(
      "Yakin mau hapus sertifikat ini?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    await axios.delete(`${API}/certificates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getCertificates();
  };

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <div>
          <p>Content</p>
          <h1>Certificates</h1>
        </div>

        <Link
          to="/raihan-admin/certificates/add"
          className="admin-add-btn"
        >
          <Plus size={18} />
          Tambah Sertifikat
        </Link>
      </div>

      <div className="admin-table-card">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Nama Sertifikat</th>
              <th>Penyelenggara</th>
              <th>Tahun</th>
              <th>Link</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((item, index) => (
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
                    "-"
                  )}
                </td>

                <td>{item.title}</td>
                <td>{item.issuer}</td>
                <td>{item.year}</td>

                <td>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <div className="admin-action-buttons">
                    <Link
                      to={`/raihan-admin/certificates/edit/${item._id}`}
                    >
                      <Pencil size={16} />
                    </Link>

                    <button
                      onClick={() =>
                        deleteCertificate(item._id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {certificates.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-table">
                  Belum ada sertifikat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}