import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, School as SchoolIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { registerPageStyles } from '../styles/components/RegisterPage.styles';

interface RegisterFormData {
  username: string;
  email: string;
  city: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (field: keyof RegisterFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.city.trim()) {
      setError('City is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        city: formData.city,
        password: formData.password
      };

      await authApi.register(registrationData);
      setSuccess('Registration successful! You can now login with your credentials.');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={registerPageStyles.container}>
      <Container component="main" maxWidth="sm">
        <Paper elevation={0} sx={registerPageStyles.registerPaper}>
          {/* Close button */}
          <IconButton 
            onClick={() => navigate('/')}
            sx={registerPageStyles.closeButton}
            aria-label="Close register page"
          >
            <CloseIcon />
          </IconButton>
          
          {/* Logo and branding */}
          <Box sx={registerPageStyles.logoContainer}>
            <SchoolIcon sx={{ fontSize: 48, color: '#667eea', mb: 1 }} />
            <Typography component="h1" variant="h3" sx={registerPageStyles.mainTitle}>
              EduConnect
            </Typography>
            <Typography component="h2" variant="h6" sx={registerPageStyles.subtitle}>
              Create Admin Account
            </Typography>
          </Box>

          {/* Welcome message */}
          <Box sx={registerPageStyles.welcomeMessage}>
            <Typography sx={registerPageStyles.welcomeText}>
              Join EduConnect as an admin to manage and add school listings to help students find their perfect educational institution.
            </Typography>
          </Box>

          {/* Form container */}
          <Box sx={registerPageStyles.formContainer}>
            {error && (
              <Alert severity="error" sx={registerPageStyles.errorAlert}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={registerPageStyles.successAlert}>
                {success}
              </Alert>
            )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  disabled={loading}
                  sx={registerPageStyles.inputField}
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  disabled={loading}
                  sx={registerPageStyles.inputField}
                />
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                  disabled={loading}
                  sx={registerPageStyles.inputField}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  disabled={loading}
                  sx={registerPageStyles.inputField}
                />
                
                {/* Password requirements */}
                <Box sx={registerPageStyles.passwordRequirements}>
                  <Typography sx={registerPageStyles.requirementText}>
                    Password must be at least 6 characters long
                  </Typography>
                </Box>
                
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  disabled={loading}
                  sx={registerPageStyles.inputField}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={registerPageStyles.registerButton}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </Box>
              
              {/* Login link */}
              <Box sx={registerPageStyles.loginLink}>
                <Typography sx={registerPageStyles.loginText}>
                  Already have an account?
                </Typography>
                <Button
                  onClick={() => navigate('/login')}
                  sx={registerPageStyles.loginButton}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
