import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "https://backend-porto-production-f413.up.railway.app/api";

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`${API}/projects`).then((res) => {
        const project = res.data.find((item) => item._id === id);

        if (project) {
          setForm({
            title: project.title || "",
            description: project.description || "",
            tech: project.tech ? project.tech.join(", ") : "",
            github: project.github || "",
            demo: project.demo || "",
            image: project.image || "",
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
      title: form.title,
      description: form.description,
      tech: form.tech
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      github: form.github,
      demo: form.demo,
      image: imageUrl,
    };

    if (id) {
      await axios.put(`${API}/projects/${id}`, payload, config);
    } else {
      await axios.post(`${API}/projects`, payload, config);
    }

    navigate("/raihan-admin/projects");
  };

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <div>
          <p>Projects</p>
          <h1>{id ? "Edit Project" : "Tambah Project"}</h1>
        </div>

        <Link to="/raihan-admin/projects" className="admin-secondary-btn">
          Kembali
        </Link>
      </div>

      <form className="admin-form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Judul Project</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Contoh: Nutrix AI"
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Deskripsi singkat project"
            required
          />
        </div>

        <div className="form-group">
          <label>Teknologi</label>
          <input
            value={form.tech}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
            placeholder="React, Flask, MongoDB"
          />
        </div>

        <div className="form-group">
          <label>Github</label>
          <input
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="form-group">
          <label>Demo</label>
          <input
            value={form.demo}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Gambar Project</label>
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
          {id ? "Update Project" : "Simpan Project"}
        </button>
      </form>
    </div>
  );
}