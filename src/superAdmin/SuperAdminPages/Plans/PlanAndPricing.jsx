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
  TextField,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getSubscriptionPlan,
  updatePlanStatus,
  updatePlan,
  createPlan,
  deleteSubscriptionPlan,
} from "../../SuperAdminService";
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
  const [deleteOpen, setDeleteOpen] = useState(false); // New state for delete confirmation
  const [statusChangeInfo, setStatusChangeInfo] = useState(null); // New state to hold info for status change
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

  const handleStatusChangeRequest = (plan) => {
    setStatusChangeInfo(plan);
    setConfirmOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!statusChangeInfo) return;

    const { id, plan_status } = statusChangeInfo;
    const newStatus = plan_status === 1 ? "Inactive" : "Active";
    try {
      const updatedStatus = newStatus === "Active" ? 1 : 0;
      const response = await updatePlanStatus(id, updatedStatus);
      const updatedPlans = await getSubscriptionPlan();
      setPlans(updatedPlans);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirmOpen(false);
      setStatusChangeInfo(null);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
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

  const validateForm = (form) => {
    let errors = {};
    if (!form.plan_name) errors.plan_name = "Plan name is required";
    if (!form.slug_name) errors.slug_name = "Slug name is required";
    if (!form.plan_details) errors.plan_details = "Plan details are required";
    if (!form.price) errors.price = "Price is required";
    if (!form.duration) errors.duration = "Duration is required";
    return errors;
  };
  const handleDeleteOpen = (plan) => {
    setSelectedPlan(plan);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPlan) return;

    try {
      const response = await deleteSubscriptionPlan(selectedPlan.id);
      const updatedPlans = await getSubscriptionPlan();
      setPlans(updatedPlans);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteOpen(false);
      setSelectedPlan(null);
    }
  };
  const handleClose = () => {
    setViewOpen(false);
    setEditOpen(false);
    setCreateOpen(false);
    setConfirmOpen(false);
    setDeleteOpen(false);
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
    setEditOpen(true);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
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
              <TableCell>Edit </TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((plan, index) => (
                <TableRow key={plan.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <p style={{ textTransform: "capitalize" }}>
                      {plan.plan_name}
                    </p>
                  </TableCell>
                  <TableCell>{plan.duration} Days</TableCell>
                  <TableCell>
                    <Switch
                      checked={plan.plan_status === 1}
                      onChange={() => handleStatusChangeRequest(plan)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewOpen(plan)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(plan)}
                      disabled={plan.plan_status === 1}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => handleDeleteOpen(plan)}
                      disabled={plan.plan_status === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Details Dialog */}
      <Dialog open={viewOpen} onClose={handleClose}>
        <DialogTitle>Plan Details</DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <div>
              <p style={{ textTransform: "capitalize" }}>
                <strong>Plan Name:</strong> {selectedPlan.plan_name}
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedPlan.price}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration} Days
              </p>
              <p>
                <strong>Status:</strong>
                {selectedPlan.plan_status === 1 ? "Active" : "Inactive"}
              </p>
              <p style={{ textTransform: "capitalize" }}>
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
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Create Plan Dialog */}
      <Dialog open={createOpen} onClose={handleCreateClose}>
        <DialogTitle>Create Plan</DialogTitle>
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
          <Button onClick={handleCreateSubmit}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Status Change Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to change the status of this plan?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Confirm Delete Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this plan?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        severity={notification.severity}
      />
    </div>
  );
}

export default PlanAndPricing;
