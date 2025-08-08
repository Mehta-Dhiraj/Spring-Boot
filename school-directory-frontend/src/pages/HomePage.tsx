import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import SchoolCard from '../components/SchoolCard';
import SearchFilters from '../components/SearchFilters';
import { School, SearchFilters as SearchFiltersType } from '../types/School';
import { schoolApi } from '../services/api';

const ITEMS_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadAllSchools();
  }, []);

  const loadAllSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await schoolApi.getAllSchools();
      setSchools(response.data);
      setFilteredSchools(response.data);
    } catch (err: any) {
      setError('Failed to load schools. Please try again later.');
      console.error('Error loading schools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFiltersType) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

      let response;
      
      if (filters.name.trim()) {
        // Search by name
        response = await schoolApi.searchSchoolsByName(filters.name.trim());
      } else if (filters.city && filters.area) {
        // Search by city and area
        response = await schoolApi.searchSchools(filters.city, filters.area);
      } else if (filters.city) {
        // Search by city only
        response = await schoolApi.getSchoolsByCity(filters.city);
      } else {
        // No filters, load all schools
        response = await schoolApi.getAllSchools();
      }

      setFilteredSchools(response.data);
    } catch (err: any) {
      setError('Failed to search schools. Please try again.');
      console.error('Error searching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setFilteredSchools(schools);
    setCurrentPage(1);
  };

  const handleViewDetails = (school: School) => {
    // For now, just log the school details
    // In a full implementation, this would navigate to a detail page
    console.log('View details for school:', school);
    alert(`School Details:\n\nName: ${school.name}\nCity: ${school.city}\nArea: ${school.area}\nFees: ${school.fees}\nRating: ${school.rating}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSchools = filteredSchools.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSchools.length / ITEMS_PER_PAGE);

  return (
    <>
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          backgroundImage: 'url(/images/back1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            padding: 4, 
            borderRadius: 2,
            maxWidth: '600px'
          }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              🎓 Find Your Dream School
            </Typography>
            <Typography variant="h5" paragraph>
              Discover the best educational institutions in your area
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Explore {schools.length} schools across multiple cities with detailed information about fees, infrastructure, and ratings.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Filters */}
        <SearchFilters 
        onSearch={handleSearch} 
        onClear={handleClearSearch}
        loading={loading}
      />

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Results Summary */}
      {!loading && !error && (
        <Box mb={3}>
          <Typography variant="h6" color="primary">
            {filteredSchools.length} School{filteredSchools.length !== 1 ? 's' : ''} Found
          </Typography>
          {totalPages > 1 && (
            <Typography variant="body2" color="text.secondary">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredSchools.length)} of {filteredSchools.length} results
            </Typography>
          )}
        </Box>
      )}

      {/* Schools Grid */}
      {!loading && !error && paginatedSchools.length > 0 && (
        <>
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
            {paginatedSchools.map((school) => (
              <Box key={school.id}>
                <SchoolCard 
                  school={school} 
                  onViewDetails={handleViewDetails}
                />
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {/* No Results */}
      {!loading && !error && filteredSchools.length === 0 && (
        <Box textAlign="center" py={8}>
          <SchoolIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            No schools found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or browse all schools
          </Typography>
        </Box>
      )}
      </Container>
    </>
  );
};

export default HomePage;
