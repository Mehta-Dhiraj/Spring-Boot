import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Alert,
} from '@mui/material';
import { School } from '../types/School';

interface SchoolFormProps {
  school?: School | null;
  onSubmit: (schoolData: Partial<School>) => Promise<void>;
  onCancel: () => void;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ school, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    area: '',
    address: '',
    fees: '',
    bus: 'No',
    infrastructure: '',
    rating: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name || '',
        city: school.city || '',
        area: school.area || '',
        address: school.address || '',
        fees: school.fees || '',
        bus: school.bus || 'No',
        infrastructure: school.infrastructure || '',
        rating: school.rating || '',
      });
    }
  }, [school]);

  const cities = ['Pune', 'Mumbai', 'Bhopal', 'Hyderabad'];
  const busOptions = ['Yes', 'No'];

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'School name is required';
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Area is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.fees.trim()) {
      newErrors.fees = 'Fees information is required';
    } else if (!/^\d+\/year$/.test(formData.fees)) {
      newErrors.fees = 'Fees must be in format "amount/year" (e.g., "15000/year")';
    }

    if (!formData.infrastructure.trim()) {
      newErrors.infrastructure = 'Infrastructure rating is required';
    } else if (!/^\d+\.\d+\/5$/.test(formData.infrastructure)) {
      newErrors.infrastructure = 'Infrastructure rating must be in format "x.x/5" (e.g., "4.2/5")';
    }

    if (!formData.rating.trim()) {
      newErrors.rating = 'Overall rating is required';
    } else if (!/^\d+\.\d+\/5$/.test(formData.rating)) {
      newErrors.rating = 'Overall rating must be in format "x.x/5" (e.g., "4.5/5")';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Form submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="School Name"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={!!errors.name}
          helperText={errors.name}
          required
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 200px' }}>
            <TextField
              fullWidth
              select
              label="City"
              value={formData.city}
              onChange={handleInputChange('city')}
              error={!!errors.city}
              helperText={errors.city}
              required
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ flex: '1 1 200px' }}>
            <TextField
              fullWidth
              label="Area"
              value={formData.area}
              onChange={handleInputChange('area')}
              error={!!errors.area}
              helperText={errors.area}
              required
            />
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Address"
          value={formData.address}
          onChange={handleInputChange('address')}
          error={!!errors.address}
          helperText={errors.address}
          multiline
          rows={2}
          required
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 200px' }}>
            <TextField
              fullWidth
              label="Fees"
              value={formData.fees}
              onChange={handleInputChange('fees')}
              error={!!errors.fees}
              helperText={errors.fees || 'Format: amount/year (e.g., 15000/year)'}
              placeholder="15000/year"
              required
            />
          </Box>

          <Box sx={{ flex: '1 1 200px' }}>
            <TextField
              fullWidth
              select
              label="Bus Facility"
              value={formData.bus}
              onChange={handleInputChange('bus')}
              required
            >
              {busOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 200px' }}>
            <TextField
              fullWidth
              label="Infrastructure Rating"
              value={formData.infrastructure}
              onChange={handleInputChange('infrastructure')}
              error={!!errors.infrastructure}
              helperText={errors.infrastructure || 'Format: x.x/5 (e.g., 4.2/5)'}
              placeholder="4.2/5"
              required
            />
          </Box>

          <Box sx={{ flex: '1 1 200px' }}>
            <TextField
              fullWidth
              label="Overall Rating"
              value={formData.rating}
              onChange={handleInputChange('rating')}
              error={!!errors.rating}
              helperText={errors.rating || 'Format: x.x/5 (e.g., 4.5/5)'}
              placeholder="4.5/5"
              required
            />
          </Box>
        </Box>

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Saving...' : (school ? 'Update School' : 'Add School')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SchoolForm;
