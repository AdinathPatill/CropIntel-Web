import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import config from '../config';

const OtpPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mobileNumber = query.get('mobileNumber');

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return; // Only allow numeric input
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < 5) {
      document.getElementById(`otp${index + 1}`).focus();
    }
  };

  const handleOtpVerification = async () => {
    const otpCode = otp.join('');
    try {
      const response = await axios.post(`${config.backendUrl}/api/user/verifyOtp`, {
        mobileNumber: mobileNumber,
        enteredOtp: otpCode
      });
  
      if (response.data.success) {
        alert('OTP verified successfully');
        navigate('/dashboard');
      } else {
        alert(`OTP verification failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Container>
      <LeftSection>
        <Curve />
        <AppName>CROPINTEL</AppName>
      </LeftSection>
      <RightSection>
        <Curve />
        <Card>
          <Title>Enter OTP</Title>
          <SubText>Enter the 6-digit OTP sent to your mobile number</SubText>
          <OtpContainer>
            {otp.map((_, index) => (
              <OtpInput
                key={index}
                type="text"
                maxLength="1"
                id={`otp${index}`}
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </OtpContainer>
          <Button onClick={handleOtpVerification}>Verify OTP</Button>
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

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  position: relative;
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

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #56ab2f;
  position: relative;
  overflow: hidden;
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
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 1s ease;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const AppName = styled.h1`
  font-size: 48px;
  color: #fff;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
`;

export default OtpPage;
