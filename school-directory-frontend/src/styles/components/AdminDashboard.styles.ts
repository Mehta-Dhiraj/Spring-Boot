import { SxProps, Theme } from '@mui/material/styles';

export const adminDashboardStyles = {
  container: {
    p: 3,
    width: '100%'
  } as SxProps<Theme>,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
    pb: 2,
    borderBottom: '2px solid',
    borderColor: 'primary.main'
  } as SxProps<Theme>,

  title: {
    fontWeight: 'bold',
    color: 'primary.main'
  } as SxProps<Theme>,

  addButton: {
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    boxShadow: '0 4px 12px rgba(103, 126, 234, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(103, 126, 234, 0.4)'
    },
    transition: 'all 0.2s ease'
  } as SxProps<Theme>,

  fab: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)'
    }
  } as SxProps<Theme>,

  schoolsGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      md: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)'
    },
    gap: 3,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  } as SxProps<Theme>,

  schoolCardContainer: {
    minWidth: 0,
    width: '100%'
  } as SxProps<Theme>,

  schoolCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
    }
  } as SxProps<Theme>,

  cardContent: {
    flexGrow: 1,
    p: 2.5
  } as SxProps<Theme>,

  schoolName: {
    fontWeight: 600,
    color: '#1a1a1a',
    mb: 1.5
  } as SxProps<Theme>,

  busChip: {
    mb: 2,
    fontWeight: 600
  } as SxProps<Theme>,

  locationBox: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    backgroundColor: 'rgba(103, 126, 234, 0.08)',
    borderRadius: 1.5,
    p: 1,
    border: '1px solid rgba(103, 126, 234, 0.1)'
  } as SxProps<Theme>,

  locationIcon: {
    color: '#667eea',
    fontSize: '1rem',
    mr: 0.5
  } as SxProps<Theme>,

  locationText: {
    color: '#4a5568',
    fontWeight: 500,
    fontSize: '0.875rem'
  } as SxProps<Theme>,

  feesBox: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderRadius: 1.5,
    p: 1,
    border: '1px solid rgba(34, 197, 94, 0.15)'
  } as SxProps<Theme>,

  feesIcon: {
    color: '#22c55e',
    fontSize: '1rem',
    mr: 0.5
  } as SxProps<Theme>,

  feesText: {
    color: '#166534',
    fontWeight: 600,
    fontSize: '0.875rem'
  } as SxProps<Theme>,

  ratingChip: {
    fontWeight: 600,
    mb: 2
  } as SxProps<Theme>,

  addressText: {
    lineHeight: 1.5,
    mb: 2,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    color: '#718096',
    fontSize: '0.825rem'
  } as SxProps<Theme>,

  cardActions: {
    p: 2,
    pt: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.06)'
  } as SxProps<Theme>,

  actionButton: {
    minWidth: 'auto',
    borderRadius: 1.5,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)'
    }
  } as SxProps<Theme>,

  editButton: {
    color: '#f59e0b',
    borderColor: '#f59e0b',
    '&:hover': {
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: '#f59e0b'
    }
  } as SxProps<Theme>,

  deleteButton: {
    color: '#ef4444',
    borderColor: '#ef4444',
    '&:hover': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444'
    }
  } as SxProps<Theme>,

  viewButton: {
    color: '#3b82f6',
    borderColor: '#3b82f6',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3b82f6'
    }
  } as SxProps<Theme>,

  editActionButton: {
    minWidth: 'auto',
    borderRadius: 1.5,
    transition: 'all 0.2s ease',
    color: '#f59e0b',
    borderColor: '#f59e0b',
    '&:hover': {
      transform: 'translateY(-1px)',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: '#f59e0b'
    }
  } as SxProps<Theme>,

  deleteActionButton: {
    minWidth: 'auto',
    borderRadius: 1.5,
    transition: 'all 0.2s ease',
    color: '#ef4444',
    borderColor: '#ef4444',
    '&:hover': {
      transform: 'translateY(-1px)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444'
    }
  } as SxProps<Theme>
};
