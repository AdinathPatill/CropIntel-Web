import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import config from '../config';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config.backendUrl}/api/user/loginUser`, { mobileNumber });

      if (response.data.success) {
        setMobileNumber('');
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
      <LeftSection>
        <AppName>CROPINTEL</AppName>
        <Curve />
      </LeftSection>
      <RightSection>
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
      </RightSection>
    </Container>
  );
};

const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #56ab2f;
  position: relative;
  overflow: hidden;
  animation: ${fadeInLeft} 1s ease;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  padding: 40px;
  position: relative;
  z-index: 1;
`;

const Curve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: #f0f2f5;
  clip-path: ellipse(50% 40% at 50% 0%);
  z-index: 0;
`;

const Card = styled.div`
  background-color: white;
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 1s ease;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const SubText = styled.p`
  font-size: 18px;
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
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
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

const AppName = styled.h1`
  font-size: 48px;
  color: #fff;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
`;

export default LoginPage;
