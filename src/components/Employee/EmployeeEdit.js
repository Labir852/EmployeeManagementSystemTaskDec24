import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography, Box } from "@mui/material";
import { useParams, useNavigate, data } from "react-router-dom";
import axios from "axios";
import { updateEmployee } from "../../services/api";

const EmployeeEdit = () => {
  const { id } = useParams(); // Get employee ID from route parameters
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    joiningDate: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch the employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await updateEmployee(id,data);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update the employee. Please try again.");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Employee
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          boxShadow: 3,
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={employee.department}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={employee.position}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Joining Date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
              required
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployeeEdit;
