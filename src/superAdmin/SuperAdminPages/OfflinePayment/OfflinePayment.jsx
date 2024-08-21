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
import Notification from "../../../Notification/Notification";

const OfflinePayment = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [errorPlans, setErrorPlans] = useState("");

  const [companyList, setCompanyList] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [errorCompanies, setErrorCompanies] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
      setNotification({
        open: true,
        message: response.message || "SubscriptionPlan submitted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error (e.g., show an error message)
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
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
                    companyList.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
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
                    plans.map((plan) => (
                      <MenuItem key={plan.id} value={plan.id}>
                        {plan.plan_name}
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
      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
    
  );
};

export default OfflinePayment;
