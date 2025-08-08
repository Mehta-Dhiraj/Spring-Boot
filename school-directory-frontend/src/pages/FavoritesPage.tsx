import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { School } from '../types/School';
import SchoolCard from '../components/SchoolCard';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<School[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const stored = localStorage.getItem('favoriteSchools');
    const favoriteSchools = stored ? JSON.parse(stored) : [];
    setFavorites(favoriteSchools);
  };

  const handleViewDetails = (school: School) => {
    // Navigate to school details or show modal
    console.log('View details for:', school.name);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToHome}
          sx={{ mr: 2 }}
        >
          Back to Search
        </Button>
        <FavoriteIcon color="error" sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h4" component="h1">
          My Favorite Schools
        </Typography>
      </Box>

      {/* Content */}
      {favorites.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            No favorite schools yet
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Start exploring schools and add them to your favorites by clicking the heart icon.
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackToHome}
            startIcon={<ArrowBackIcon />}
          >
            Browse Schools
          </Button>
        </Alert>
      ) : (
        <>
          <Typography variant="body1" color="text.secondary" mb={3}>
            You have {favorites.length} favorite school{favorites.length !== 1 ? 's' : ''}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            {favorites.map((school) => (
              <Box key={school.id}>
                <SchoolCard 
                  school={school} 
                  onViewDetails={handleViewDetails}
                  showFavorite={true}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default FavoritesPage;
