import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Fab,
} from '@mui/material';
import {
  School as SchoolIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  LocationOn,
  AttachMoney,
  DirectionsBus,
  Star,
} from '@mui/icons-material';
import { School } from '../types/School';
import { schoolApi } from '../services/api';
import SchoolForm from './SchoolForm';
import { adminDashboardStyles } from '../styles/components';

const AdminDashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<School | null>(null);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      setLoading(true);
      const response = await schoolApi.getAllSchools();
      setSchools(response.data);
    } catch (err: any) {
      setError('Failed to load schools');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchool = () => {
    setSelectedSchool(null);
    setIsFormOpen(true);
  };

  const handleEditSchool = (school: School) => {
    setSelectedSchool(school);
    setIsFormOpen(true);
  };

  const handleDeleteSchool = (school: School) => {
    setSchoolToDelete(school);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!schoolToDelete) return;

    try {
      await schoolApi.deleteSchool(schoolToDelete.id);
      await loadSchools();
      setIsDeleteDialogOpen(false);
      setSchoolToDelete(null);
    } catch (err: any) {
      setError('Failed to delete school');
    }
  };

  const handleFormSubmit = async (schoolData: Partial<School>) => {
    try {
      if (selectedSchool) {
        // Merge the partial update data with the existing school data
        const completeSchoolData = {
          ...selectedSchool,
          ...schoolData
        };
        
        const response = await schoolApi.updateSchool(selectedSchool.id, completeSchoolData);
        
        // Update the school in place to preserve list order
        setSchools(prevSchools => 
          prevSchools.map(school => 
            school.id === selectedSchool.id ? response.data : school
          )
        );
        
      } else {
        const response = await schoolApi.createSchool(schoolData);
        
        // Reload all schools to ensure we get the complete data
        await loadSchools();
      }
      
      setIsFormOpen(false);
      setSelectedSchool(null);
      setError(''); // Clear any previous errors
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save school';
      setError(errorMessage);
    }
  };

  const getRatingColor = (rating: string) => {
    const numRating = parseFloat(rating);
    if (numRating >= 4.5) return 'success';
    if (numRating >= 4.0) return 'primary';
    if (numRating >= 3.5) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading schools...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={adminDashboardStyles.container}>
      {/* Header */}
      <Box sx={adminDashboardStyles.header}>
        <Typography variant="h4" sx={adminDashboardStyles.title}>
          School Management Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSchool}
          sx={adminDashboardStyles.addButton}
        >
          Add New School
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          mb: 4
        }}
      >
        <Box>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SchoolIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{schools.length}</Typography>
                  <Typography color="text.secondary">Total Schools</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <LocationOn color="secondary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {new Set(schools.map(s => s.city)).size}
                  </Typography>
                  <Typography color="text.secondary">Cities</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <DirectionsBus color="info" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {schools.filter(s => s.bus === 'Yes').length}
                  </Typography>
                  <Typography color="text.secondary">With Bus</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Star color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {schools.filter(s => parseFloat(s.rating) >= 4.5).length}
                  </Typography>
                  <Typography color="text.secondary">Top Rated</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Schools Grid */}
      <Box sx={adminDashboardStyles.schoolsGrid}>
        {schools.map((school) => (
          <Box 
            key={school.id}
            sx={adminDashboardStyles.schoolCardContainer}
          >
            <Card sx={adminDashboardStyles.schoolCard}>
              <CardContent sx={adminDashboardStyles.cardContent}>
                {/* Header with School Name and Bus Info */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" sx={adminDashboardStyles.schoolName}>
                    {school.name || 'Unnamed School'}
                  </Typography>
                  <Chip
                    label={school.bus === 'Yes' ? 'Bus Available' : 'No Bus'}
                    color={school.bus === 'Yes' ? 'success' : 'default'}
                    size="small"
                    sx={adminDashboardStyles.busChip}
                  />
                </Box>
                
                <Box sx={adminDashboardStyles.locationBox}>
                  <LocationOn sx={adminDashboardStyles.locationIcon} />
                  <Typography variant="body2" sx={adminDashboardStyles.locationText}>
                    {(school.area && school.city) ? `${school.area}, ${school.city}` : 'Location not specified'}
                  </Typography>
                </Box>

                <Box sx={adminDashboardStyles.feesBox}>
                  <AttachMoney sx={adminDashboardStyles.feesIcon} />
                  <Typography variant="body2" sx={adminDashboardStyles.feesText}>
                    {school.fees || 'Fees not specified'}
                  </Typography>
                </Box>

                <Chip
                  label={`Rating: ${school.rating || 'Not rated'}`}
                  color={school.rating ? getRatingColor(school.rating) : 'default'}
                  size="small"
                  sx={adminDashboardStyles.ratingChip}
                />

                <Typography 
                  variant="body2" 
                  sx={adminDashboardStyles.addressText}
                >
                  {school.address || 'Address not provided'}
                </Typography>
              </CardContent>

              <Box sx={adminDashboardStyles.cardActions}>
                <Box display="flex" justifyContent="space-between" gap={1}>
                  <IconButton
                    onClick={() => handleEditSchool(school)}
                    title="Edit School"
                    sx={adminDashboardStyles.editActionButton}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteSchool(school)}
                    title="Delete School"
                    sx={adminDashboardStyles.deleteActionButton}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>

      {/* School Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedSchool ? 'Edit School' : 'Add New School'}
        </DialogTitle>
        <DialogContent>
          <SchoolForm
            school={selectedSchool}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{schoolToDelete?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add school"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', md: 'none' },
        }}
        onClick={handleAddSchool}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default AdminDashboard;
