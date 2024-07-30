import React, { useState, useEffect } from "react";
import "./PlanAndPricing.css";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  getSubscriptionPlan,
  updatePlanStatus,
  updatePlan,
  createPlan,
} from "../../SuperAdminService"; // Adjust the path as needed
import Notification from "../../../Notification/Notification";

function PlanAndPricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [status, setStatus] = useState("");
  const [editForm, setEditForm] = useState({
    plan_name: "",
    slug_name: "",
    plan_details: "",
    price: "",
    duration: "",
  });
  const [newPlan, setNewPlan] = useState({
    plan_name: "",
    slug_name: "",
    plan_details: "",
    price: "",
    duration: "",
  });
  const [editErrors, setEditErrors] = useState({});
  const [newPlanErrors, setNewPlanErrors] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getSubscriptionPlan();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleClickOpen = (plan) => {
    setSelectedPlan(plan);
    setStatus(plan.plan_status === 1 ? "Active" : "Inactive"); // Correctly set the status based on the current plan status
    setOpen(true);
  };

  const handleViewOpen = (plan) => {
    setSelectedPlan(plan);
    setViewOpen(true);
  };

  const handleEditOpen = (plan) => {
    setSelectedPlan(plan);
    setEditForm({
      plan_name: plan.plan_name,
      slug_name: plan.slug_name,
      plan_details: plan.plan_details,
      price: plan.price,
      duration: plan.duration,
    });
    setEditErrors({});
    setEditOpen(true);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmOpen(false);
    setViewOpen(false);
    setEditOpen(false);
    setCreateOpen(false);
    setSelectedPlan(null);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      const updatedStatus = status === "Active" ? 1 : 0; // Correctly map status to 1 (Active) and 0 (Inactive)
      if (selectedPlan) {
        const response = await updatePlanStatus(selectedPlan.id, updatedStatus);
        // Refresh the plans after update
        const updatedPlans = await getSubscriptionPlan();
        setPlans(updatedPlans);
        setNotification({
          open: true,
          message: response.message,
          severity: "success",
        });
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const validateForm = (form) => {
    let errors = {};
    if (!form.plan_name) errors.plan_name = "Plan name is required";
    if (!form.slug_name) errors.slug_name = "Slug name is required";
    if (!form.plan_details) errors.plan_details = "Plan details are required";
    if (!form.price) errors.price = "Price is required";
    if (!form.duration) errors.duration = "Duration is required";
    return errors;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });

    // Clear the specific error when user types
    setEditErrors({
      ...editErrors,
      [name]: "",
    });
  };

  const handleEditSubmit = async () => {
    const errors = validateForm(editForm);
    if (Object.keys(errors).length) {
      setEditErrors(errors);
      return;
    }
    try {
      if (selectedPlan) {
        const response = await updatePlan(selectedPlan.id, editForm);
        // Refresh the plans after update
        const updatedPlans = await getSubscriptionPlan();
        setPlans(updatedPlans);
        setNotification({
          open: true,
          message: response.message,
          severity: "success",
        });
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({
      ...newPlan,
      [name]: value,
    });

    // Clear the specific error when user types
    setNewPlanErrors({
      ...newPlanErrors,
      [name]: "",
    });
  };

  const handleCreateSubmit = async () => {
    const errors = validateForm(newPlan);
    if (Object.keys(errors).length) {
      setNewPlanErrors(errors);
      return;
    }
    try {
      const response = await createPlan(newPlan);
      // Refresh the plans after creating a new one
      const updatedPlans = await getSubscriptionPlan();
      setPlans(updatedPlans);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
      handleCreateClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pricing-table">
      <Button
        variant="contained"
        color="success"
        onClick={handleCreateOpen}
        className="create-plan-btn"
      >
        Create Plan
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Plan Name</TableCell>
              <TableCell>Duration (Days)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View Details</TableCell>
              <TableCell>Edit Plan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan, index) => (
              <TableRow key={plan.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{plan.plan_name}</TableCell>
                <TableCell>{plan.duration} days</TableCell>
                <TableCell>
                  <Button>
                    <span
                      style={{
                        color: plan.plan_status === 1 ? "green" : "red",
                      }}
                      onClick={() => handleClickOpen(plan)}
                    >
                      {plan.plan_status === 1 ? "Active" : "Inactive"}
                    </span>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewOpen(plan)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditOpen(plan)}
                    disabled={plan.plan_status === 1}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Status Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmOpen}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Status Update</DialogTitle>
        <DialogContent>
          Are you sure you want to update the status to {status}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusChange}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewOpen} onClose={handleClose}>
        <DialogTitle>Plan Details</DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <div>
              <p>
                <strong>Plan Name:</strong> {selectedPlan.plan_name}
              </p>

              <p>
                <strong>Price:</strong> ${selectedPlan.price}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration} days
              </p>
              {/* <p>
                <strong>Start Date:</strong>{" "}
                {new Date(selectedPlan.start_date).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(selectedPlan.end_date).toLocaleDateString()}
              </p> */}
              <p>
                <strong>Status:</strong>{" "}
                {selectedPlan.plan_status === 1 ? "Active" : "Inactive"}
              </p>
              {/* <p>
                <strong>Days Remaining:</strong> {selectedPlan.days_remaining}{" "}
                days
              </p> */}
              {/* <p>
                <strong>Time Remaining:</strong> {selectedPlan.time_remaining}
              </p> */}
              <p>
                <strong>Details:</strong> {selectedPlan.plan_details}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>Edit Plan</DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <div>
              <TextField
                autoFocus
                margin="dense"
                name="plan_name"
                label="Plan Name"
                type="text"
                fullWidth
                value={editForm.plan_name}
                onChange={handleEditChange}
                error={!!editErrors.plan_name}
                helperText={editErrors.plan_name}
              />
              <TextField
                margin="dense"
                name="slug_name"
                label="Slug Name"
                type="text"
                fullWidth
                value={editForm.slug_name}
                onChange={handleEditChange}
                error={!!editErrors.slug_name}
                helperText={editErrors.slug_name}
              />
              <TextField
                margin="dense"
                name="plan_details"
                label="Plan Details"
                type="text"
                fullWidth
                value={editForm.plan_details}
                onChange={handleEditChange}
                error={!!editErrors.plan_details}
                helperText={editErrors.plan_details}
              />
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={editForm.price}
                onChange={handleEditChange}
                error={!!editErrors.price}
                helperText={editErrors.price}
              />
              <TextField
                margin="dense"
                name="duration"
                label="Duration (Days)"
                type="number"
                fullWidth
                value={editForm.duration}
                onChange={handleEditChange}
                error={!!editErrors.duration}
                helperText={editErrors.duration}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Plan Dialog */}
      <Dialog open={createOpen} onClose={handleCreateClose}>
        <DialogTitle>Create New Plan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="plan_name"
            label="Plan Name"
            type="text"
            fullWidth
            value={newPlan.plan_name}
            onChange={handleCreateChange}
            error={!!newPlanErrors.plan_name}
            helperText={newPlanErrors.plan_name}
          />
          <TextField
            margin="dense"
            name="slug_name"
            label="Slug Name"
            type="text"
            fullWidth
            value={newPlan.slug_name}
            onChange={handleCreateChange}
            error={!!newPlanErrors.slug_name}
            helperText={newPlanErrors.slug_name}
          />
          <TextField
            margin="dense"
            name="plan_details"
            label="Plan Details"
            type="text"
            fullWidth
            value={newPlan.plan_details}
            onChange={handleCreateChange}
            error={!!newPlanErrors.plan_details}
            helperText={newPlanErrors.plan_details}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newPlan.price}
            onChange={handleCreateChange}
            error={!!newPlanErrors.price}
            helperText={newPlanErrors.price}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration (Days)"
            type="number"
            fullWidth
            value={newPlan.duration}
            onChange={handleCreateChange}
            error={!!newPlanErrors.duration}
            helperText={newPlanErrors.duration}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
}

export default PlanAndPricing;
