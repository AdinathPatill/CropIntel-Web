import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const DashboardPage = () => {
  const farmerName = "John Doe"; // Replace with actual farmer's name
  const farms = [5, 6, 7, 8,9,10]; // Replace with actual farm data

  const navigate = useNavigate();

  const handleTileClick = () => {
    // Navigate to Landing page
    navigate('/LandingPage');
  };

  return (
    <Container>
    <Header>
        <AppNameContainer>
          <AppName>LANDINGPAGE</AppName> {/* Changed to LANDING PAGE */}
          <Divider />
        </AppNameContainer>
      </Header>
      <Section>
        <HeaderLeft>
          <FarmerName>{farmerName}</FarmerName>
        </HeaderLeft>
        <HeaderRight>
          <UserImage src="https://via.placeholder.com/150" alt="Farmer" />
        </HeaderRight>
      </Section>
      <Divider />
      <Body>
      {farms.map((farm, index) => (
          <Tile key={index} onClick={handleTileClick}>
            <TileText>{farm} farms</TileText>
          </Tile>
        ))}
      </Body>
    </Container>
  );
};

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
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0; /* Background color */
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AppNameContainer = styled.div`
  display: flex;
  flex-direction: row; /* Align items in row */
  align-items: center;
  width: 100%;
`;
const UserImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;


const AppName = styled.h1`
  font-size: 36px;
  margin-right: auto; /* Pushes "CROPINTEL" to the left */
  animation: ${fadeIn} 1s ease;
`;


const FarmerName = styled.h2`
  font-size: 24px;
  color: #333;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const Tile = styled.div`
  background-color: #56ab2f; /* Tile background color */
  color: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  width: 22%;
  height: 150px;
  text-align: center;
  margin: 10px;
  animation: ${fadeIn} 1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const TileText = styled.p`
  font-size: 24px;
`;

export default DashboardPage;
