import React, { useState } from "react";
import { addEmployee } from "../services/api";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

const EmployeeForm = ({ onSuccess }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    departmentID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(employee);
      alert("Employee added successfully!");
      onSuccess();
      setEmployee({
        name: "",
        email: "",
        phone: "",
        position: "",
        departmentID: "",
      });
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
      <Box sx={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: 1 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={employee.position}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Department ID"
            name="departmentID"
            value={employee.departmentID}
            onChange={handleChange}
            margin="normal"
            type="number"
            required
          />
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="submit" variant="contained" color="primary">
              Add Employee
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
