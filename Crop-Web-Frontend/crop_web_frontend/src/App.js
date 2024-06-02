import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterUser from './components/RegisterUser';
import OtpPage from './components/OtpPage';
import DashboardPage from './components/DashboardPage';
import LandingPage from './components/LandingPage';
// import Dashboard from './components/Dashboard';
// import MainLandingPage from './components/MainLandingPage';
// import AddFarmsForm from './components/AddFarmsForm';
// import FarmDetails from './components/FarmDetails';
// import ViewFarmDetails from './components/ViewFarmDetails';
// import StartMonitoring from './components/StartMonitoring';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />

        {/* <Route path="/dashboard" element={<MainLandingPage />} />
        <Route path="/add-farm" element={<AddFarmsForm />} />
        <Route path="/farm-details" element={<FarmDetails />} />
        <Route path="/view-farm-details" element={<ViewFarmDetails />} />
        <Route path="/start-monitoring" element={<StartMonitoring />} />
        <Route path="/" element={<MainLandingPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
