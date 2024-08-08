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
import { getSubscriptionPlan, getCompanyData } from "../../SuperAdminService"; // Import getCompanyData function

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
        const fetchedCompanies = await getCompanyData();
        setCompanyList(
          fetchedCompanies.admins.map((admin) => admin.company_name)
        );
        setLoadingCompanies(false);
      } catch (error) {
        setErrorCompanies("Failed to load companies");
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Company:", selectedCompany);
    console.log("Selected Plan:", selectedPlan);
  };

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
                  {loadingCompanies ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : errorCompanies ? (
                    <MenuItem disabled>{errorCompanies}</MenuItem>
                  ) : (
                    companyList.map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))
                  )}
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
