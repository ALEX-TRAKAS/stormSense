  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";

  type AuthFormProps = {
    mode: "login" | "signup";
    onSubmit: (data: {
      name?: string;
      email?: string;
      username?: string;
      password: string;
    }) => Promise<void>;
};

  export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState("");

    

    useEffect(() => {
      setLoaded(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (mode === "login") {
      await onSubmit({
        username,
        password,
      });
    } else {
      await onSubmit({
        name,
        email,
        password,
      });
    }

    navigate("/");
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "Submission failed");
  } finally {
    setLoading(false);
  }
};


    const styles: { [key: string]: React.CSSProperties } = {
      container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1a1a1a" ,
        transition: "background-color 0.3s",
        padding: "16px",
      },
      panel: {
        width: "100%",
        maxWidth: "400px",
        padding: "24px",
        borderRadius: "24px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        backgroundColor:  "#2c2c2c" ,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "scale(1)" : "scale(0.95)",
        transition: "all 0.3s",
      },
      title: {
        textAlign: "center" as const,
        fontSize: "1.8rem",
        fontWeight: "bold",
        color: "#fff",
        marginBottom: "16px",
      },
      error: {
        color: "#ff4d4f",
        textAlign: "center" as const,
        marginBottom: "12px",
        animation: "pulse 1s infinite",
      },
      input: {
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "12px",
        border: `1px solid "#555" `,
        fontSize: "1rem",
        outline: "none",
        boxSizing: "border-box" as const,
      },
      passwordWrapper: {
        position: "relative" as const,
        marginBottom: "12px",
      },
      toggleButton: {
        position: "absolute" as const,
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        color: "#ccc" ,
        cursor: "pointer",
      },
      submitButton: {
        width: "100%",
        padding: "12px",
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "12px",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        backgroundColor: loading ? "#a0c4ff" : "#1d4ed8",
        color: "#fff",
        transition: "background-color 0.3s",
      },
      darkModeToggle: {
        marginBottom: "16px",
        float: "right" as const,
        padding: "6px 12px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "1px solid #888",
        background: "#444",
        color:  "#fff" ,
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.panel}>
          <form onSubmit={handleSubmit}>
            <h1 style={styles.title}>{mode === "login" ? "Login" : "Sign Up"}</h1>

            {error && <p style={styles.error}>{error}</p>}

          {mode === "signup" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </>
            )}

            {mode === "login" && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                required
              />
            )}

            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button
                type="button"
                style={styles.toggleButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading
                ? mode === "login"
                  ? "Logging in..."
                  : "Creating..."
                : mode === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    );
  }
