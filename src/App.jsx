import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LanguageWrapper from './components/LanguageWrapper';
import DashboardPage from './pages/DashboardPage';
import ContractManagementPage from './pages/ContractManagementPage';
import AboutPage from './pages/AboutPage';
import SystemManagementPage from './pages/SystemManagementPage';
import './App.css';

function App() {
  return (
    <Router>
      <LanguageWrapper>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contract-management" element={<ContractManagementPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/system-management" element={<SystemManagementPage />} />
          </Routes>
        </Layout>
      </LanguageWrapper>
    </Router>
  );
}

export default App;
