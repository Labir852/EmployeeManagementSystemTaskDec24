import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import  { getDepartments } from "../../services/api";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Department List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Average Performance Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.departmentID}>
                <TableCell>{department.departmentID}</TableCell>
                <TableCell>{department.departmentName}</TableCell>
                <TableCell>{department.managerName}</TableCell>
                <TableCell>{department.avgscore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DepartmentList;
