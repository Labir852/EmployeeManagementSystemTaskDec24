import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import Header from "./components/Header";
import EmployeeList from "./components/Employee/EmployeeList";
import EmployeeForm from "./components/Employee/EmployeeForm";
import DepartmentList from "./components/Department/DepartmentList";
import DepartmentForm from "./components/Department/DepartmentForm";
import ReviewForm from "./components/PerformanceReview/ReviewForm";
import ReviewList from "./components/PerformanceReview/ReviewList";
import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <div className="App">

      
      <Container style={{paddingTop:"20px"}}>
        <Button component={Link} to="/" variant="contained" sx={{ m: 1 }}>
          Employees
        </Button>
        <Button component={Link} to="/departments" variant="contained" sx={{ m: 1 }}>
          Departments
        </Button>
        <Button component={Link} to="/reviews" variant="contained" sx={{ m: 1 }}>
          Performance Reviews
        </Button>
      </Container>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <EmployeeForm  />
              <EmployeeList />
            </>
          }
        />
        <Route
          path="/departments"
          element={
            <>
              <DepartmentForm />
              <DepartmentList />
            </>
          }
        />
        <Route
          path="/reviews"
          element={
            <>
              <ReviewForm />
              <ReviewList />
            </>
          }
        />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
