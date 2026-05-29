import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Raihan<span>.</span></Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/certificates">Certificates</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/admin" className="nav-btn">Admin</Link> */}
      </div>
    </nav>
  );
}