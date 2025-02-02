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
  Typography,
} from "@mui/material";
import {
  getSubscriptionPlan,
  getExpiredCompany,
  submitSubscriptionPlan,
} from "../../SuperAdminService"; // Import API functions

const OfflinePayment = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [errorPlans, setErrorPlans] = useState("");

  const [companyList, setCompanyList] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [errorCompanies, setErrorCompanies] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getSubscriptionPlan();
        setPlans(fetchedPlans);
        setLoadingPlans(false);
      } catch (error) {
        setErrorPlans("Failed to load plans");
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const fetchedCompanies = await getExpiredCompany();
        setCompanyList(
          fetchedCompanies.map((company) => ({
            id: company.id, // Adjust according to your data
            name: company.company_name,
          }))
        );
        setLoadingCompanies(false);
      } catch (error) {
        setErrorCompanies("Failed to load companies");
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const adminId = selectedCompany;
      const response = await submitSubscriptionPlan(adminId, selectedPlan);
      console.log("Response from API:", response);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error (e.g., show an error message)
    }
  };

  const handleReset = () => {
    setSelectedCompany("");
    setSelectedPlan("");
  };

  return (
    <div style={{ margin: "20px" }}>
      <Container component={Paper}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ margin: "10px", paddingTop: "20px" }}
        >
          Offline Payments
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ padding: "10px", paddingBottom: "80px" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
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
                  {loadingCompanies ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : errorCompanies ? (
                    <MenuItem disabled>{errorCompanies}</MenuItem>
                  ) : (
                    companyList
                      .slice()
                      .sort((a, b) => b.id - a.id)
                      .map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                          <p style={{ textTransform: "capitalize" }}>
                            {company.name}
                          </p>
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="plan-select-label">Select Plan</InputLabel>
                <Select
                  labelId="plan-select-label"
                  id="plan-select"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  label="Select Plan"
                  disabled={loadingPlans} // Disable select if loading
                >
                  {loadingPlans ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : errorPlans ? (
                    <MenuItem disabled>{errorPlans}</MenuItem>
                  ) : (
                    plans
                      .slice()
                      .sort((a, b) => b.id - a.id)
                      .map((plan) => (
                        <MenuItem key={plan.id} value={plan.id}>
                          <p style={{ textTransform: "capitalize" }}>
                            {plan.plan_name}
                          </p>
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ float: "right", marginTop: "20px" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default OfflinePayment;
