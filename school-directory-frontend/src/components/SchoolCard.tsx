import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Rating,
  Button,
} from '@mui/material';
import {
  LocationOn,
  DirectionsBus,
  School as SchoolIcon,
  AttachMoney,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { School } from '../types/School';
import FavoritesManager from './FavoritesManager';

interface SchoolCardProps {
  school: School;
  onViewDetails: (school: School) => void;
  showFavorite?: boolean;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, onViewDetails, showFavorite = false }) => {
  const getRatingValue = (rating: string): number => {
    const match = rating.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const getInfrastructureValue = (infrastructure: string): number => {
    const match = infrastructure.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom color="primary">
          {school.name}
        </Typography>
        
        <Box display="flex" alignItems="center" mb={1}>
          <LocationOn color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {school.area}, {school.city}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {school.address}
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <AttachMoney color="action" fontSize="small" />
            <Typography variant="body2" ml={0.5}>
              {school.fees}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <DirectionsBus color="action" fontSize="small" />
            <Typography variant="body2" ml={0.5}>
              Bus: {school.bus}
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" gutterBottom>
            Rating:
          </Typography>
          <Rating 
            value={getRatingValue(school.rating)} 
            readOnly 
            size="small" 
            precision={0.1}
          />
          <Typography variant="caption" ml={1}>
            ({school.rating})
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="body2" gutterBottom>
            Infrastructure:
          </Typography>
          <Rating 
            value={getInfrastructureValue(school.infrastructure)} 
            readOnly 
            size="small" 
            precision={0.1}
          />
          <Typography variant="caption" ml={1}>
            ({school.infrastructure})
          </Typography>
        </Box>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onViewDetails(school)}
            startIcon={<VisibilityIcon />}
          >
            View Details
          </Button>
          {showFavorite && (
            <FavoritesManager school={school} size="small" />
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
