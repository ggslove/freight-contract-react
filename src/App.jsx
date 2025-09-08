import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TrueTailAdminLayout from './components/Layout/TrueTailAdminLayout';
import LanguageWrapper from './components/LanguageWrapper';
import TrueDashboardPage from './pages/TrueDashboardPage';
import ContractsPage from './pages/ContractsPage';
import CurrencyPage from './pages/CurrencyPage';
import AboutPage from './pages/AboutPage';
import UserPage from './pages/UserPage';
import RolePage from './pages/RolePage';
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
              <TrueTailAdminLayout>
                <TrueDashboardPage />
              </TrueTailAdminLayout>
            </ProtectedRoute>
          } />
      
          <Route path="/contracts" element={
            <ProtectedRoute>
              <TrueTailAdminLayout>
                <ContractsPage />
              </TrueTailAdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/currencies" element={
            <ProtectedRoute>
              <TrueTailAdminLayout>
                <CurrencyPage />
              </TrueTailAdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <TrueTailAdminLayout>
                <AboutPage />
              </TrueTailAdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute>
              <TrueTailAdminLayout>
                <UserPage />
              </TrueTailAdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/roles" element={
            <ProtectedRoute>
              <TrueTailAdminLayout>
                <RolePage />
              </TrueTailAdminLayout>
            </ProtectedRoute>
          } />
          
        </Routes>
      </LanguageWrapper>
    </Router>
  );
}

export default App;
