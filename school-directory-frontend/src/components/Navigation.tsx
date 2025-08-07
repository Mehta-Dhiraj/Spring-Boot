import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  AdminPanelSettings as AdminIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  isAuthenticated?: boolean;
  favoriteCount?: number;
  onLogout?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  isAuthenticated = false, 
  favoriteCount = 0,
  onLogout 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#5cb0bd' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src="/images/headLogo.png" 
            alt="EduConnect Logo" 
            style={{ width: '150px', height: '40px', marginRight: '16px' }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            Your DREAM|SCHOOL
          </Typography>
        </Box>
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Home */}
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => handleNavigation('/')}
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Home
          </Button>

          {/* Favorites */}
          <IconButton
            color="inherit"
            onClick={() => handleNavigation('/favorites')}
            sx={{ 
              backgroundColor: location.pathname === '/favorites' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            <Badge badgeContent={favoriteCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          {/* Admin/Login */}
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                startIcon={<AdminIcon />}
                onClick={() => handleNavigation('/admin')}
                sx={{ 
                  backgroundColor: location.pathname === '/admin' ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                Admin
              </Button>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => handleNavigation('/login')}
              sx={{ 
                backgroundColor: location.pathname === '/login' ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
            >
              Admin Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
