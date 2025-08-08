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
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          className="school-name"
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#1a1a1a',
            mb: 2,
            lineHeight: 1.3,
            transition: 'all 0.3s ease'
          }}
        >
          {school.name}
        </Typography>
        
        <Box 
          display="flex" 
          alignItems="center" 
          mb={1.5}
          sx={{
            backgroundColor: 'rgba(103, 126, 234, 0.08)',
            borderRadius: 2,
            p: 1,
            border: '1px solid rgba(103, 126, 234, 0.1)'
          }}
        >
          <LocationOn 
            sx={{ 
              color: '#667eea', 
              fontSize: '1.1rem',
              mr: 1
            }} 
          />
          <Typography 
            variant="body2" 
            sx={{
              color: '#4a5568',
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            {school.area}, {school.city}
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          sx={{
            color: '#718096',
            mb: 2.5,
            lineHeight: 1.5,
            fontSize: '0.825rem'
          }}
        >
          {school.address}
        </Typography>

        <Box 
          display="flex" 
          gap={1.5} 
          mb={3}
          sx={{
            flexWrap: 'wrap'
          }}
        >
          <Box 
            sx={{
              backgroundColor: 'rgba(34, 197, 94, 0.08)',
              borderRadius: 2,
              p: 1.5,
              border: '1px solid rgba(34, 197, 94, 0.15)',
              flex: 1,
              minWidth: '120px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <AttachMoney 
              sx={{ 
                color: '#22c55e', 
                fontSize: '1.1rem',
                mr: 1
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{
                color: '#166534',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              {school.fees}
            </Typography>
          </Box>
          <Box 
            sx={{
              backgroundColor: 'rgba(249, 115, 22, 0.08)',
              borderRadius: 2,
              p: 1.5,
              border: '1px solid rgba(249, 115, 22, 0.15)',
              flex: 1,
              minWidth: '120px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <DirectionsBus 
              sx={{ 
                color: '#f97316', 
                fontSize: '1.1rem',
                mr: 1
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{
                color: '#9a3412',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              Bus: {school.bus}
            </Typography>
          </Box>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap'
          }}
        >
          <Box 
            sx={{
              backgroundColor: 'rgba(255, 193, 7, 0.08)',
              borderRadius: 2,
              p: 2,
              border: '1px solid rgba(255, 193, 7, 0.15)',
              flex: 1,
              minWidth: '140px'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{
                color: '#b45309',
                fontWeight: 600,
                mb: 1,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Overall Rating
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating 
                value={getRatingValue(school.rating)} 
                readOnly 
                size="small" 
                precision={0.1}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#ffc107'
                  }
                }}
              />
              <Typography 
                variant="caption" 
                sx={{
                  color: '#92400e',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              >
                ({school.rating})
              </Typography>
            </Box>
          </Box>

          <Box 
            sx={{
              backgroundColor: 'rgba(139, 69, 19, 0.08)',
              borderRadius: 2,
              p: 2,
              border: '1px solid rgba(139, 69, 19, 0.15)',
              flex: 1,
              minWidth: '140px'
            }}
          >
            <Typography 
              variant="body2" 
              sx={{
                color: '#8b4513',
                fontWeight: 600,
                mb: 1,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Infrastructure
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating 
                value={getInfrastructureValue(school.infrastructure)} 
                readOnly 
                size="small" 
                precision={0.1}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#8b4513'
                  }
                }}
              />
              <Typography 
                variant="caption" 
                sx={{
                  color: '#8b4513',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              >
                ({school.infrastructure})
              </Typography>
            </Box>
          </Box>
        </Box>

      </CardContent>
      <CardActions 
        sx={{ 
          justifyContent: 'space-between', 
          px: 3, 
          pb: 3,
          pt: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={() => onViewDetails(school)}
          startIcon={<VisibilityIcon />}
          sx={{
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
          }}
        >
          View Details
        </Button>
        {showFavorite && (
          <FavoritesManager school={school} size="small" />
        )}
      </CardActions>
    </Card>
  );
};

export default SchoolCard;
