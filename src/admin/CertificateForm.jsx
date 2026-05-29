import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "https://backend-porto-production-f413.up.railway.app/api";

export default function CertificateForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    year: "",
    link: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`${API}/certificates`).then((res) => {
        const cert = res.data.find((item) => item._id === id);

        if (cert) {
          setForm({
            title: cert.title || "",
            issuer: cert.issuer || "",
            year: cert.year || "",
            link: cert.link || "",
            image: cert.image || "",
          });
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let imageUrl = form.image;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post(`${API}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      imageUrl = uploadRes.data.image_url;
    }

    const payload = {
      ...form,
      image: imageUrl,
    };

    if (id) {
      await axios.put(`${API}/certificates/${id}`, payload, config);
    } else {
      await axios.post(`${API}/certificates`, payload, config);
    }

    navigate("/raihan-admin/certificates");
  };

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <div>
          <p>Certificates</p>
          <h1>{id ? "Edit Sertifikat" : "Tambah Sertifikat"}</h1>
        </div>

        <Link to="/raihan-admin/certificates" className="admin-secondary-btn">
          Kembali
        </Link>
      </div>

      <form className="admin-form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Sertifikat</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Contoh: UI/UX Designer"
            required
          />
        </div>

        <div className="form-group">
          <label>Penyelenggara</label>
          <input
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            placeholder="Contoh: Dicoding / Workshop / Kampus"
            required
          />
        </div>

        <div className="form-group">
          <label>Tahun</label>
          <input
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="2026"
          />
        </div>

        <div className="form-group">
          <label>Link Sertifikat</label>
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Upload Gambar Sertifikat</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className="form-preview"
          />
        )}

        {!imageFile && form.image && (
          <img src={form.image} alt="preview" className="form-preview" />
        )}

        <button type="submit" className="admin-submit-btn">
          {id ? "Update Sertifikat" : "Simpan Sertifikat"}
        </button>
      </form>
    </div>
  );
}