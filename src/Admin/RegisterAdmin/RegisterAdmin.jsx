import React, { useState } from 'react';
import { Box, TextField, Button, Container, Typography, InputAdornment, IconButton, Card, CardContent, Divider } from '@mui/material';
import { registerAdmin } from '../../Admin/Services/AdminServices'; // Adjust the import path
import Notification from '../../Notification/Notification'; // Adjust the import path
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./RegisterAdmin.css";

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '', // New field for confirm password
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '', // New field for confirm password errors
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility

  const validate = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name) newErrors.name = 'This field is required';
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Validate contact
    if (!formData.contact) {
      newErrors.contact = 'This field is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact must be a 10-digit number';
    }

    // Validate password
    if (!formData.password) newErrors.password = 'This field is required';
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'This field is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerAdmin(formData.email, formData.password, formData.contact, formData.name);
      setNotification({
        open: true,
        message: response.message || 'Admin registered successfully!',
        severity: 'success',
      });
      setFormData({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '', // Clear the confirm password field
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Registration failed. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility as well
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Register Admin
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="off" // Prevent autofill
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Contact"
              variant="outlined"
              margin="normal"
              type="tel"
              required
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              error={!!errors.contact}
              helperText={errors.contact}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{ shrink: true }}
              autoComplete="off" // Prevent autofill
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputLabelProps={{ shrink: true }}
              autoComplete="off" // Prevent autofill
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </Container>
    </>
  
  );
}

export default RegisterAdmin;
