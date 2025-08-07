import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  LocationCity as LocationCityIcon,
  LocationOn as LocationOnIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { Search, Clear } from '@mui/icons-material';
import { SearchFilters as SearchFiltersType } from '../types/School';

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersType) => void;
  onClear: () => void;
  loading?: boolean;
}

const cities = ['Pune', 'Mumbai', 'Bhopal', 'Hyderabad'];

const areas = {
  Pune: ['Hinjewadi', 'Kalyani Nagar', 'Baner', 'Wakad', 'Aundh'],
  Mumbai: ['Andheri East', 'Andheri west', 'Dahisar East', 'Chembur East', 'Goregaon East', 'Juhu', 'Bandra Kurla Complex'],
  Bhopal: ['Gwalior', 'TT Nagar', 'Arera Colony', 'Bagmugalia', 'Zone II', 'Kolar Road', 'Sagar', 'Hoshangabad Road', 'Manik Bagh', 'Kapal', 'Ayodhya Bypass'],
  Hyderabad: ['Bachupally', 'Kompally', 'Madhapur', 'Shankarpally', 'Kondapur', 'Kurnool', 'Miyapur', 'Malakpet', 'Dilsukhnagar', 'Serilingampally', 'Uppal', 'Begumpet', 'Jubilee Hills', 'Gachibowli']
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, onClear, loading }) => {
  const [filters, setFilters] = useState<SearchFiltersType>({
    city: '',
    area: '',
    name: '',
  });

  const handleInputChange = (field: keyof SearchFiltersType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilters(prev => ({
      ...prev,
      [field]: value,
      // Clear area when city changes
      ...(field === 'city' && { area: '' })
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({ city: '', area: '', name: '' });
    onClear();
  };

  const availableAreas = filters.city ? areas[filters.city as keyof typeof areas] || [] : [];

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Search Schools
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            select
            fullWidth
            label="City"
            value={filters.city}
            onChange={handleInputChange('city')}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityIcon color="action" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">All Cities</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            select
            fullWidth
            label="Area"
            value={filters.area}
            onChange={handleInputChange('area')}
            variant="outlined"
            size="small"
            disabled={!filters.city}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="action" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">All Areas</MenuItem>
            {availableAreas.map((area) => (
              <MenuItem key={area} value={area}>
                {area}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="School Name"
            value={filters.name}
            onChange={handleInputChange('name')}
            variant="outlined"
            size="small"
            placeholder="Search by name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              startIcon={<Search />}
              fullWidth
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={handleClear}
              disabled={loading}
              startIcon={<Clear />}
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchFilters;
