import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { registerAdmin } from "../../Admin/Services/AdminServices"; // Adjust the import path
import Notification from "../../Notification/Notification"; // Adjust the import path
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./RegisterAdmin.css";
import signupimg from "../../assets/images/signup.png";

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // New state for confirm password visibility

  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const [adminUrl, setAdminUrl] = useState(""); // State for storing admin URL

  const validate = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name) newErrors.name = "This field is required";

    // Validate email
    if (!formData.email) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate contact
    if (!formData.contact) {
      newErrors.contact = "This field is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be a 10-digit number";
    }

    // Validate password
    if (!formData.password) newErrors.password = "This field is required";

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "This field is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      [name]: "",
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
      const response = await registerAdmin(
        formData.email,
        formData.password,
        formData.contact,
        formData.name
      );
      setNotification({
        open: true,
        message: response.message || "Admin registered successfully!",
        severity: "success",
      });
      setAdminUrl(response.admin_url || "");
      setDialogOpen(true);
      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Registration failed. Please try again.",
        severity: "error",
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
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div className="signup-form">
        <div className="signup-bg">
          <img src={signupimg} alt="" />
        </div>
        <div className="signup-fields">
          <div>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Signup
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
                  autoComplete="off"
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
                  type={showPassword ? "text" : "password"}
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
                  type={showConfirmPassword ? "text" : "password"}
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <Button variant="contained" color="primary" type="submit">
                    Register
                  </Button>
                </Box>
              </form>
            </CardContent>
          </div>

          <Notification
            open={notification.open}
            handleClose={handleCloseNotification}
            alertMessage={notification.message}
            alertSeverity={notification.severity}
          />
        </div>
      </div>

      {/* Dialog for displaying admin URL */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your registration was successful!
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Redirection URL:
            <a href={adminUrl} target="_blank" rel="noopener noreferrer">
              {adminUrl}
            </a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegisterAdmin;
