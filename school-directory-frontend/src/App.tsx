import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './pages/HomePage';

// Create custom theme for EduConnect
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e', // Orange
      light: '#ffb74d',
      dark: '#e65100',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    // Check authentication status
    const updateAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    
    updateAuthStatus();

    // Load favorite count
    const updateFavoriteCount = () => {
      const favorites = localStorage.getItem('favoriteSchools');
      const count = favorites ? JSON.parse(favorites).length : 0;
      setFavoriteCount(count);
    };

    updateFavoriteCount();

    // Listen for storage changes to update both auth status and favorite count
    const handleStorageChange = () => {
      updateAuthStatus();
      updateFavoriteCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('favoritesUpdated', handleStorageChange);
    window.addEventListener('authUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
      window.removeEventListener('authUpdated', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation 
            isAuthenticated={isAuthenticated}
            favoriteCount={favoriteCount}
            onLogout={handleLogout}
          />
          
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
