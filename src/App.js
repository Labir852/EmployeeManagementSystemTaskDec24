import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./EmployeeList"; // List page for employees
import EmployeeAdd from "./EmployeeAdd"; // Add new employee page
import EmployeeEdit from "./EmployeeEdit"; // Edit employee page
import { CssBaseline, Container } from "@mui/material"; // Material-UI baseline styles

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Resets and normalizes browser styles */}
      <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Employee Management System 
      </Typography>
        <Routes>
          {/* Default route: Employee List */}
          <Route path="/" element={<EmployeeList />} />
          {/* Route to add a new employee */}
          <Route path="/employees/add" element={<EmployeeAdd />} />
          {/* Route to edit an employee */}
          <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
