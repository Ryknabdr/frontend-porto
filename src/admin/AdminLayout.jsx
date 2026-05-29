import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Award, LogOut } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>R</span>
          <h3>Raihan Admin</h3>
        </div>

        <nav className="admin-menu">
          <NavLink to="/raihan-admin" end>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/raihan-admin/projects">
            <FolderKanban size={18} />
            Projects
          </NavLink>

          <NavLink to="/raihan-admin/certificates">
            <Award size={18} />
            Certificates
          </NavLink>
        </nav>

        <div className="admin-user">
          <div className="admin-avatar">RV</div>
          <div>
            <strong>Raihan</strong>
            <p>Administrator</p>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>Portfolio Management</p>
            <h2>Admin Panel</h2>
          </div>

          <button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("adminToken");
    window.location.href = "/raihan-login";
  }}
>
  <LogOut size={17} />
  Logout
</button>
        </header>

        <Outlet />
      </main>
    </div>
  );
}