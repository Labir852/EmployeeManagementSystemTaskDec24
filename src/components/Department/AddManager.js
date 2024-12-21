import React, { useState, useEffect } from "react";
import {  Button, Container, Typography, Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addManager, getDepartments, getEmployeesByDept } from "../../services/api";
import Swal from "sweetalert2";

const AddManager = () => {
  const [Manager,setManager] = useState([]);
  const [Department,setDepartment] = useState([]);
  const [data,setData] = useState({
    departmentID:0,
        DepartmentName:"",
        ManagerId:0,
        ManagerName:"",
        Budget:0,
        avgscore:0.0
  })

  useEffect(() => {
      
      fetchDepartments();
    }, [])
    
    
    const handleChange = (event) => {
      setData(prevValues=>({...prevValues,ManagerId:event.target.value}));
    };
    const handleChangeDepartment = (event) => {
      setData(prevValues=>({...prevValues,departmentID:event.target.value}));
      fetchEmployees(event.target.value);
    };
    const handleAddManager = async () =>{
      try{
        let response = await addManager(data.departmentID,data);
        if(response.data)
          Swal.fire({
            title: "Success!",
            text: `${response.data}!`,
            icon: "success"
          });
      }
      catch(error){
        Swal.fire({
          title: "Oops! Something Went wrong",
          text: `${error}!`,
          icon: "error"
        });
      }
      
    }
   
  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartment(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const fetchEmployees = async (id) => {
    try {
      const response = await getEmployeesByDept(id)
      setManager(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem",boxShadow: 3,
      padding: "2rem",
      borderRadius: "8px",
      backgroundColor: "#fff" ,marginBottom:"30px"}} >
        <Typography variant="h5">Add Manager</Typography>
      <Box
        sx={{
          
          display:"flex",
          
        }}
      >
       <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select 
            value={data.departmentID}
            label="Department"
            onChange={handleChangeDepartment}
            style={{margin:"10px"}}
          >
            {
              Department.map((department) =>{
               return(<MenuItem key={department.departmentID} value={department.departmentID}>{department.departmentName}</MenuItem>) 
              })
            }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={{margin:"10px"}}>Manager</InputLabel>
          <Select
            value={data.ManagerId}
            label="Manager"
            onChange={handleChange}
            style={{margin:"10px"}}
          >
            {
              Manager.map(man =>{
                return (<MenuItem key={man.id} value={man.id}>{man.name}</MenuItem>)
              })
            }
          </Select>
        </FormControl>
        
      </Box>
      <Box
       sx={{
        width: "100%", display: "block", justifyContent: "center",marginTop:"10px"
      }}
       >
        <Button style={{flexWrap:"nowrap"}} variant="contained"onClick={handleAddManager}>Add</Button>
      </Box>
      
    </Container>
  );
};

export default AddManager;
