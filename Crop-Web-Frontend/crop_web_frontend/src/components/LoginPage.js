import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import config from '../config';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("1");
    try {
      const response = await axios.post(`${config.backendUrl}/api/user/loginUser`, { mobileNumber });
      console.log("2");

      if (response.data.success) {
    console.log("3");

        // alert('OTP sent successfully');
        setMobileNumber('');
    console.log("4");

        navigate(`/otp?mobileNumber=${mobileNumber}`);
      } else {
        alert(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <SubText>Login with your mobile number</SubText>
        <Input 
          placeholder="Mobile Number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} 
        />
        <Button onClick={handleLogin}>Login</Button>
        <RegisterText onClick={() => navigate('/register')}>New user? Register here</RegisterText>
      </Card>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Card = styled.div`
  background-color: white;
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const RegisterText = styled.p`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;

  &:hover {
    color: #0056b3;
  }
`;
