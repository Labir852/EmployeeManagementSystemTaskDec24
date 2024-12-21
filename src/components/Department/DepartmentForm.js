import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import  { addDepartment } from "../../services/api";
import Swal from "sweetalert2";

const DepartmentForm = () => {
  const [data,setData] = useState({
    DepartmentID:0,
    DepartmentName:"",
    ManagerId:0,
    ManagerName:"",
    Budget:0,
    avgscore:0.0

  })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     let response =  await addDepartment(data);
     if(response.data)
      Swal.fire({
              title: "Success!",
              text: `${response.data}!`,
              icon: "success"
            });
    } catch (error) {
      Swal.fire({
              title: "Oops! Something Went wrong",
              text: `${error}!`,
              icon: "error"
            });
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add New Department
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Department Name"
          fullWidth
          margin="normal"
          value={data.DepartmentName}
          onChange={(e) => setData(prevValues=>({...prevValues,DepartmentName:e.target.value}))}
        />
              
        <TextField
          label="Department Budget"
          fullWidth
          margin="normal"
          type="number"
          value={data.Budget}
          onChange={(e) => setData(prevValues=>({...prevValues,Budget:e.target.value}))}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DepartmentForm;
