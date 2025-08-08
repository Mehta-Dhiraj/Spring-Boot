import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { authApi } from '../services/api';

interface UserProfileProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  userInfo: {
    id: number;
    username: string;
    email: string;
    city: string;
    role: string;
  } | null;
}

interface ProfileFormData {
  username: string;
  email: string;
  city: string;
  password: string;
  confirmPassword: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  anchorEl,
  open,
  onClose,
  onLogout,
  userInfo
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  // Initialize form data when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username,
        email: userInfo.email,
        city: userInfo.city,
        password: '',
        confirmPassword: ''
      });
    }
  }, [userInfo]);

  const handleEditProfile = () => {
    setEditDialogOpen(true);
    onClose(); // Close the dropdown menu
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setError(null);
    setSuccess(null);
    // Reset form data to original values
    if (userInfo) {
      setFormData({
        username: userInfo.username,
        email: userInfo.email,
        city: userInfo.city,
        password: '',
        confirmPassword: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleUpdateProfile = async () => {
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!formData.city.trim()) {
      setError('City is required');
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      if (!userInfo) {
        setError('User information not available');
        setLoading(false);
        return;
      }

      const updateData: any = {
        currentUsername: userInfo.username, // For backend authentication
        username: formData.username.trim(),
        email: formData.email.trim(),
        city: formData.city.trim()
      };

      // Only include password if it's provided
      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      const response = await authApi.updateProfile(updateData);

      if (response.data.success) {
        // Update localStorage with new user info
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        
        // Trigger authentication state update in App.tsx
        window.dispatchEvent(new Event('authUpdated'));
        
        setSuccess('Profile updated successfully!');
        
        // Close dialog after a short delay
        setTimeout(() => {
          handleCloseEditDialog();
        }, 1500);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while updating profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onClose(); // Close the dropdown menu
    onLogout(); // Call the parent logout function
  };

  if (!userInfo) return null;

  return (
    <>
      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 280,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info Section */}
        <Box sx={{ px: 2, py: 1.5, backgroundColor: 'grey.50' }}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {userInfo.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userInfo.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userInfo.city}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Role: {userInfo.role}
          </Typography>
        </Box>
        
        <Divider />
        
        {/* Action Items */}
        <MenuItem onClick={handleEditProfile}>
          <EditIcon sx={{ mr: 2, color: 'primary.main' }} />
          Edit Profile
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
            Edit Profile
          </Box>
          <IconButton onClick={handleCloseEditDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={loading}
            />
            
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={loading}
            />
            
            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={loading}
            />
            
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="subtitle2" color="text.secondary">
              Change Password (optional)
            </Typography>
            
            <TextField
              name="password"
              label="New Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              disabled={loading}
              helperText="Leave blank to keep current password. Minimum 6 characters."
            />
            
            <TextField
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              disabled={loading}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseEditDialog} 
            disabled={loading}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateProfile} 
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <EditIcon />}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;
