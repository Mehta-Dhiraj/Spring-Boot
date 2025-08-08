import { SxProps, Theme } from '@mui/material/styles';

export const homePageStyles = {
  container: {
    minHeight: '100vh',
    width: '100%'
  } as SxProps<Theme>,

  heroSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  } as SxProps<Theme>,

  heroContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: 4,
    p: 6,
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    mx: 'auto'
  } as SxProps<Theme>,

  heroTitle: {
    fontSize: { xs: '2.5rem', md: '4rem' },
    fontWeight: 800,
    background: 'linear-gradient(45deg, #ffffff 30%, #f0f9ff 90%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 2,
    letterSpacing: '2px'
  } as SxProps<Theme>,

  heroSubtitle: {
    fontSize: { xs: '1.1rem', md: '1.3rem' },
    color: 'rgba(255, 255, 255, 0.9)',
    mb: 4,
    fontWeight: 300,
    lineHeight: 1.6
  } as SxProps<Theme>,

  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
    flexWrap: 'wrap'
  } as SxProps<Theme>,

  statItem: {
    textAlign: 'center',
    color: 'white'
  } as SxProps<Theme>,

  statNumber: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#ffd700',
    display: 'block'
  } as SxProps<Theme>,

  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: '1px'
  } as SxProps<Theme>,

  mainContent: {
    backgroundColor: '#f7fafc',
    minHeight: '40vh',
    py: 4
  } as SxProps<Theme>,

  contentContainer: {
    maxWidth: '1400px',
    mx: 'auto',
    px: 3
  } as SxProps<Theme>,

  searchSection: {
    backgroundColor: 'white',
    borderRadius: 3,
    p: 3,
    mb: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  } as SxProps<Theme>,

  resultsSection: {
    backgroundColor: 'white',
    borderRadius: 3,
    p: 3,
    mb: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  } as SxProps<Theme>,

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    py: 8,
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  } as SxProps<Theme>,

  errorContainer: {
    backgroundColor: 'white',
    borderRadius: 3,
    p: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  } as SxProps<Theme>,

  schoolsGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)'
    },
    gap: 3,
    mb: 4,
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  } as SxProps<Theme>,

  schoolCardContainer: {
    minWidth: 0,
    width: '100%'
  } as SxProps<Theme>,

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 4,
    backgroundColor: 'white',
    borderRadius: 3,
    p: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  } as SxProps<Theme>,

  pagination: {
    '& .MuiPaginationItem-root': {
      borderRadius: 2,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: 'rgba(103, 126, 234, 0.1)',
        transform: 'translateY(-1px)'
      },
      '&.Mui-selected': {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)'
        }
      }
    }
  } as SxProps<Theme>,

  noResultsContainer: {
    textAlign: 'center',
    py: 8,
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  } as SxProps<Theme>,

  noResultsText: {
    color: '#718096',
    fontSize: '1.1rem',
    fontWeight: 500
  } as SxProps<Theme>
};
