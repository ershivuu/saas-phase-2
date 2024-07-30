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
} from "../../SuperAdminService"; // Adjust the path as needed

function PlanAndPricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [status, setStatus] = useState("");
  const [editForm, setEditForm] = useState({
    plan_name: "",
    slug_name: "",
    plan_details: "",
    price: "",
    duration: "",
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
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmOpen(false);
    setViewOpen(false);
    setEditOpen(false);
    setSelectedPlan(null);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      const updatedStatus = status === "Active" ? 1 : 0; // Correctly map status to 1 (Active) and 0 (Inactive)
      if (selectedPlan) {
        await updatePlanStatus(selectedPlan.id, updatedStatus);
        // Refresh the plans after update
        const updatedPlans = await getSubscriptionPlan();
        setPlans(updatedPlans);
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      if (selectedPlan) {
        await updatePlan(selectedPlan.id, editForm);
        // Refresh the plans after update
        const updatedPlans = await getSubscriptionPlan();
        setPlans(updatedPlans);
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pricing-table">
      <Button variant="outlined">Create Plan</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
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
                    disabled={plan.plan_status === 1} // Disable button if status is Active
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
      <Dialog open={confirmOpen} onClose={handleClose}>
        <DialogTitle>Confirm Status Update</DialogTitle>
        <DialogContent>
          Are you sure you want to update the status to {status}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleStatusChange} color="primary">
            Yes
          </Button>
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
                <strong>Details:</strong> {selectedPlan.plan_details}
              </p>
              <p>
                <strong>Price:</strong> ${selectedPlan.price}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration} days
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(selectedPlan.start_date).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(selectedPlan.end_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedPlan.plan_status === 1 ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Days Remaining:</strong> {selectedPlan.days_remaining}{" "}
                days
              </p>
              <p>
                <strong>Time Remaining:</strong> {selectedPlan.time_remaining}
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
                variant="standard"
                value={editForm.plan_name}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="slug_name"
                label="Slug Name"
                type="text"
                fullWidth
                variant="standard"
                value={editForm.slug_name}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="plan_details"
                label="Plan Details"
                type="text"
                fullWidth
                variant="standard"
                value={editForm.plan_details}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                value={editForm.price}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                name="duration"
                label="Duration (Days)"
                type="number"
                fullWidth
                variant="standard"
                value={editForm.duration}
                onChange={handleEditChange}
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
    </div>
  );
}

export default PlanAndPricing;
