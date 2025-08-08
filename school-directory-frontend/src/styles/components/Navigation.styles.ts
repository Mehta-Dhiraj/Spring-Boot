import { SxProps, Theme } from '@mui/material/styles';

export const navigationStyles = {
  appBar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  } as SxProps<Theme>,

  toolbar: {
    py: 1
  } as SxProps<Theme>,

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    px: 2,
    py: 0.5,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    mr: 2
  } as SxProps<Theme>,

  logoText: {
    fontWeight: 800,
    background: 'linear-gradient(45deg, #ffffff 30%, #f0f9ff 90%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.5px',
    fontSize: '1.5rem'
  } as SxProps<Theme>,

  tagline: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
    fontSize: '0.875rem',
    fontStyle: 'italic'
  } as SxProps<Theme>,

  navButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5
  } as SxProps<Theme>,

  navButton: {
    backgroundColor: 'rgba(255,255,255,0.05)',
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
  } as SxProps<Theme>,

  activeNavButton: {
    backgroundColor: 'rgba(255,255,255,0.2)'
  } as SxProps<Theme>,

  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  } as SxProps<Theme>,

  activeIconButton: {
    backgroundColor: 'rgba(255,255,255,0.2)'
  } as SxProps<Theme>,

  badge: {
    '& .MuiBadge-badge': {
      backgroundColor: '#ff4757',
      color: 'white',
      fontWeight: 600
    }
  } as SxProps<Theme>
};
