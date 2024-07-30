import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import { Description } from "@mui/icons-material";

function ServiceList() {
  // Sample data (you can replace this with actual data from your application)
  const plans = [
    {
      id: 1,
      planName: "Plan A",
      serviceType: "Mode",
      description: "Hello Descriptions",
      status: "Active",
    },
    {
      id: 2,
      planName: "Plan B",
      serviceType: "Media",
      description: "Hello Descriptions",
      status: "Inactive",
    },
    {
      id: 3,
      planName: "Plan c",
      serviceType: "Mode",
      description: "Hello Descriptions",
      status: "Active",
    },
  ];

  return (
    <>
      <div className="pricing-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan, index) => (
                <TableRow key={plan.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{plan.planName}</TableCell>
                  <TableCell>{plan.serviceType}</TableCell>
                  <TableCell>{plan.description} days</TableCell>
                  <TableCell>
                    {/* Apply conditional styles based on plan status */}
                    <span
                      style={{
                        color: plan.status === "Active" ? "green" : "red",
                      }}
                    >
                      {plan.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default ServiceList;
