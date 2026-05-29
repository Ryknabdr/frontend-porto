import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [editProjectId, setEditProjectId] = useState(null);
  const [editCertId, setEditCertId] = useState(null);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
  });

  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    year: "",
    link: "",
    image: "",
  });

  const getData = async () => {
    const projectRes = await axios.get(`${API}/projects`);
    const certRes = await axios.get(`${API}/certificates`);
    setProjects(projectRes.data);
    setCertificates(certRes.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitProject = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imageUrl = uploadRes.data.image_url;
    }

    const payload = {
      ...projectForm,
      tech: projectForm.tech.split(",").map((item) => item.trim()),
      image: imageUrl || projectForm.image || "",
    };

    if (editProjectId) {
      await axios.put(`${API}/projects/${editProjectId}`, payload);
      setEditProjectId(null);
    } else {
      await axios.post(`${API}/projects`, payload);
    }

    setProjectForm({
      title: "",
      description: "",
      tech: "",
      github: "",
      demo: "",
      image: "",
    });

    setImageFile(null);
    e.target.reset();
    getData();
  };

  const submitCertificate = async (e) => {
    e.preventDefault();

    if (editCertId) {
      await axios.put(`${API}/certificates/${editCertId}`, certForm);
      setEditCertId(null);
    } else {
      await axios.post(`${API}/certificates`, certForm);
    }

    setCertForm({
      title: "",
      issuer: "",
      year: "",
      link: "",
      image: "",
    });

    getData();
  };

  const handleEditProject = (item) => {
    setEditProjectId(item._id);
    setProjectForm({
      title: item.title || "",
      description: item.description || "",
      tech: item.tech ? item.tech.join(", ") : "",
      github: item.github || "",
      demo: item.demo || "",
      image: item.image || "",
    });
  };

  const handleEditCertificate = (item) => {
    setEditCertId(item._id);
    setCertForm({
      title: item.title || "",
      issuer: item.issuer || "",
      year: item.year || "",
      link: item.link || "",
      image: item.image || "",
    });
  };

  const deleteProject = async (id) => {
    await axios.delete(`${API}/projects/${id}`);
    getData();
  };

  const deleteCertificate = async (id) => {
    await axios.delete(`${API}/certificates/${id}`);
    getData();
  };

  return (
    <section className="section page">
      <div className="section-title">
        <p>Private Area</p>
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-grid">
        <form className="admin-box" onSubmit={submitProject}>
          <h3>{editProjectId ? "Edit Project" : "Tambah Project"}</h3>

          <input
            placeholder="Judul project"
            value={projectForm.title}
            onChange={(e) =>
              setProjectForm({ ...projectForm, title: e.target.value })
            }
          />

          <textarea
            placeholder="Deskripsi project"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
          />

          <input
            placeholder="Tech, pisahkan koma"
            value={projectForm.tech}
            onChange={(e) =>
              setProjectForm({ ...projectForm, tech: e.target.value })
            }
          />

          <input
            placeholder="Link Github"
            value={projectForm.github}
            onChange={(e) =>
              setProjectForm({ ...projectForm, github: e.target.value })
            }
          />

          <input
            placeholder="Link Demo"
            value={projectForm.demo}
            onChange={(e) =>
              setProjectForm({ ...projectForm, demo: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button type="submit">
            {editProjectId ? "Update Project" : "Simpan Project"}
          </button>
        </form>

        <form className="admin-box" onSubmit={submitCertificate}>
          <h3>{editCertId ? "Edit Sertifikat" : "Tambah Sertifikat"}</h3>

          <input
            placeholder="Nama sertifikat"
            value={certForm.title}
            onChange={(e) =>
              setCertForm({ ...certForm, title: e.target.value })
            }
          />

          <input
            placeholder="Penyelenggara"
            value={certForm.issuer}
            onChange={(e) =>
              setCertForm({ ...certForm, issuer: e.target.value })
            }
          />

          <input
            placeholder="Tahun"
            value={certForm.year}
            onChange={(e) =>
              setCertForm({ ...certForm, year: e.target.value })
            }
          />

          <input
            placeholder="Link sertifikat"
            value={certForm.link}
            onChange={(e) =>
              setCertForm({ ...certForm, link: e.target.value })
            }
          />

          <input
            placeholder="Link gambar sertifikat"
            value={certForm.image}
            onChange={(e) =>
              setCertForm({ ...certForm, image: e.target.value })
            }
          />

          <button type="submit">
            {editCertId ? "Update Sertifikat" : "Simpan Sertifikat"}
          </button>
        </form>
      </div>

      <div className="admin-list">
        <h3>Data Project</h3>

        {projects.map((item) => (
          <div className="admin-table" key={item._id}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>

            <div className="admin-action-buttons">
              <button onClick={() => handleEditProject(item)}>Edit</button>
              <button className="danger" onClick={() => deleteProject(item._id)}>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-list">
        <h3>Data Sertifikat</h3>

        {certificates.map((item) => (
          <div className="admin-table" key={item._id}>
            <div>
              <strong>{item.title}</strong>
              <span>
                {item.issuer} - {item.year}
              </span>
            </div>

            <div className="admin-action-buttons">
              <button onClick={() => handleEditCertificate(item)}>Edit</button>
              <button
                className="danger"
                onClick={() => deleteCertificate(item._id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}