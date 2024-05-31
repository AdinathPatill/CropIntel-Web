import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import styled from 'styled-components';

const RegisterUser = () => {
  const [fullname, setFullname] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  useEffect(() => {
    // Fetch the list of states when the component mounts
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.post('http://115.124.105.220/API/GetState');
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchDistricts = async (stateCode) => {
    try {
      const response = await axios.post('http://115.124.105.220/API/GetAllDistricts', {
        statecode: stateCode,
      });
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchTalukas = async (districtCode) => {
    try {
      const response = await axios.post('http://115.124.105.220/API/GetAllTalukas', {
        districtcode: districtCode,
      });
      setTalukas(response.data);
    } catch (error) {
      console.error('Error fetching talukas:', error);
    }
  };

  const fetchVillages = async (talukaCode) => {
    try {
      const response = await axios.post('http://115.124.105.220/API/GetAllVillages', {
        subdistrictcode: talukaCode,
      });
      setVillages(response.data);
    } catch (error) {
      console.error('Error fetching villages:', error);
      console.log('Error details:', error.response);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/user/registerUser`,
        {
          fullname,
          mobileNumber,
          password,
          addressLine1,
          addressLine2,
          selectedState,
          selectedDistrict,
          selectedVillage,
          selectedTaluka,
        }
      );

      if (response.data.success) {
        alert('User registered successfully');
        clearForm();
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const clearForm = () => {
    setFullname('');
    setMobileNumber('');
    setPassword('');
    setAddressLine1('');
    setAddressLine2('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluka('');
    setSelectedVillage('');
  };

  return (
    <Container>
      <Card>
        <Title>Register</Title>
        <SubText>Create a new account on CROPINTEL</SubText>
        <Input 
          placeholder="Full Name" 
          value={fullname} 
          onChange={(e) => setFullname(e.target.value)} 
        />
        <Input 
          placeholder="Mobile Number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Input 
          placeholder="Address Line 1" 
          value={addressLine1} 
          onChange={(e) => setAddressLine1(e.target.value)} 
        />
        <Input 
          placeholder="Address Line 2" 
          value={addressLine2} 
          onChange={(e) => setAddressLine2(e.target.value)} 
        />
        <Dropdown
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedDistrict('');
            setSelectedTaluka('');
            setSelectedVillage('');
            fetchDistricts(e.target.value);
          }}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.statecode} value={state.statecode}>{state.statenameenglish}</option>
          ))}
        </Dropdown>
        <Dropdown
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedTaluka('');
            setSelectedVillage('');
            fetchTalukas(e.target.value);
          }}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.districtcode} value={district.districtcode}>{district.districtnameenglish}</option>
          ))}
        </Dropdown>
        <Dropdown
          value={selectedTaluka}
          onChange={(e) => {
            setSelectedTaluka(e.target.value);
            setSelectedVillage('');
            fetchVillages(e.target.value);
          }}
        >
          <option value="">Select Taluka</option>
          {talukas.map((taluka) => (
            <option key={taluka.subdistrictcode} value={taluka.subdistrictcode}>{taluka.subdistrictnameenglish}</option>
          ))}
        </Dropdown>
        <Dropdown
          value={selectedVillage}
          onChange={(e) => setSelectedVillage(e.target.value)}
        >
          <option value="">Select Village</option>
          {villages.map((village) => (
            <option key={village.villagecode} value={village.villagecode}>{village.villagenameenglish}</option>
          ))}
        </Dropdown>
        <Button onClick={handleRegister}>Register</Button>
      </Card>
    </Container>
  );
};

export default RegisterUser;

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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
max-width: 400px;
width: 100%;
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

const Input = styled.input`
width: 100%;
padding: 10px;
margin-bottom: 20px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 16px;
box-sizing: border-box;
`;

const Dropdown = styled.select`
width: 100%;
padding: 10px;
margin-bottom: 20px;
border: 1px solid #ccc;
border-radius: 5px;
font-size: 16px;
box-sizing: border-box;
`;

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: #007bff;
color: white;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
  background-color: #0056b3;
}
`;