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
import Chatbot from '../components/Chatbot';
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
      {/* Modern Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          minHeight: '65vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)',
            padding: { xs: 3, md: 5 }, 
            borderRadius: 4,
            maxWidth: '700px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #FFF 30%, #E3F2FD 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 2
              }}
            >
              🎓 EduConnect
            </Typography>
            <Typography 
              variant="h4" 
              paragraph 
              sx={{ 
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.95)',
                textAlign: 'center',
                mb: 3
              }}
            >
              Find Your Dream School
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Discover the best educational institutions across India with comprehensive information about fees, infrastructure, and ratings.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4, 
              mt: 4,
              flexWrap: 'wrap'
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                  {schools.length}+
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Schools
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                  4
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Cities
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                  100%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Verified
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ backgroundColor: '#f8fafc', minHeight: '50vh' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Search Filters */}
          <Box sx={{ 
            backgroundColor: 'white',
            borderRadius: 3,
            p: 3,
            mb: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <SearchFilters 
              onSearch={handleSearch} 
              onClear={handleClearSearch}
              loading={loading}
            />
          </Box>

          {/* Error Message */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(244, 67, 54, 0.1)'
              }}
            >
              {error}
            </Alert>
          )}

          {/* Loading Indicator */}
          {loading && (
            <Box display="flex" justifyContent="center" my={6}>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress size={50} thickness={4} />
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  Loading schools...
                </Typography>
              </Box>
            </Box>
          )}

          {/* Results Summary */}
          {!loading && !error && (
            <Box 
              mb={4} 
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                p: 3,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600,
                  color: '#1976d2',
                  mb: 1
                }}
              >
                {filteredSchools.length} School{filteredSchools.length !== 1 ? 's' : ''} Found
              </Typography>
              {totalPages > 1 && (
                <Typography variant="body1" color="text.secondary">
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
                  gap: 3,
                  mb: 4,
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}
              >
                {paginatedSchools.map((school) => (
                  <Box 
                    key={school.id}
                    sx={{
                      minWidth: 0,
                      width: '100%'
                    }}
                  >
                    <SchoolCard 
                      school={school} 
                      onViewDetails={handleViewDetails}
                    />
                  </Box>
                ))}
              </Box>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  mt={4}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 3,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontWeight: 600
                      }
                    }}
                  />
            </Box>
              )}
            </>
          )}

          {/* No Results */}
          {!loading && !error && filteredSchools.length === 0 && (
            <Box 
              textAlign="center" 
              py={8}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
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
      </Box>
      
      {/* Chatbot */}
      <Chatbot onSchoolSearch={(query: string) => {
        // Convert string query to search filters format
        const searchFilters: SearchFiltersType = {
          city: '',
          area: '',
          name: query,
        };
        handleSearch(searchFilters);
      }} />
    </>
  );
};

export default HomePage;
