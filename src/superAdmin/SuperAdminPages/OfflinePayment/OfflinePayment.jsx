import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { getSubscriptionPlan } from "../../SuperAdminService";

const OfflinePayment = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getSubscriptionPlan();
        setPlans(fetchedPlans); // Assuming fetchedPlans is an array of plans
        setLoading(false);
      } catch (error) {
        setError("Failed to load plans");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Company:", selectedCompany);
    console.log("Selected Plan:", selectedPlan);
  };

  // Handle form reset
  const handleReset = () => {
    setSelectedCompany("");
    setSelectedPlan("");
  };

  return (
    <div style={{ margin: "10px" }}>
      <Container component={Paper}>
        <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel id="company-select-label">
                  Select Company
                </InputLabel>
                <Select
                  labelId="company-select-label"
                  id="company-select"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  label="Select Company"
                >
                  {["Company A", "Company B", "Company C"].map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel id="plan-select-label">Select Plan</InputLabel>
                <Select
                  labelId="plan-select-label"
                  id="plan-select"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  label="Select Plan"
                  disabled={loading} // Disable select if loading
                >
                  {loading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : error ? (
                    <MenuItem disabled>{error}</MenuItem>
                  ) : (
                    plans.map((plan) => (
                      <MenuItem key={plan.id} value={plan.id}>
                        {plan.plan_name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default OfflinePayment;
