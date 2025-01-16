import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const API_URL = "https://event-management-e9oz.onrender.com/api/users"; // Fetch from .env file or fallback to localhost

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
    <Container>
      <FormContainer>
        <h2>Login</h2>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Username:</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormGroup>
          <FormGroup>
            <label>Password:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormGroup>
          <Button type="submit">Login</Button>
          <Button type="button" onClick={handleGuestLogin}>
            Login as Guest
          </Button>
        </form>
        <RegisterText>
          Don't have an account?{" "}
          <a href="/register">Register here</a>
        </RegisterText>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

const RegisterText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  a {
    color: #4caf50;
    text-decoration: none;
  }
`;

export default Login;
