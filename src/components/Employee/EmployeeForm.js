import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import api, { addEmployee } from "../../services/api";

const EmployeeForm = ({ onSubmitSuccess }) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [data, setData]= useState({
    name:"",
    email:"",
    phone:"",
    department:0,
    position:"",
    joiningDate:"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(data);
      onSubmitSuccess();
      setName("");
      setDepartment("");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={data.name}
          onChange={(e) => setData(prevValues=>({...prevValues,name:e.target.value}))}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={data.email}
          onChange={(e) => setData(prevValues=>({...prevValues,email:e.target.value}))}
        />
        <TextField
          label="Department"
          fullWidth
          margin="normal"
          value={data.department}
          onChange={(e) => setData(prevValues=>({...prevValues,department:e.target.value}))}
        />
        <TextField
          label="Position"
          fullWidth
          margin="normal"
          value={data.position}
          onChange={(e) => setData(prevValues=>({...prevValues,position:e.target.value}))}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={data.phone}
          onChange={(e) => setData(prevValues=>({...prevValues,phone:e.target.value}))}
        />
        <TextField
          label="JoiningDate"
          fullWidth
          margin="normal"
          value={data.joiningDate}
          onChange={(e) => setData(prevValues=>({...prevValues,joiningDate:e.target.value}))}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;
