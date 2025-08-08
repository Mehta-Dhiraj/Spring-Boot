import { SxProps, Theme } from '@mui/material/styles';

export const userProfileStyles = {
  menu: {
    '& .MuiPaper-root': {
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      backdropFilter: 'blur(10px)',
      mt: 1
    }
  } as SxProps<Theme>,

  userInfoSection: {
    p: 3,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(103, 126, 234, 0.02)'
  } as SxProps<Theme>,

  userName: {
    fontWeight: 700,
    color: '#1a1a1a',
    mb: 0.5
  } as SxProps<Theme>,

  userEmail: {
    color: '#718096',
    fontSize: '0.875rem',
    mb: 0.5
  } as SxProps<Theme>,

  userDetails: {
    color: '#718096',
    fontSize: '0.825rem'
  } as SxProps<Theme>,

  actionsSection: {
    p: 2
  } as SxProps<Theme>,

  // Form fields
  formField: {
    width: '100%',
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      transition: 'all 0.3s ease',
      minHeight: '56px',
      fontSize: '16px',
      '& input': {
        padding: '16px 14px',
        fontSize: '16px',
        lineHeight: '1.4',
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: '#667eea',
        boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.1)',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '16px',
      transform: 'translate(14px, 16px) scale(1)',
      '&.Mui-focused, &.MuiInputLabel-shrink': {
        color: '#667eea',
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
  } as SxProps<Theme>,

  menuItem: {
    borderRadius: 2,
    mx: 1,
    mb: 0.5,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(103, 126, 234, 0.08)',
      transform: 'translateX(4px)'
    }
  } as SxProps<Theme>,

  editButton: {
    color: '#667eea',
    fontWeight: 600
  } as SxProps<Theme>,

  logoutButton: {
    color: '#ef4444',
    fontWeight: 600
  } as SxProps<Theme>,

  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
    }
  } as SxProps<Theme>,

  dialogTitle: {
    backgroundColor: 'rgba(103, 126, 234, 0.05)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    fontWeight: 700,
    color: '#1a1a1a'
  } as SxProps<Theme>,

  dialogContent: {
    p: 3
  } as SxProps<Theme>,



  dialogActions: {
    p: 3,
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  } as SxProps<Theme>,

  cancelButton: {
    color: '#718096',
    borderColor: '#718096',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: 'rgba(113, 128, 150, 0.08)',
      borderColor: '#718096'
    }
  } as SxProps<Theme>,

  saveButton: {
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    borderRadius: 2,
    fontWeight: 600,
    px: 3,
    boxShadow: '0 4px 12px rgba(103, 126, 234, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(103, 126, 234, 0.4)'
    },
    transition: 'all 0.2s ease'
  } as SxProps<Theme>
};
