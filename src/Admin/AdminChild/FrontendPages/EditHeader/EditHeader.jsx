import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import {
  getAdminHeader,
  sendHeaderData,
} from "../../../Services/AdminServices";

function EditHeader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    ribbon_content: "",
    bg_color: "",
    logo: null,
  });
  const [formErrors, setFormErrors] = useState({
    ribbon_content: false,
    bg_color: false,
    logo: false,
  });
  const getData = async () => {
    try {
      const result = await getAdminHeader();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormValues((prevValues) => ({ ...prevValues, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const errors = {
      ribbon_content: !formValues.ribbon_content,
      bg_color: !formValues.bg_color,
      logo: !formValues.logo,
    };
    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("ribbon_content", formValues.ribbon_content);
    formData.append("bg_color", formValues.bg_color);
    formData.append("logo", formValues.logo);

    try {
      await sendHeaderData(formData); // Assuming this function handles the API call
      handleCloseDialog();
      getData();
      // Fetch data again to update the table
      const result = await getAdminHeader();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ float: "right", marginBottom: "20px" }}>
        <Button variant="contained" onClick={handleOpenDialog}>
          Add Header
        </Button>
      </div>

      <Typography variant="h5" gutterBottom>
        Edit Header
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Ribbon Content</TableCell>
              <TableCell>Background Color</TableCell>
              <TableCell>Logo URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={4}>Error: {error}</TableCell>
              </TableRow>
            )}
            {!loading && !error && !data && (
              <TableRow>
                <TableCell colSpan={4}>No data available...</TableCell>
              </TableRow>
            )}
            {data && (
              <TableRow key={data.id}>
                <TableCell>1</TableCell>
                <TableCell>{data.ribbon_content}</TableCell>
                <TableCell style={{ backgroundColor: data.bg_color }}>
                  {data.bg_color}
                </TableCell>
                <TableCell>
                  <img
                    src={data.logo_url}
                    alt="Logo"
                    style={{ width: 50, objectFit: "contain" }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding Header */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Header</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Ribbon Content"
              name="ribbon_content"
              value={formValues.ribbon_content}
              onChange={handleInputChange}
              error={formErrors.ribbon_content}
              helperText={
                formErrors.ribbon_content && "Ribbon Content is required"
              }
            />
            <TextField
              margin="normal"
              fullWidth
              label="Background Color"
              name="bg_color"
              type="color"
              value={formValues.bg_color}
              onChange={handleInputChange}
              error={formErrors.bg_color}
              helperText={formErrors.bg_color && "Background Color is required"}
            />
            <input
              accept="image/*"
              style={{ marginTop: "10px" }}
              id="logo-upload"
              type="file"
              onChange={handleFileChange}
            />
            {formErrors.logo && (
              <Typography color="error">Logo image is required</Typography>
            )}
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditHeader;
