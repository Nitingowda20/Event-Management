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
        // Save token in localStorage
        localStorage.setItem("token", response.data.token);

        // Navigate to event dashboard after successful login
        navigate("/dashboard");
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
      localStorage.setItem("token", token);
      navigate("/guest-dashboard");
    } catch (error) {
      console.error("Guest login failed", error);
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Login </h2>
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
          <button onClick={handleGuestLogin}>Login as Guest</button>
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
    minHeight: "100vh", // Ensure it takes the full height of the viewport
    width: "100vw", // Ensure it takes the full width of the viewport
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    width: "100%",
    maxWidth: "350px",
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
    width: "95%",
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
    width: "100%",
  },
  buttonView: {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
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
