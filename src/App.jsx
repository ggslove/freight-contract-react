import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LanguageWrapper from './components/LanguageWrapper';
import DashboardPage from './pages/DashboardPage';
import ContractManagementPage from './pages/ContractManagementPage';
import AboutPage from './pages/AboutPage';
import SystemManagementPage from './pages/SystemManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import ContractsPage from './pages/ContractsPage';
import CurrencyManagementPage from './pages/CurrencyManagementPage';
import LoginPage from './pages/LoginPage';
import authService from './services/authService';
import './App.css';

// 保护路由组件
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// 公共路由组件
const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    checkAuth();
    window.addEventListener('authChanged', checkAuth);
    return () => window.removeEventListener('authChanged', checkAuth);
  }, []);

  return (
    <Router>
      <LanguageWrapper>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/contracts" element={
            <ProtectedRoute>
              <Layout>
                <ContractsPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <Layout>
                <UserManagementPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <Layout>
                <AboutPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/system-management" element={
            <ProtectedRoute>
              <Layout>
                <SystemManagementPage />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/currency-management" element={
            <ProtectedRoute>
              <Layout>
                <CurrencyManagementPage />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </LanguageWrapper>
    </Router>
  );
}

export default App;
