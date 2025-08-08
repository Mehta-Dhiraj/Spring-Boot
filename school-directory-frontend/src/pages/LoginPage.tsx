import React, { useState } from 'react';
import { Container, Box, Alert, Paper, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { authApi } from '../services/api';
import { LoginRequest } from '../types/School';

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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Open Sans, sans-serif'
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            position: 'relative'
          }}
        >
          {/* Close button in top-right corner */}
          <IconButton 
            onClick={() => navigate('/')}
            sx={{ 
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
            aria-label="Close login page"
          >
            <CloseIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img 
              src="/images/headLogo.png" 
              alt="EduConnect Logo" 
              style={{ width: '120px', height: '32px', marginRight: '12px' }}
            />
          </Box>
          <Typography component="h1" variant="h4" color="primary" gutterBottom>
            EduConnect
          </Typography>
          <Typography component="h2" variant="h6" color="text.secondary" gutterBottom>
            Admin Login
          </Typography>
          <LoginForm
            onLogin={handleLogin}
            loading={loading}
            error={error}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
