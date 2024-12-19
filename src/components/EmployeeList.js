import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch all employees
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Employee List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>
                {/* Edit Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  component={Link}
                  to={`/employees/edit/${employee.id}`}
                  sx={{ marginRight: "0.5rem" }}
                >
                  Edit
                </Button>
                {/* Delete Button (optional) */}
                <Button variant="contained" color="secondary" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
