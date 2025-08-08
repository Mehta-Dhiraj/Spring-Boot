import React, { useState } from 'react';
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
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';

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
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);
  const profileOpen = Boolean(profileAnchorEl);

  // Get logged-in user information
  const getUserInfo = () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch {
      return null;
    }
  };

  const userInfo = getUserInfo();
  const username = userInfo?.username || 'Admin';

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    
    // Trigger authentication state update in App.tsx
    window.dispatchEvent(new Event('authUpdated'));
    
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              px: 2,
              py: 0.5,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              mr: 2
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #ffffff 30%, #f0f9ff 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
                fontSize: '1.5rem'
              }}
            >
              EduConnect
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
              fontSize: '0.875rem',
              fontStyle: 'italic'
            }}
          >
            Your Dream School Awaits
          </Typography>
        </Box>
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Home */}
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => handleNavigation('/')}
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              px: 2,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            Home
          </Button>

          {/* Favorites */}
          <IconButton
            color="inherit"
            onClick={() => handleNavigation('/favorites')}
            sx={{ 
              backgroundColor: location.pathname === '/favorites' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            <Badge 
              badgeContent={favoriteCount} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff4757',
                  color: 'white',
                  fontWeight: 600
                }
              }}
            >
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
                  backgroundColor: location.pathname === '/admin' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                endIcon={<ExpandMoreIcon />}
                onClick={handleProfileClick}
                sx={{ 
                  backgroundColor: profileOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {username}
              </Button>
              <UserProfile
                anchorEl={profileAnchorEl}
                open={profileOpen}
                onClose={handleProfileClose}
                onLogout={handleLogout}
                userInfo={userInfo}
              />
            </>
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => handleNavigation('/login')}
              sx={{ 
                backgroundColor: location.pathname === '/login' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                px: 2,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
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
