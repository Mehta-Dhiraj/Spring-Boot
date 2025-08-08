import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { School } from '../types/School';

interface FavoritesManagerProps {
  school: School;
  size?: 'small' | 'medium' | 'large';
}

const FavoritesManager: React.FC<FavoritesManagerProps> = ({ 
  school, 
  size = 'medium' 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Load favorites from localStorage
    const favorites = getFavorites();
    setIsFavorite(favorites.some(fav => fav.id === school.id));
  }, [school.id]);

  const getFavorites = (): School[] => {
    const stored = localStorage.getItem('favoriteSchools');
    return stored ? JSON.parse(stored) : [];
  };

  const saveFavorites = (favorites: School[]) => {
    localStorage.setItem('favoriteSchools', JSON.stringify(favorites));
  };

  const handleToggleFavorite = () => {
    const favorites = getFavorites();
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id !== school.id);
      saveFavorites(updatedFavorites);
      setIsFavorite(false);
      setSnackbarMessage(`${school.name} removed from favorites`);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, school];
      saveFavorites(updatedFavorites);
      setIsFavorite(true);
      setSnackbarMessage(`${school.name} added to favorites`);
    }
    
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        <IconButton
          onClick={handleToggleFavorite}
          color={isFavorite ? 'error' : 'default'}
          size={size}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoritesManager;
