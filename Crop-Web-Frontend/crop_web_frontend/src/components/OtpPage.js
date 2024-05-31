import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import config from '../config';

const OtpPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mobileNumber = query.get('mobileNumber');
  console.log('mobileNumber:', mobileNumber); // Check the value

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
        enteredOtp: otpCode // Ensure enteredOtp is correctly included in the request body
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
    </Container>
  );
};

export default OtpPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ecf0f1;
`;

const Card = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px;
  color: black;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #7f8c8d;
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
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
