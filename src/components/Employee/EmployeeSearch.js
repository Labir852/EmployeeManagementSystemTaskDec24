import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography, Box } from "@mui/material";
import { useParams, useNavigate, data } from "react-router-dom";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { searchEmployees } from "../../services/api";

const EmployeeSearch = () => {

  
  const [data, setData]= useState({
    name:"",
    department:0,
    position:""
  });
  const [Department,setDepartment] = useState(0);
  



  // Handle form submission
  const handleSubmit = async (e) => {
    await searchEmployees(data);
  };

  const handleChange = (event) => {
    setDepartment(event.target.value);
    setData(prevValues=>({...prevValues,department:event.target.value}));
  };


  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem",boxShadow: 3,
      padding: "2rem",
      borderRadius: "8px",
      backgroundColor: "#fff" ,marginBottom:"30px"}} >
        <Typography variant="h5">Search Employee</Typography>
      <Box
        sx={{
          
          display:"flex"
        }}
      >
        <TextField
          label="Name"
          fullWidth
          value={data.name}
          margin="normal"
          onChange={(e) => setData(prevValues=>({...prevValues,name:e.target.value}))}
          style={{margin:"5px"}}
        />
        <TextField
          label="Position"
          type="text"
          fullWidth
          margin="normal"
          value={data.position}
          onChange={(e) => setData(prevValues=>({...prevValues,position:e.target.value}))}
          style={{margin:"5px"}}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            value={Department}
            label="Department"
            onChange={handleChange}
            style={{margin:"5px"}}
          >
            <MenuItem value={1}>HR</MenuItem>
            <MenuItem value={2}>Engineering</MenuItem>
            <MenuItem value={3}>Sales</MenuItem>
          </Select>
        </FormControl>
        
      </Box>
      <Box
       sx={{
        width: "100%", display: "block", justifyContent: "center",marginTop:"10px"
      }}
       >
        <Button style={{flexWrap:"nowrap"}} variant="contained"onClick={handleSubmit}>Search</Button>
      </Box>
      
    </Container>
  );
};

export default EmployeeSearch;
