import React, { useState } from 'react';
import { Container, Box, Alert, Paper, Typography, IconButton, Button } from '@mui/material';
import { Close as CloseIcon, School as SchoolIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { authApi } from '../services/api';
import { LoginRequest } from '../types/School';
import { loginPageStyles } from '../styles/components/LoginPage.styles';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (credentials: LoginRequest) => {
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(credentials);
      
      // Store authentication data
      localStorage.setItem('authToken', response.data?.token || 'demo-token');
      localStorage.setItem('userInfo', JSON.stringify(response.data?.user || { username: credentials.username }));
      
      // Trigger authentication state update in App.tsx
      window.dispatchEvent(new Event('authUpdated'));
      
      // Navigate to admin dashboard
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={loginPageStyles.container}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={0} sx={loginPageStyles.loginPaper}>
          {/* Close button */}
          <IconButton 
            onClick={() => navigate('/')}
            sx={loginPageStyles.closeButton}
            aria-label="Close login page"
          >
            <CloseIcon />
          </IconButton>
          
          {/* Logo and branding */}
          <Box sx={loginPageStyles.logoContainer}>
            <SchoolIcon sx={{ fontSize: 48, color: '#667eea', mb: 1 }} />
            <Typography component="h1" variant="h3" sx={loginPageStyles.mainTitle}>
              EduConnect
            </Typography>
            <Typography component="h2" variant="h6" sx={loginPageStyles.subtitle}>
              Admin Portal
            </Typography>
          </Box>

          {/* Welcome message */}
          {/* <Box sx={loginPageStyles.welcomeMessage}>
            <Typography sx={loginPageStyles.welcomeText}>
              Welcome back! Please sign in to access the admin dashboard and manage school listings.
            </Typography>
          </Box> */}

          {/* Login form */}
          <Box sx={loginPageStyles.formContainer}>
            <LoginForm
              onLogin={handleLogin}
              loading={loading}
              error={error}
            />
          </Box>

          {/* Register link */}
          <Box sx={loginPageStyles.registerLink}>
            <Typography sx={loginPageStyles.registerText}>
              Don't have an admin account?
            </Typography>
            <Button
              onClick={() => navigate('/register')}
              sx={loginPageStyles.registerButton}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
