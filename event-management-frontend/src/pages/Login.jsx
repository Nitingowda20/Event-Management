import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:1234/api/users"; // Fetch from .env file or fallback to localhost

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            token: response.data.token,
            username: response.data.user.username,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/guest-login`);
      const { token } = response.data;
      localStorage.setItem("currentUser", JSON.stringify({ token }));
      navigate("/");
    } catch (error) {
      console.error("Guest login failed", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            style={styles.button}
          >
            Login as Guest
          </button>
        </form>
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <a href="/register" style={styles.registerLink}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width:"100vw",
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    maxWidth: "350px",
    width:"100%",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "90%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "90%",
    margin:"10px"
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  registerText: {
    textAlign: "center",
  },
  registerLink: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default Login;
