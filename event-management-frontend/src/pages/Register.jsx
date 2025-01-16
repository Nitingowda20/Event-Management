import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const API_URL = "http://localhost:1234/api/users";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2>Register</h2>
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
            <label>Email:</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          <Button type="submit">Register</Button>
        </form>
        <RegisterText>
          Already have an account? <a href="/login">Login here</a>
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
  width: 100%;
  max-width: 350px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 7px;
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

export default Register;
