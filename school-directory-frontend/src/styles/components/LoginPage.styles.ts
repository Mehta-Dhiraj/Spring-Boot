import { SxProps, Theme } from '@mui/material/styles';

export const loginPageStyles = {
  // Main container with gradient background
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      opacity: 0.3,
    }
  } as SxProps<Theme>,

  // Login paper with glassmorphism effect
  loginPaper: {
    padding: { xs: 3, sm: 4, md: 5 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '24px',
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.12)',
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.3s ease',
    minWidth: { xs: '320px', sm: '400px' },
    maxWidth: '450px',
    width: '100%',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 30px 90px rgba(0, 0, 0, 0.18)',
    }
  } as SxProps<Theme>,

  // Close button styling
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    color: 'text.secondary',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    transition: 'all 0.3s ease',
  } as SxProps<Theme>,

  // Logo container
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: { xs: 2, sm: 3 },
    flexDirection: 'column',
    gap: 1,
    width: '100%',
    textAlign: 'center',
  } as SxProps<Theme>,

  // Logo image styling
  logoImage: {
    width: '140px',
    height: 'auto',
    marginBottom: '8px',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
  } as SxProps<Theme>,

  // Main title with gradient text
  mainTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 700,
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '8px',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    letterSpacing: '-0.02em',
  } as SxProps<Theme>,

  // Subtitle styling
  subtitle: {
    color: 'text.secondary',
    fontWeight: 500,
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: '32px',
    opacity: 0.8,
  } as SxProps<Theme>,

  // Welcome message
  welcomeMessage: {
    textAlign: 'center',
    marginBottom: { xs: '20px', sm: '24px' },
    padding: { xs: '14px', sm: '16px' },
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(102, 126, 234, 0.15)',
    width: '100%',
    boxSizing: 'border-box',
  } as SxProps<Theme>,

  welcomeText: {
    color: 'text.primary',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    margin: 0,
  } as SxProps<Theme>,

  // Form container
  formContainer: {
    width: '100%',
    marginTop: { xs: '12px', sm: '16px' },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 2, sm: 2.5 },
  } as SxProps<Theme>,

  // Enhanced input field styling
  inputField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      transition: 'all 0.3s ease',
      minHeight: '56px',
      fontSize: '16px',
      '& input': {
        padding: '16px 14px',
        fontSize: '16px',
        lineHeight: '1.4',
        '&::placeholder': {
          color: 'rgba(0, 0, 0, 0.4)',
          opacity: 1,
        },
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: '#667eea',
        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.12)',
        transform: 'translateY(-1px)',
      },
    },
    '& .MuiInputLabel-root': {
      fontWeight: 500,
      fontSize: '16px',
      transform: 'translate(14px, 16px) scale(1)',
      '&.Mui-focused, &.MuiInputLabel-shrink': {
        color: '#667eea',
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: '14px',
      fontSize: '14px',
    },
  } as SxProps<Theme>,

  // Login button styling
  loginButton: {
    marginTop: '24px',
    marginBottom: '16px',
    padding: '12px 32px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
    border: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      background: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
      transform: 'none',
    },
  } as SxProps<Theme>,

  // Register link styling
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '16px',
    borderRadius: '12px',
    background: 'rgba(102, 126, 234, 0.05)',
    border: '1px solid rgba(102, 126, 234, 0.1)',
  } as SxProps<Theme>,

  registerText: {
    color: 'text.secondary',
    fontSize: '0.9rem',
    marginBottom: '8px',
  } as SxProps<Theme>,

  registerButton: {
    color: '#667eea',
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      textDecoration: 'none',
    },
  } as SxProps<Theme>,

  // Error alert styling
  errorAlert: {
    marginBottom: '20px',
    borderRadius: '12px',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid rgba(244, 67, 54, 0.2)',
    '& .MuiAlert-icon': {
      color: '#f44336',
    },
  } as SxProps<Theme>,

  // Loading state
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  } as SxProps<Theme>,
};

export default loginPageStyles;
