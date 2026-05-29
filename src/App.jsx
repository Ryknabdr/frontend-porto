import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Certificates from "./pages/Certificates";

import AdminLogin from "./admin/AdminLogin";
import ProtectedAdmin from "./admin/ProtectedAdmin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProjectList from "./admin/ProjectList";
import ProjectForm from "./admin/ProjectForm";
import CertificateList from "./admin/CertificateList";
import CertificateForm from "./admin/CertificateForm";

function AppContent() {
  const location = useLocation();
  const isAdminPage =
    location.pathname.startsWith("/raihan-admin") ||
    location.pathname.startsWith("/raihan-login");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/certificates" element={<Certificates />} />

        <Route path="/raihan-login" element={<AdminLogin />} />

        <Route
          path="/raihan-admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/add" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />

          <Route path="certificates" element={<CertificateList />} />
          <Route path="certificates/add" element={<CertificateForm />} />
          <Route path="certificates/edit/:id" element={<CertificateForm />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}