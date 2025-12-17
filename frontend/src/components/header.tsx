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
    </header>
  );
}
