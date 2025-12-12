import { Link } from "react-router-dom";
import logo from "../assets/logo.png";



export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        backgroundColor: "#fff",
        borderBottom:   "1px solid #333" ,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="StormSense Logo"
          style={{
            height: "100px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </Link>
      <nav style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link to="/login">
          <button
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "#e6e6e6",
              color:  "#222",
              border: "1px solid #888",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "#2563eb" ,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Sign Up
          </button>
        </Link>
      </nav>
    </header>
  );
}
