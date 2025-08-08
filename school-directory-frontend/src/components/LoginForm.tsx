import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { LoginRequest } from '../types/School';

interface LoginFormProps {
  onLogin: (credentials: LoginRequest) => Promise<void>;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading = false, error }) => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: keyof LoginRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!credentials.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!credentials.password) {
      errors.password = 'Password is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onLogin(credentials);
    } catch (err) {
      // Error handling is done by parent component
      console.error('Login failed:', err);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          EduConnect
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Admin Login
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={credentials.username}
          onChange={handleInputChange('username')}
          error={!!validationErrors.username}
          helperText={validationErrors.username}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleInputChange('password')}
          error={!!validationErrors.password}
          helperText={validationErrors.password}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          disabled={loading}
          sx={{ mt: 1, mb: 2, py: 1.5 }}
          onClick={() => window.location.href = '/register'}
        >
          Create New Account
        </Button>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Demo Accounts: dhiraj/1234 or cognizant/cognizant
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;
