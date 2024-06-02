import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTileClick = () => {
    // Navigate to Landing page
    navigate('/land');
  };

  const farms = [
    { id: 1, name: "Farm A", village: "Village A", area: "100 acres", average: "50 acres" },
    { id: 2, name: "Farm B", village: "Village B", area: "200 acres", average: "75 acres" },
    { id: 3, name: "Farm C", village: "Village C", area: "150 acres", average: "60 acres" },
    { id: 4, name: "Farm d", village: "Village d", area: "150 acres", average: "60 acres" },
    { id: 5, name: "Farm e", village: "Village e", area: "150 acres", average: "60 acres" },
    { id: 6, name: "Farm f", village: "Village f", area: "150 acres", average: "60 acres" },
    // Add more farms as needed
  ];

  return (
    <Container>
     <Header>
        <AppNameContainer>
          <AppName>DASHBOARD</AppName> {/* Changed to DASHBOARD */}
          <Divider />
        </AppNameContainer>
      </Header>
      <Body>
        {farms.map((farm) => (
          <Tile key={farm.id} onClick={handleTileClick}>
            <TileLeft>
              <FarmImage src={`https://via.placeholder.com/150/${farm.id}`} alt="Farm" />
            </TileLeft>
            <TileRight>
              <FarmName>{farm.name}</FarmName>
              <VillageName>{farm.village}</VillageName>
              <FarmInfo>Total Area: {farm.area}</FarmInfo>
              <FarmInfo>Average: {farm.average}</FarmInfo>
              <ThreeDots>...</ThreeDots>
            </TileRight>
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
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AppNameContainer = styled.div`
  display: flex;
  flex-direction: row; /* Align items in row */
  align-items: center;
  width: 100%;
`;

const AppName = styled.h1`
  font-size: 36px;
  margin-right: auto; /* Pushes "CROPINTEL" to the left */
  animation: ${fadeIn} 1s ease;
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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
`;

const Tile = styled.div`
  background-color: #56ab2f;
  color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  width: 22%; /* Adjust width to fit 3 tiles in a row */
  height: 180px;
  margin: 10px;
  padding: 20px;
  animation: ${fadeIn} 1s ease;
  display: flex;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const TileLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const TileRight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const FarmImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const FarmName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const VillageName = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const FarmInfo = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ThreeDots = styled.span`
  font-size: 24px;
  align-self: flex-end;
`;

export default LandingPage;
