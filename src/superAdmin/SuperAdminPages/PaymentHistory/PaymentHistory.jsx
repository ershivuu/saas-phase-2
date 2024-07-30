import React from "react";
import "./PaymentHistory.css";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

// Function to format date and include the day of the week
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

function PaymentHistory() {
  // Sample data (you can replace this with actual data from your application)
  const payments = [
    {
      id: 1,
      invoice: "#123454678",
      amount: 100,
      date: "2024-07-20",
      status: "Success",
    },
    {
      id: 2,
      invoice: "#123454678",
      amount: 150,
      date: "2024-07-15",
      status: "Pending",
    },
    {
      id: 3,
      invoice: "#123454678",
      amount: 200,
      date: "2024-07-10",
      status: "Failed",
    },
  ];

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "green";
      case "pending":
        return "orange";
      case "failed":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="all-payments" style={{ padding: "20px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Payment Invoice</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={payment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{payment.invoice}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: getStatusColor(payment.status),
                    }}
                  >
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PaymentHistory;
