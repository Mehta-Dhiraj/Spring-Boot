import { SxProps, Theme } from '@mui/material/styles';

export const schoolCardStyles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
      '& .school-name': {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }
  } as SxProps<Theme>,

  cardContent: {
    flexGrow: 1,
    p: 3
  } as SxProps<Theme>,

  schoolName: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#1a1a1a',
    mb: 2,
    lineHeight: 1.3,
    transition: 'all 0.3s ease'
  } as SxProps<Theme>,

  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: 1.5,
    backgroundColor: 'rgba(103, 126, 234, 0.08)',
    borderRadius: 2,
    p: 1,
    border: '1px solid rgba(103, 126, 234, 0.1)'
  } as SxProps<Theme>,

  locationIcon: {
    color: '#667eea',
    fontSize: '1.1rem',
    mr: 1
  } as SxProps<Theme>,

  locationText: {
    color: '#4a5568',
    fontWeight: 500,
    fontSize: '0.875rem'
  } as SxProps<Theme>,

  addressText: {
    color: '#718096',
    mb: 2.5,
    lineHeight: 1.5,
    fontSize: '0.825rem'
  } as SxProps<Theme>,

  feesContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderRadius: 2,
    p: 1.5,
    border: '1px solid rgba(34, 197, 94, 0.15)',
    flex: 1,
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center'
  } as SxProps<Theme>,

  feesIcon: {
    color: '#22c55e',
    fontSize: '1.1rem',
    mr: 1
  } as SxProps<Theme>,

  feesText: {
    color: '#166534',
    fontWeight: 600,
    fontSize: '0.875rem'
  } as SxProps<Theme>,

  busContainer: {
    backgroundColor: 'rgba(249, 115, 22, 0.08)',
    borderRadius: 2,
    p: 1.5,
    border: '1px solid rgba(249, 115, 22, 0.15)',
    flex: 1,
    minWidth: '120px',
    display: 'flex',
    alignItems: 'center'
  } as SxProps<Theme>,

  busIcon: {
    color: '#f97316',
    fontSize: '1.1rem',
    mr: 1
  } as SxProps<Theme>,

  busText: {
    color: '#9a3412',
    fontWeight: 600,
    fontSize: '0.875rem'
  } as SxProps<Theme>,

  infoRow: {
    display: 'flex',
    gap: 1.5,
    mb: 3,
    flexWrap: 'wrap'
  } as SxProps<Theme>,

  ratingContainer: {
    display: 'flex',
    gap: 2,
    mb: 3,
    flexWrap: 'wrap'
  } as SxProps<Theme>,

  overallRatingBox: {
    backgroundColor: 'rgba(255, 193, 7, 0.08)',
    borderRadius: 2,
    p: 2,
    border: '1px solid rgba(255, 193, 7, 0.15)',
    flex: 1,
    minWidth: '140px'
  } as SxProps<Theme>,

  infrastructureRatingBox: {
    backgroundColor: 'rgba(139, 69, 19, 0.08)',
    borderRadius: 2,
    p: 2,
    border: '1px solid rgba(139, 69, 19, 0.15)',
    flex: 1,
    minWidth: '140px'
  } as SxProps<Theme>,

  ratingLabel: {
    color: '#b45309',
    fontWeight: 600,
    mb: 1,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  } as SxProps<Theme>,

  infrastructureLabel: {
    color: '#8b4513',
    fontWeight: 600,
    mb: 1,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  } as SxProps<Theme>,

  ratingStars: {
    '& .MuiRating-iconFilled': {
      color: '#ffc107'
    }
  } as SxProps<Theme>,

  infrastructureStars: {
    '& .MuiRating-iconFilled': {
      color: '#8b4513'
    }
  } as SxProps<Theme>,

  ratingValue: {
    color: '#92400e',
    fontWeight: 600,
    fontSize: '0.75rem'
  } as SxProps<Theme>,

  infrastructureValue: {
    color: '#8b4513',
    fontWeight: 600,
    fontSize: '0.75rem'
  } as SxProps<Theme>,

  cardActions: {
    justifyContent: 'space-between',
    px: 3,
    pb: 3,
    pt: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.06)'
  } as SxProps<Theme>,

  viewButton: {
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 600,
    px: 3,
    py: 1,
    boxShadow: '0 4px 12px rgba(103, 126, 234, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(103, 126, 234, 0.4)'
    },
    transition: 'all 0.2s ease'
  } as SxProps<Theme>
};
